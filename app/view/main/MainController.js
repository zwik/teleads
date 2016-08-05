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
		data: null,
		aangeboden: [],
		gevraagd: [],
		ruilen: [],
		oproepen: [],
		overig: []
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
		console.info('YQL sent');

		Ext.Deferred.all([deferred.promise]).then(function(response) {
			this.processData(response);
		}, null, null, me);
	},

	processData: function (data) {
		console.info('Start processing data');

		data = data[0];
		this.setData(data.query.results.tbody.tr);
		this.processRows();
	},

	processRows: function() {
		console.info('Start processing rows');

		var rows = this.getData();

		for (var i = 0; i < rows.length; i++) {
			if (rows[i].bgcolor === undefined) {
				continue; // This is the first row of the table, nothing interesting here.
			}

			var advertentie = {
				sectie: rows[i].td[0].content,
				titel: rows[i].td[1].a.content,
				link: rows[i].td[1].a.href,
				prijs: rows[i].td[2].content,
				aanbieder: rows[i].td[3],
				hits: rows[i].td[4].content,
				geplaatst: rows[i].td[5].content
			}

			this.addToArray(advertentie);
		}

		console.info('Rows processed!');
	},

	addToArray: function (ad) {
		var aangeboden = this.getAangeboden(),
			gevraagd = this.getGevraagd(),
			ruilen = this.getRuilen(),
			oproepen = this.getOproepen(),
			overig = this.getOverig();

		switch(ad.sectie) {
			case 'aangeboden':
				aangeboden.push(ad);
				break;
			case 'gevraagd':
				gevraagd.push(ad);
				break;
			case 'ruilen':
				ruilen.push(ad);
				break;
			case 'oproepen':
				oproepen.push(ad);
				break;
			case 'overig':
				overig.push(ad);
				break;
			default:
		}

		console.info('Ad added');
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
