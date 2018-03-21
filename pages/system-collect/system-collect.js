// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		collectList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		showNav: function() {
			origin.showNav();
		},
		onLoadPage: function() {
			this.initList();
		},
		//初始化列表
		initList: function() {
			var list = [];
			var item;
			for(var i = 0; i <= 10; i++) {
				item = {
					id: i,
					title: 'Lorem ipsum',
					headImg: '',
					info: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. ',
				};
				item.title = item.title + i;
				list.push(item);

			}
			console.log(list);

//			this.collectList = list;

		},
		del: function(item, index) {
			var _this = this;
			mui.confirm('是否删除', '提示', ['否', '是'], function(e) {
				if(e.index == 1) {
					var list = _this.collectList;
					list.splice(index, 1);
					mui.toast("删除成功");
				}
			});

		},
		//		点击每个	
		goInfo: function(item, index) {

			origin.showPage('pages/goodsInfo/goodsInfo');

		},

		add: function(res) {
			if(res == null) {
				res = {
					title: '2b',
					info: '99933333333333333333333333333',
					headImg: '',
				}
			}
			//			ajax请求
			this.collectList.push(res);
		}
	}
})