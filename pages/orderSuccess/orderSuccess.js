// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {

	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		//		点击确定返回上一页
		toBack: function() {
			console.log("返回上一页");
		}
	},
	watch: {}
})