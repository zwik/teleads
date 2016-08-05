Ext.define('Ads.store.Advertenties', {
    extend: 'Ext.data.Store',

    config: {
        //storeId: 'advertenties',
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
