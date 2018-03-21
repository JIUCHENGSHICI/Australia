// @ts-nocheck
pages({
	/**
	 * 数据容器
	 */
	data: {
		msg: '',
		dataCount: 0,
		phone: 17621879643,
		isCountMax: false
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {
		/**
		 * 页面加载完成函数。
		 * 页面加载完成后调用，当前页面只调用一次。
		 */
		onLoadPage: function() {
			//			设置textarea框的输入限制开始
			var _this = this;
			//			设置textarea框的输入限制结束
		},
		onLoad: function() {

		},
		onLoadVue: function() {

		},
		onShow: function() {

			/*
			var _this = this;
			origin.ajax({
				type: 'POST',
				url: 'system/contact',
				success: function(res) {
					console.log(res);
					console.log(res.msg);
					_this.phone = res.msg;
				},
				error: function(res) {
					console.log(res);
				}
			})
			*/

		},
		post: function() {
			var _this = this;
			if(_this.msg.length <= 0) {
				mui.toast('请输入内容');
				return;
			} else {
				origin.ajax({
					type: "GET",
					url: "feedback/add",
					data: {
						idType: 'auto',
						table: 'feedback',
						add: {
							type: 'BUG',
							info: this.msg,
							user_id: '121389',
						}
					},
					success: function(res) {
						console.log(res);
						_this.msg = '';
						mui.toast("感谢您的反馈");
					},
					error: function(res, error) {
						mui.toast("网络错误");
					}
				})
			}

		},
		showPhone: function() {
			mui('#delete').popover("show");
		},
		onHide: function(params) {
			origin.close();
		}
	},
	watch: {
		msg: function(msg) {
			this.dataCount = msg.length;
			this.isCountMax = this.dataCount >= 255;

			if(this.dataCount > 255) {
				this.msg = msg.substring(0, 255);
			}
		}
	}
})