// @ts-nocheck
pages({

	debug: [{
		title: "添加",
		event: "add()"
	}],
	/**
	 * 数据容器
	 */
	data: {
		balance: '0.00',
		profit: {
			money: '',
			name: '',
			account: ''
		},
		choice: '',
		profitInfo: [],
		stateLabel: [
			"<span class='label label-red'>待审核</span>",
			"<span class='label label-blue'>已审核</span>",
			"<span class='label label-gray'>未通过</span>",
		],
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
				this.add();
			}
		},
		//点击提现记录  跳转页面
		goRecord: function() {
			origin.showPage("pages/carry-record/carry-record");
		},
		//		点击提交
		upLoad: function() {
			var money = this.profit.money;
			var name = this.profit.name;
			var choice = this.choice;

			if(money.length <= 0) {
				mui.toast('请输入金额');
				return;
			}
			if(name.length <= 0) {
				mui.toast('请输入姓名');
				return;
			}
			if(choice.length <= 0) {
				mui.toast('请选择银行账号');
				return;
			}
			if(!isMoney(money)) {
				mui.toast('请输入正确金额格式')
				return;
			}
			/*
			origin.ajax({
				type: 'POST',
				url: 'carry/profit',
				data: {
					carry_money: money,
					carry_name: name,
					carry_choice: choice
				},
				success: function(res) {
					console.log(res);
					mui.toast('提交成功');
				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误');
				}
			})
			*/
		},

		//		初始化账户信息列表
		initProfitInfo: function() {

			/*
			origin.ajax({
				type: 'GET',
				url: 'carry/profit',
				data: {
				},
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
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
				accountType: '微信',
				accountName: '李四',
				accountInfo: '银行卡',
				accountStatus: 2,
			}];
			for(var i = 0; i < list.length; i++) {

				list[i].accountStatus = this.stateLabel[list[i].accountStatus];
			}
			this.profitInfo = list;

		},
		setModel: function(type) {
			this.model = type;
		},

		//		点击创建新账户
		createNew: function() {
			origin.showPage("pages/carry-examine/carry-examine");

		},
		add: function(res) {
			if(res == null) {
				res = {
					accountType: '微信',
					accountName: '李四',
					accountInfo: '账户信息',
					accountStatus: this.stateLabel[1],
				}
			}
			this.profitInfo.push(res);
		}

	}
})

//钱正则表达式
function isMoney(str) {
	var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
	return reg.test(str);
}