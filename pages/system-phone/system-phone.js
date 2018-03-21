// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		phone: {
			password1: '',
			password2: '',
			tel: '',
			code: '',
		},
		question: {
			question1: '123',
			question2: '456',
		},
		obtain: '获取验证码',
		timeCount: '',
		retransmission: ''
	},
	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		//		点击获取验证码
		getCode: function() {

			var _this = this;
			var phone = this.phone.tel;
			if(phone == "") {
				mui.toast('请输入手机号');
				return;
			};
			if(!isPhone(phone)) {
				mui.toast('请输入正确号码');
				return;
			}
			/*
			origin.ajax({
				type: 'POST',
				url: 'system/phone',
				data: {
					user_phone: phone
				},
				success: function(res) {
					console.log(res);
					mui.toast('发送成功');
					_this.obtain = '';
					_this.timeCount = 10;
					_this.retransmission = 's后重发';
					var interval = setInterval(function() {
						_this.timeCount--;
						if(_this.timeCount <= 0) {
							_this.obtain = '获取验证码';
							_this.timeCount = '';
							_this.retransmission = '';
							clearInterval(interval);
						}
					}, 1000);
				},
				error: function(res) {
					console.log(res);
					mui.toast('网络错误');
				}
			})
			*/
		},
		//      输出所有的信息
		postInfo: function() {
			var _this = this;
			var password1 = this.phone.password1;
			var password2 = this.phone.password2;
			var phone = this.phone.tel;
			var code = this.phone.code;

			if(password1 == "" || password2 == "") {
				mui.toast('请输入答案');
				return;
			};
			if(phone == "") {
				mui.toast('请输入手机号');
				return;
			};
			if(code == "") {
				mui.toast('请输入验证码');
				return;
			};
			if(!isPhone(phone)) {
				mui.toast('请输入正确号码');
				return;
			}

			/*
			origin.ajax({
				type: 'POST',
				url: 'system/phone',
				data: {
					phone_password1: password1,
					phone_password2: password2,
					phone_phone: phone,
					phone_code: code
				},
				success: function(res) {
					console.log(res);
					mui.toast('修改成功');
					
					if(code!==1234){
						mui.toast('验证码错误');
					}
					setTimeout(function() {
					// origin.showPage("pages/system-userSet/system-userSet");
					}, 500)
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

//手机号正则表达式
function isPhone(str) {
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	return reg.test(str);
}