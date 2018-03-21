// @ts-nocheck
pages({
    debug: [
        // { title: '模拟普通订单', event: 'setOrderType(1)' },
    ],
    data: {
        money: 0,
        pay: '',
        orderInfo: {
            address_info: {
                people: '',
            },
        },
        order_id: '',
        orderLists: {},
        order_money: 0,
    },
    methods: {

        onLoadPage: function () {
            var _this = this;
            var orderLists = origin.getLocal('orderLists').orderLists;
            //找订单
            origin.ajax({
                url: 'order/getOrder',
                data: {
                    orderLists: orderLists,
                },
                success: function (res) {

                    if (res.res == 1) {
                        _this.orderLists = res.msg;
                        _this.order_money = res.order_money;
                    }
                    if (res.res < 0) {
                        mui.toast('找不到订单');
                    }
                }
            })
        },
        postOrder: function () {
            mui.toast('支付成功（测试）');
            //只提交订单号就行了

            origin.ajax({
                type: 'post',
                url: 'order/pay',
                data: {
                    orderLists: origin.getLocal('orderLists').orderLists,
                },
                success: function (res) {
                    console.log(res);
                    if (res.res == 1) {
                        mui.toast('支付成功！');
                        origin.showPage('pages/orderQuery/orderQuery')
                    }
                    if (res.res < 0) {
                        mui.toast('支付失败');
                    }
                }
            })

        }
    },
    watch: {
    }
})