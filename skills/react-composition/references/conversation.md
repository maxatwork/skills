# Conversation composition example

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
