/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ads.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.MessageBox',

        'Ads.view.main.MainController',
        'Ads.view.main.MainModel'
    ],

    controller: 'main',
    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [
        {
            title: 'Aangeboden',
            iconCls: 'x-fa fa-tag',
            layout: 'fit',
            items: [{
                xtype: 'list',
				store: 'Aangeboden',
				itemTpl: '<div class=\"advertentie\">' +
						 '<div class=\"left\">' +
						 '{titel} <br>' +
						 '{aanbieder} - {prijs} <br>' +
						 '{geplaatst}' +
						 '</div>' +
						 '</div>'
            }]
        },
        {
          title: 'Gevraagd',
          iconCls: 'x-fa fa-bullseye',
          layout: 'fit',
          items: [{
            xtype: 'list',
			store: 'Gevraagd',
			itemTpl: '{titel}'
          }]
        },{
            title: 'Ruilen',
            iconCls: 'x-fa fa-balance-scale',
			layout: 'fit',
			items: [{
				xtype: 'list',
				store: 'Ruilen',
				itemTpl: '{titel}'
			}]
        },{
            title: 'Oproepn',
            iconCls: 'x-fa fa-bullhorn',
			layout: 'fit',
			items: [{
				xtype: 'list',
				store: 'Oproepen',
				itemTpl: '{titel}'
			}]
        },{
            title: 'Overig',
            iconCls: 'x-fa fa-question',
			layout: 'fit',
			items: [{
				xtype: 'list',
				store: 'Overig',
				itemTpl: '{titel}'
			}]
        }
    ]
});
