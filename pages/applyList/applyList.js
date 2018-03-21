// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		applyList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		onLoadPage: function() {
			this.initList();
			var _this = this;
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
		//初始化列表
		initList: function() {
			//			origin.ajax({
			//				type: 'GET',
			//				url: 'apply/list',
			//				success: function(res) {
			//					console.log(res);
			//				},
			//				error: function(res) {
			//					console.log(res);
			//				}
			//			})

			var item;
			for(var i = 0; i < 10; i++) {
				item = {
					id: i,
					name: '张三' + i,
					title: '桶装水',
					info: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio commodi pariatur eius excepturi rem! Laudantium minima sequi aliquid, consectetur similique, magnam exercitationem repudiandae dicta laboriosam nemo, illo adipisci repellat harum.',
				}
				this.applyList.push(item);
			}
		},
		//点击理赔按钮，跳转申请理赔页面
		toApply: function(item, index) {
			console.log(item, index);
			console.log("当前的id：", item.id);
			console.log("当前的名字：", item.name);
			console.log("当前的标题：", item.title);
			console.log("当前的详情：", item.info);
			//origin.showPage("pages/apply/apply");
		}
	}

})