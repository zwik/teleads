Ext.define('Ads.view.main.AdList', {
    extend: 'Ext.dataview.List',
    xtype: 'adlist',

    requires: [
        'Ads.store.Advertenties'
    ],

    store: 'Ads.store.Advertenties',
    itemTpl: '{titel}',
    title: 'Advertenties'
});
