Ext.define('Ads.controller.Application', {
	extend: 'Ext.app.Controller',

	stores: ['Aangeboden', 'Gevraagd', 'Ruilen', 'Oproepen', 'Overig'],

	config: {
		data: null,
		details: null,
		lijst: '',
		aangeboden: [],
		gevraagd: [],
		ruilen: [],
		oproepen: [],
		overig: []
	},

	control: {
		'list': {
			itemsingletap: 'onItemSingleTap'
		},
		'navigationview': {
			back: 'onBack'
		},
		'app-lists': {
			activeitemchange: 'tabPress'
		}
	},

	refs: [ {
		ref: 'navView',
		selector: 'navigationview'
	} ],

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
				geplaatst: rows[i].td[5].content
			};

			this.addToArray(advertentie);
		}

		console.info('Rows Processed!');
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

		this.getNavView().getNavigationBar().setTitle('Aangeboden');
		this.getNavView().setMasked(false);
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

	onItemSingleTap: function (self, index, target, record, e, eOpts) {
		this.getNavView().setMasked({
			xtype: 'loadmask',
			message: 'Laden van advertentie'
		});
		this.fetchDetails(record);
	},

	// select * from html where url='http://www.te-les-koop.nl/BekijkAdvertentie.php?key=22668' and xpath='/html/body/table[1]/tbody/tr[2]/td/table/tbody/tr/td | /html/body/table[2]/tbody'
	fetchDetails: function (record) {
		var urlP1 = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fwww.te-les-koop.nl%2FBekijkAdvertentie.php%3Fkey%3D",
			urlP2 = "'%20and%20xpath%3D'%2Fhtml%2Fbody%2Ftable%5B1%5D%2Ftbody%2Ftr%5B2%5D%2Ftd%2Ftable%2Ftbody%2Ftr%2Ftd%20%7C%20%2Fhtml%2Fbody%2Ftable%5B2%5D%2Ftbody'&format=json&diagnostics=true&callback=",
			advertentieId = record.get('link').split('=')[1],
			url = urlP1 + advertentieId + urlP2,
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
		console.info('Detailed YQL sent');

		Ext.Deferred.all([deferred.promise]).then(function(response) {
			this.processDetails(response, record);
		}, null, null, me);
	},

	processDetails: function (data, record) {
		var me = this;
		console.info('Start processing details');
		var ad = me.processAd(data[0].query.results.td.content);

		var advertentieDetails = {
				titel: record.get('titel'),
				advertentie: ad,
				bedrag: data[0].query.results.tbody.tr[0].td[1].content,
				adverteerder: data[0].query.results.tbody.tr[1].td[1].a.content,
				mail: data[0].query.results.tbody.tr[1].td[1].a.href,
				woonplaats: data[0].query.results.tbody.tr[2].td[1],
				telefoonnummer: data[0].query.results.tbody.tr[3].td[1],
				categorie: data[0].query.results.tbody.tr[4].td[1]
			};

		this.setLijst(this.getNavView().getNavigationBar().getTitle());
		this.setDetails(advertentieDetails);
		this.createDetailForm();
	},

	processAd: function(ad) {
		return ad.replace(/\r/g, '<br>');
	},

	createDetailForm: function () {
		var advertentie = this.getDetails(),
			form = Ext.create('Ext.form.Panel', {
				header: false,
				items: [
				{
					xtype: 'htmlfield',
					labelAlign: 'top',
					label: 'Advertentie',
					value: advertentie.advertentie,
					readOnly: true
				}, {
					xtype: 'textfield',
					labelAlign: 'top',
					label: 'Verkoper',
					value: advertentie.adverteerder,
					readOnly: true
				}, {
					xtype: 'textfield',
					labelAlign: 'top',
					label: 'Prijs',
					value: advertentie.bedrag,
					readOnly: true
				}, {
					xtype: 'textfield',
					labelAlign: 'top',
					label: 'Woonplaats',
					value: advertentie.woonplaats,
					readOnly: true
				}, {
					xtype: 'emailfield',
					labelAlign: 'top',
					label: 'Mail',
					value: advertentie.mail.split('mailto:')[1],
					readOnly: true
				}, {
					xtype: 'textfield',
					labelAlign: 'top',
					label: 'Telefoonnummer',
					value: advertentie.telefoonnummer,
					readOnly: true
				}, {
					xtype: 'textfield',
					labelAlign: 'top',
					label: 'Categorie',
					value: advertentie.categorie,
					readOnly: true
				}
				]
			}),
			navView = this.getNavView();

		navView.push(form);
		navView.setMasked(false);

	},

	onBack: function (self, view, eOpts) {
		this.getNavView().getNavigationBar().setTitle(this.getLijst());
	},

	tabPress: function (self, value, oldValue, eOpts) {
		var navView = this.getNavView();
		if (navView) {
			this.getNavView().getNavigationBar().setTitle(value.title);
		}
	}
});
