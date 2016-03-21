/**
 * Created by ID on 15/12/15.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 *
 *
 *
 *   TRADE_ADMIN: '企业管理员',
 TRADE_PURCHASE: '采购负责人',
 TRADE_SALE: '销售负责人',
 TRADE_MANUFACTURE: '生产负责人',
 TRADE_FINANCE: '财务负责人',
 TRAFFIC_ADMIN: '物流负责人',
 TRAFFIC_DRIVER: '司机',
 *
 */
angular.module('rsc.service.common', [])
    /**
     * 注册页面企业类型控制
     */
    .factory('ListConfig', function () {
        var companyType = [
            {
                text: '交易型企业',
                value: 'TRADE',
                checked: true,
                disabled: false
            },
            {
                text: '物流型企业',
                value: 'TRAFFIC',
                checked: false,
                disabled: false
            }
        ];

        return {
            getCompanyType: function () {
                return companyType;
            }, getCarType: function () {
                return [
                    {chn: '高栏车', eng: 'GAO_LAN'},
                    {chn: '低栏车', eng: 'DI_LAN'},
                    {chn: '平板车', eng: 'PING_BAN'},
                    {chn: '高低板车', eng: 'GAO_DI_BAN'},
                    {chn: '半挂车', eng: 'BAN_GUA'},
                    {chn: '自卸车', eng: 'ZI_XIE'},
                    {chn: '中栏车', eng: 'ZHONG_LAN'},
                    {chn: '全挂车', eng: 'QUAN_GUA'},
                    {chn: '加长挂车', eng: 'JIA_CHANG_GUA'},
                    {chn: '箱式', eng: 'XIANG_SHI'}
                ]
            }, getCarWeighList: function () {
                return [
                    {chn: '6至10吨', eng: '6_10'},
                    {chn: '11至15吨', eng: '11_15'},
                    {chn: '16至20吨', eng: '16_20'},
                    {chn: '21至25吨', eng: '21_25'},
                    {chn: '26至30吨', eng: '26_30'},
                    {chn: '31至35吨', eng: '31_35'},
                    {chn: '36至40吨', eng: '36_40'},
                    {chn: '40吨以上', eng: '40_'}

                ]
            }, getCarLongList: function () {
                return [
                    {chn: '2至5米', eng: '2_5'},
                    {chn: '6至8米', eng: '6_8'},
                    {chn: '9至10米', eng: '9_10'},
                    {chn: '11至12米', eng: '11_12'},
                    {chn: '13至15米', eng: '13_15'},
                    {chn: '16至17.5米', eng: '16_17.5'},
                    {chn: '17.5米以上', eng: '17.5_'}

                ]
            }, getAmountList: function () {
                return [
                    {
                        chn: '不限',
                        eng: {
                            max: null,
                            min: null
                        }
                    },
                    {
                        chn: '0-200吨',
                        eng: {
                            max: 200,
                            min: 0
                        }
                    },
                    {
                        chn: '200-500吨',
                        eng: {
                            max: 500,
                            min: 200
                        }
                    },
                    {
                        chn: '500-1000吨',
                        eng: {
                            max: 1000,
                            min: 500
                        }
                    },
                    {
                        chn: '1000-2000吨',
                        eng: {
                            max: 2000,
                            min: 1000
                        }
                    }
                    ,
                    {
                        chn: '2000吨以上',
                        eng: {
                            max: null,
                            min: 2000,
                        }
                    }


                ]
            }
        }
    })
    /**
     * 浏览器本地存储操作
     */
    .factory('Storage', function (ENV) {
        function Storage(storge) {
            this.set = function (key, data) {
                return storge.setItem(key, window.JSON.stringify(data)); //local

                //return window.sessionStorage.setItem(key, window.JSON.stringify(data)) ; //session
            };
            this.get = function (key) {
                return window.JSON.parse(storge.getItem(key));
                //return window.JSON.parse(window.sessionStorage.getItem(key)) ; //session
            };
            this.remove = function (key) {
                storge.removeItem(key);
                //return window.sessionStorage.removeItem(key) ; //session
            };
        }

        return new Storage(ENV.storage);
    })
    /**
     * Ionic 弹窗
     */
    .factory('iAlert', function ($ionicPopup) {
        /**
         * 弹出提示框
         * @param text
         * @param cb
         */
        var showAlert = function (text, cb) {
            var alertPopup = $ionicPopup.show({
                title: '提示',
                template: text,
                buttons: [
                    {text: '确定'}
                ]
            });

            alertPopup.then(function (res) {
                if (cb) {
                    cb();
                }
            });
        };
        var confirm = function (title, msg, cb) {
            var alertPopup = $ionicPopup.confirm({
                title: title,
                template: msg,
                cancelText: '取消',
                cancelType: '', //
                okText: '确定', //
                okType: '', //
            })
            alertPopup.then(function (res) {
                if (res) {
                    cb(res);
                }
            })
        }


        var _popup = function (title, text, cb) {
            var myPopup = $ionicPopup.show({
                template: text
                , title: title
                , buttons: [
                    {text: '取消'}
                    , {
                        text: '<b>确定</b>'
                        , type: 'button-positive'
                        , onTap: function (e) {
                            cb(e);
                        }
                    }
                ]
            })

        }
        var selectFile = function (title) {
            $ionicPopup.show({
                templateUrl: 'template/common/picture.html'
                , title: title
                , buttons: [
                    {text: '取消'}
                    , {
                        text: '<b>确定</b>'
                        , type: 'button-positive'
                        , onTap: function (e) {
                            cb(e);
                        }
                    }
                ]
            })
        }

        return {
            alert: showAlert,
            confirm: confirm,
            popup: _popup,
            selectFile: selectFile,
        }
    })
    /**
     * http 请求钩子.
     */
    .factory('AuthInterceptor', ['$q', '$location', 'Storage',
        function ($q, $location, Storage) {
            var interceptor = {};

            interceptor.request = function (config) {
                var token = Storage.get('userInfo');
                if (token) {
                    //console.log('set Header', token.token);
                    config.headers["x-access-token"] = token.token;
                }
                return config;
            };

            interceptor.responseError = function (response) {
                if (response.status == 403) {
                    //console.log(403)
                    Storage.remove('userInfo');
                    $location.path("/login");
                }
                return $q.reject(response);
            };

            return interceptor;
        }])
    /**
     * 角色管理
     */
    .factory('rolesConfig', function () {
        var role = [
            {'href': 'welcome', 'title': '首页', 'icon': 'glyphicon glyphicon-home', 'active': "iswelcome"},
            {'href': 'rush', 'title': '交易', 'icon': 'fa fa-area-chart', 'active': "istrade"},
            {'href': 'rushTransp', 'title': '物流', 'icon': 'fa fa-truck', 'active': "ispass"},
            // {'href': 'pro', 'title': '生产', 'icon': 'fa fa-flag'},
            {'href': 'eBankIncome', 'title': '订单', 'icon': 'glyphicon glyphicon-yen pc-fixed', 'active': "isorder"},
            {'href': 'store_order_list', 'title': '订单', 'icon': 'glyphicon glyphicon-yen pc-fixed', 'active': "isorder"},
            {'href': 'driver-order-list', 'title': '订单', 'icon': 'glyphicon glyphicon-yen pc-fixed', 'active': "isorder"},
            {'href': 'eBankIncome', 'title': '金融订单', 'icon': 'glyphicon glyphicon-yen pc-fixed', 'active': "isorder"},
            {'href': 'myRsc', 'title': '我', 'icon': 'glyphicon glyphicon-user', 'active': "isme"}
        ]
        var roleLists = {
            "TRADE_ADMIN": {
                name: "企业管理员",
                menuObj: [role[0], role[1], role[2], role[3], role[7]]
            }
            , "TRADE_PURCHASE": {
                name: "采购负责人",
                menuObj: [role[0], role[1], role[2], role[3], role[7]]
            }
            , "TRADE_SALE": {
                name: "销售负责人",
                menuObj: [role[0], role[1], role[2], role[3], role[7]]
            }
            , "TRADE_MANUFACTURE": {
                name: "生产负责人",
                menuObj: [role[4], role[7]]
            }
            , "TRADE_FINANCE": {
                name: "财务负责人",
                menuObj: [role[6], role[7]]
            }
            , "TRAFFIC_ADMIN": {
                name: "物流负责人",
                menuObj: [role[0], role[2], role[3], role[7]]
            }
            , "TRAFFIC_DRIVER_PUBLISH": {
                name: "公有司机",
                menuObj: [role[5], role[7]]
            }, "TRAFFIC_DRIVER_PRIVATE": {
                name: "私人司机",
                menuObj: [role[5], role[7]]
            }, "TRAFFIC_DRIVER": {
                name: "司机",
                menuObj: [role[5], role[7]]
            }
            // 仓库管理员
            , "TRADE_STORAGE": {
                name: "仓库",
                menuObj: [role[4], role[7]]
            }
        }
        // 个人中心 -->企业设置
        var conArr = [{href: 'tab.myCompanySet', src: "./img/pass/my-icon.png", title: '企业设置'}    //0
            , {href: 'tab.contact1', src: "./img/me/icon_2.jpg", title: '人员管理'}                //1
            , {href: 'tab.passManageTrade', src: "./img/me/icon_6.jpg", title: '物流管理'}             //2
            , {href: 'tab.myStores', src: "./img/me/icon_6.jpg", title: '仓库管理'}               //3
            , {href: 'tab.my_demand_list', src: "./img/me/icon_4.jpg", title: '采购管理'}         //4
            , {href: 'tab.Roadline', src: "./img/pass/my-icon3.png", title: '线路管理'}                //5
            , {href: 'tab.MyCarListGroupByType', src: "./img/pass/my-icon4.png", title: '车辆管理'}    //6
            , {href: 'tab.DriverManage', src: "./img/me/icon_2.jpg", title: '司机管理'}            //7
            , {href: 'tab.StoreOrdersList', src: "./img/me/icon_6.jpg", title: '库管订单'}        //8
            , {href: 'tab.myOrderList', src: "./img/me/icon_6.jpg", title: '历史订单'}            //9
            , {href: 'tab.passManageTraffic', src: "./img/me/icon_6.jpg", title: '物流管理'}               //10
            , {href: 'tab.PrivateDriverCarList', src: "./img/pass/my-icon4.png", title: '我的车辆'}               //11
        ]
        var companySetList = {
            "TRADE_ADMIN": {
                name: "企业管理员",
                menuObj: [conArr[0], conArr[1], conArr[2], conArr[3], conArr[4], conArr[9]
                    //,conArr[5],conArr[6],conArr[7],conArr[8]
                ]
            }
            , "TRADE_PURCHASE": {
                name: "采购负责人",
                menuObj: [conArr[4], conArr[9]]
            }
            , "TRADE_SALE": {
                name: "销售负责人",
                menuObj: [conArr[2], conArr[4], conArr[9]]
            }
            , "TRADE_MANUFACTURE": {
                name: "生产负责人",
                menuObj: []
            }
            , "TRADE_FINANCE": {
                name: "财务负责人",
                menuObj: []
            }
            , "TRAFFIC_ADMIN": {
                name: "物流负责人",
                menuObj: [conArr[0], conArr[1], conArr[10], conArr[6], conArr[7]]
            }
            , "TRAFFIC_DRIVER_PUBLISH": {
                name: "公有司机",
                menuObj: []  //conArr[6]
            }, "TRAFFIC_DRIVER_PRIVATE": {
                name: "私人司机",
                menuObj: [conArr[11]]
            }, "TRAFFIC_DRIVER": {
                name: "司机",
                menuObj: [conArr[6]]
            }
            // 仓库管理员
            , "TRADE_STORAGE": {
                name: "仓库",
                menuObj: [conArr[3], conArr[8]]
            }
        }
        // 首页按钮组
        var shortcuts = [
            {href: 'rushPublish', src: './img/common/icon_7.png', title: '发布抢单'}     //0
            , {href: 'rush', src: './img/common/icon_8.png', title: '立即抢单'}    //1
            , {href: 'newMessage', src: './img/common/icon_9.png', title: '邀请同事'}     //2
            , {href: 'eBankIncome.left.tsupply', src: './img/common/icon_11.png', title: '订单详情'}           //3
            , {href: 'myCompanySet', src: './img/common/icon_15.png', title: '企业设置'}           //4
            , {href: 'myRsc', src: './img/common/icon_12.png', title: '个人中心'}           //5
            , {href: 'passManageTraffic', src: './img/common/icon_7.png', title: '物流抢单'}           //6
            , {href: 'StoreOrdersList', src: './img/common/icon_13.png', title: '库管订单'}           //7
            , {href: 'eBankIncome.center', src: './img/common/icon_7.png', title: '金融管理'}           //8
            , {href: 'rushTransp', src: './img/common/icon_1.png', title: '抢货源'}             //11 9
            , {href: 'newMessage', src: './img/common/icon_14.png', title: '添加司机'}           //12 10
            , {href: 'AddCar', src: './img/common/icon_5.png', title: '添加车辆'}           //13 11 MyCarListGroupByType
            , {href: 'driverOrderList', src: './img/common/icon_11.png', title: '订单详情'} //司机订单  12
            , {href: 'inforSysterm', src: './img/common/icon_16.png', title: '消息'} //消息  13
            , {href: 'publishPass', src: './img/common/icon_10.png', title: '找物流'} //消息  14
        ]
        var shortcutRole = {
            "TRADE_ADMIN": {
                name: "企业管理员",
                menuObj: [shortcuts[0], shortcuts[2], shortcuts[1], shortcuts[3], shortcuts[4], shortcuts[5], shortcuts[13], shortcuts[14]]
            }
            , "TRADE_PURCHASE": {
                name: "采购负责人",
                menuObj: [shortcuts[0], shortcuts[5], shortcuts[3], shortcuts[8], shortcuts[13]]
            }
            , "TRADE_SALE": {
                name: "销售负责人",
                menuObj: [shortcuts[1], shortcuts[5], shortcuts[3], shortcuts[6], shortcuts[13]]
            }
            , "TRADE_MANUFACTURE": {
                name: "生产负责人",
                menuObj: []
            }
            , "TRADE_FINANCE": {
                name: "财务负责人",
                menuObj: [shortcuts[8], shortcuts[5], shortcuts[13]]
            }
            , "TRAFFIC_ADMIN": {
                name: "物流负责人",
                menuObj: [shortcuts[9], shortcuts[2], shortcuts[10], shortcuts[11], shortcuts[4], shortcuts[5], shortcuts[13]]
            }
            , "TRAFFIC_DRIVER_PUBLISH": {
                name: "公有司机",
                menuObj: [shortcuts[5], shortcuts[12], shortcuts[11], shortcuts[13]]
            }, "TRAFFIC_DRIVER_PRIVATE": {
                name: "私人司机",
                menuObj: [shortcuts[5], shortcuts[11], shortcuts[12], shortcuts[13]]
            }, "TRAFFIC_DRIVER": {
                name: "司机",
                menuObj: [shortcuts[5], shortcuts[11], shortcuts[12], shortcuts[13]]
            }
            // 仓库管理员
            , "TRADE_STORAGE": {
                name: "仓库",
                menuObj: [shortcuts[7], shortcuts[5], shortcuts[13]]
            }
        }
        return {
            getRoles: function (role) {
                return roleLists[role]

            }
            , getCompSet: function (role) {
                return companySetList[role]

            }
            , getShortcut: function (role) {
                return shortcutRole[role]

            }
        }
    })
    /**
     * 物流需求单搜索条件控制
     */
    .value('PassSearchCondition', {
        areas: [
            {
                text: '全国',
                value: null,
                default: true
            }, {
                text: '北京',
                value: '北京',
                default: false

            },
            {
                text: '山西',
                value: '山西市',
                default: false
            },
            {
                text: '河北',
                value: '河北市',
                default: false
            },
        ],
        amount: [
            {
                text: '不限',
                max: null,
                min: null,
                default: true
            },
            {
                text: '0-200吨',
                max: 200,
                min: 0,
                default: false
            }, {
                text: '200-500吨',
                max: 500,
                min: 200,
                default: false
            }, {
                text: '500-1000吨',
                max: 1000,
                min: 500,
                default: false
            }, {
                text: '1000-2000吨',
                max: 2000,
                min: 1000,
                default: false
            }, {
                text: '2000吨以上',
                max: null,
                min: 2000,
                default: false
            }
        ],
        payType: [
            {
                text: '全部',
                value: null,
                default: true
            },
            {
                text: '现金结算',
                value: 'cash',
                default: false

            }, {
                text: '银行兑票',
                value: 'bill_bank',
                default: false
            }, {
                text: '商业兑票',
                value: 'bill_com',
                default: false
            }
        ]
    })
    /**
     * 数据加载等待提示
     */
    .constant('$ionicLoadingConfig', {
        template: '数据玩命加载中...'
    })
    /**
     * 邀请注册的列表
     */
    .value('InvitationInfo', {
        TRADE: [
            {
                btnText: '立即邀请',
                value: 'TRADE_ADMIN',
                tips: '企业管理员',
                type: 'TRADE'
            }, {
                btnText: '立即邀请',
                value: 'TRADE_PURCHASE',
                tips: '采购负责人',
                type: 'TRADE'
            }, {
                btnText: '立即邀请',
                value: 'TRADE_SALE',
                tips: '销售负责人',
                type: 'TRADE'
            }
            //, {
            //    btnText: '立即邀请',
            //    value: 'TRADE_MANUFACTURE',
            //    tips: '生产负责人',
            //    type: 'TRADE'
            //}
            , {
                btnText: '立即邀请',
                value: 'TRADE_FINANCE',
                tips: '财务负责人',
                type: 'TRADE'
            }, {
                btnText: '立即邀请',
                value: 'TRADE_STORAGE',
                tips: '仓库管理员',
                type: 'TRADE'
            }],
        TRAFFIC: [
            {
                btnText: '立即邀请',
                value: 'TRAFFIC_ADMIN',
                tips: '物流负责人',
                type: 'TRAFFIC'

            }, {
                btnText: '立即邀请',
                value: 'TRAFFIC_DRIVER_PUBLISH',
                tips: '公有司机',
                type: 'TRAFFIC'
            }, {
                btnText: '立即邀请',
                value: 'TRAFFIC_DRIVER_PRIVATE',
                tips: '私人司机',
                type: 'TRAFFIC'
            }]
    })
    .value('EnumType', {
        file_type: {
            //车辆
            xing_shi_zheng: 'xing_shi_zheng',  //行驶证照片
            yun_ying_zheng: 'yun_ying_zheng',  //运营证照片
            che_tou_zhao: 'che_tou_zhao',    //车头照
            //个人
            id_card_number: 'id_card_number',
            jia_shi_zheng: 'jia_shi_zheng',
            tou_xiang: 'tou_xiang',
            //公司
            logo: 'logo',
            ying_ye_zhi_zhao: 'ying_ye_zhi_zhao',
            qi_ye_shui_wu_deng_ji_zheng: 'qi_ye_shui_wu_deng_ji_zheng',
            qi_ye_zu_zhi_ji_gou_dai_ma_zheng: 'qi_ye_zu_zhi_ji_gou_dai_ma_zheng',
            qi_ye_yin_hang_kai_hu_xu_ke_zheng: 'qi_ye_yin_hang_kai_hu_xu_ke_zheng',
            quan_guo_gong_ye_chan_pin_sheng_chan_xu_ke_zheng: 'quan_guo_gong_ye_chan_pin_sheng_chan_xu_ke_zheng',
            she_bei_xing_hao_zhu_ce_ren_zheng: 'she_bei_xing_hao_zhu_ce_ren_zheng',
            ben_chang_chan_pin_zhi_jian_bao_gao: 'ben_chang_chan_pin_zhi_jian_bao_gao',
            jiao_yi_fang_chan_pin_zhi_jian_bao_gao: 'jiao_yi_fang_chan_pin_zhi_jian_bao_gao',
            di_san_fang_chan_pin_zhi_jian_bao_gao: 'di_san_fang_chan_pin_zhi_jian_bao_gao',
            qi_ye_jing_ying_cai_wu_bao_biao: 'qi_ye_jing_ying_cai_wu_bao_biao'
        },
        columnName: {
            //车辆
            xing_shi_zheng: 'xing_shi_zheng_url',  //行驶证照片
            yun_ying_zheng: 'yun_ying_zheng_url',  //运营证照片
            che_tou_zhao: 'che_tou_zhao_url',    //车头照
            //个人
            id_card_number: 'id_card_number',
            jia_shi_zheng: 'jia_shi_zheng',
            tou_xiang: 'tou_xiang',
            //公司
            logo: 'logo',
            ying_ye_zhi_zhao: 'ying_ye_zhi_zhao',
            qi_ye_shui_wu_deng_ji_zheng: 'qi_ye_shui_wu_deng_ji_zheng',
            qi_ye_zu_zhi_ji_gou_dai_ma_zheng: 'qi_ye_zu_zhi_ji_gou_dai_ma_zheng',
            qi_ye_yin_hang_kai_hu_xu_ke_zheng: 'qi_ye_yin_hang_kai_hu_xu_ke_zheng',
            quan_guo_gong_ye_chan_pin_sheng_chan_xu_ke_zheng: 'quan_guo_gong_ye_chan_pin_sheng_chan_xu_ke_zheng',
            she_bei_xing_hao_zhu_ce_ren_zheng: 'she_bei_xing_hao_zhu_ce_ren_zheng',
            ben_chang_chan_pin_zhi_jian_bao_gao: 'ben_chang_chan_pin_zhi_jian_bao_gao',
            jiao_yi_fang_chan_pin_zhi_jian_bao_gao: 'jiao_yi_fang_chan_pin_zhi_jian_bao_gao',
            di_san_fang_chan_pin_zhi_jian_bao_gao: 'di_san_fang_chan_pin_zhi_jian_bao_gao',
            qi_ye_jing_ying_cai_wu_bao_biao: 'qi_ye_jing_ying_cai_wu_bao_biao'
        },
    })

