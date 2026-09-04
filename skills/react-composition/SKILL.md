---
name: react-composition
description: Design, write, refactor, and review React components and hooks with clear seams between visual composition, application bindings, and data operations. Use for component decomposition, state ownership, or separating UI from queries, mutations, and subscriptions.
---

# React composition

Build visual components that work with fixture data and local UI state. Connect
them to application behavior through functional components and focused hooks.
Prefer coherent responsibilities and narrow interfaces over minimizing file
count. A component with one caller can earn its place by encapsulating a visual
treatment or behavior.

## Responsibilities

| Role | Owns | Exposes |
| --- | --- | --- |
| Visual component | Markup, styling, accessibility, visual variants, intrinsic interaction such as keyboard handling, focus, resizing, and scrolling. | Display values, children or meaningful slots, semantic events. |
| Functional component | Application context, composition, data-to-display adaptation, and binding operations to visual events. | The feature identity and inputs needed for that composition. |
| Application hook | A coherent stateful capability, including its queries, mutations, subscriptions, application rules, and operation lifecycle. | Relevant state and meaningful operations. |
| Plain function | Calculations, projections, eligibility rules, and transformations without a React lifecycle. | Explicit inputs and outputs. |

Here, functional component means an application binding component. Visual
components are React functions too. Pure visual means independent of application
state and data access, not stateless. Local UI state and UI-specific hooks belong
with the visual behavior they implement.

Application hooks and functional components may compose other application hooks.
Visual components may depend on UI providers and UI hooks, but should render
without authentication, a query client, or application services.

## Design the caller first

Read the current callers and trace data, events, and state ownership. Then sketch
the visual composition using fixture values before implementing application
bindings. The sketch is an interface check; a new demo file is optional.

For a conversation, the visual vocabulary should allow this:

```tsx
<Conversation>
  <MessagesList>
    <Message alignment="end" author="You">
      Can you explain this?
    </Message>
    <Message alignment="start" author="Alex">
      Here is an example.
    </Message>
    <Message appearance="plain" author="Assistant">
      Let's walk through it.
    </Message>
  </MessagesList>
  <Composer
    value={draft}
    onValueChange={setDraft}
    onSubmit={handleSubmit}
  />
</Conversation>
```

The fixture host supplies local state and event handlers. These visual components
know nothing about sessions, principal identity, message persistence, or agent
execution. The application decides alignment and author labels before rendering.

The application can use the same vocabulary through functional children:

```tsx
<Conversation>
  <ConversationTranscript conversationId={conversationId} />
  <ConversationComposer conversationId={conversationId} />
</Conversation>
```

For example, inside the functional composer:

```tsx
const composer = useConversationComposer(conversationId)

return (
  <Composer
    value={composer.draft}
    onValueChange={composer.changeDraft}
    onSubmit={composer.send}
    pending={composer.pending}
    disabled={!composer.canSend}
    error={composer.error}
  />
)
```

The hook encapsulates how sending works. The visual composer translates DOM
events into value changes and submission intent. Functional components should
read as composition and binding, without detailed styling or data-access code.

## Put knowledge behind the interface

- Visual props describe rendering and interaction. Resolve permissions, current
  user identity, domain relationships, and navigation destinations in the
  application layer. Preserve actual link semantics when binding navigation.
- Pass the values a view needs. A whole entity, query result, mutation object, or
  hook return object usually gives the view unrelated knowledge. Reuse existing
  types where they fit the interface; create a projection when it removes coupling.
- Hooks expose operations such as `sendMessage(content)` or `rename(name)`.
  Keep query keys, cache invalidation, request construction, idempotency, and
  transport errors behind that interface. A hook that merely returns `useQuery`
  unchanged has not completed this separation.
- Application operations accept values and intent. Visual components handle
  `preventDefault`, keyboard events, and element refs. Keep JSX and DOM details
  out of application hooks; UI hooks may encapsulate DOM behavior.
- Extract a hook when its stateful capability still makes sense with a different
  visual structure. Keep structure-dependent interaction with its UI. Use a plain
  function for logic that needs no React hooks.
- Bind application outcomes to UI reactions in the functional layer. If a
  successful send should scroll the transcript, expose a clear send outcome and
  connect it to the UI's scrolling capability. Keep scrolling out of persistence.
- Give operations explicit success and failure behavior. A handled failure must
  not look like success to callers deciding whether to clear a draft or close a
  dialog. Preserve user input on failure.

## Give state and resources an owner

Keep state at the narrowest owner that needs it. Composer drafts belong with the
composer; transcript observation belongs with the functional message list.
Moving every state variable into one screen hook leaves the same ownership and
update scope in place.

Use one authority for shared data. Separate consumers may observe the same cache
without copying its data into their own state. If an ancestor still observes the
whole resource, splitting children alone does not isolate its updates. Narrow
subscriptions when needed, using the data library's existing facilities.

Each hook invocation has its own lifecycle. Give shared connections and
subscriptions an explicit owner so separate consumers do not accidentally create
duplicate resources. Use existing cache, props, or a scoped provider according to
the actual sharing need. Keep resource cleanup and identity changes with that owner.

Use events for actions and state for enduring conditions. A changing counter prop
interpreted as a command by a child effect is a reason to reconsider ownership.
For inherently imperative UI behavior, such as focus, a narrow handle can be an
appropriate interface.

## Keep the split useful

Extract by responsibility, not a line-count limit. Related small helpers can stay
colocated; independently meaningful visual components and hooks deserve clear
files. Keep feature-specific parts near their feature and promote shared parts
when actual callers justify it. A trivial component needs no mandatory
visual/functional/hook triplet.

Use ordinary React composition with children and meaningful slots. Separate
workflows when their state, fields, or operations diverge; share the visual pieces
they actually have in common. Avoid replacing conditional screens with a generic
configuration framework or a large hook returning dozens of setters.

## Review the seams

Before finishing, check the changed feature:

- A convincing fixture composition needs only visual components, fixture values,
  and local UI state or providers.
- Functional components bind application hooks to views without knowing specific
  queries, mutations, or cache mechanics.
- Hook operations make sense independently of the current markup and expose only
  the state and outcomes callers need.
- Each state value and external resource has a clear owner and lifetime.
- Changing presentation leaves data operations intact; changing data access leaves
  the visual interface intact.
- Extraction removes knowledge from callers instead of forwarding the same broad
  objects through more files.

Verify meaningful behavior at its seam. Check visual keyboard, focus, and scroll
behavior through UI interactions; check application state transitions and side
effects through hooks or operations. Preserve existing permission, retry, cleanup,
and authoritative-data behavior during refactors. Match verification to the change;
fixture renderability is a design criterion, not a demand for a new test suite.
