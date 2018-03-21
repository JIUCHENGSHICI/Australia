pages({
	/**
	 * 数据容器
	 */
	data: {},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		// 现有账号登录
		goLogin: function () {
			origin.showPage("pages/login/login");
		},
		//		 创建账户
		goCreate: function () {
			origin.showPage("pages/reg/reg");
		},
		//		微信授权登陆
		goWx: function () {
			console.log("点击了微信授权登陆");
		},
		onHide: function (params) {
			origin.close();
		}
	}
})