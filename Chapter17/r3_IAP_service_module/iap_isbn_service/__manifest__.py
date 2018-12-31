# -*- coding: utf-8 -*-
{
    'name': "IAP ISBN service",
    'summary': "Get books information by ISBN number",
    'website': "http://www.example.com",
    'category': 'Uncategorized',
    'version': '12.0.1',
    'depends': ['iap', 'web', 'base_setup'],
    'data': [
        'security/ir.model.access.csv',
        'views/book_info_views.xml',
        'data/books_data.xml',
    ]
}
