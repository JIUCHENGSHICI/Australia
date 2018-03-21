// @ts-nocheck

pages({
	/**
	 * 数据容器
	 */
	data: {
		set: {
			msgAmount: '99+',
			userMoney: '999,999.99',
			passWordMoney: '999,999.99',
		},
		isShowUserList: false
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		onLoadPage: function(params) {
			var _this = this;
			this.$nextTick(function() {
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
		showNav: function() {
			origin.showNav();
		},
		//去设置页面
		goSet: function() {
			origin.showPage("pages/system-userSet/system-userSet");
		},
		//	去收藏页面
		goCollect: function() {
			origin.showPage("pages/slider/slider");
		},
		//	去我的消息页面
		goMessage: function() {
			origin.showPage("pages/msg-list/msg-list");
		},
		//	去我的地址页面
		goAddress: function() {
			origin.showPage("pages/slider/slider");
		},
		//	去联系我们页面
		goContact: function() {
			origin.showPage("pages/system-contact/system-contact");
		},
		//	去充值页面
		goCharge: function() {
			origin.showPage("pages/charge/charge");
		},
		//	去联我的账户 ----提现页面
		goAccount: function() {
			origin.showPage("pages/carry-profit/carry-profit");
		},
		//	去小额面交易
		goTransaction: function() {
			console.log("去小额面交易");
		},
		onShow: function() {
			var _this = this;
			var msgAmount = _this.set.msgAmount;
			var userMoney = _this.set.userMoney;
			var passWordMoney = _this.set.passWordMoney;
			// origin.loadPage("pages/message/message");
			// origin.loadPage("pages/system-collect/system-collect");
			// origin.loadPage("pages/address-user/address-user");
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'index/set',
			//				data: {
			//
			//				},
			//				success: function(res) {
			//					console.log(res);
			//					msgAmount = res.msgAmount;
			//					userMoney = res.userMoney;
			//					passWordMoney = res.passWordMoney;
			//				},
			//				error: function(res) {
			//					console.log(res);
			//				}
			//			})

		},
		onHide: function() {
			origin.close('pages/order/order');
		}
	}
})