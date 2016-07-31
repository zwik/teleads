/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Ads.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

	config: {
		data: null
	},

	init: function () {
		// select * from html where url='http://www.te-les-koop.nl/advertenties.php' and xpath='/html/body/table/tbody/tr/td[1]/table/tbody/tr/td/table/tbody'
		var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.te-les-koop.nl%2Fadvertenties.php%22%20and%20xpath%3D'%2Fhtml%2Fbody%2Ftable%2Ftbody%2Ftr%2Ftd%5B1%5D%2Ftable%2Ftbody%2Ftr%2Ftd%2Ftable%2Ftbody'&format=json&diagnostics=true&callback=",
			me = this,
			deferred = new Ext.Deferred(),
			xhr = new XMLHttpRequest();

		xhr.open('get', url, true);
		xhr.responseType = 'json';
		xhr.onload = function() {
			var status = xhr.status;
			if (status === 200) {
				deferred.resolve(xhr.response);
			} else {
				deferred.reject(status);
			}
		};
		xhr.send();

		Ext.Deferred.all([deferred.promise]).then(function(response) {
			this.processData(response);
		}, null, null, me);
	},

	processData: function (data) {
		data = data[0];
		this.setData(data.query.results.tbody.tr);
		this.processRows();
	},

	processRows: function() {
		var rows = this.getData();
		for (var i = 0; i <= rows.length; i++) {
			debugger;
		}
	},

    onItemSelected: function (sender, record) {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
