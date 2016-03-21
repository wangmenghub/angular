/**
 * Created by ID on 15/12/8.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 *
 *
 *
 *
 */
angular.module('rsc.filters', [])
    .filter('rsc.address', function () {
        return function (address) {
            if (address.province == address.city) {
                return address.province + address.district + address.addr;
            } else {
                return address.province + address.city + address.district + address.addr;
            }
            //return address.province + address.city + address.district + address.addr;
        }
    })
    .filter('Storeaddress', function () {
        return function (address) {
            //StoreManage.getInfoById(addressId).then(function (result) {
            //    console.log(result);
            //    return result.province;
            //})

            return address.province + address.city + address.district + address.addr;
        }
    })
    .filter('rsctime', function () {
        return function (time) {
            //StoreManage.getInfoById(addressId).then(function (result) {
            //    console.log(result);
            //    return result.province;
            //})

            return moment(new Date(time)).format('LL');
        }
    })
    .filter('carType', function () {
        var truck_types = {
            GAO_LAN: '高栏车',    //高栏车
            DI_LAN: '低栏车',      //低栏车
            PING_BAN: '平板车',  //平板车
            GAO_DI_BAN: '高低板车',   //高低板车
            BAN_GUA: '半挂车',    //半挂车
            ZI_XIE: '自卸车',      //自卸车
            ZHONG_LAN: '中栏车',    //中栏车
            QUAN_GUA: '全挂车',      //全挂车
            JIA_CHANG_GUA: '加长挂车',    //加长挂车
            XIANG_SHI: '箱式'    //箱式
        };


        return function (type) {
            return truck_types[type];
        }
    })
    .filter('carWeight', function () {
        return function (value) {
            if (value) {
                var index = value.indexOf("_");
                if (!value.substring(index + 1)) {
                    //console.log(value)
                    return value.substring(0, index);
                }
                return value.substring(index + 1);
            } else {
                return '';
            }
        }
    })
    .filter('carLongValue', function () {
        return function (value) {
            if (value) {
                var index = value.indexOf("_");
                if (!value.substring(index + 1)) {
                    return value.substring(0, index);
                } else {
                    return value.substring(index + 1);
                }
            } else {
                return '';
            }
        }
    })
    .filter('carDes', function ($filter) {
        return function (car) {
            if (car) {
                var des = $filter("carType")(car.type) + ','
                    + (car.long ? ($filter("carLongValue")(car.long) + '米,载') : "载")
                    + $filter("carWeight")(car.weight) + '吨';
                return des;
            } else {
                return '';
            }
        }
    })
    .filter('rolefilter', function () {
        var truck_types = {
            TRADE_ADMIN: '超级管理员',
            TRADE_PURCHASE: '采购负责人',
            TRADE_SALE: '销售负责人',
            TRADE_MANUFACTURE: '生产负责人',
            TRADE_FINANCE: '财务负责人',
            TRAFFIC_ADMIN: '物流负责人',
            TRAFFIC_DRIVER: '司机',
            TRADE_STORAGE: '仓库管理员',
            TRAFFIC_DRIVER_PUBLISH: '公有司机',  //公有司机（公司所属）
            TRAFFIC_DRIVER_PRIVATE: '私人司机'   //私人司机（挂靠司机）
        };
        return function (type) {
            return truck_types[type];
        }
    })
    .filter('carW', function () {
        var values =
        {
            "6_10": "6至10吨",
            "11_15": "11至15吨",
            "16_20": "16至20吨",
            "21_25": "21至25吨",
            "26_30": "26至30吨",
            "31_35": "31至35吨",
            "36_40": "36至40吨",
            "40_": "40吨以上",
        }


        return function (value) {
            return values[value];
        }
    })
    .filter('carLong', function () {
        var values =
        {
            "2_5": "2至5米",
            "6_8": "6至8米",
            "9_10": "9至10米",
            "11_12": "11至12米",
            "13_15": "13至15米",
            "16_17.5": "16至17.5米",
            "17.5_": "17.5米以上"
        }


        return function (value) {
            return values[value];
        }
    })

    .filter('stepCSS', function () {
        return function (currentStep, step) {
            if (step <= currentStep) {
                return "btn-navbar4-active-c";
            }
        }
    })
    .filter('driverOrderStatus', function () {
        return function (driver) {
            if (driver.agree) {
                //if(driver.)
            } else {

            }
            if (step <= currentStep) {
                return "btn-navbar4-active-c";
            }
        }
    })
    .filter('stepText', function (authenticationService) {
        return function (order) {
            var step = order.step;
            var status = order.status;

            if (status && status == 'cancelled') {
                return "已取消";
            }
            var text;
            var type = authenticationService.getCompanyInfo().type;
            switch (type) {
                case "TRAFFIC":
                    if (step == 1) {
                        text = "待确认";
                    } else if (step == 1.5) {
                        text = "确认订单";
                    } else if (step == 2 || step == 2.1 || step == 2.2) {
                        text = "等待交易方付款";
                    } else if (step == 2.25) {
                        text = "确认收款";
                    } else if (step == 2.3) {
                        text = "申请发车";
                    } else if (step == 2.4) {
                        text = "等待确认发车时间";
                    } else if (step == 2.5) {
                        text = "请派车";
                    } else if (step == 3) {
                        text = "确认运输完毕";
                    } else if (step == 4) {
                        text = "等待交易方确认收货";
                    } else if (step == 4.6) {
                        text = "等待交易方谅解";
                    } else if (step == 4.5) {
                        text = "等待交易方确认收货";
                    } else if (step >= 5 && step < 5.5) {
                        text = "等待交易方付尾款";
                    } else if (step == 5.5) {
                        text = "确认尾款,完成交割";
                    } else if (step == 6) {
                        text = "订单完成";
                    } else {
                        text = "请刷新重试";
                    }
                    break;
                case "TRADE":
                    if (step == 1) {
                        text = "下订单";
                    } else if (step == 1.5) {
                        text = "等待物流确认";
                    } else if (step == 2) {
                        //all_cash: 'all_cash',   //款到付货
                        //all_goods: 'all_goods', //货到付款
                        //partition: 'partition', //分期
                        //credit: 'credit'        //信用
                        switch (order.payment_method) {
                            case "all_goods":
                            case "credit":
                                text = "付款";
                                break;
                            default :
                                text = "付预付款";
                        }

                    } else if (step == 2.1) {
                        text = "等待物流信用审批";
                    } else if (step == 2.2) {
                        text = "确认支付";
                    } else if (step == 2.25) {
                        text = "等待物流确认收款";
                    } else if (step == 2.3) {
                        text = "支付完成";
                    } else if (step == 2.4) {
                        text = "确认发车时间";
                    } else if (step == 2.5) {
                        text = "等待物流派车";
                    } else if (step == 3) {
                        text = "等待提货";
                    } else if (step == 4) {
                        text = "确认交货完毕";
                    } else if (step == 4.5) {
                        text = "等待物流方确认";
                    } else if (step == 4.6) {
                        text = "买家申请谅解";
                    } else if (step == 5) {
                        text = "支付尾款";
                    } else if (step == 5.1) {
                        text = "等待信用额审核";
                    } else if (step == 5.2) {
                        text = "请确认支付";
                    } else if (step == 5.5) {
                        text = "等待物流方收尾款";
                    } else if (step == 6) {
                        text = "订单完成";
                    } else {
                        text = "请刷新重试";
                    }
                    break;
                case"driver":

                    break
                default :
                    text = "未知"
            }
            return text;
        }
    })
    /**
     * 控制物流订单按钮 true 为按钮禁用,false 为启用
     */
    .filter('stepButton', function (authenticationService) {
        return function (step) {
            var type = authenticationService.getCompanyInfo().type;
            var text = true;
            switch (type) {
                case "TRAFFIC":
                    if (step == 1) {
                        text = true;
                    } else if (step == 1.5) {
                        text = false;
                    } else if (step == 2) {
                        text = true;
                    } else if (step == 2.1) {
                        text = true;
                    } else if (step == 2.2) {
                        text = true;
                    } else if (step == 2.25) {
                        text = false;
                    } else if (step == 2.3) {
                        text = false;
                    } else if (step == 2.4) {
                        text = true;
                    } else if (step == 2.5) {
                        text = true;
                    } else if (step > 2.3 && step <= 2.6) {
                        text = false;
                    } else if (step == 3) {
                        text = false;
                    } else if (step == 4) {
                        text = true;
                    } else if (step >= 5 && step < 5.5) {
                        text = true;
                    } else if (step == 5.5) {
                        text = false;
                    } else if (step == 6) {
                        text = true;
                    }
                    break;
                case "TRADE":
                    if (step == 1) {
                        text = false;
                    } else if (step == 1.5) {
                        text = true;
                    } else if (step == 2) {
                        text = false;
                    } else if (step == 2.1) {
                        text = true;
                    } else if (step == 2.2) {
                        text = false;
                    } else if (step == 2.25) {
                        text = true;
                    } else if (step == 2.3) {
                        text = true;
                    } else if (step == 2.4) {
                        text = false;
                    } else if (step == 2.5) {
                        text = true;
                    } else if (step == 3) {
                        text = true;
                    } else if (step == 4) {
                        text = false;
                    } else if (step == 5) {
                        text = false;
                    } else if (step == 5.1) {
                        text = true;
                    } else if (step == 5.2) {
                        text = false;
                    } else if (step == 5.5) {
                        text = true;
                    } else if (step == 6) {
                        text = true;
                    }
                    break;
                default :
                    text = true;
            }
            return text;
        }
    })
    .filter('demandRole', function () {
        return function (value, timeOut) {
            console.log('timeout', timeOut)
            switch (value) {
                case "TRAFFIC":
                    if (timeOut) {
                        return '抢单结束';
                    } else {
                        return '抢购进行中,剩余';
                    }
                    break;
                case "TRADE":
                    if (timeOut) {
                        return '请选单';
                    } else {
                        return '抢购进行中,剩余';
                    }
                    break;
                default :
                    return '未知'
            }
        }
    })
    /**
     * 支付方式过滤器
     */
    .filter('payTypeDes', function () {
        //return function (order, type) {
        //    if (!order) {
        //        return true;
        //    }
        //    var text;
        //    switch (type) {
        //        case "advanced_payment":
        //            text = order.payment_advance + "%预付款";
        //            switch (order.choice_advanced_payment) {
        //                case "both":
        //                    text += ",现金支付或信用支付";
        //                    break;
        //                case "url":
        //                    text += ",现金支付";
        //                    break;
        //                case "credit":
        //                    text += ",信用支付";
        //                    break;
        //                default :
        //
        //            }
        //            break;
        //        case "final_payment":
        //            text = " 尾款";
        //            switch (order.choice_advanced_payment) {
        //                case "both":
        //                    text += ",现金支付或信用支付";
        //                    break;
        //                case "url":
        //                    text += ",现金支付";
        //                    break;
        //                case "credit":
        //                    text += "信用支付";
        //                    break;
        //                default :
        //
        //            }
        //            break;
        //        case "both":
        //            text = order.payment_advance + "%预付款";
        //            switch (order.choice_advanced_payment) {
        //                case "both":
        //                    text += ",现金支付或信用支付;";
        //                    break;
        //                case "url":
        //                    text += ",现金支付;";
        //                    break;
        //                case "credit":
        //                    text += ",信用支付;";
        //                    break;
        //                default :
        //
        //            }
        //            text += "尾款:";
        //
        //            switch (order.choice_advanced_payment) {
        //                case "both":
        //                    text += "现金支付或信用支付";
        //                    break;
        //                case "url":
        //                    text += "现金支付";
        //                    break;
        //                case "credit":
        //                    text += "信用支付";
        //                    break;
        //                default :
        //
        //            }
        //            break;
        //        default :
        //            ;
        //    }
        //    return text;
        //}
        return function (order) {
            if (!order) {
                return true;
            }
            var text;
            //支付渠道
            switch (order.payment_choice) {
                case "cash":
                    text = "现金结算";

                    break;
                case "bill_bank":
                    text = "银行兑票";

                    break;
                case "bill_com":
                    text = "商业兑票";
                default :

            }
            //支付方式
            switch (order.payment_method) {
                case "all_cash":
                    text += ",款到发货";
                    break;
                case "all_goods":
                    text += ",货到付款,以采购确认全部到货并质检完毕后5日内付款.";
                    break;
                case "partition":
                    text += ",分期付款";
                    if (order.percentage_remain) {
                        //3期 order.percentage_advance + "%,质保款" +
                        text += ",分三期:" + "预付款" + order.percentage_remain + '%,尾款' + (100 - order.percentage_advance - order.percentage_remain) + "%";
                    } else {
                        //2期
                        text += ",分两期:" + "预付款" + order.percentage_advance + "%,尾款" + (100 - order.percentage_advance) + "%,货到" + order.count_day_extension + '日付款';
                    }
                    break;
                case "credit":
                    text += ",信用";
                    break;
                default :

            }
            return text;
        }
    })
    .filter('driverStatus', function () {
        return function (value) {
            if (value) {
                return '已接单';
            } else {
                return '等待接单'
            }
        }
    })
    .filter('routeDriverStatus', function ($filter) {
        return function (route, type) {
            if (!route) {
                return;
            } else {
                switch (type) {
                    case 'text':
                        if (route.agree) {
                            return $filter('routeStatus')(route.status);
                        } else {
                            return '未接单';
                        }
                        break;
                    case 'css':
                        if (route.agree) {
                            return $filter('routeStatusCss')(route.status);
                        } else {
                            return 'label-role-red';
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    })
    .filter('routeStatus', function () {
        return function (status) {
            switch (status) {
                case 'not_arrival':
                    return '未到达';
                    break;
                case 'ready_get':
                    return '准备提货';
                    break;
                case 'driving':
                    return '运送中';
                    break;
                case 'ready_give':
                    return '准备交货';
                    break;
                case 'cancelled':
                    return '取消';
                    break;
                case 'not_used':
                    return '未使用';
                    break;
                case 'busy':
                    return '忙碌';
                default :
                    return '未知'
            }
        }
    })
    .filter('routeStatusCss', function () {
        return function (status) {
            switch (status) {
                case 'not_arrival':
                    //return '未到达';
                    return 'label-supply-bg-brwon';
                case 'ready_get':
                    return 'label-supply-bg-brwon';
                //return '准备提货';
                case 'driving':
                    //return '运送中';
                    return 'label-supply-bg-brwon';
                case 'ready_give':
                    //return '准备交货';
                    return 'label-supply-bg-brwon';
                case 'cancelled':
                    return '取消';
                case 'not_used':
                    return 'label-role-green';
                case 'busy':
                    return 'label-role-red';
                default :
                    return 'label-role-green'
            }
        }
    })
    .filter('driverOrderStatus', function () {
        return function (value) {
            switch (value) {
                case 'ready_get':
                    return true;
                    break;
                case 'driving':
                    return true;
                    break;
                case '':
                    break;
                case '':
                    break;
                case '':
                    break;
                default :
                    break;
            }
        }
    })
    .filter('driverBtnText', function () {
        return function (value) {
            switch (value) {
                case 'ready_get':
                    return "等待过磅信息";
                    break;
                case 'not_arrival':
                    return "申请提货";
                    break;
                case 'ready_get':
                    break;
                case 'driving':
                    return "确认提货信息";
                    break;
                case '':
                    break;
                default :
                    break;
            }
        }
    })

    .filter('timeOut', function () {
        return function (time) {
            return new Date(time) < new Date();
        }
    })
    .filter('imgDefault', function () {
        return function (value, type) {
            if (value) {
                return value;
            }
            switch (type) {
                case "header":
                    value = "img/me/face_13.png";
                    break;
                case "car":
                    value = "img/pass/car-default.png";
                    break;
                case "company":
                    value = "img/me/face_13.png";
                    break;
                default :
                    value = 'img/common/imgdefault.png';
                    break;
            }
            return value;
        }
    })
    //车辆分类显示
    .filter('carGroupByType', function ($linq) {
        return function (cars) {
            if (cars) {
                var queryResult = $linq.Enumerable().From(cars).GroupBy('$.type', '$._id', function (key, group) {
                    return {type: key, total: group.Count()}
                }, function (key) {
                    return key.toString();
                }).ToArray();
                //console.log('group by ', queryResult);
                return queryResult;
            } else {
                return null;
            }


        }
    })
    .filter('addressText', function () {
        return function (value) {
            //if(value.)
            var text;
            if (value.currentProvince) {
                text = value.currentProvince.name;
                if (value.currentCity) {
                    text += value.currentCity.name;
                    if (value.currentArea) {
                        text += value.currentArea.name;
                    }
                }
            }
            return text;
        }
    })

    .filter('authenticationStatus', function () {
        /**
         *  认证状态车辆列表显示
         */
        return function (value, type) {
            switch (type) {
                case 'labelText':
                case '':
                case null:
                case undefined:

                    switch (value) {
                        case 'NO':
                        case '':
                            return "未认证";
                        case 'PROCESSING':
                            return "认证中";
                        case 'SUCCESS':
                            return "已认证";
                        case 'FAILED':
                            return "认证失败";
                        default :
                            return '未知';

                    }
                    break;
                case 'btnText':
                    //按钮文字
                    switch (value) {
                        case 'NO':
                        case '':
                        case null:
                        case undefined:
                            return "申请认证";
                        case 'PROCESSING':
                            return "认证中";
                        case 'SUCCESS':
                            return "认证成功";
                        case 'FAILED':
                            return "认证失败,再次申请认证";
                        default :
                            return '未知';
                    }
                    break;
                case 'btnDisabled':
                    //按钮是否禁用 return false 表示禁用 true 为不禁用
                    switch (value) {
                        case 'NO':
                        case '':
                        case null:
                        case undefined:
                            return false;
                        case 'PROCESSING':
                            return true;
                        case 'SUCCESS':
                            return true;
                        case 'FAILED':
                            return false;
                        default :
                            return false;
                    }
                    break;

                case 'labelColor':
                    //按钮文字
                    switch (value) {
                        case 'NO':
                        case '':
                        case 'FAILED':
                            //return "未认证";
                            return "label-role-red";
                        case 'PROCESSING':
                            //return "认证中";
                            return "label-infor-time";
                        case 'SUCCESS':
                            //return "已认证";
                            return "label-role-green";
                        default :
                            return 'label-role-red';

                    }
            }

        }
    })

    .filter('authenticationStatusText', function () {
        /**
         *  认证状态按钮文字显示
         *  */
        return function (value) {
            switch (value) {
                case 'NO':
                case '':
                    return "申请认证";
                case 'PROCESSING':
                    return "认证中";
                case 'SUCCESS':
                    return "认证成功";
                case 'FAILED':
                    return "认证失败,再次申请认证";
                default :
                    return '请刷新重试';

            }
        }
    })
    .filter('driverMgStatus', function ($filter) {
        return function (route) {
            if (route.status) {
                return $filter('routeStatus')(route.status);
            } else {
                return '空闲';
            }
        }
    })
    .filter('driverRoles', function ($filter) {
        return function (route) {
            if (route.role) {
                switch (route.role) {
                    case "TRAFFIC_DRIVER_PUBLISH":
                        return {text: '公有', css: 'label-role-red'};
                    case "TRAFFIC_DRIVER_PRIVATE":
                        return {text: '私有', css: 'label-role-green'};
                }
            }
        }
    })
    .filter('driverMgStatusCss', function ($filter) {
        return function (route) {
            if (route.status) {
                return $filter('routeStatusCss')(route.status);
            } else {
                return 'label-role-green';
            }
        }
    })
    .filter('selectCarDriverStatus', function ($filter) {
        return function (route) {
            if (route.status) {
                if (route.status != 'not_use') {
                    return '忙碌';
                } else {
                    return '空闲';
                }
            } else {
                return '空闲';
            }
        }
    })
    .filter('selectCarDriverStatusCSS', function ($filter) {
        return function (route) {
            if (route.status) {
                if (route.status != 'not_use') {
                    return 'label-role-red';
                } else {
                    return 'label-role-green';
                }
            } else {
                return 'label-role-green';
            }
        }
    })
    //数字 以万进位
    .filter('numberConvert', function ($filter) {
        return function (value) {
            if (value) {
                if (angular.isNumber(value)) {
                    if (value > 9999) {
                        return $filter('number')(value / 10000, 0) + '万';
                    } else {
                        return $filter('number')(value, 2);
                    }
                } else if (angular.isString(value)) {
                    if (value.length >= 5) {
                        return parseInt(value) / 10000 + '万'
                    } else {
                        return $filter('number')(value, 2);
                    }
                } else {
                    return $filter('number')(value, 2);
                }
            }
        }
    })
    //短信模板
    .filter('smsTemplate', function ($filter) {
        return function (array, type) {
            switch (type) {
                case 'trafficDemand':
                    return array[0] + "在日升昌平台发布一个物流需求，从" + array[1] + "至" + array[2] + "运送" + array[3] + array[4] + "吨，快来日升昌平台<a href='" + array[5] + "抢单<a/>吧。退订回复TD";
                    break;
                case 'tradeDemand':
                    return array[0] + "企业在日升昌平台采购" + array[1] + "吨，邀请您前来报价。快快<a href='" + array[2] + "'>点击查看吧<a/>。退订回复TD";
                    break;
                case 'register':
                    return "#企业采购负责人邀请您下载安装日升昌app，更多采购需求等你报价。点击下载：日升昌app。退订回复TD";
                    break;
                default :
                    return '';
            }
        }
    })

    .filter('payBtnText', function () {
        return function (order) {
            var text = "";
            switch (order.payment_method) {
                //款到付货
                //信用
                case "all_cash":
                case "credit":

                    if (order.step == 2) {
                        text = '支付全款';
                    }
                    break;
                case "all_goods":
                    //货到付款
                    if (order.step == 5) {
                        text = '支付全款';
                    }
                    break;
                case "partition":
                    //分期
                    if (order.step == 2) {
                        text = '支付预付款';
                    } else if (order.step == 4) {
                        text = '支付货到款';
                    } else if (order.step == 5) {
                        text = '支付尾款';
                    }
                    break;
            }
            return text;

        }
    })
    .filter('settlementType', function () {
        return function (value) {
            switch (value) {
                case 'cash':
                    return "现金结算";
                case 'bill_com':
                    return "商业兑票";
                case 'bill_bank':
                    return "银行兑票";
                default:
                    return "";
            }
        }
    })
    .filter('payType', function () {
        return function (value) {
            switch (value) {
                case 'all_cash':
                    return "款到付货";
                case 'all_goods':
                    return "货到付款";
                case 'partition':
                    return "分期付款";
                case 'credit':
                    return "信用付款";
                default:
                    return "";
            }
        }
    })

