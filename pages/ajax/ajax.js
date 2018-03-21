// @ts-nocheck

pages({

    data: {
        ajaxList: {}
    },
    methods: {

        setData: function (res) {

            // 测试 eventName ：onHide at utils/origin/origin.js:459
            // 页面 [ pages/index/index ] 的事件不存在 [ onHide() ] at utils/origin/origin.js:644
            // pages/orderQuery/orderQuery at utils/origin/origin.js:751
            // 测试 eventName ：onHide at utils/origin/origin.js:459
            // Uncaught ReferenceError: eventName is not defined at utils/origin/origin.js:726
            // 测试 eventName ：hideNav at utils/origin/origin.js:459



            var key = res.key;
            var pagesId = res.pagesId;

            if (this.ajaxList[key] == null) {
                this.ajaxList[key] = {};
            }

            this.ajaxList[key].data = res.data;
            this.ajaxList[key].pagesId = res.pagesId;

            console.log('本地保存模式：');
            console.log(this.ajaxList[key]);

            push({
                msg: '保存成功！'
            }, pagesId);


        },
        getData: function (res) {

            var key = res.key;
            var pagesId = res.pagesId;
            var data;
            if (this.ajaxList[key] == null) {

                data = {
                    res: false
                };
                push(data, pagesId);

            } else {

                data = {
                    res: true,
                    data: this.ajaxList[key].data
                };
                push(data, pagesId);

            }

        }

    }

})