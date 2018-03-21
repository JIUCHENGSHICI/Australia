// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		phone: "",
		code: "",
		passWord1: "",
		passWord2: "",
		choice: '86',
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
			},
		],
		isGetCode: false,
		timeCount: '',
		gain: '获取验证码',
		retransmission: '',
		info: ''
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		// 点击获取验证码
		getCode: function() {
			var phone = this.phone;
			var _this = this;
			if(!phone) {
				mui.toast('请输入手机号！');
				return;
			}
			if(!isPhone(phone)) {
				mui.toast("手机号格式错误")
				return;
			}
			/*
			origin.ajax({
				type: 'POST',
				url: 'code',
				data: {
					user_phone: phone
				},
				success: function(res) {
					console.log(res);
					mui.toast('发送成功！');
					_this.gain = '';
					_this.timeCount = 3;
					_this.retransmission= 's后重发';
					_this.isGetCode = true;
					var interval = setInterval(function() {
						_this.timeCount--;
						if(_this.timeCount <= 0) {
							_this.gain = '获取验证码';
							_this.timeCount = '';
							_this.retransmission = '';
							_this.isGetCode = false;
							clearInterval(interval);
						}
					}, 1000);
				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误')
				}
			})
			
			*/
		},
		//		点击下 确认 
		determine: function() {
			var phone = this.phone;
			var code = this.code;
			var passWord1 = this.passWord1;
			var passWord2 = this.passWord2;
			this.info = '';

			if(!phone) {
				this.info = '手机号不能为空';
				return;
			}
			if(!isPhone(phone)) {
				mui.toast("手机号格式错误");
				return;
			}
			if(!code) {
				this.info = '请输入验证码';
				return;
			}
			if(!passWord1) {
				this.info = '请输入密码';
				return;
			}
			if(passWord1.length < 6) {
				this.info = '请输入6-16位密码';
				return;
			}
			if(passWord1.length > 16) {
				this.info = '请输入6-16位密码';
				return;
			}
			if(!passWord2) {
				this.info = '请确认密码';
				return;
			}
			if(passWord1 !== passWord2) {
				this.info = '两次输入的密码不一致';
				return;
			}

			/*
			origin.ajax({
				type: 'POST',
				url: 'get/pwd',
				data: {
					pwd_phone: phone,
					pwd_code: code,
					pwd_password1: passWord1,
					pwd_password2: passWord2
				},
				success: function(res) {
					console.log(res);
					mui.toast('修改成功');
				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误');
				}
			})
			*/
		},
		onHide: function(params) {
			origin.close();
		}
	}

})

//正则表达式-----手机号验证 
function isPhone(str) {
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	return reg.test(str);
}