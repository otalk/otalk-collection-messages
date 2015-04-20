# otalk-collection-messages

An Ampersand collection for storing messages, with additional indexing based on both bare and full JIDs.

## Installing

```sh
$ npm install otalk-collection-messages
```

## Reference

Standard [ampersand-collection API](http://ampersandjs.com/docs#ampersand-collection), plus:

#### `.findMessage(jid, id)`

Find a message with the desired ID that was sent to or by the given JID.

#### `.clearIndex(jid)`

Clear out the index for the given JID. This is typically done in MUC contexts when a MUC occupant leaves and rejoins the room, because it might not be the same person behind the new JID.

## License

MIT
