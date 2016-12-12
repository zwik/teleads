Ext.define('Ads.view.main.HtmlField', {
  extend: 'Ext.field.Field',
  xtype: 'htmlfield',

  config: {
    component: {
      xtype: 'container',
      padding: '5px 15px'
    }
  },

  initialize: function() {
    var me = this;

    me.callParent();

    me.originalValue = me.getValue() || "";
    me.getComponent().setHtml(me.originalValue);
  }
});
