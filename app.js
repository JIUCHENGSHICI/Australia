// @ts-nocheck
//app.js
App({
	/**
	 * 启动函数
	 * 全局加载一次
	 */
	onLaunch: function(config) {

		this.app.msg = '消息';

		origin.setLocal('test', {
			id: 1
		});

		var pageId = 'pages/index/index';

		origin.loadPage(pageId, function(page) {
			setTimeout(function() {
				origin.showPage(pageId);
				// var p = plus.webview.getWebviewById('pages/index/index'); //接收事件的窗口
				// console.log(JSON.stringify(p));
			}, 1000);
		});

	},
	app: {}
})