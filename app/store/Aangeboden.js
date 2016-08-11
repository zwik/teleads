Ext.define('Ads.store.Aangeboden', {
    extend: 'Ext.data.Store',

    config: {
        autoLoad: true,
        model: 'Ads.model.Advertentie',
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'advertenties'
              }
        }
    }
});
