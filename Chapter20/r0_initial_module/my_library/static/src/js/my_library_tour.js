odoo.define('my_library.tour', function (require) {
    "use strict";


    var core = require('web.core');
    var tour = require('web_tour.tour');

    var _t = core._t;

    tour.register('library_tour', {
        url: "/web",
    }, [tour.STEPS.SHOW_APPS_MENU_ITEM, {
            trigger: '.o_app[data-menu-xmlid="my_library.library_base_menu"]',
            content: _t('Manage books and authors in<b>Library app</b>.'),
            position: 'right'
        }, {
            trigger: '.o_list_button_add',
            content: _t("Let's create new book."),
            position: 'bottom'
        }, {
            trigger: 'input[name="name"]',
            extra_trigger: '.o_form_editable',
            content: _t('Set the book title'),
            position: 'right',
            run: function (actions) {
                actions.text('Test Book');
            },
        }, {
            trigger: '.o_int_colorpicker',
            extra_trigger: '.o_form_editable',
            content: _t('Set the book title'),
            position: 'right',
            run: function () {
                this.$anchor.find('.o_color_3').click();
            }
        }, {
            trigger: '.o_form_button_save',
            content: _t('Save this book record'),
            position: 'bottom',
        }
]);

});