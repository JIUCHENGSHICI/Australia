// @ts-nocheck
// @ts-ignore
pages({
	/**
	 * 数据容器
	 */
	data: {
		startTime: {
			text: "",
			value: 111
		},
		endTime: {
			text: "",
			value: 111
		},
		recordList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		onLoadPage: function() {
			var _this = this;
			this.$nextTick(function() {
				this.dtPicker = new mui.DtPicker({
					type: 'date'
				});
				this.initList();
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
		initList: function() {
			var list = [{
					account: '啊哈哈',
					time: {
						text: "0",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "1",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "2",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "3",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "4",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "4",
						value: 1
					},
					money: '0.00',
				},
				{
					account: '啊哈哈',
					time: {
						text: "4",
						value: 1
					},
					money: '0.00',
				}
			];

			for(var i = 0; i < list.length; i++) {
				list[i].isShow = true;
				list[i].time.text = '2018-1-12';
			}
			this.recordList = list;
		},
		//		点击开始时间

		getTime: function(name) {
			var _this = this;
			this.dtPicker.show(function(items) {
				var time;
				time = {
					text: '',
					value: 123
				}

				time.text = items.y.value + '-' + items.m.value + '-' + items.d.value;

				// 获取当前时间戳(以s为单位)
				var timestamp = Date.parse(new Date(time.text));
				timestamp = timestamp / 1000;
				//当前时间戳为：1403149534
				console.log("当前时间戳为：" + timestamp);
				time.value = timestamp;
				_this[name] = time;

			});
		},
		// 搜索	
		search: function() {
			console.log("开始时间", this.startTime);
			console.log("结束时间:", this.endTime);

			console.log("开始时间", this.startTime.text);
			console.log("结束时间:", this.endTime.text);
			var list = this.recordList;
			for(var i = 0; i < list.length; i++) {
				if(i % 2 == 0) {
					list[i].isShow = true;
				} else {
					list[i].isShow = false;
				}
			}
		},
	},
	watch: {
		startTime: function() {
			this.search();
		}
	}
})