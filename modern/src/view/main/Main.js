Ext.define('Ads.view.main.Main', {
	extend: 'Ext.navigation.View',
	xtype: 'app-main',

	requires: [
		'Ads.view.main.Lists'
	],

	fullscreen: true,

	masked: {
		xtype: 'loadmask',
		message: 'Laden van advertenties'
	},

	items: [ {
		xtype: 'app-lists'
	} ]
});
