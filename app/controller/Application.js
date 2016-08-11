Ext.define('Ads.controller.Application', {
	extend: 'Ext.app.Controller',
	
	stores: ['Aangeboden', 'Gevraagd', 'Ruilen', 'Oproepen', 'Overig'],
	
	config: {
		data: null,
		aangeboden: [],
		gevraagd: [],
		ruilen: [],
		oproepen: [],
		overig: []
	},
	
	init: function() {
		this.makeRequest();
	},

	makeRequest: function() {
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
				geplaats: rows[i].td[5].content
			};

			this.addToArray(advertentie);
		}

		console.info('Rows Processed!');
		//debugger;
		var aangebodenStore = Ext.getStore('Aangeboden'),
			gevraagdStore = Ext.getStore('Gevraagd'),
			ruilenStore = Ext.getStore('Ruilen'),
			oproepenStore = Ext.getStore('Oproepen'),
			overigStore = Ext.getStore('Overig');

		aangebodenStore.setData(this.getAangeboden());
		gevraagdStore.setData(this.getGevraagd());
		ruilenStore.setData(this.getRuilen());
		oproepenStore.setData(this.getOproepen());
		overigStore.setData(this.getOverig());
		//debugger;
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
	}
});
