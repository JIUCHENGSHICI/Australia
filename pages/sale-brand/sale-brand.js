// @ts-nocheck
Vue.directive('echarts', {

	update: function(el, binding) {
		initEachart(el, binding.value);
	},
	componentUpdated: function(el, binding) {
		initEachart(el, binding.value);
	}

});

pages({
	/**
	 * 数据容器
	 */
	data: {
		brandList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		onShow: function(params) {

			var list = this.brandList;
			this.brandList = [];
			this.brandList = list;

		},
		goInfo: function(item, index) {},
		onLoadPage: function() {
			var _this = this;
			this.initBrandList();
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

		},
		upDate: function(isServer) {
			isServer = isServer !== undefined ? isServer : true;
		},
		initBrandList: function() {
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/brand',
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			});
			*/
			this.brandList = [];
			var list = [{
					title: '毛衣',
					money: 0,
					value: 0,
					shopNumber: '0',
				}, {
					title: '桶装水',
					money: 0.00,
					value: 0.00,
					shopNumber: '0',
				},
				{
					title: '香水',
					money: 0.00,
					value: 0.00,
					shopNumber: '0',
				}

			]
			for(var i = 0; i < list.length; i++) {
				list[i].money = formatMoney(list[i].money);
			}
			this.brandList = list;
		}
	},

})

function initEachart(el, data) {

	//品牌销售开始=================================================================================================
	var myChart = echarts.init(el);

	option = {
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
				type: 'pie',
				hoverAnimation: false,
				legendHoverLink: false,
				animation: false,
				radius: ['40%', '30%'],
				//			内圈
				color: ['#367f8e', '#73d1ca', '#4580a9'],
				shadowColor: 'red',
				shadowBlur: 100,
				shadowOffsetY: 100,
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
				type: 'pie',
				hoverAnimation: false,
				animation: false,
				legendHoverLink: false,
				radius: ['40%', '80%'],
				//			外圈
				color: ['#52b2bd', '#77cec3', '#5998bf'],
				label: {
					normal: {
						formatter: function(params) {

							var arr = [
								params.percent + '%'
							];
							return arr.join('\n');
						},
						position: 'inner',
					},

				},
				data: data
			}
		]
	};
	myChart.setOption(option);
	//品牌销售结束=================================================================================================
}