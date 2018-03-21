// @ts-nocheck
//切换效果
var verificationDate = {};
// 注册一个全局自定义指令 
Vue.directive('echarts',

	{
		inserted: function(el, binding) {
			vueddd(el, binding);
		},
		update: function(el, binding) {
			vueddd(el, binding);
		},

	}
);

Vue.directive('speed', {
	inserted: function(el, binding) {

		speed(el, binding.value);

	},
	update: function(el, binding) {

		speed(el, binding.value);

	},

});

function vueddd(el, binding) {
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

$(document).on("tap", ".list ul li", function() {
	$(".list ul li").removeClass("active");
	$(this).addClass("active");
})

pages({
	/**
	 * 数据容器
	 */
	data: {
		regionList: [],
		shopNumberMaxCount: 0,
		moneyMaxCount: 0,
		penMaxCount: 0,
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		onShow: function() {

			var list = this.regionList;
			this.regionList = [];
			this.regionList = list;

		},
		onLoadPage: function() {
			var _this = this;

			this.initRegionList();

			_this.$nextTick(function() {
				//				var list = _this.regionList;
				//				for(var i = 0; i < list.length; i++) {
				//					_this.regionList[i].id = i;
				//					reginoChart(_this, list[i]);
				//					speed(_this, list[i]);
				//				}
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

			});
		},
		upDate: function(isServer) {
			isServer = isServer !== undefined ? isServer : true;
		},
		initRegionList: function() {
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/region',
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
			this.regionList = [];

			var list = [{
				name: '北京',
				pen: 80,
				shopNumber: 90,
				money: 100,
			}, {
				name: '上海',
				pen: 80,
				shopNumber: 90,
				money: 200,
			}, {
				name: '广州',
				pen: 80,
				shopNumber: 90,
				money: 300,
			}];

			this.regionList = list;

			this.shopNumberMaxCount = 0;
			this.moneyMaxCount = 0;
			this.penMaxCount = 0;

			for(var i = 0; i < list.length; i++) {

				if(list[i].pen >= this.penMaxCount) {
					this.penMaxCount = list[i].pen;
				}
				if(list[i].pen >= this.moneyMaxCount) {
					this.moneyMaxCount = list[i].money;
				}
				if(list[i].pen >= this.shopNumberMaxCount) {
					this.shopNumberMaxCount = list[i].shopNumber;
				}

			}

		}
	}
})

function initChart(el, data) {
	var myChart = echarts.init(el);
	var labelTop = {
		normal: {
			label: {
				show: true,
				position: 'center',
				formatter: '{b}',
				textStyle: {
					baseline: 'bottom',
					color: '#000',
				},
				fontSize: '15'
			},
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
		}
	};
	var labelFromatter = {
		hoverAnimation: false,
		legendHoverLink: false,
		avoidLabelOverlap: false,
		selectedMode: false,
		normal: {
			label: {
				formatter: function(params) {
					//return 100 - params.value + '%'
					return '￥'
				},
				textStyle: {
					baseline: 'top'
				},
				color: '#589ab9'
			}
		},
	}

	//	底部外圈
	var labelBottom = {
		hoverAnimation: false,
		legendHoverLink: false,
		avoidLabelOverlap: false,
		selectedMode: false,
		selectedOffset: 0,
		normal: {
			hoverAnimation: false,
			legendHoverLink: false,
			avoidLabelOverlap: false,
			selectedMode: false,
			color: '#f2f2f2',
			//			color: 'red',
			silent: false,
			label: {
				show: true,
				position: 'center',
				hoverAnimation: false,
				legendHoverLink: false,
				avoidLabelOverlap: false,
				selectedMode: false,
			},
			labelLine: {
				show: false,
				hoverAnimation: false,
				legendHoverLink: false,
				avoidLabelOverlap: false,
				selectedMode: false,
			},
			fontSize: '20px',
			hoverAnimation: false,
			legendHoverLink: false,
			avoidLabelOverlap: false,
			selectedMode: false,

		},
		emphasis: {
			color: 'rgba(0,0,0,0)',
		}
	};
	var radius = [40, 55];
	option = {

		legend: {
			x: 'center',
			y: 'center',
		},
		title: {
			x: 'center'
		},
		series: [{
			hoverAnimation: false,
			animation: false,
			legendHoverLink: false,
			selectedMode: false,
			//是否逆时针排序
			clockwise: false,
			type: 'pie',
			center: ['50%', '55%'],
			radius: radius,
			y: '55%', // for funnel
			x: '80%', // for funnel
			itemStyle: labelFromatter,
			data: [{
					value: data.money,
					itemStyle: labelBottom,
				},
				{
					name: formatMoney(data.money),
					value: pageApp.moneyMaxCount,
					itemStyle: labelTop,
					selectedMode: false,
				}
			]
		}]
	};

	myChart.setOption(option);
}

//示例1
function speed(el, count) {

	var $speed = mui(el);
	$speed.progressbar().setProgress(count);

}