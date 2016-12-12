/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ads.view.main.Lists', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-lists',

    requires: [
        'Ext.MessageBox'
    ],

    tabBarPosition: 'bottom',

	tabBar: {
		scrollable: 'horizontal'
	},

    items: [
		{
			title: 'Aangeboden',
            iconCls: 'x-fa fa-tag',
            layout: 'fit',
            items: [ {
				xtype: 'list',
				store: 'Aangeboden',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"titel\">{titel}</div>' +
						 '<div class=\"aanbieder\">Aanbieder: {aanbieder}</div>' +
						 '<div class=\"prijs\">Prijs: {prijs}</div>' +
						 '<div class=\"geplaatst\">Geplaatst: {geplaatst}</div>' +
						 '</div>'
			} ]
        }, {
			title: 'Gevraagd',
			iconCls: 'x-fa fa-bullseye',
			layout: 'fit',
			items: [ {
				xtype: 'list',
				store: 'Gevraagd',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"titel\">{titel}</div>' +
						 '<div class=\"aanbieder\">Aanbieder: {aanbieder}</div>' +
						 '<div class=\"prijs\">Prijs: {prijs}</div>' +
						 '<div class=\"geplaatst\">Geplaatst: {geplaatst}</div>' +
						 '</div>'
			} ]
        }, {
			title: 'Ruilen',
            iconCls: 'x-fa fa-balance-scale',
			layout: 'fit',
			items: [ {
				xtype: 'list',
				store: 'Ruilen',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"titel\">{titel}</div>' +
						 '<div class=\"aanbieder\">Aanbieder: {aanbieder}</div>' +
						 '<div class=\"prijs\">Prijs: {prijs}</div>' +
						 '<div class=\"geplaatst\">Geplaatst: {geplaatst}</div>' +
						 '</div>'

			} ]
        }, {
			title: 'Oproepen',
            iconCls: 'x-fa fa-bullhorn',
			layout: 'fit',
			items: [ {
				xtype: 'list',
				store: 'Oproepen',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"titel\">{titel}</div>' +
						 '<div class=\"aanbieder\">Aanbieder: {aanbieder}</div>' +
						 '<div class=\"prijs\">Prijs: {prijs}</div>' +
						 '<div class=\"geplaatst\">Geplaatst: {geplaatst}</div>' +
						 '</div>'
			} ]
        }, {
			title: 'Overig',
            iconCls: 'x-fa fa-question',
			layout: 'fit',
			items: [ {
				xtype: 'list',
				store: 'Overig',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"titel\">{titel}</div>' +
						 '<div class=\"aanbieder\">Aanbieder: {aanbieder}</div>' +
						 '<div class=\"prijs\">Prijs: {prijs}</div>' +
						 '<div class=\"geplaatst\">Geplaatst: {geplaatst}</div>' +
						 '</div>'
			} ]
        }
    ]
});
