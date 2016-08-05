Ext.define('Ads.model.Advertentie', {
    extend: 'Ext.data.Model',

    fields: [
        {
          name: 'sectie',
          type: 'string'
        },
        {
          name: 'titel',
          type: 'string'
        },
        {
          name: 'link',
          type: 'string'
        },
        {
          name: 'prijs',
          type: 'string'
        },
        {
          name: 'aanbieder',
          type: 'string'
        },
        {
          name: 'hits',
          type: 'int'
        },
        {
          name: 'geplaatst',
          type: 'string'
        }
    ]
});
