// @ts-nocheck
pages({
	isDebug: true,
	debug: [{
			title: "切换",
			event: "setModel()"
		},
		{
			title: '添加充值记录',
			event: 'add()'
		}
	],
	/**
	 * 数据容器
	 */
	data: {
		isShow: true,
		money: '',
		choice: '',
		accList: [],
		chargeRec: [],
		info: ''
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		onLoadPage: function() {

			this.initChargeRec();
			this.initAccList();
			var _this = this;
			this.$nextTick(function() {
				mui.init({
					pullRefresh: {
						container: '#panel2',
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
		initList: function() {

		},
		/**
		 * 初始化充值记录列表
		 */
		initChargeRec: function() {

			//			origin.ajax({
			//				type: 'GET',
			//				url: 'charge',
			//				success: function(res) {
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					console.log(res);
			//				}
			//			})

			var item;

			for(var i = 0; i < 5; i++) {

				item = {
					account: '11012012138@qq.com',
					time: '2018-01-12',
					money: '9,999,999,999',
				};
				this.chargeRec.push(item);
			}

		},
		//		初始化 充值账号的select
		initAccList: function() {
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'charge',
			//				success: function(res) {
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					console.log(res);
			//				}
			//			})
			var list = [{
					id: '1',
					accountType: '支付宝',
					accountName: '张三',
					accountInfo: '11111111111',
					accountStatus: 0,
				},
				{
					id: '2',
					accountType: '微信',
					accountName: '张三',
					accountInfo: '222222222222',
					accountStatus: 0,
				},
				{
					id: '3',
					accountType: '银行卡',
					accountName: '张三',
					accountInfo: '3333333333333',
					accountStatus: 0,
				}
			];
			this.accList = list;
		},
		// 点击下一步  输出充值信息
		next: function() {
			if(!this.choice) {
				mui.toast('请选择账号');
				return;
			}
			if(!this.money) {
				mui.toast('请输入金额');
				return;
			}
			var choice = this.choice;
			var money = this.money;
			//			origin.ajax({
			//				type: 'POST',
			//				url: 'charge',
			//				data: {
			//					charge_choice: choice,
			//					charge_money: money
			//				},
			//				success: function(res) {
			//					console.log(res);
			//					mui.alert('充值成功！', ' ', 'ok');
			//				},
			//				error: function(res) {
			//					console.log(res);
			//					mui.toast('网络错误');
			//				}
			//
			//			})
		},
		// 切换页面
		setModel: function() {
			this.isShow = !this.isShow;

			if(this.isShow) {
				origin.setTitle('充值');
			} else {
				origin.setTitle('充值记录');
			}
		},
		add: function(res) {
			if(res == null) {
				res = {
					account: '11012012138@qq.com',
					time: '2018-01-12',
					money: '9,999,999,999',
				}
			}
			this.chargeRec.push(res);
		}
	}
})