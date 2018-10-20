# -*- coding: utf-8 -*-
from odoo.exceptions import UserError
from odoo import models, fields, api


class LibraryBook(models.Model):
    _name = 'library.book'
    name = fields.Char('Title', required=True)
    date_release = fields.Date('Release Date')
    author_ids = fields.Many2many('res.partner', string='Authors')
    manager_remarks = fields.Text('Manager Remarks')

    @api.model
    def create(self, values):
        if not self.user_has_groups('my_library.group_librarian'):
            if 'manager_remarks' in values:
                raise UserError(
                    'You are not allowed to modify '
                    'manager_remarks'
                )
        return super(LibraryBook, self).create(values)

    @api.multi
    def write(self, values):
        if not self.user_has_groups('my_library.group_librarian'):
            if 'manager_remarks' in values:
                raise UserError(
                    'You are not allowed to modify '
                    'manager_remarks'
                )
        return super(LibraryBook, self).write(values)

    @api.model
    def fields_get(self, allfields=None, attributes=None):
        fields = super(LibraryBook, self).fields_get(
            allfields=allfields,
            attributes=attributes
        )
        if not self.user_has_groups('my_library.group_librarian'):
            if 'manager_remarks' in fields:
                fields['manager_remarks']['readonly'] = True
        return fields
