// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		phone: "",
		code: "",
		invitation: "",
		isProtocol: false,
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
		info: '',
		disabled: true,
		timeCount: '',
		gain: '获取验证码',
		retransmission: '',
		isGetCode: false,
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
				this.info = '手机号不能为空';
				return;
			}
			if(!isPhone(phone)) {
				this.info = '手机号格式不正确';
				return;
			}
			/*
			origin.ajax({
				type: 'POST',
				url: 'reg',
				data: {
					user_phone: phone
				},
				success: function(res) {
					mui.toast('发送成功');
					console.log(res);
					_this.gain = '';
					_this.timeCount = 3;
					_this.retransmission = 's后重发';
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
					mui.toast('网络错误');
				}
			})
			
			*/

		},
		//		是否同意用户协议
		showProtocol: function() {

		},
		//		点击下 	一步
		next: function() {

			if(!this.phone) {
				this.info = '手机号不能为空';
				return;
			}
			if(!this.code) {
				this.info = '验证码不能为空';
				return;
			}
			var phone = this.phone;
			var code = this.code;
			var invitation = this.invitation
			/*
			origin.ajax({
				type: 'POST',
				url: 'index/reg',
				data: {
					reg_phone: phone,
					reg_code: code,
					reg_invitation: invitation
				},
				success: function(reg) {
					console.log(reg);
					mui.toast('注册成功');
				},
				error: function(reg) {
					console.log(reg);
					mui.toast('网络错误');
				}
			})
			*/
			// origin.showPage("pages/index/index");
		},
		validate: function() {
			//用户协议:
			var length = 4;
			if(this.isProtocol == true) {
				//勾了用户协议
				this.disabled = false;

				if(this.code == '' || this.code.length < length || this.code.length > length) {
					this.disabled = true;
				} else {
					this.disabled = false;
				}

			} else {
				this.disabled = true;
			}

		},
		onHide: function(params) {
			origin.close();
		}
	},
	watch: {
		code: function() {
			this.validate();
		},
		isProtocol: function() {
			this.validate();
		}
	}
})
//手机号验证
function isPhone(str) {
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	return reg.test(str);
}