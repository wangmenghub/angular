/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
// angular.module('rsc.routers', ['ui.router'])
angular.module('rsc.routers.158', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('tab.158', {
                url: '/158',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/158.html',
                        resolve: {
                            userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
                                var userToken = authenticationService.getUserInfo();
                                if (userToken) {
                                    $log.debug(userToken);
                                    return $q.resolve(userToken);
                                }
                                else {
                                    return $q.reject({islogin: false});
                                }
                            }]
                        },
                        controller: '158Ctrl'

                    }

                }
            })
            //----------- 使用中的交易----------------//
            //------------采购
            //采购抢单列表
            .state('tab.rush', {
                url: '/rush',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rush.html',
                        controller: 'rushCtrl'
                    }

                }
            })
            //采购抢单详情
            .state('tab.rushDetail', {
                url: '/rushDetail/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushDetail.html',
                        resolve: {
                          userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
                            var userToken = authenticationService.getUserInfo();
                            if (userToken) {
                              $log.debug(userToken);
                              return $q.resolve(userToken);
                            }
                            else {
                              return $q.reject({islogin: false});
                            }
                          }]
                        },
                        controller: 'rushDetailCtrl'
                    }

                }
            })
            //发布抢单
            .state('tab.rushPublish', {
                url: '/rushPublish',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushPublish.html',
                        resolve: {
                          userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
                            var userToken = authenticationService.getUserInfo();
                            if (userToken) {
                              $log.debug(userToken);
                              return $q.resolve(userToken);
                            }
                            else {
                              return $q.reject({islogin: false});
                            }
                          }]
                        },
                        controller: 'rushPublishController'
                    }
                }
            })
            // -----------销售
            //立即抢单
            .state('tab.rushImmediately', {
                url: '/rushImmediately/:id/:offerid',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushImmediately.html'
                        ,controller: 'rushImmediatelyCtrl'
                    }

                }
            })

            //----------- 使用中的订单----------------//
            //订单第一步 撮合页面
            .state('tab.tradeOrder', {
                url: '/tradeOrder/:id', ///:step/:side
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder.html'     //采购和销售页面
                        ,controller: 'tradeOrderCtrl'
                    }

                }
            })

            // 订单-第二步
            //------------销售 发布物流，填写物流单
            //------------发布物流(三方)
            .state('tab.tradeOrder-1', {
                url: '/tradeOrder-1/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder-1.html'
                        ,controller: 'tradeOrder_1ctrl'
                    }

                }
            })
            // 发布双方物流
            .state('tab.tradeOrder-1-2', {
                url: '/tradeOrder-1-2/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder-1-2.html'
                        ,controller: 'tradeOrder_1ctrl'
                    }

                }
            })
            //------------填写物流单
            .state('tab.tradeOrder-2', {
                url: '/tradeOrder-2/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder-2.html'
                        ,controller: 'tradeOrder-2Ctrl'
                    }

                }
            }) //现货订单-添加物流单号2
            //------------采购 预付款和上传支付凭证
            //--订单-预付款
            .state('tab.tradeOrder1', {
                url: '/tradeOrder1/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder1.html'
                        ,controller: 'tradeOrder1ctrl'
                    }

                }
            })
            //--订单-支付预付款
            .state('tab.tradeOrder1-2', {
                url: '/tradeOrder1-2/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder1-2.html'
                        ,controller: 'tradeOrder1-2Ctrl'
                    }

                }
            })

            //订单-第三步
            // .state('tab.tradeOrder2', {
            //     url: '/tradeOrder2/:id',
            //     views: {
            //         'center-content': {
            //             templateUrl: 'template/158/tradeOrder2.html'
            //             ,controller: 'tradeOrder2Ctrl'
            //         }
            //     }
            // })
            // 订单 --- 第四步
            // 采购方 现货订单-检验
            // .state('tab.tradeOrder3', {
            //     url: '/tradeOrder3/:id',
            //     //templateUrl: 'template/158/158-1.html'
            //     views: {
            //         'center-content': {
            //             templateUrl: 'template/158/tradeOrder3.html'
            //             ,controller: 'tradeOrder3Ctrl'
            //         }

            //     }
            // })
            // 填写质检报告
            .state('tab.tradeOrder3-1', {
                url: '/tradeOrder3-1/:id',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder3-1.html'
                        ,controller: 'tradeOrder3-1Ctrl'
                    }

                }
            })

            // 订单 第五步
            // 采购方 现货订单-交割
            // .state('tab.tradeOrder4', {
            //     url: '/tradeOrder4/:id',
            //     views: {
            //         'center-content': {
            //             templateUrl: 'template/158/tradeOrder4.html'
            //             ,controller: 'tradeOrder4Ctrl'
            //         }

            //     }
            // })
            //交割1
            .state('tab.tradeOrder4-1', {
                url: '/tradeOrder4-1/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder4-1.html'
                        , controller: 'tradeOrder4-1Ctrl'
                    }

                }
            })
            // 分期三次时货到款支付
            .state('tab.tradeOrder4-2', {
                url: '/tradeOrder4-2/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder4-2.html'
                        , controller: 'tradeOrder4-2Ctrl'
                    }

                }
            })
            // 查看质检报告
            .state('tab.tradeOrder3-2', {
                url: '/tradeOrder3-2/:id',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder3-2.html'
                        ,controller: 'tradeOrder3-1Ctrl'
                    }

                }
            })
            // 订单中司机车辆信息 第三步
            .state('tab.tradeOrderPassList', {
                url: '/tradeOrderPassList/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrderPassList.html'
                        ,controller: 'tradeOrderCtrl'
                    }

                }
            })
            // 订单中司机车辆信息 第四 五步
            .state('tab.tradeOrderPassList2', {
                url: '/tradeOrderPassList2/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrderPassList2.html'
                        ,controller: 'tradeOrderCtrl'
                    }

                }
            })
            //20160229 改版
            .state('tab.tradeAddCarTeamList',{
                url:'/tradeAddCarTeamList',
                views:{
                    'center-content':{
                        templateUrl:'template/158/tradeAddCarTeamList.html'
                        // ,controller:'tradeAddCarTeamListCtrl'
                    }
                }
            })




    }])
