# Advanced analysis

Use only the section needed for a coverage, ownership, hotspot, or semantic-analysis question. The installed CLI help and schema resolve version-specific flags.

### Find untested runtime-reachable code (coverage gaps)
```bash
fallow health --format json --quiet --coverage-gaps
```

Reports `untested-file` and `untested-export` findings: runtime-reachable code with no dependency path from any discovered test root. Opt-in and requires the full analysis pipeline.


### Find complexity hotspots, owners, and refactoring targets
```bash
# Files that are both complex and frequently changing (needs a git repo)
fallow health --format json --quiet --hotspots
# Add ownership signals (bus factor, declared CODEOWNERS owner, drift)
fallow health --format json --quiet --hotspots --ownership
# Ranked refactoring targets (complexity + coupling + churn + dead code)
fallow health --format json --quiet --targets
# Partition the report per team or package
fallow health --format json --quiet --hotspots --group-by owner
```

`--ownership` implies `--hotspots` and `--effort` implies `--targets`. The global `--group-by` accepts `owner`, `directory`, `package`, or `section` (the `section` mode reads GitLab CODEOWNERS `[Section]` headers). Hotspots and ownership require a git repository.


### Track per-team code health over time in a large monorepo (CODEOWNERS)
```bash
# Per-team letter grade + 0-100 score, complexity density, and ownership resolved
# from .github/CODEOWNERS, plus a snapshot for trend tracking. The CODEOWNERS resolver,
# per-owner aggregation, and the graded health formula are all built in - do not
# reimplement owner matching or a scoring formula in a wrapper script.
fallow health --format json --quiet --group-by owner --score --ownership --save-snapshot .fallow/snapshot.json
# Narrow the run to the packages a set of teams owns:
fallow health --format json --quiet --group-by owner --score --workspace 'packages/*'
```

`--group-by owner` partitions every metric by CODEOWNERS team (last-match-wins, GitHub semantics) with a directory-cached native resolver, so there is no need to parse CODEOWNERS or aggregate per owner yourself. With `--score`, each `groups[]` entry carries a first-class `health_score` (`{ score, grade, penalties: { dead_files, complexity, p90_complexity, maintainability, unused_deps, circular_deps, unit_size, coupling, duplication } }`) alongside its own `vital_signs` and per-file `file_scores[]` (`complexity_density`, `maintainability_index`). Human output renders a `● Per-owner health` table (`score / grade / files / hot`). `--save-snapshot` records a point-in-time entry that `--trend` reads later. This one command replaces a hand-rolled CODEOWNERS-resolution + per-owner-aggregation + scoring script end to end.

Caveat for root-only path aliases: in monorepos where TypeScript path aliases (e.g. `@myorg/*`) are declared only in a root `tsconfig.base.json` that the per-package `tsconfig.json` files do not extend, imports through those aliases do not resolve, so dead-code signals (unused files/exports, and the `dead_files` penalty in the per-owner `health_score`) carry false positives. The complexity, maintainability, coupling, hotspot, and ownership signals are computed per file from the AST and git history and stay accurate regardless. Prefer `health` (not `dead-code`) for per-team quality tracking there.


### Use exact TypeScript evidence for cleanup or refactoring

```bash
fallow type-aware status --format json --quiet
fallow dead-code --unused-class-members --type-aware --format json --quiet
fallow fix --type-aware --dry-run --format json --quiet
fallow dead-code --type-aware --trace src/api.ts:Client --format json --quiet
fallow dead-code --type-aware --symbol-impact src/api.ts:Client --format json --quiet
fallow health --type-aware --type-coupling --format json --quiet
```

The optional companion must match the installed Fallow version. Semantic
results expose completeness, per-candidate decisions, and omissions.
`confirmed-used` and `contract-preserved` remove syntactic false positives.
`confirmed-no-static-references` retains the finding and only enables a guarded
class-member fix when every owning project is complete. Partial, unavailable,
dynamic, decorated, overloaded, and externally uncertain cases keep the
original finding.
