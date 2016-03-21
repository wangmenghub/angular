/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.routers.pass', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('tab.stroe', {
                url: '/stroe',
                templateUrl: 'template/pass/pass.html',
            })
            /*////////////////////////////////物流//////////////////////////////*/
            .state('tab.rushTransp', {
                url: '/rushTransp',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/rushTransp.html',
                        //controller: 'rushTranspCtrl'
                    }

                }
            }) //抢货源
            .state('tab.rushTranspMap', {
                url: '/rushTranspMap',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/rushTranspMap.html'
                        //controller: 'rushTranspMapCtrl'
                    }

                }
            }) //抢货源地图模式

            .state('tab.rushTranspRush', {
                url: '/rushTranspRush/:demand_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/rushTranspRush.html',

                        //controller: 'rushTranspRushCtrl'
                    }

                }
            })
            .state('tab.rushTranspDetail', {
                url: '/rush_transp_detail/:demand_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/rushTranspDetail.html',
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
                        }
                        // controller: 'MeCtrl'

                    }
                    //controller: 'rushTranspDetailCtrl'
                }
            })
            .state('tab.myHome', {
                url: '/myHome',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/myHome.html'
                        //controller: 'myHomeCtrl'
                    }

                }
            })
            //物流订单
            .state('tab.ebank.order_traffic', {
                url: '/order_traffic',
                views: {
                    'child-view': {
                        templateUrl: 'template/ebank/trafficOrder.html',
                        controller: 'trafficOrderCtrl'
                    }
                }
            })
            .state('tab.ebank.order_trade', {
                url: '/order_trade',
                views: {
                    'child-view': {
                        templateUrl: 'template/ebank/tradeOrder.html'
                        , controller: 'ordertradeCtrl'
                    }

                }
            })
            .state('tab.passOrder', {
                url: '/pass_order',
                abstract:true,
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder.html'
                        //controller: 'passOrderCtrl'
                    }

                }
            })
            .state('tab.passOrder.Detail', {
                url: '/:order_id',
                views: {
                    'step-view': {
                        templateUrl: 'template/pass/passOrderStep2.html',
                        controller: 'PassOrderStep2'
                    }

                }
            })
            .state('tab.passOrder.Step1', {
                url: '/step1',
                views: {
                    'step-view': {
                        templateUrl: 'template/pass/passOrderStep1.html',
                        controller: 'PassOrderStep1Ctrl'
                    }

                }
            })
            .state('tab.SelectCar', {
                url: '/select_car/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrderSelectCar.html',
                        controller: 'PassSelectCarCtrl'
                    }

                }
            })
            .state('tab.RouteList', {
                url: '/pass_route_list/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrderRouteList.html',
                        controller: 'PassRouterCarList'
                    }

                }
            })
            .state('tab.Pay', {
                url: '/pay/:type/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/common/pay.html',
                        //controller: 'PayCtrl'
                    }

                }
            })
            .state('tab.passViewPayment', {
                url: '/pass_view_payment/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passViewPayment.html',
                        //controller: 'PayCtrl'
                    }

                }
            })
            //销售仓管获取仓库信息
            .state('tab.myStores', {
                url: '/my_stores'
                , views: {
                    'center-content': {
                        templateUrl: 'template/store/myStoresList.html'
                        //templateUrl: 'template/me/pass/myStores.html'
                        , controller: 'MyStoresCtrl'
                    }
                }
            })
            .state('tab.AddStore', {
                url: '/add_store'
                , views: {
                    'center-content': {
                        templateUrl: 'template/store/addStore.html'
                        //templateUrl: 'template/me/pass/myStores.html'
                        , controller: 'AddStoreCtrl'
                    }
                }
            })

            .state('tab.StoresDetail', {
                url: '/stores_detail/:store_id'
                , views: {
                    'center-content': {
                        templateUrl: 'template/store/storeDetail.html'
                        , controller: 'StoresDetailCtrl'
                    }
                }
            })
            .state('tab.StoreOrdersList', {
                url: '/store_order_list'
                , views: {
                    'center-content': {
                        templateUrl: 'template/store/storeOrdersList.html'
                        , controller: 'StoreOrderListCtrl'
                    }
                }
            })
            .state('tab.StoreOrderDetail', {
                url: '/store_order_detail/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/store/storeOrderDetail.html'
                        , controller: 'StoreOrderDetailCtrl'
                    }
                }
            })
            .state('tab.SelectStoreManager', {
                url: '/select_store_manager/:store_id'
                , views: {
                    'center-content': {
                        templateUrl: 'template/store/selectStoreManager.html'
                        , controller: 'SelectStoreManagerCtrl'

                    }
                }
            })

            .state('tab.StoreRouteCarList', {
                //显示车辆运输情况
                url: '/store_route_car_list/:order_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/store/storeRouteCarList.html',
                        controller: 'PassRouterCarList'
                    }

                }
            })
            .state('tab.StorePickUp', {
                url: '/store-pick-up/:type/:order_id/:route_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/store/storePickUp.html',
                        controller: 'DriverPickUpCtrl'
                    }
                }
            })

            .state('tab.LineSelectCar', {
                url: '/line_select_car/:type/:line_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/roadLine/lineSelectCar.html',
                        controller: 'LineSelectCarCtrl'
                    }
                }
            })
            .state('tab.TranspSearchAdv', {
                url: '/transp_search_adv',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/TranspSearchAdv.html',
                        controller: 'TranspSearchAdvController'
                    }
                }
            }) //搜索货源


    }])
