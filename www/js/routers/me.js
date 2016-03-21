/**
 * Created by ID on 15/12/8.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.routers.me', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
        //.state('tab.me', {
        //    url: '/me',
        //    views: {
        //        'center-content': {
        //            templateUrl: 'template/me/me.html',
        //            resolve: {
        //                userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
        //                    var userToken = authenticationService.getUserInfo();
        //                    if (userToken) {
        //                        $log.debug(userToken);
        //                        return $q.resolve(userToken);
        //                    }
        //                    else {
        //                        return $q.reject({islogin: false});
        //                    }
        //                }]
        //            },
        //            // controller: 'MeCtrl'
        //
        //        }
        //
        //    }
        //})
            .state('tab.myRsc', {
                url: '/myRsc',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/myRsc.html',
                        controller: 'MyRscCtrl',
                        controllerAs: 'MyRsc',
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
                        //  controller: 'MeCtrl'
                    }
                }
            })
            .state('tab.mySet', {
                url: '/mySet',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/mySet.html',
                        controller: 'MySetCtrl',
                        controllerAs: 'MySet'
                        //  controller: 'mySetCtrl'
                    }
                }
            })
            // 我的同事
            .state('tab.contact1', {
                url: '/contact1',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/contact1.html',
                        controller: 'MyContact1Ctrl',
                        controllerAs: 'MyContact1'
                    }
                }
            })
            // 我的客户
            .state('tab.contact2', {
                url: '/contact2',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/contact2.html',
                        //controller: 'MyContact2Ctrl',
                        //controllerAs:'MyContact2'
                    }
                }
            })
            // 我的关注
            .state('tab.contact3', {
                url: '/contact3',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/contact3.html',
                        // controller: 'contact3Ctrl'
                    }
                }
            })
            // 人员管理
            .state('tab.contact4', {
                url: '/contact4',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/contact4.html',
                        controller: 'MyContact4Ctrl',
                        controllerAs: 'MyContact4'
                    }
                }
            })
            .state('tab.newMember', {
                url: '/new_member',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/newMember.html',
                        controller: 'NewMemberCtrl',
                        //controller: 'MyNewMemberCtrl',
                        //controllerAs: 'MyNewMember'
                    }
                }
            })
            // 添加新成员
            .state('tab.newMemberForRole', {
                url: '/new_member/:role',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/newMember.html',
                        controller: 'NewMemberCtrl',
                        //controller: 'MyNewMemberCtrl',
                        //controllerAs: 'MyNewMember'
                    }
                }
            })
            // 系统通知
            .state('tab.inforSysterm', {
                url: '/inforSysterm',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/inforSysterm.html',
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
                        controller: 'inforSystermCtrl',
                        controllerAs: 'inforSysterm'
                    }
                }
            })
            // 企业主页
            .state('tab.companyProHome', {
                url: '/companyProHome',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/companyProHome.html',
                        controller: 'companyProHomeCtrl'
                    }
                }

            })
            .state('tab.companyProHomeCard', {
                url: '/companyProHomeCard/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/companyProHomeCard.html',
                        controller: 'companyProHomeCtrl'
                    }
                }

            })
            .state('tab.companyProHome.tradedemand', {
                url: '/tradedemand',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/tradedemand.html',
                        // controller: 'tradedemandCtrl'
                    }
                }
            })
            .state('tab.companyProHome.tradesupply', {
                url: '/tradesupply',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/tradesupply.html',
                        // controller: 'tradesupplyCtrl'
                    }
                }
            })
            .state('tab.companyProHome.tradeorder', {
                url: '/tradeorder',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/tradeorder.html',
                        // controller: 'tradeorderCtrl'
                    }
                }
            })
            .state('tab.companyProHome.passdemand', {
                url: '/passdemand',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/passdemand.html',
                        controller: 'passdemandCtrl'
                    }
                }
            })
            .state('tab.companyProHome.passsupply', {
                url: '/passsupply',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/passsupply.html',
                        controller: 'passsupplyCtrl'
                    }
                }
            })
            .state('tab.companyProHome.passorder', {
                url: '/passorder',
                views: {
                    'child-view': {
                        templateUrl: 'template/me/company/passorder.html',
                        controller: 'passorderCtrl'
                    }
                }
            })
            // 企业关系管理

            .state('tab.partner1', {
                url: '/partner1',
                views: {
                    'center-content': {
                        template: '<h2>partner1 空图</h2>'
                        // ,controller: 'attentionCtrl'
                    }
                }
            })
            // 企业设置
            .state('tab.myCompanySet', {
                url: '/myCompanySet',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/myCompanySet.html',
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
                        controller: 'MyCompSetCtrl',
                        controllerAs: 'MyCompSet'
                    }
                }
            })
            // 我的采购
            .state('tab.my_demand_list', {
                'url': '/my_demand_list',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/my_demand_list.html',
                        controller: 'MyDemandCtrl',
                        controllerAs: 'MyDemand'
                    }
                }
            })
            //
            .state('tab.my_routes', {
                'url': '/my_routes',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/my_routes.html',
                        controller: 'MyRoutesCtrl',
                        controllerAs: 'MyRoutes'
                    }
                }
            })
            .state('tab.my_route_new',
                {
                    'url': '/my_route_new',
                    views: {
                        'center-content': {
                            templateUrl: 'template/me/my_route_new.html',
                            controller: 'MyRouteNewCtrl',
                            controllerAs: 'MyRouteNew'
                        }
                    }
                })
            .state('tab.my_route_edit',
                {
                    'url': '/my_route_edit/:id',
                    views: {
                        'center-content': {
                            templateUrl: 'template/me/my_route_edit.html',
                            controller: 'MyRouteEditCtrl',
                            controllerAs: 'MyRouteEdit'
                        }
                    }

                })
            .state('tab.my_route_detail',
                {
                    'url': '/my_route_detail/:id',
                    views: {
                        'center-content': {
                            templateUrl: 'template/me/my_route_detail.html',
                            controller: 'MyRouteDetailCtrl',
                            controllerAs: 'MyRouteDetail'
                        }
                    }

                })
            .state('tab.my_truck_list', {
                'url': '/my_truck_list',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/my_truck_list.html',
                        controller: 'MyTruckListCtrl',
                        controllerAs: 'MyTruckList'
                    }
                }
            })
            .state('tab.my_truck_new',
                {
                    'url': '/my_truck_new',
                    views: {
                        'center-content': {
                            templateUrl: 'template/me/my_truck_new.html',
                            controller: 'MyTruckNewCtrl',
                            controllerAs: 'MyTruckNew'
                        }
                    }
                })
            // 仓库管理
            .state('tab.companyStore', {
                url: '/companyStore'
                , views: {
                    'center-content': {
                        templateUrl: 'template/me/companyStore.html'
                        , controller: 'companyStoreCtrl'
                    }
                }
            })
            //物流管理
            .state('tab.passManage', {
                url: '/pass_manage',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/pass/passManage.html'
                        //, controller: 'PassManageCtrl'
                    }
                }
            })
            //我的需求单
            .state('tab.passManage.demand', {
                url: '/demand'
                , views: {
                    'child-view': {
                        templateUrl: 'template/me/pass/passManageDemand.html'
                        , controller: 'passManageDemand'
                    }
                }
            })
            .state('tab.passManageTrade', {
                url: '/pass_manage_trade'
                , views: {
                    'center-content': {
                        templateUrl: 'template/me/pass/tradePassManage.html'
                        //, controller: 'TrafficPassManageCtrl'
                    }
                }
            })
            .state('tab.passManageTraffic', {
                url: '/pass_manage_traffic'
                , views: {
                    'center-content': {
                        templateUrl: 'template/me/pass/trafficPassManage.html'
                        //, controller: 'TradePassManageCtrl'
                    }
                }
            })

            .state('tab.AddCar', {
                url: '/add_car/:type',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/car/addCar.html',
                        controller: 'AddCarCtrl'
                    }
                }
            })
            //给司机分配线路
            .state('tab.Roadline', {
                url: '/road_line',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/roadLine/roadLine.html'
                        //controller: 'roadLineCtrl'
                    }
                }
            })
            //添加线路
            .state('tab.AddLine', {
                url: '/add_line',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/roadLine/addLine.html'
                        //controller: 'roadLineCtrl'
                    }
                }
            })
            //线路管理
            .state('tab.roadLineDetail', {
                url: '/road_line_detail/:line_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/roadLine/roadLineDetail.html'
                        //controller: 'roadLineDetailCtrl'
                    }
                }
            }) //线路详情

            .state('tab.MyStoresList', {
                url: '/my_stores_list',
                views: {
                    'center-content': {
                        templateUrl: 'template/store/myStoresList.html'
                        //controller: 'roadLineDetailCtrl'
                    }
                }
            })
            //以线路的形式显示 ，暂时不用
            .state('tab.MyCarList', {
                url: '/my_car_list',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/car/myCarList.html',
                        controller: 'MyCarListCtrl'
                    }
                }
            })
            //按照车辆类型显示
            .state('tab.MyCarListGroupByType', {
                url: '/my_car_list_group_by_type',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/car/myCarListGroupByType.html',
                        controller: 'MyCarListGroupByType'
                    }
                }
            })
            .state('tab.CarDetail', {
                url: '/car_detail/:car_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/car/carDetail.html',
                        //controller: 'CarDetailCtrl',
                        //resolve: {
                        //    userToken: function ($q, $log, authenticationService) {
                        //        return {value: 'dd'}
                        //    }
                        //
                        //}
                    },


                }
            })
            // 20160115 我的已完成订单
            .state('tab.myOrderList', {
                url: '/my_order_list',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/my_order_list.html'
                    }
                }
            })//已完成订单页面
            .state('tab.myOrderList1', {
                url: '/my_order_list1/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/my_order_list_1.html'
                    }
                }
            })//已完成订单详情
            .state('tab.driverAttention', {
                url: '/driver_attention',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/driver-attention.html',
                        // controller: 'DriverAttentionCtrl'

                    }
                }
            })
            // 物流认证车辆页面
            .state('tab.carReview', {
              url: '/carReview/:car_id/:create_user_id',
              views: {
                'center-content': {
                  templateUrl: 'template/me/car/carReview.html',
                   //controller: 'carReview'
                }
              }
            })

            .state('tab.my_company_certification', {
              url: '/myCompanyCertification.html',
              views: {
                'center-content': {
                  templateUrl: 'template/me/my_company_certification.html',
                }
              }
            })


    }])
