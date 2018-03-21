// @ts-nocheck
// Vue.component('order-list-comp', function (resolve, reject) {
//     //获得组件的html代码
//     getComponent('order-list-comp/order-list-comp', function (comp) {
//         var navList = conf.nav;

//         //注册组件的回调函数
//         resolve({
//             //设置组件的模板
//             template: comp,
//             //设置组件的属性
//             // props: [],
//             //设置组件的data
//             data: function () {
//                 return {
//                     //栏目列表，需要使用配置文件获得
//                     items: navList,
//                     active: pagesName,
//                 }
//             },
//             methods: {
//                 open: function (item) {
//                     origin.showPage(item.url);
//                 },
//                 isActive: function (item) {
//                     var name = item.url.split('/');
//                     name = name[name.length - 1];
//                     return name == pagesName;
//                 }
//             },
//             watch: {
//                 isCollapse: function (isCollapse) {
//                     localStorage.isCollapse = isCollapse;
//                 }
//             }
//         });

//     })

// });

pages({

	debug: [{
			title: '添加一个待支付订单(本地视图)',
			event: 'addOrder(1)'
		},
		{
			title: '添加一个已出库订单(本地视图)',
			event: 'addOrder(2)'
		},
		{
			title: '添加一个随机订单(本地视图)',
			event: 'addOrder()'
		},
		{
			title: '添加订单(跳转页面)',
			event: 'toAddOrder()'
		},
		{
			title: '设置当前列表编辑状态',
			event: 'editList[activeIndex].isShow=!editList[activeIndex].isShow'
		},
		{
			title: '打开导航栏',
			event: 'showNav()'
		},
	],

	data: {
		navList: [{
				title: '全部'
			},
			{
				title: '待支付'
			},
			{
				title: '待发货'
			},
			{
				title: '待收货'
			},
			{
				title: '已收货'
			},
			{
				title: '退款/售后'
			},
		],
		orderList: [],
		stateList: {
			1: '<span class="state label label-red">待支付<span/>',
			2: '<span class="state label label-blue">待发货<span/>',
			3: '<span class="state label label-gray">待收货<span/>',
			4: '<span class="state label label-blue">已收货<span/>',
			5: '<span class="state label label-blue">退款/售后<span/>',
		},
		bottomModel: 0,
		groupBottom: '0',
		editList: [],
		activeIndex: 1
	},
	methods: {

		onLoadPage: function() {
			var _this = this;

			this.initStateList();
			this.getOrderList();
			// this.initOrderList();
			this.setBottomModel(this.activeIndex);
		},
		initStateList: function() {},
		isEdit: function() {},
		getOrderList: function(params) {
			// getOrderList

			var _this = this;

			origin.ajax({
				type: 'get',
				url: 'order/getOrderList',
				data: {
					where: {
						is_recycle: 0
					}
				},
				success: function(res) {

					if(res.res == 1) {
						_this.buliderList(res.msg);
					}
					if(res.res < 0) {
						mui.toast('订单查询失败');
					}

				}
			});
		},
		buliderList: function(list) {

			var _this = this;

			var editList = [];
			var _list = [];

			for(let i = 0; i < this.navList.length; i++) {
				_list[i] = [];
			}
			_list[0] = list;

			for(var i = 0; i < list.length; i++) {

				var item = list[i];
				item.isActive = false;
				item.order_info = JSON.parse(item.order_info);
				item.count = item.order_info.goods_info.length;
				var money = 0;

				for(var j = 0; j < item.order_info.goods_info.length; j++) {
					var goods_item = item.order_info.goods_info[j];

					money += (goods_item.money * goods_item.num);

				}

				item.money = money;

				if(!_list[item.state]) {
					_list[item.state] = [];
				}
				_list[item.state].push(item);

				editList[item.state] = {
					isEdit: false,
					isShow: item.state == 1
				}

			}

			this.orderList = [];
			this.orderList = _list;
			this.editList = [];
			this.editList = editList;

			this.$nextTick(function() {
				//mui初始化
				//阻尼系数  
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					bounce: true,
					indicators: true, //是否显示滚动条
					deceleration: deceleration
				});

				var slider = mui("#slider").slider();

				document.getElementById('slider').addEventListener('slide', function(e) {
					_this.setBottomModel(e.detail.slideNumber);
					_this.activeIndex = e.detail.slideNumber;
				})
			})
		},
		/**
		 * 更新订单数组
		 */
		initOrderList: function() {
			var _this = this;

			var allItem = [];

			var list = [];
			var editList = [];
			for(var i = 1; i < this.navList.length; i++) {

				var item = [];

				for(var j = 0; j < 3; j++) {

					var c = {
						title: '张三' + (i) + ' - ' + (j + 1),
						state: i,
						isActive: false,
					}

					item[j] = c;
					allItem.push(c);

				}
				list[i] = item;
				editList[i] = {
					isEdit: false,
					isShow: i == 1
				}
			}

			list[0] = allItem;

			this.orderList = [];
			this.orderList = list;
			this.editList = [];
			this.editList = editList;

		},

		//添加订单
		addOrder: function(order) {
			var state;
			var _state = 0;
			while(_state == 0 || (this.orderList[_state] == null)) {
				_state = Math.ceil(Math.random() * 10);
			}

			if(order == null) {
				order = {
					title: '随机添加的测试订单',
					state: _state,
					isActive: false,
				}
			}

			if(typeof(order) == 'number') {
				order = {
					title: '添加的测试订单-' + order,
					state: order,
					isActive: false,
				}
			}

			state = order.state;
			this.orderList[state].push(order);
			mui.toast('添加成功：' + state);

		},

		toAddOrder: function() {
			origin.showPage('pages/order/order');
		},
		getStateLabel: function(item, index) {

			if(item.state == null) {
				console.log(
					item
				);
			}

			var state = item.state;

			if(this.stateList[state] != null) {
				state = this.stateList[state];
			} else {
				console.error('没有相关state!请检查！state值为：' + item.state);
			}

			return state;
		},
		open: function(item, index) {
			//触发事件，需要判断类型，根据类型选择相应的操作

			if(item.state == 1) {
				//编辑模式
				// origin.fire('pages/orderInfo/orderInfo:setModel', {
				//     model: 1
				// });

			} else {
				//非编辑模式
				// origin.fire('pages/orderInfo/orderInfo:setModel', {
				//     model: 2
				// });

			}
			origin.setLocal('orderInfo', {
				orderInfo: item,
			});
			origin.showPage('pages/orderInfo/orderInfo');

		},
		setBottomModel: function(type) {

			switch(type) {
				case 1:
					this.groupBottom = '52px'
				case 1:
					this.groupBottom = '52px'
					break;
				default:
					this.groupBottom = '0'
					break;
			}

			this.bottomModel = type;

		},
		selectAll: function(list, is) {
			for(var i = 0; i < list.length; i++) {
				list[i].isActive = is;
			}
		},
		check: function(item, index) {
			if(item != null) {
				item.isActive = !item.isActive;
			}
		},
		//放到回收站里面去
		deletes: function() {
			var _this = this;

			//获得当前选中的 数组
			var list = this.orderList[this.bottomModel];
			var arr = [];
			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				if(item.isActive) {
					arr.push(item.order_id);
				}
			}

			if(arr.length > 0) {

				origin.ajax({
					url: 'order/setRecycle',
					data: {
						ids: arr
					},
					success: function(res) {

						if(res.res == 1) {
							mui.toast('删除成功！');
							//去掉本地订单中的数据

							for(var i = list.length - 1; i >= 0; i--) {

								for(var j = 0; j < arr.length; j++) {
									console.log('===-==');

									console.log(arr[j], list[i].order_id);
									console.log(arr[j] == list[i].order_id);

									if(arr[j] == list[i].order_id) {
										_this.orderList[_this.bottomModel].splice(i, 1);
										continue;
									}
								}
							}

						}

						if(res.res <= 0) {
							mui.toast('删除失败');
						}
					}

				})

			} else {

				mui.toast('未选择商品');
			}

		},
		/**
		 * 去支付
		 */
		goToPay: function() {

			var list = this.orderList[this.bottomModel];
			var arr = [];

			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				if(item.isActive) {
					arr.push({
						order_id: item.order_id
					});
				}
			}

			if(arr.length > 0) {

				mui.toast(`选择了：${arr.length}件商品`);

				origin.setLocal('orderLists', {
					orderLists: arr
				})
				origin.showPage('pages/order-pay/order-pay');

			} else {

				mui.toast('未选择商品');
			}

		},
		onShow: function() {

			origin.out(false);
			// origin.loadPage('pages/order/order');
			// origin.loadPage('pages/orderInfo/orderInfo');

		},
		onHide: function() {

			mui.toast('orderQuery的关闭事件被调用');

			origin.out(function() {

				mui.toast('orderQuery关闭了');

				origin.close('pages/order/order');
				origin.close('pages/orderInfo/orderInfo');
				origin.close();

			}, 3000);

		}
	}
})