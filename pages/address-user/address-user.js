// @ts-nocheck
pages({

	debug: [{
		title: '去新增',
		event: 'goAdd()'
	},
	{
		title: '新增收货地址',
		event: 'add()'
	}
	],
	/**
	 * 数据容器
	 */
	data: {
		addressList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		onLoadPage: function () {
			this.initList();
		},

		initList: function () {
			var list = [];
			var item;
			var _this = this;

			for (var i = 0; i <= 10; i++) {
				item = {
					id: i,
					people: "张三",
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
				item.people = item.people + i;
			}

			origin.ajax({
				key: 'addressList',
				url: 'address/getList',
				success: function (res) {
					if (res.res == 1) {
						for (var i = 0; i < res.msg.length; i++) {
							res.msg[i].address = JSON.parse(res.msg[i].address);
						}
						_this.addressList = res.msg;
					}
				}
			});

			// people
			// phone
			// info
			// address

		},

		//		点击编辑 跳转页面
		edit: function (item, index) {
			console.log("编辑:", item);
			console.log("要编辑的id:" + item.id + "要编辑的名字:" + item.people);
			console.log("编辑的index:", index);
			origin.showPage("pages/address-new/address-new");
		},
		//		点击删除 删除当前项
		del: function (item, index) {

			var _this = this;

			mui.confirm('确定删除该地址吗？', '提示', ['取消', '确定'], function (e) {
				if (e.index == 1) {

					origin.ajax({
						url: 'address/del',
						data: {
							table: 'address',
							id: item.address_id
						},
						success: function (res) {
							if (res.res == 1) {

								mui.toast('删除成功~');

								var list = _this.addressList;
								list.splice(index, 1);

							}
							if (res.res < 0) {
								mui.toast('删除失败！');
							}
						}
					})

				}
			});

		},
		//		新增收货地址
		goAdd: function () {
			origin.showPage("pages/address-new/address-new");
		},
		add: function (res) {
			if (res == null) {
				var id = "add_" + Math.random()
				res = {
					id: id,
					people: "张三",
					phone: '150-6548-0632',
					info: id,
				}
			}
			this.addressList.push(res);
		}
	}
})