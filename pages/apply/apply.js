// @ts-nocheck
pages({
	debug: [{
		title: '切换长度',
		event: 'length=length==10?255:10'
	}],

	/**
	 * 数据容器
	 */
	data: {
		dataCount: 0,
		isCountMax: false,
		apply: {
			reason: [{
					text: '不想要了',
					value: '0'
				},
				{
					text: '商品有瑕疵',
					value: '1'
				},
				{
					text: '买错了',
					value: '2'
				},
				{
					text: '规格不合适',
					value: '3'
				},
			]
		},
		applyInfo: {
			orderId: "",
			info: "",
			type: "",
			imgList: []
		},
		length: 255
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

		initList: function() {

		},
		onLoadPage: function() {
			var _this = this;

			if(isDebug) {
				// this.length = 10;
			}

			this.$nextTick(function() {

				mui.init();
				mui.previewImage();

				layui.use('upload', function() {
					_this._upload = layui.upload;
					//执行实例
					_this._upload.render({
						elem: '#test1' //绑定元素
							,
						auto: false,
						accept: "images",
						size: 5120,
						url: '/upload/' //上传接口
							,
						done: function(res) {
							//上传完毕回调
						},
						error: function() {
							//请求异常回调
						},
						choose: function(obj) {
							//将每次选择的文件追加到文件队列
							var files = obj.pushFile();
							//预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
							obj.preview(function(index, file, result) {
								//						console.log(index); //得到文件索引
								//						console.log(file); //得到文件对象
								//						console.log(result); //得到文件base64编码，比如图片
								_this.applyInfo.imgList.push({
									src: result
								})
								//这里还可以做一些 append 文件列表 DOM 的操作
								//obj.upload(index, file); //对上传失败的单个文件重新上传，一般在某个事件中使用
								//delete files[index]; //删除列表中对应的文件，一般在某个事件中使用
							});
						}
					});

				});

			})
		},
		onLoadVue: function() {

		},
		setOrderId: function(res) {
			this.applyInfo.orderId = res.orderId;

		},
		//		点击上传图片	
		upload: function() {
			var _this = this;
			console.log("上传图片");
		},
		//		点击提交 
		submitInfo: function() {

			if(!this.applyInfo.type) {
				mui.toast('请选择理赔原因');
				return;
			}
			if(!this.applyInfo.info) {
				mui.toast('请填写详细描述');
				return;
			}

			var type = this.applyInfo.type;
			var info = this.applyInfo.info;
			var imgList = this.applyInfo.imgList;
			origin.ajax({
				type: 'POST',
				url: 'index/login',
				data: {
					apply_type: type,
					apply_info: info,
					apply_imgList: imgList
				},
				isLoginModel: true,
				success: function(res) {
					console.log(res);
				},
				error: function(res) {
					console.log(res);
				}
			})
			console.log("理赔原因：" + this.applyInfo.type);
			console.log("详细描述" + this.applyInfo.info);
			console.log("图片信息", this.applyInfo.imgList);
			//提交上传
		},
		onHide: function(params) {
			origin.close();
		}
	},
	watch: {
		"applyInfo.info": function(info) {
			this.dataCount = info.length;
			this.isCountMax = this.dataCount >= this.length;

			if(this.dataCount > this.length) {
				this.applyInfo.info = info.substring(0, this.length);
			}
		}

	}
})