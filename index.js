var Collection = require('ampersand-collection');
var Message = require('otalk-model-message');


module.exports = Collection.extend({
    model: Message,

    comparator: 'comparator',

    initialize: function () {
        var self = this;

        self.MSG_INDEX = {};

        self.bind('add', function (msg) {
            self._indexMessage(msg.from.bare, msg.mid, msg);
            self._indexMessage(msg.from.full, msg.mid, msg);
        });

        self.bind('remove', function (msg) {
            self._removeMessage(msg.from.bare, msg.mid);
            self._removeMessage(msg.from.full, msg.mid);
        });

        self.bind('change:mid', function (msg) {
            self._indexMessage(msg.from.bare, msg.mid, msg);
            self._indexMessage(msg.from.full, msg.mid, msg);
        });
    },

    findMessage: function (jid, id) {
        if (typeof jid !== 'string') {
            jid = jid.toString();
        }

        var cache = this.MSG_INDEX[jid];
        if (cache) {
            return cache[id];
        }
    },

    clearIndex: function (jid) {
        if (typeof jid !== 'string') {
            jid = jid.toString();
        }

        // In MUC contexts, we generally want to forget tracked messages
        // for a peer who went offline and came back online because the new
        // peer could be a different person.
        delete this.MSG_INDEX[jid];
    },

    _indexMessage: function (jid, id, msg) {
        var cache = this.MSG_INDEX[jid] || (this.MSG_INDEX[jid] = {});
        cache[id] = msg;
    },

    _removeMessage: function (jid, id) {
        var cache = this.MSG_INDEX[jid];
        if (cache) {
            delete cache[id];
        }
    }
});
