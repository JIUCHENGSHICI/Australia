// @ts-nocheck
pages({

	debug: [{
		title: '设置添加模式',
		event: 'setModel(1)'
	},
	{
		title: '设置编辑模式',
		event: 'setModel(2)'
	}
	],
	/**
	 * 数据容器
	 */
	data: {
		newAdd: {
			people: '王大虎',
			phone: '13914896237',
			address: {
				province: {
					text: "",
					value: ""
				},
				city: {
					text: "",
					value: ""
				},
				area: {
					text: "",
					value: ""
				}
			},
			info: '黄浦江',

		},
		model: 1
	},

	methods: {
		onLoadPage: function () {

			var _this = this;
			this.$nextTick(function () {
				//				mui.init({
				//					gestureConfig: {
				//						longtap: true, //长按
				//					}
				//				});
				this.picker = new mui.PopPicker({
					layer: 3
				}); //选择器插件
				this.picker.setData(cityData3);

			})
		},
		//		点击保存模式	
		save: function () {
			console.log("点击了保存");
			console.log("姓名：" + this.newAdd.name);
			console.log("联系电话：" + this.newAdd.phone);
			console.log("地址：" + this.newAdd.address.province.text + this.newAdd.address.city.text + this.newAdd.address.area.text);
			console.log("详细地址：" + this.newAdd.info);

			var name = this.newAdd.name;
			var phone = this.newAdd.phone;
			var address = this.newAdd.address.province.text + this.newAdd.address.city.text + this.newAdd.address.area.text
			var address_info = this.newAdd.info;
			if (name.length <= 0) {
				mui.toast("请输入姓名");
				return;
			}
			if (phone.length <= 0) {
				mui.toast("请输入手机号");
				return;
			}
			if (address.length <= 0) {
				mui.toast("请选择收货地址");
				return;
			}
			if (address_info.length <= 0) {
				mui.toast("请输入详细地址");
				return;
			}
			if (!isPhone(phone)) {
				mui.toast("手机号格式错误")
				return;
			}
			origin.ajax({
				type: 'POST',
				url: 'feedback/add',
				data: {
					user_name: name,
					user_phone: phone,
					user_address: address,
					user_address_info: address_info
				},
				success: function (res) {
					mui.toast('修改成功');
					//返回上一页 
					console.log(res);
				},
				error: function (res) {
					mui.toast('网络错误');
					console.log(res);
				}
			});
		},
		copy: function () {
			console.log('copy');
		},
		//		添加地址
		add: function () {

			console.log("点击了添加");

			var people = this.newAdd.people;
			var phone = this.newAdd.phone;
			var address = this.newAdd.address.province.text + this.newAdd.address.city.text + this.newAdd.address.area.text
			var address_info = this.newAdd.info;

			if (people.length <= 0) {
				mui.toast("请输入姓名");
				return;
			}
			if (phone.length <= 0) {
				mui.toast("请输入手机号");
				return;
			}
			if (address.length <= 0) {
				mui.toast("请选择收货地址");
				return;
			}
			if (address_info.length <= 0) {
				mui.toast("请输入详细地址");
				return;
			}
			if (!isPhone(phone)) {
				mui.toast("手机号格式错误")
				return;
			}

			var add = {};
			$.extend(add, this.newAdd);
			add.address = JSON.stringify(add.address);

			origin.ajax({
				type: 'get',
				url: 'address/add',
				data: {
					table: 'address',
					add: add
				},
				success: function (res) {
					console.log(res);
					mui.toast('添加成功');
				},
				error: function (res) {
					console.log(res);
					mui.toast('网络错误');
				}
			});
		},
		//		点击省市区	
		setAddress: function () {
			var _this = this;
			this.picker.show(function (items) {

				_this.newAdd.address.province = {
					text: items[0].text,
					value: items[0].value,
				}
				_this.newAdd.address.city = {
					text: items[1].text,
					value: items[1].value,
				}
				_this.newAdd.address.area = {
					text: items[2].text,
					value: items[2].value,
				}
			});
		},
		setItem: function (res) {
			if (res == null) {
				var id = "add_" + Math.random();
				res = {
					id: id,
					name: "张三",
					phone: '150-6548-0632',
					address: {
						province: {
							text: "江苏省",
							value: ""
						},
						city: {
							text: "南京市",
							value: ""
						},
						area: {
							text: "充电呢",
							value: ""
						}
					},
					info: id,
				}
			}

			this.newAdd = res;
		},
		setModel: function (type) {

			if (type == 1) {
				origin.setTitle("添加新地址");
				this.newAdd = {
					id: '',
					name: "",
					phone: '',
					address: {
						province: {
							text: "",
							value: ""
						},
						city: {
							text: "",
							value: ""
						},
						area: {
							text: "",
							value: ""
						}
					},
					info: '',
				};
			}
			if (type == 2) {
				origin.setTitle("编辑地址");
				this.setItem();
			}

			this.model = type;
		},
		onHide: function (params) {
			origin.close();
		}
	},
	watch: {
		"newAdd.copy": function () {
			var copy = this.newAdd.copy;

			var province = copy.substring(0, copy.indexOf('省')) + '省';
			//var city = copy.substring(copy.indexOf('省') + 1, copy.length);
			var city = copy.substring(copy.indexOf('省') + 1, copy.lastIndexOf('市')) + '市';

			if (copy.indexOf('省') < 0) {
				var province = copy.substring(copy.indexOf('省') + 1, copy.lastIndexOf('市')) + '市';
			}
			if (copy.indexOf('区') > 0) {
				var difference = copy.substring(copy.indexOf('市') + 1, copy.lastIndexOf('区')) + '区';
			}
			if (copy.indexOf('县') > 0) {
				var difference = copy.substring(copy.indexOf('市') + 1, copy.lastIndexOf('县')) + '县';
			}
			this.newAdd.address.province.text = province;
			this.newAdd.address.city.text = city;
			this.newAdd.address.area.text = difference;
		}
	}
})

//手机号验证
function isPhone(str) {
	var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	return reg.test(str);
}