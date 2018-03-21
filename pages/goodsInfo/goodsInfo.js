//Vue.component('my-slider', {
//	template: '',
//	data: {
//
//	}
//})
// @ts-nocheck
pages({
	data: {},
	methods: {
		onHide: function(params) {
			origin.close();
		},
		onLoadPage: function() {
			var _this = this;
			this.$nextTick(function() {
				//轮播
				//获得slider插件对象
				var gallery = mui('.mui-slider');
				gallery.slider({
					interval: 2000
				});
				mui.init({
					pullRefresh: {
						container: '#pageApp',
						down: {
							style: 'circle',
							callback: function() {
								//_this.referse(null, true);
								_this.upDate(true);
							}
						},
					}
				});
				//mui('#pageApp').pullRefresh().endPulldownToRefresh();
			})
		},
		upDate: function(isServer) {
			isServer = isServer !== undefined ? isServer : true;
		},
		onShow: function() {
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'goods/info',
			//				data: {
			//
			//				},
			//				success: function(res) {
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					console.log(res);
			//				}
			//			})
		},
		//图片
		getImg: function(item, index, img) {
			if(img.indexOf('http') == -1) {
				return serverRoot + img;
			} else {
				return img;
			}
		},
		//点击了收藏
		collect: function() {
			console.log("点击了收藏");
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'collect',
			//				data: {
			//					shop_id: '12'
			//				},
			//				success: function(res) {
			//					mui.toast('收藏成功');
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					mui.toast('网络错误');
			//					console.log(res);
			//				}
			//			})
		},
		//		点击了添加到订单
		saveOrder: function() {
			console.log("点击了：添加到订单")
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'order',
			//				data: {
			//					shop_id: '123'
			//				},
			//				success: function(res) {
			//					mui.toast('添加成功');
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					mui.toast('网络错误');
			//					console.log(res);
			//				}
			//			})
		}
	}
})