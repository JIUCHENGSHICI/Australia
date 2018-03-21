// @ts-nocheck

pages({
	isDebug: false,
	data: {
		items: []
	},
	methods: {
		closePage: function () { },
		onLoadPage: function () {
			var _this = this;
			$.getJSON('../../app.json', function (conf) {
				_this.items = conf.nav
			});
		},
		open: function (item) {
			setTimeout(function () {
				origin.showPage(item.url);
			}, 100);
		},

	},

})