// @ts-nocheck
pages({

	debug: [{
			title: '去新增',
			event: 'goAddAddress()'
		},
		{
			title: '新增收货地址',
			event: 'addAddress()'
		}, {
			title: '新增收藏 ',
			event: 'addCollect()'
		}, {
			title: '切换收货地址 ',
			event: 'setDerail(1)'
		},
		{
			title: '切换收藏',
			event: 'setDerail(2)'
		}
	],
	/**
	 * 数据容器
	 */
	data: {
		//		地址列表
		addressList: [],
		//		收藏列表
		collectList: [],
		//		开关
		derail: true
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		//		收藏列表用到的
		showNav: function() {
			origin.showNav();
		},
		onLoadPage: function() {
			//			地址列表
			this.initAddressList();
			//			收藏列表
			this.initCollectList();
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
		//初始化地址列表
		initAddressList: function() {
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/address',
				isLoginModel: true,
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
			var list = [];
			var item;
			for(var i = 0; i <= 10; i++) {
				item = {
					id: i,
					name: "张三",
					phone: '150-6548-0632',
					info: '上海市黄浦区嘉定新城',
					address: {
						province: {
							text: "上海省",
							value: ""
						},
						city: {
							text: "上海市",
							value: ""
						},
						area: {
							text: "黄浦江区",
							value: ""
						}
					}
				};
				item.name = item.name + i;
				list.push(item);

			}
			console.log(list);

			this.addressList = list;

		},
		//		初始化收藏列表
		initCollectList: function() {
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/collect',
				isLoginModel: true,
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
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
			this.collectList = list;

		},
		//		点击编辑 跳转页面
		addressEdit: function(item, index) {
			console.log("编辑:", item);
			console.log("要编辑的id:" + item.id + "要编辑的名字:" + item.name);
			console.log("编辑的index:", index);
			origin.showPage("pages/address-new/address-new");
		},
		//		点击删除 删除当前项
		addressDel: function(item, index) {

			var _this = this;

			mui.confirm('确定删除该地址吗？', '提示', ['取消', '确定'], function(e) {
				if(e.index == 1) {
					var list = _this.addressList;
					list.splice(index, 1);
				}
			})

		},
		//	新增收货地址
		goAddAddress: function() {
			origin.showPage("pages/address-new/address-new");
		},
		addAddress: function(res) {
			if(res == null) {
				var id = "add_" + Math.random()
				res = {
					id: id,
					name: "张三",
					phone: '150-6548-0632',
					info: id,
				}
			}
			this.addressList.push(res);
		},
		//		删除收藏的
		delCollect: function(item, index) {
			var _this = this;
			mui.confirm('是否删除', '提示', ['否', '是'], function(e) {
				if(e.index == 1) {
					var list = _this.collectList;
					list.splice(index, 1);
					mui.toast("删除成功");
				}
			});

		},
		//		去收藏的详情
		goInfo: function(item, index) {
			origin.showPage('pages/goodsInfo/goodsInfo');
		},
		//		添加收藏 W
		addCollect: function(res) {
			if(res == null) {
				res = {
					title: '2b',
					info: '99933333333333333333333333333',
					headImg: '',
				}
			}
			//ajax请求
			this.collectList.push(res);
		},
		//切换     默认显示地址       切换显示收藏
		setDerail: function(res) {

			//1地址
			//2收藏
			if(typeof(res) != 'object') {
				res = {
					type: res
				}
			}
			if(res.type == 1) {
				//1地址
				this.derail = true;
			}
			if(res.type == 2) {
				//2收藏
				this.derail = false;
			}
		}
	}
})