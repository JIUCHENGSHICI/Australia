// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		goodList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		onLoadPage: function (params) {
			this.initList();
		},


		initList: function (params) {

			var item = {
				head: '',
				title: '新品上市',
				info: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum perferendis maxime voluptatem? At iure nisi, est excepturi eos reprehenderit perferendis aperiam sunt omnis porro neque vel! Et est velit modi?',
			}

			for (var i = 0; i < 20; i++) {
				this.goodList.push(item);
			}

		},

		//		点击每一个人进去详情页面	
		goInfo: function (item, index) {
			origin.showPage("pages/goodsInfo/goodsInfo");
		}
	}
})