# Resolve the map

Read [map format](map-format.md) for shared structure. Load the map and the ticket the user named, or choose an unclaimed frontier ticket within scope.

1. Check its current status and claim it through the tracker convention. Load only relevant dependencies and evidence.
2. Resolve the question using source inspection, research, experiments, or a bounded prototype. Ask for actual human judgment only where the decision requires it. Consult relevant automatic skills; invoke manual-only workflows only when the user requested them.
3. Record the answer and evidence, update the ticket status, and add a linked summary to the map. Do not close a decision that still depends on unavailable evidence or a user answer.
4. Add newly precise questions and their blockers; move excluded work to Out of scope. Preserve the history of superseded decisions.
5. Continue through the requested scope. A request for one ticket finishes there; a request to resolve the map continues until the route is clear or remaining work needs external input.

Report unresolved questions and their concrete blockers. The user may have other sessions working in parallel, so refresh shared status before writes and avoid overwriting their changes.
