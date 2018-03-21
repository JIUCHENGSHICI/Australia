// @ts-nocheck

var verificationDate = {}

// 注册一个全局自定义指令 
Vue.directive('echarts', {
	//插入到页面的时候
	update: function(el, binding, vnode, oldVnode) {
		var stringValue = JSON.stringify(binding.value);
		var arg = binding.arg;
		arg = arg[0].toUpperCase() + arg.substring(1, arg.length);
		var funName = 'init' + arg;
		var key;

		if(el.id) {
			key = el.id;

		} else {
			key = arg
		}
		if(verificationDate[key] != stringValue) {
			window[funName](el, binding.value);
		}
		verificationDate[key] = stringValue;

	}

});

pages({

	debug: [{
			title: "切换今日状态",
			event: 'toDay.isLoss=!toDay.isLoss'
		},
		{
			title: "切换本周状态",
			event: 'week.isLoss=!week.isLoss'
		},
		{
			title: "切换本月状态",
			event: 'month.isLoss=!month.isLoss'
		},
	],
	/**
	 * 数据容器
	 */
	data: {
		//		顶部的数据
		newMessage: {
			count: ''
		},
		toDay: {
			money: '',
			//是否下降
			isLoss: false,
			val: 0,
		},
		week: {
			money: '',
			//是否下降
			isLoss: false,
			val: 0,
		},
		month: {
			money: '',
			//是否下降
			isLoss: false,
			val: 0.00,
		},
		//		返利数据
		rebate: {
			money: 100,
			month: "1",
		},
		//		新品推荐
		newArrival: [],
		newMsgList: [],
		newMsgListText: '',
		choice: '',
		areaCode: [{
				text: '销售数量',
				value: '销售数量'
			},
			{
				text: '销售日期',
				value: '销售日期'
			},
			{
				text: '销售销售',
				value: '销售销售'
			},
		],
		//地区销售
		regional: [{
				money: 5000,
				name: ''
			},
			{
				money: 80000,
				name: ''
			},
			{
				money: 10000,
				name: ''
			},

		],
		monthSale: [{
				month: '7月',
				money: 100
			},
			{
				month: '6月',
				money: 200
			},
			{
				month: '5月',
				money: 300
			},

		],
		//		品牌销售
		brandSale: [{
				value: 100,
				name: '',
				title: '香水',
			},
			{
				value: 200,
				name: '',
				title: '苹果',
			},
			{
				value: 300,
				name: '',
				title: '裤子',
			}
		],
		regionalMax: 0,
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		//初始化新品推荐
		initNewArrival: function() {

			//新品推荐ajax
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/newArrival',
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
			this.newArrival = [];
			for(var i = 0; i < 1; i++) {
				var list = {
					title: 'title',
					img: '',
				}
				this.newArrival.push(list);
			}
		},
		//设置本周状态
		initWeek: function() {
			week = {
				money: 0.00,
				//是否下降
				isLoss: false,
				val: 0.00,
			}
			week.money = formatMoney(week.money);

			this.week = week;

		},
		//本月
		initMonth: function() {

			month = {
				money: 0.00,
				//是否下降
				isLoss: false,
				val: 0.00,
			}
			month.money = formatMoney(month.money);

			this.month = month;
		},

		//今日数据 
		initToDay: function() {

			toDay = {
				money: 0.00,
				//是否下降
				isLoss: false,
				val: 0.00,
			}
			toDay.money = formatMoney(toDay.money);

			this.toDay = toDay;
		},

		//		点击左上角的图标
		openNav: function() {
			origin.showNav();
		},
		onLoadPage: function() {

			var _this = this;
			this.initMonth();
			this.initWeek();
			this.initToDay();
			this.initNewArrival()
			this.upNewMsgList();

			this.$nextTick(function() {
				var deceleration = mui.os.ios ? 0.003 : 0.0009;
				mui('.mui-scroll-wrapper').scroll({
					scrollY: true, //是否竖向滚动
					scrollX: true, //是否横向滚动
					startX: 0, //初始化时滚动至x
					startY: 0, //初始化时滚动至y
					bounce: true,
					indicators: false, //是否显示滚动条
					deceleration: deceleration
				});
				mui.init({
					pullRefresh: {
						container: 'body',
						down: {
							style: 'circle',
							callback: function() {
								//mui('#pageApp').pullRefresh().endPulldownToRefresh();
							}
						},
					}
				});
			});
			this.initRegional();
			this.initNewMsgList();
		},

		upNewMsgList: function() {
			//消息滚动  ----new
			/*
			origin.ajax({
				type: 'GET',
				url: 'index',
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
			
			
			for(var i = 0; i < 10; i++) {
				var list = {
					text: i + '今日大减价今日大减价今日大减价今日大减价今日大减价',
					id: i
				}
				this.newMsgList.push(list);
			}

		},
		initNewMsgList: function() {
			var _this = this;
			var index = 0;
			_this.newMsgListText = _this.newMsgList[index];

			setTimeout(function(params) {
				//消息
				setInterval(function() {
					_this.newMsgListText = _this.newMsgList[index];
					index++;
					if(index >= _this.newMsgList.length) {
						index = 0;
					}
				}, 2500);

			}, 1);

		},

		// 点击了新闻
		goNewmessage: function(newMsg) {
			origin.showPage("pages/msg-list/msg-list");
		},
		//到指定页面
		showPage: function(id) {
			origin.showPage('pages/' + id);
		},

		//		点击新品推荐
		goNewgoods: function(item, index) {
			origin.showPage("pages/msg-list/msg-list");
		},
		//地区销售
		initRegional: function() {

			this.regional = [];

			var list = [{
					money: 100,
					name: '北京',
				},
				{
					money: 200,
					name: '上海',
				},
				{
					money: 300,
					name: '深圳',
				},
			];

			var max = 0;

			for(i = 0; i < list.length; i++) {
				var money = list[i].money
				if(money >= max) {
					max = money;
				}
			}

			this.regionalMax = max;
			this.regional = list;

		}

	},
	//计算属性，当属性改变后会自动调用此函数
	computed: {
		//销售返利
		'rebateMoney': function() {
			var money = this.rebate.money;
			return formatMoney(money);
		},
		//计算
		'': function(params) {

		}

	}
});

function initMonth(el, data) {

	//月度销售开始=====================================================================================
	var myChart = echarts.init(el);
	// 指定图表的配置项和数据
	var yAxisData = [];
	var seriesDate = [];

	for(var i = 0; i < data.length; i++) {
		yAxisData.push(data[i].month);
		seriesDate.push(data[i].money);
	}

	var option = {
		//				backgroundColor: '#0f375f',
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [{
			gridIndex: 0,
			axisTick: {
				show: false
			},
			axisLabel: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			}

		}, ],
		yAxis: [{
			gridIndex: 0,
			interval: 0,
			data: yAxisData,
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				textStyle: {
					fontSize: 15,
					color: "#999999",
				},
			},
			splitLine: {
				show: false
			},
			axisLine: {
				show: false
			},

		}],
		series: [{
			type: 'bar',
			xAxisIndex: 0,
			yAxisIndex: 0,
			barWidth: '10%',
			itemStyle: {
				normal: {
					color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						offset: 0,
						color: '#4684a8'
					}, {
						offset: 0.8,
						color: '#5cb4c4',
					}], false),
					barBorderRadius: 10000,
				}
			},
			label: {
				normal: {
					show: true,
					position: "top,left",
					offset: [0, -30],
					textStyle: {
						color: "#333",
					},
					formatter: function(params) {

						var arr = [
							'{a|￥ ' + formatMoney(params.value) + '}'
						];
						return arr.join('\n');
					},
					rich: {
						a: {
							color: '#666666',
							fontSize: 25,
						}
					}
				}
			},
			data: seriesDate
		}, ]
	};
	myChart.setOption(option);

	//月度销售结束=============================================================================================

}

//品牌销售的图标
function initBrand(el, data) {

	//品牌销售开始=================================================================================================
	var myChart = echarts.init(el);
	var option = {
		legend: {
			orient: 'vertical',
			x: 'right',
			itemWidth: 14,
			itemHeight: 14,
			align: 'left',
			textStyle: {
				color: '#fff'
			}
		},
		series: [{
				//内圈
				type: 'pie',
				hoverAnimation: false,
				legendHoverLink: false,
				//				radius: ['30%', '18%'],
				radius: ['40%', '18%'],
				color: ['#367f8e', '#73d1ca', '#4580a9'],
				shadowColor: 'red',
				shadowBlur: 100,
				shadowOffsetY: 100,
				label: {
					normal: {
						formatter: function(params) {
							var arr = [
								''
							];
							return arr.join('');
						},
						position: 'inner',
					},
				},
				labelLine: {
					normal: {
						show: true,
					},
				},
				tooltip: {
					show: true,
				},
				data: data
			},
			{
				//color: ['#52b2bd', '#77cec3', '#5998bf'],
				//外圈
				hoverAnimation: false,
				legendHoverLink: false,
				type: 'pie',
				radius: ['30%', '70%'],
				color: ['#52b2bd', '#77cec3', '#5998bf'],
				label: {
					normal: {
						formatter: function(params) {
							var arr = [
								params.percent + '%'
							];
							return arr.join('');
						},
						position: 'inner',
					},
				},
				data: data
			},
			{
				//大外圈
				color: ['#52b2bd', '#77cec3', '#5998bf'],
				hoverAnimation: false,
				legendHoverLink: false,
				type: 'pie',
				radius: ['30%', '70%'],
				data: data,
				label: {
					normal: {
						formatter: function(params) {
							var arr = [
								'\n' + params.data.title + '\n\n' + '￥ ' + formatMoney(params.value)
							];
							return arr.join('');
						},

					},
				},
			},

		]
	};
	myChart.setOption(option);
	//品牌销售结束=================================================================================================
}

function initRegion(el, value) {

	var myChart = echarts.init(el);
	//圆环添加一些图标，图片可以自己加，这是固定效果，想要图标跟圆环走，还需要计算一些属性值了
	option = {
		series: [{
			name: value.name,
			radius: [
				'70%',
				'85%'
			],
			type: 'pie',
			startAngle: 90,
			minAngle: 0,
			//			里面的值为0的时候不显示圆圈
			stillShowZeroSum: false,
			hoverAnimation: false,
			data: [{
					value: value.money,
					label: {
						normal: {
							formatter: '{a}\n-\n{d}%',
							position: 'center',
							textStyle: {
								fontSize: '16',
								color: '#999999',
							},
						}
					},
					//					地区销售的蓝色进度条的样式进度条的样式

					itemStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0,
									color: '#5998bf' // 0% 处的颜色
								}, {
									offset: 1,
									color: '#5cb4c4' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							},
							BorderRadius: 10000,
						},
					},
				},
				{
					value: pageApp.regionalMax,
					itemStyle: {
						normal: {
							color: '#f1f5f8',
							labelLine: {
								show: false,
							},
						},

						legendHoverLink: false,
						hoverAnimation: false,
					},

				}
			]
		}]
	};

	myChart.setOption(option);
	//地区销售结束 one================================================================================================
}