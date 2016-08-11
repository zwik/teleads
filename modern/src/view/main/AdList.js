Ext.define('Ads.view.main.AdList', {
    extend: 'Ext.dataview.List',
    xtype: 'adlist',

    requires: [
        'Ads.store.Advertenties'
    ],

    store: 'Advertenties',
    itemTpl: '{titel}',
    title: 'Advertenties'
});
