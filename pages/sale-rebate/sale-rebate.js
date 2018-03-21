// @ts-nocheck
//			切换效果

Vue.directive('speed', {
	inserted: function(el, binding) {
		speed(el, binding.value);
	},
	update: function(el, binding) {
		speed(el, binding.value);
	},

});

//示例1
function speed(el, count) {

	count = count.replace(/,/g, '');
	console.log(count);
	var $speed = mui(el);
	$speed.progressbar().setProgress(count);
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
		monthList: []
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		onLoadPage: function() {
			var _this = this;
			this.initMonthList();

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
		//更新函数
		upDate: function(isServer) {
			isServer = isServer !== undefined ? isServer : true;
		},
		initMonthList: function() {
			/*
			origin.ajax({
				type: 'GET',
				url: 'index/rebate',
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/
			var list = [{
				month: '1',
				money: '70',
				pen: '80',
				shopNumber: '90',
			}, {
				month: '2',
				money: '70',
				pen: '80',
				shopNumber: '90',
			}, {
				month: '3',
				money: '70',
				pen: '80',
				shopNumber: '90',
			}, {
				month: '4',
				money: '70',
				pen: '80',
				shopNumber: '90',
			}, ]

			for(var i = 0; i < list.length; i++) {
				var item = list[i];
				item.money = formatMoney(item.money);
			}

			this.monthList = list;

		}

	}
})