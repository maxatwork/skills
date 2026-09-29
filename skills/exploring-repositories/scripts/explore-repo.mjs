#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";

class CommandError extends Error {
  constructor(args, result) {
    super(`${args.join(" ")} failed with exit ${result.status}`);
    this.argsList = args;
    this.status = result.status;
    this.stdout = result.stdout || "";
    this.stderr = result.stderr || "";
  }
}

function run(args, { cwd, check = true } = {}) {
  const result = spawnSync(args[0], args.slice(1), {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });

  if (result.error) {
    throw result.error;
  }

  if (check && result.status !== 0) {
    throw new CommandError(args, result);
  }

  return result;
}

function safeComponent(value) {
  let decoded = String(value).trim().replace(/^\/+|\/+$/g, "");
  try {
    decoded = decodeURIComponent(decoded);
  } catch {
    // Keep the original string when URL decoding is invalid.
  }
  const withoutGit = decoded.replace(/\.git$/i, "");
  const safe = withoutGit.replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^[.-]+|[.-]+$/g, "");
  return safe || "repo";
}

function githubOwnerRepoFromPath(urlPath) {
  const parts = urlPath.split("/").filter(Boolean);
  if (parts.length < 2) {
    return null;
  }
  const owner = safeComponent(parts[0]);
  const repo = safeComponent(parts[1]);
  return owner && repo ? [owner, repo] : null;
}

function githubFromSsh(target) {
  const patterns = [
    /^git@github\.com:(?<owner>[^/]+)\/(?<repo>[^/]+?)(?:\.git)?\/?$/,
    /^ssh:\/\/git@github\.com\/(?<owner>[^/]+)\/(?<repo>[^/]+?)(?:\.git)?\/?$/,
  ];

  for (const pattern of patterns) {
    const match = target.match(pattern);
    if (match?.groups) {
      return [safeComponent(match.groups.owner), safeComponent(match.groups.repo)];
    }
  }

  return null;
}

function resolveGithub(owner, repo, source, candidates = []) {
  return {
    display: `${owner}/${repo}`,
    cloneUrl: `https://github.com/${owner}/${repo}.git`,
    host: "github.com",
    pathParts: [owner, repo],
    source,
    candidates,
  };
}

function parseUrl(target) {
  try {
    return new URL(target);
  } catch {
    return null;
  }
}

function resolveUrl(target) {
  const sshGithub = githubFromSsh(target);
  if (sshGithub) {
    return resolveGithub(sshGithub[0], sshGithub[1], "github-ssh");
  }

  const parsed = parseUrl(target);
  if (!parsed?.protocol || !parsed?.host) {
    return null;
  }

  // A token or password in the URL would be printed below and saved in the
  // clone's .git/config. SSH user names (ssh://git@host/...) are not secrets.
  if (parsed.password || (parsed.username && parsed.protocol !== "ssh:")) {
    throw new Error("Remove credentials from the clone URL; use a Git credential helper or SSH key instead.");
  }

  const host = parsed.host.toLowerCase().split("@").at(-1);
  if (host === "github.com") {
    const ownerRepo = githubOwnerRepoFromPath(parsed.pathname);
    if (ownerRepo) {
      return resolveGithub(ownerRepo[0], ownerRepo[1], "github-url");
    }
  }

  const pathParts = parsed.pathname
    .split("/")
    .map((part) => safeComponent(part))
    .filter(Boolean);

  if (pathParts.length === 0) {
    throw new Error(`Could not derive repository path from URL: ${target}`);
  }

  return {
    display: `${host}/${pathParts.join("/")}`,
    cloneUrl: target,
    host: safeComponent(host),
    pathParts,
    source: "clone-url",
    candidates: [],
  };
}

function resolveOwnerRepo(target) {
  const match = target.match(/^(?<owner>[A-Za-z0-9_.-]+)\/(?<repo>[A-Za-z0-9_.-]+?)(?:\.git)?\/?$/);
  if (!match?.groups) {
    return null;
  }
  return resolveGithub(safeComponent(match.groups.owner), safeComponent(match.groups.repo), "owner-repo");
}

function commandExists(command) {
  const result = spawnSync(command, ["--version"], { encoding: "utf8", stdio: ["ignore", "ignore", "ignore"] });
  return !result.error && result.status === 0;
}

function searchGithub(query) {
  if (!commandExists("gh")) {
    throw new Error("Project-name lookup needs GitHub CLI (`gh`). Provide a clone URL or owner/repo instead.");
  }

  const result = run(["gh", "search", "repos", query, "--limit", "5", "--json", "fullName,description,url"]);
  const repos = JSON.parse(result.stdout || "[]");
  if (repos.length === 0) {
    throw new Error(`No GitHub repositories found for project name: ${query}`);
  }

  const queryLower = query.toLowerCase();
  repos.sort((left, right) => {
    const leftScore = githubSearchScore(left, queryLower);
    const rightScore = githubSearchScore(right, queryLower);
    return leftScore[0] - rightScore[0] || leftScore[1].localeCompare(rightScore[1]);
  });

  const best = repos[0];
  const [owner, repo] = best.fullName.split("/", 2);
  const candidates = repos.map((entry) => {
    const description = (entry.description || "").trim().slice(0, 120);
    return `${entry.fullName || ""} - ${description}`;
  });

  return resolveGithub(owner, repo, "github-search", candidates);
}

function githubSearchScore(repo, queryLower) {
  const fullName = repo.fullName || "";
  const repoName = fullName.split("/").at(-1).toLowerCase();
  if (fullName.toLowerCase() === queryLower) {
    return [0, fullName];
  }
  if (repoName === queryLower) {
    return [1, fullName];
  }
  if (repoName.startsWith(queryLower)) {
    return [2, fullName];
  }
  return [3, fullName];
}

function resolveTarget(target) {
  const trimmed = target.trim();
  if (!trimmed) {
    throw new Error("Usage: explore-repo.mjs <clone-url-or-github-url-or-project-name>");
  }

  return resolveUrl(trimmed) || resolveOwnerRepo(trimmed) || searchGithub(trimmed);
}

function canonicalRemote(url) {
  const trimmed = url.trim();
  const sshGithub = githubFromSsh(trimmed);
  if (sshGithub) {
    return `github.com/${sshGithub[0].toLowerCase()}/${sshGithub[1].toLowerCase()}`;
  }

  const parsed = parseUrl(trimmed);
  if (parsed?.protocol && parsed?.host) {
    const host = parsed.host.toLowerCase().split("@").at(-1);
    if (host === "github.com") {
      const ownerRepo = githubOwnerRepoFromPath(parsed.pathname);
      if (ownerRepo) {
        return `github.com/${ownerRepo[0].toLowerCase()}/${ownerRepo[1].toLowerCase()}`;
      }
    }
    const parts = parsed.pathname
      .split("/")
      .map((part) => safeComponent(part).toLowerCase())
      .filter(Boolean);
    return `${host}/${parts.join("/")}`;
  }

  return trimmed.replace(/\.git\/?$/i, "").replace(/\/+$/g, "").toLowerCase();
}

function exploreRoot() {
  const base = process.env.XDG_DATA_HOME ? path.resolve(process.env.XDG_DATA_HOME) : path.join(os.homedir(), ".local", "share");
  return path.join(base, "skillbox", "explore");
}

function localPathFor(repo) {
  return path.join(exploreRoot(), repo.host, ...repo.pathParts.map((part) => safeComponent(part)));
}

function gitOutput(repoPath, args, { check = false } = {}) {
  const result = run(["git", "-C", repoPath, ...args], { check });
  return (result.stdout || "").trim();
}

function hasUpstream(repoPath) {
  return run(["git", "-C", repoPath, "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"], { check: false }).status === 0;
}

function localAheadCount(repoPath) {
  const result = run(["git", "-C", repoPath, "rev-list", "--count", "@{u}..HEAD"], { check: false });
  if (result.status !== 0) {
    return 0;
  }
  const parsed = Number.parseInt((result.stdout || "0").trim(), 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

function refreshExisting(repoPath, repo) {
  const origin = gitOutput(repoPath, ["remote", "get-url", "origin"], { check: true });
  if (canonicalRemote(origin) !== canonicalRemote(repo.cloneUrl)) {
    throw new Error(`Refusing to reuse ${repoPath}: origin is ${origin}, expected ${repo.cloneUrl}`);
  }

  const dirty = gitOutput(repoPath, ["status", "--porcelain"], { check: true }) !== "";
  run(["git", "-C", repoPath, "fetch", "origin", "--prune"]);

  if (dirty) {
    return ["fetched-only", "local edits or untracked files are present"];
  }
  if (!hasUpstream(repoPath)) {
    return ["fetched-only", "current branch has no upstream or HEAD is detached"];
  }

  const ahead = localAheadCount(repoPath);
  if (ahead > 0) {
    return ["fetched-only", `current branch has ${ahead} local-only commit(s)`];
  }

  run(["git", "-C", repoPath, "pull", "--ff-only"]);
  return ["refreshed", "fast-forward pull completed"];
}

function cloneNew(repoPath, repo) {
  mkdirSync(path.dirname(repoPath), { recursive: true });
  run(["git", "clone", repo.cloneUrl, repoPath]);
  return ["cloned", "new clone created"];
}

function printResult(repo, repoPath, action, reason) {
  const gitDir = path.join(repoPath, ".git");
  const head = existsSync(gitDir) ? gitOutput(repoPath, ["rev-parse", "--short", "HEAD"]) : "";
  const branch = existsSync(gitDir) ? gitOutput(repoPath, ["branch", "--show-current"]) : "";

  console.log(`repo: ${repo.display}`);
  console.log(`clone_url: ${repo.cloneUrl}`);
  console.log(`path: ${path.resolve(repoPath)}`);
  console.log(`action: ${action}`);
  console.log(`reason: ${reason}`);
  if (branch) {
    console.log(`branch: ${branch}`);
  }
  if (head) {
    console.log(`head: ${head}`);
  }
  if (repo.candidates.length > 0) {
    console.log("candidates:");
    for (const candidate of repo.candidates) {
      console.log(`  - ${candidate}`);
    }
  }
}

function main(argv) {
  const target = argv[2];
  if (!target) {
    throw new Error("Usage: explore-repo.mjs <clone-url-or-github-url-or-project-name>");
  }

  const repo = resolveTarget(target);
  const repoPath = localPathFor(repo);
  const gitDir = path.join(repoPath, ".git");

  if (existsSync(repoPath) && !existsSync(gitDir)) {
    throw new Error(`Refusing to use ${repoPath}: path exists but is not a Git repository`);
  }

  const [action, reason] = existsSync(gitDir) ? refreshExisting(repoPath, repo) : cloneNew(repoPath, repo);
  printResult(repo, repoPath, action, reason);
}

try {
  main(process.argv);
} catch (error) {
  if (error instanceof CommandError) {
    console.error(`Command failed: ${error.argsList.join(" ")}`);
    if (error.stdout) {
      console.error(error.stdout);
    }
    if (error.stderr) {
      console.error(error.stderr);
    }
    process.exit(error.status || 1);
  }

  console.error(error.message || String(error));
  process.exit(1);
}
