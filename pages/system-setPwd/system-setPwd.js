// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		set: {
			passWord1: '',
			passWord2: '',
		},
		info: ''
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
		//		点击确认
		login: function() {
			var passWord1 = this.set.passWord1;
			var passWord2 = this.set.passWord2;
			this.info = '';
			if(!passWord1) {
				this.info = '密码不能为空';
				return;
			}
			if(!passWord2) {
				this.info = '请确认密码';
				return;
			}
			if(!isPassWord(passWord1)) {
				this.info = '密码长度必须大于或等于6位数且小于16位数';
				return;
			}
			if(passWord1 !== passWord2) {
				this.info = '密码不一致！';
				return;
			}
			/*
			origin.ajax({
				type: 'POST',
				url: 'index/setpwd',
				data: {
					set_passWord1: passWord1,
					set_passWord2: passWord2
				},
				success: function(res) {
					console.log(res);
					mui.toast("设置成功");
					setTimeout(function() {
						if(isDebug == false) {
							origin.showPage("pages/system-userSet/system-userSet");
						}
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
			console.log('setPwd关闭');
			origin.close();
		}
	}
})

//长度6-16正则
function isPassWord(str) {
	var reg = /^[0-9A-Za-z]{6,16}$/;
	return reg.test(str);
}