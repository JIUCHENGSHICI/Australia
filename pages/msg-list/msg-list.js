// @ts-nocheck
pages({

	debug: [{
		title: "刷新新闻详情",
		event: "referse(0)"
	}, {
		title: "刷新新品推荐",
		event: "referse(1)"
	}],
	/**
	 * 数据容器
	 */
	data: {
		list: [],
		listArr: [],
		indexActive: 0
	},
	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		referse: function(type, isServer) {
			if(type == null) {
				type = this.indexActive;
			}
			if(type == 1) {
				this.initNewGoodsList(true, isServer);
			}
			if(type == 0) {
				this.initMsgList(true, isServer);
			}
		},
		setModel: function(res) {
			if(typeof(res) != 'object') {
				res = {
					index: res,
				};
			}
			this.list = [];
			this.list = this.listArr[res.index];
			this.indexActive = res.index;
		},
		onLoadPage: function() {
			var _this = this;
			this.initNewGoodsList();
			this.initMsgList();
			this.$nextTick(function() {
				//				mui.init({
				//					gestureConfig: {
				//						longtap: true, //长按
				//					}
				//				});
				mui.init({
					pullRefresh: {
						container: '#pageApp',
						down: {
							style: 'circle',
							auto: true, //可选,默认false.首次加载自动上拉刷新一次
							callback: function() {
								_this.referse(null, true);
								_this.upDate(true);
							}
						},
					}
				});

			})
		},
		upDate: function(isServer) {
			isServer = isServer !== undefined ? isServer : true;
		},
		//新闻详情列表
		initMsgList: function(isShow, isServer) {
			var _this = this;
			origin.ajax({
				key: '新闻详情列表',
				type: 'GET',
				url: 'paper/getlist',
				server: isServer != null ? isServer : false,

				data: {
					where: {
						paper_type: "新闻详情"
					}
				},
				success: function(res) {
					_this.listArr[0] = res.msg;
					if(isShow) {
						_this.setModel(0);
						mui('#pageApp').pullRefresh().endPulldownToRefresh();
					}
				},
				error: function(res) {}
			});

		},
		getImg: function(item, index, img) {
			if(img.indexOf('http') == -1) {
				return serverRoot + img;
			} else {
				return img;
			}
		},
		//		新品推荐列表
		initNewGoodsList: function(isShow, isServer) {
			var _this = this;
			origin.ajax({
				key: '新品推荐列表',
				type: 'GET',
				url: 'paper/getlist',
				server: isServer != null ? isServer : false,
				data: {
					where: {
						paper_type: "新品推荐"
					}
				},
				success: function(res) {
					_this.listArr[1] = res.msg;
					if(isShow) {
						_this.setModel(1);
						mui('#pageApp').pullRefresh().endPulldownToRefresh();
					}
				},
				error: function(res) {}
			});
		},
		//		点击每一个人进去详情页面	
		goInfo: function(item, index) {
			origin.setLocal("webViewUrl", item.url);
			origin.showPage("pages/web-view/web-view");
		},
	}
})