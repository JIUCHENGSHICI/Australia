// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		phone: "121388",
		code: "",
		passWord: "123",
		choice: '86',
		isLoginModelPwd: false,
		areaCode: [{
				text: '+86',
				value: '86'
			},
			{
				text: '+87',
				value: '87'
			},
			{
				text: '+88',
				value: '88'
			}
		],
		isGetCode: false,
		timeCount: '',
		retransmission: '',
		gain: '获取验证码'
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		//点击找回密码  跳转到找回密码页面 
		toGetPwd: function() {
			origin.showPage("pages/getPwd/getPwd");
		},
		// 点击获取验证码  发送手机短信
		obtain: function() {
			var _this = this;
			var phone = this.phone;
			if(phone.length <= 0) {
				mui.toast('请输入手机号');
				return;
			};
			if(!isPhone(phone)) {
				mui.toast('手机号格式错误');
				return;
			};

			mui.toast('发送成功');
			this.gain = '';
			this.timeCount = 3;
			this.retransmission = 's后重发';
			this.isGetCode = true;
			var interval = setInterval(function(params) {
				_this.timeCount--;
				if(_this.timeCount <= 0) {
					_this.timeCount = '';
					_this.retransmission = '';
					_this.isGetCode = false;
					_this.gain = '获取验证码';
					clearInterval(interval);
				}
			}, 1000)
			/*
			origin.ajax({
				type: 'POST',
				url: 'code',
				data: {
					user_phone: phone
				},
				success: function(res) {
					console.log(res);
					mui.toast('发送成功');
					this.gain = '';
					this.timeCount = 3;
					this.isGetCode = true;
					var interval = setInterval(function(params) {
						_this.timeCount--;
						if(_this.timeCount <= 0) {
							_this.timeCount = '';
							_this.isGetCode = false;
							_this.gain = '获取验证码';
						}
					}, 1000)
				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误');
				}
			})
			*/
		},

		//用密码登录
		passWordLogin: function() {
			console.log('密码登录');
			var phone = this.phone;
			var passWord = this.passWord;
			if(phone.length <= 0) {
				mui.toast("请输入手机号！");
				return;
			};
			if(passWord.length <= 0) {
				mui.toast("请输入密码");
				return;
			};
			if(!isPhone(phone)) {
				mui.toast("手机号格式错误！");
				return;
			};

			origin.ajax({
				type: 'POST',
				url: 'index/login',
				data: {
					user_id: phone,
					user_pwd: passWord
				},
				isLoginModel: true,
				success: function(res) {

					if(res.res == -1) {
						mui.toast("账户或密码不正确！");
					}
					if(res.res == 1) {
						mui.toast("登录成功！");
						origin.setLocal("user_id", res.user_id);
						origin.setLocal("token", res.token);
						setTimeout(function() {
							origin.showPage("pages/index/index");
						}, 500)
					}

				},
				error: function(res) {
					mui.toast('网络错误');
					console.log(res);
				}
			})

		},
		isLogin: function() {
			origin.ajax({
				type: 'POST',
				url: 'index/isLogin',
				data: {
					user_id: ''
				},
				success: function(res) {
					console.log(res);
				}
			})
		},
		//点击验证码登录
		codeLogin: function() {
			console.log('验证码登录');
			var phone = this.phone;
			var code = this.code;
			if(phone.length <= 0) {
				mui.toast('请输入手机号');
				return;
			}
			if(code.length <= 0) {
				mui.toast("请输入验证码");
				return;
			}
			if(!isPhone(phone)) {
				mui.toast("手机号格式错误！")
				return;
			}

			origin.ajax({
				type: 'POST',
				url: 'index/login',
				data: {
					user_id: phone,
					user_code: code
				},
				success: function(res) {
					console.log(res);
					//判断验证码
					mui.toast("登陆成功");
					//origin.showPage("pages/index/index");

				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误')
				}
			})
			//验证码登录结束
		},
		//		创建账户
		toReg: function() {
			origin.showPage("pages/reg/reg");
		},
		//		微信授权登陆
		wx: function() {
			console.log("微信授权登陆")
		},
		setLoginModel: function() {
			this.isLoginModelPwd = !this.isLoginModelPwd
		},
		onHide: function(params) {
			origin.close();
		}
	}
})
//手机号验证
function isPhone(str) {
	//	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	//	return reg.test(str);
	return true;
}