// @ts-nocheck
pages({

	/**
	 * 数据容器
	 */
	data: {
		profit: {
			name: '',
			account: '',
		},
		choice: '',
		profitInfo: [],
		model: 1
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		onLoadPage: function() {
			this.initProfitInfo();
			for(let i = 0; i < 20; i++) {
				//				this.add();
			};
		},

		//点击提交
		upLoad: function() {
			//			console.log("账号类型", this.choice);
			//			console.log("姓名", this.profit.name);
			//			console.log("账户", this.profit.account);
			//账号类型
			var choice = this.choice;
			//			姓名
			var name = this.profit.name;
			//			账户
			var account = this.profit.account;

			if(choice.length <= 0) {
				mui.toast('请选择账号类型');
				return;
			};
			if(name.length <= 0) {
				mui.toast('请输入姓名');
				return;
			};
			if(account.length <= 0) {
				mui.toast('请输入账户');
				return;
			};
			origin.ajax({
				type: 'POST',
				url: 'carry/examine',
				data: {
					carry_choice: choice,
					carry_name: name,
					carry_account: account
				},
				success: function(res) {
					mui.toast('提交成功');
					console.log(res);
				},
				error: function(res) {
					mui.toast('网络错误');
					console.log(res);
				}
			})
		},
		initProfitInfo: function() {
			var list = [{
				accountType: '支付宝',
				accountName: '张三',
				accountInfo: '支付宝',
				accountStatus: 0,
			}, {
				accountType: '微信',
				accountName: '李四',
				accountInfo: '微信',
				accountStatus: 1,
			}, {
				accountType: '银行卡',
				accountName: '李四',
				accountInfo: '银行卡',
				accountStatus: 2,
			}];
			this.profitInfo = list;
		},

		add: function(res) {

			if(res == null) {
				res = {
					accountType: '微信',
					accountName: '李四',
					accountInfo: '账户信息1',
				}
			}
			this.profitInfo.push(res);
		},

	}
})