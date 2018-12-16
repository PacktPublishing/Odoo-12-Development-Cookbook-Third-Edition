odoo.define('my_library.snippets', function (require) {
    "use strict";
    var rpc = require('web.rpc');
    var Animation = require('website.content.snippets.animation');
    var options = require('web_editor.snippets.options');

    options.registry.book_count = options.Class.extend({
        selectCount: function (previewMode, value, $opt) {
            var table = this.$target.find('table');
            var oldClass = table.attr('class');
            var newTable = $('<table><tr><th>Name</th><th>Release date</th></tr></table>');
            newTable.attr('class', oldClass);
            newTable.attr('data-rows', value);
            table.replaceWith(newTable);
            this._refreshAnimations();
        }
    });

    Animation.registry.book_snippet = Animation.Class.extend({
        selector: '.book_snippet',
        start: function () {
            var self = this;
            var rows = this.$el.data().rows || 5;
            this.$el.find('td').parents('tr').remove();
            rpc.query({
                model: 'library.book',
                method: 'search_read',
                domain: [],
                fields: ['name', 'date_release'],
                sortBy: ['date_release desc'],
                limit: rows,
            }).then(function (data) {
                _.each(data, function (book) {
                    self.$el.append(
                        $('<tr />').append(
                            $('<td />').text(book.name),
                            $('<td />').text(book.date_release)
                        ));
                });
            });
        },
    });

});
