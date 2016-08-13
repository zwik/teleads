Ext.define('Ads.view.main.Main', {
	extend: 'Ext.navigation.View',
	xtype: 'app-main',

	requires: [
		'Ads.view.main.Lists'
	],

	fullscreen: true,

	items: [ {
		xtype: 'app-lists'
	} ]
});
