// @ts-nocheck
pages({
    debug: [
        { title: '模拟未付款状态', event: 'setModel(1)' },
        { title: '模拟已付款状态', event: 'setModel(2)' },
        { title: '模拟备货状态', event: 'logistics.state=1' },
        { title: '模拟出库状态', event: 'logistics.state=2' },
        { title: '模拟运输状态', event: 'logistics.state=3' },
        { title: '模拟签收状态', event: 'logistics.state=4' },
        { title: '打开导航栏', event: 'showNav()' },


    ],
    data: {
        /**编辑按钮 */
        isShowFixedBtn: true,
        /**物流信息 */
        isShowLogistics: false,
        model: 1,
        orderList: [],
        logistics: {
            state: 4,
            info: [
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
            ]
        },
        address: {},
    },
    methods: {
        //     <span>
        //     {{address.address.province.text'}}
        // </span>
        // <span>
        //     {{address.address.city.text}}
        // </span>
        // <span>
        //     {{address.address.area.text}}
        // </span>
        // <span>
        //     - {{address.info}}
        // </span>
        getAddressInfo: function () {

            if (this.address.address != null) {
                var add = this.address.address;

                return add.province.text + ' ' + add.city.text + ' ' + add.area.text + ' ' + this.address.info;
            } else {
                return '未配置收货地址！';
            }

        },

        showNav: function (params) {
            origin.showNav();
        },

        /**
         * 初始化
         */
        onLoadPage: function () {

            var orderInfo = origin.getLocal('orderInfo').orderInfo;
            this.address = orderInfo.order_info.address_info;
            this.buliderOrder(orderInfo.order_info.goods_info);


            if (parseInt(orderInfo.state) >= 3) {
                this.setModel(2);
            } else {
                this.setModel(1);
            }

        },
        /**
         * 构建表单列表
         */
        buliderOrder: function (list) {

            var _this = this;

            _this.orderList = list;

        },
        /**
         * 设置模式
         */
        setModel: function (model) {

            if (typeof (model) == 'object') {
                model = model.model;
            }

            switch (model) {
                case 1:
                    //未付款
                    this.isShowFixedBtn = true;
                    this.isShowLogistics = false;
                    break;
                case 2:
                    //已付款
                    this.isShowFixedBtn = false;
                    this.isShowLogistics = true;
                    break;
                default:
                    break;
            }
            this.model = model;
        },
        onHide: function () {
            origin.close();
        },
        editOrder: function () {

            origin.setLocal('orderEditModel', {
                is: true,
            });

            // origin.fire('pages/order/order:setEditModel');
            origin.showPage('pages/order/order');

        }
    }
});
