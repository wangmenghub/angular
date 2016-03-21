/**
 * Created by zhoudd on 2015/11/17.
 */
angular.module('rsc.controllers', [])
//    .controller('MeCtrl', function ($log,$scope) {
//        $scope.$on('$stateChangeStart', function (evt,toState,roParams,fromState,fromParams) {
//            $log.debug(arguments);
//        })
//
//    })
    /*/////////////////////////////////////////交易//////////////////////////////////////////*/


    .controller('rushMapCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '地图模式'
            , 'navRightHref': '#/tab/rushMap'
            , 'navRight': '搜索采购'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    // .controller('rushSearchAdvCtrl', function ($scope) {
    //     $scope.navbar = {
    //         'navLeftHref': ''
    //         , 'navLeftIco': 'ion-ios-arrow-back'
    //         , 'navLeft': '返回'
    //         , 'title': '搜索采购'
    //         , 'navRightHref': '#/tab/rushSearchAdv'
    //         , 'navRight': ''
    //         , 'navRightIco': ''
    //         , 'navRighthide': ''
    //     }
    // })
    .controller('supplyCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-android-pin'
            , 'navLeft': ''
            , 'title': '交易'
            , 'navRightHref': '#/tab/supply'
            , 'navRight': '发布采购'
            /*,'navRight':'发布现货' */  //销售角色
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('supplyDetailCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '现货详情'
            , 'navRightHref': '#/tab/supplyDetail'
            , 'navRight': '短信'/*'分享'*/
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('supplyMapCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '现货分布'
            , 'navRightHref': '#/tab/supplyMap'
            , 'navRight': '发布现货'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('supplySearchAdvCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '搜索现货'
            , 'navRightHref': '#/tab/supplySearchAdv'
            , 'navRight': '发布采购'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('matchTranspCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '匹配物流'
            , 'navRightHref': '#/tab/matchTransp'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('tradeAgreementCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '违约条款'
            , 'navRightHref': '#/tab/tradeAgreement'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    /*/////////////////////////////////////////销售方//////////////////////////////////////////*/

    .controller('supplyPublishCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '发布现货'
            , 'navRightHref': '#/tab/supplyPublish'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('rushPublish2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '发起物流抢单'
            , 'navRightHref': '#/tab/rushPublish2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    /*/////////////////////////////////////////订单//////////////////////////////////////////*/


    .controller('tradeOrder2-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/tradeOrder2-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('tradeOrder2-2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/tradeOrder2-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('tradeOrder2-2-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '申请收货'
            /*,'title':'申请提货'*/  /*销售角色*/
            , 'navRightHref': '#/tab/tradeOrder2-2-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })


    /*销售方*/

    .controller('tradeOrder-1-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '关注物流列表'
            , 'navRightHref': '#/tab/tradeOrder-1-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    /*/////////////////////////////////////////物流//////////////////////////////////////////*/
    .controller('rushTranspMapCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '货源分布'
            , 'navRightHref': '#/tab/rushTranspMap'
            , 'navRight': '定位'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    //.controller('rushTranspRushCtrl', function ($scope) {
    //    $scope.navbar = {
    //        'navLeftHref': ''
    //        , 'navLeftIco': 'ion-ios-arrow-back'
    //        , 'navLeft': '返回'
    //        , 'title': '立即抢单'
    //        , 'navRightHref': '#/tab/rushTranspRush'
    //        , 'navRight': ''
    //        , 'navRightIco': ''
    //        , 'navRighthide': ''
    //    }
    //})
    .controller('passOrderCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder1-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '选择车辆'
            , 'navRightHref': '#/tab/passOrder1-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder1-2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '选择司机'
            , 'navRightHref': '#/tab/passOrder1-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder2-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '车辆详情'
            , 'navRightHref': '#/tab/passOrder2-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-3Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder2-3'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-4Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '车辆详情'
            , 'navRightHref': '#/tab/passOrder2-4'
            , 'navRight': '更换车辆'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-5Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '车辆详情'
            , 'navRightHref': '#/tab/passOrder2-5'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-6Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '选择司机'
            , 'navRightHref': '#/tab/passOrder2-6'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-7Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单信息'
            , 'navRightHref': '#/tab/passOrder2-7'
            , 'navRight': '更换车辆'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-8Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单信息'
            , 'navRightHref': '#/tab/passOrder2-8'
            , 'navRight': '更换车辆'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-9Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': ''
            , 'navLeft': '返回'
            , 'title': '刘华兴'
            , 'navRightHref': '#/tab/passOrder2-9'
            , 'navRight': ''
            , 'navRightIco': 'ion-ios-person'
            , 'navRighthide': ''
        }
    })
    .controller('passOrder2-10Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder2-10'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder3Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder3'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder4Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder4'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder4-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '订单详情'
            , 'navRightHref': '#/tab/passOrder4-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('passOrder4-2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '完成收款'
            , 'navRightHref': '#/tab/passOrder4-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    /*/////////////////////////////////////////////////////////*/
    .controller('myPassCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': ''
            , 'navLeft': ''
            , 'title': '我'
            , 'navRightHref': '#/tab/myPass'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('driverCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '司机管理'
            , 'navRightHref': '#/tab/driver'
            , 'navRight': '邀请新司机'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('driver-1Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '等待分配'
            , 'navRightHref': '#/tab/driver-1'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('driver-2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '分配线路'
            , 'navRightHref': '#/tab/driver-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('roadLineCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '线路管理'
            , 'navRightHref': '#/tab/roadLine'
            , 'navRight': '+ 添加线路'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    .controller('myHomeCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '主页'
            , 'navRightHref': '#/tab/myHome'
            , 'navRight': '+ 设置'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('nameCardCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '名片'
            , 'navRightHref': '#/tab/nameCard'
            , 'navRight': '分享计划'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })
    .controller('addLineCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '添加物流线路'
            , 'navRightHref': '#/tab/addLine'
            , 'navRight': '+添加车辆'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })


    .controller('transpSearchCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '物流'
            , 'navRightHref': '#/tab/transpSearch'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })


    /*/////////////////////////////////////////订单//////////////////////////////////////////*/

// 底部导航条
    .controller('tabCtrl', function ($scope, Storage, rolesConfig,$location) {
        $scope.roles=''
        if (Storage.get('userInfo')) {
            // console.log($scope.roles)
            var role = Storage.get('userInfo').user.role
            $scope.roles = rolesConfig.getRoles(role).menuObj
        } else {
            // console.log($scope.roles)
            $scope.roles = rolesConfig.getRoles('TRADE_ADMIN').menuObj
        }
        // 如果路由不是一级路由，则底部导航隐藏
        // console.log($location.$$path)
    })
