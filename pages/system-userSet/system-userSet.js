// @ts-nocheck
pages({

	debug: [{
		title: " 切换微信模式",
		event: "wx.state = !wx.state"
	}],
	/**
	 * 数据容器
	 */
	data: {
		userInfo: {
			userName: '',
			userEmail: '',
			userPhone: '',
		},
		wx: {
			state: true
		}
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		/**
		 * 页面加载完成函数。
		 * 页面加载完成后调用，当前页面只调用一次。
		 */
		onLoad: function() {

		},
		onLoadVue: function() {

		},
		onLoadPage: function() {
			var _this = this;

			//			var sMobile = localStorage.getItem("sMobile");
			//			_this.userInfo.userPhone = sMobile;

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
		onShow: function(){
			var _this = this;
			var userName = _this.userInfo.userName;
			var userEmail = _this.userInfo.userEmail;
			var userPhone = _this.userInfo.userPhone;
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/userset',
				data: {
					
				},
				success: function(res) {
					console.log(res);
					userName = res.userName;
					userEmail = res.userEmail;
					userPhone = res.userPhone;
				},
				error: function(res) {
					console.log(res);
				}
			})
            */
		},
		//		修改名字
		setName: function() {
			var _this = this;
			mui.prompt(' ', ' ', '修改昵称', ["确认", "取消"], function(e) {
				if(e.index == 0) {
					var val = e.value;
					if(!val || val == null || val == '') {
						mui.toast("昵称不能为空");
						return false;
					}
					if(val.length > 10) {
						mui.toast("昵称长度不能大于10");
						return false;
					} else {
						/*
						origin.ajax({
							type: 'POST',
							url: 'inedx/userset',
							data: {
								user_name: val
							},
							success: function(res) {
								_this.userInfo.userName = val;
								mui.toast("修改成功");
								console.log(res);
							},
							error: function(res) {
								mui.toast("网络错误");
								console.log(res);
							}
						})
						*/
					}
				}
			});

		},
		//		修改email
		setEmail: function() {
			var _this = this;

			mui.prompt(' ', ' ', '修改邮箱', ["确认", "取消"], function(e) {
				if(e.index == 0) {
					var email = e.value;
					if(!isEmail(email)) {
						mui.toast("邮箱格式错误！")
						return false;
					}

					/*
					origin.ajax({
						type: 'POST',
						url: 'index/userset',
						data: {
							user_email: email
						},
						success: function(res) {
							console.log(res);
							_this.userInfo.userEmail = email;
							mui.toast("修改成功");
						},
						error: function(res) {
							console.log(res);
							mui.toast("网络错误");
						}
					})
					*/
				}

			})
		},
		//		修改电话
		setPhone: function() {
			origin.showPage("pages/system-phone/system-phone");
		},
		//		支付密码跳转
		goSetPwd: function() {
			console.log("123s");
		},
		//		切换账号跳转
		gologin: function() {
			origin.showPage("pages/login/login");
		},
		//		微信跳转
		goWx: function() {
			console.log("789");
		},
		//		退出登录
		sign: function() {
			console.log("退出登录");
		},
		//		登录密码
		pwd: function() {
			origin.showPage("pages/system-setPwd/system-setPwd");
		},

	}

})
//邮箱验证
function isEmail(str) {
	var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
	return reg.test(str);
}