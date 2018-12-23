odoo.define('m2m_group.Model', function (require) {
    'use strict';

    var AbstractModel = require('web.AbstractModel');

    var M2mGroupModel = AbstractModel.extend({
        get: function () {
            return this.data;
        },
        load: function (params) {
            this.modelName = params.modelName;
            this.domain = params.domain;
            this.m2m_field = params.m2m_field;
            return this._fetchData();
        },
        reload: function (handle, params) {
            if ('domain' in params) {
                this.domain = params.domain;
            }
            return this._fetchData();
        },
        _fetchData: function () {
            var self = this;
            return this._rpc({
                model: this.modelName,
                method: 'get_m2m_group_data',
                kwargs: {
                    domain: this.domain,
                    m2m_field: this.m2m_field
                }
            }).then(function (result) {
                self.data = result;
            });
        },
    });

    return M2mGroupModel;

});
