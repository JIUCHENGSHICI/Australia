// @ts-nocheck
pages({
	debug: [{
			title: '百度',
			event: 'src="https://www.baidu.com/"'
		},
		{
			title: 'vue',
			event: 'src="https://cn.vuejs.org/"'
		},
		{
			title: '刷新页面',
			event: 'refresh()'
		}
	],
	data: {
		src: ''
	},
	methods: {
		onLoadPage: function() {
			var url = origin.getLocal("webViewUrl");
			this.setSrc(url);

		},
		refresh: function(res) {
			if(res == null) {
				if(origin.getLocal("webViewRes") != null) {
					res = origin.getLocal("webViewRes");
					console.log(res);
				}	
			}
			if(typeof(res) == 'string') {
				res = {
					src: res
				};
			}
			origin.setLocal("webViewRes", res);
			res.src += '?user_id=' + origin.getLocal("user_id") + '&token=' + origin.getLocal("token");

			this.src = res.src;
		},
		setSrc: function(_res) {
			var _this = this;
			origin.ajax({
				url: 'index/isLogin',
				success: function(res) {
					if(res.res == -991 || res.res == -992) {
						origin.showPage('pages/login/login');
						return;
					}
					_this.refresh(_res);
				},
				error: function(res) {
					mui.toast('网络错误');
				}
			})

		},
		onHide: function(params) {
			origin.close();
		}
	}
})