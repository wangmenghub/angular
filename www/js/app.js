// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

/*
 *
 * rsc.development.config
 * rsc.production.config
 *
 * */
angular.module('rsc', [
    'ionic',
    'ngCordova',
    'ui.router',
    'ngFileUpload',
    'ngMessages',
    "restangular",
    'rsc.controllers',
    'rsc.directive',
     'rsc.development.config',
     //  'rsc.production.config',
    'angular-linq',
    //'rsc.routers',
    'rsc.controllers.account',
    'rsc.controllers.me',
    'rsc.controllers.welcome',
    'rsc.controller.tab',
    'rsc.controllers.driver',
    'rsc.controllers.common',
    'rsc.service.common',
    'rsc.service.account',
    'rsc.service.rest',
    'rsc.service.pass',
    'rsc.service.driver',
    'rsc.service.credit',
    'rsc.controllers.trace',
    'rsc.service.store',
    //'rsc.map.service',

    'rsc.controller.pass',
    'rsc.filters',
    'rsc.routers.158',
    'rsc.routers.me',
    'rsc.routers.test',
    'rsc.routers.pass',
    'rsc.routers.pro',
    'rsc.routers.account',
    'rsc.routers.driver',
    'rsc.routers.common',
    'rsc.controllers.ebank',
    'rsc.routers.new',
    'rsc.directives.me',
    'rsc.controllers.driver',
    'rsc.controllers.credit',
    'ngClipboard',
    'ui.bootstrap',
    'ionic-citydata',
    'ionic-citypicker',
    'rsc.areas',
    'timer'

])

    .run(['$rootScope', '$ionicPlatform', '$log', '$state', '$stateParams', '$cacheFactory', 'iAlert', function
        ($rootScope, $ionicPlatform, $log, $state, $stateParams, $cacheFactory, iAlert,$cordovaSplashscreen) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
        if(ionic.Platform.isWebView()){
            setTimeout(function() {
                $cordovaSplashscreen.hide();
            }, 2000);
        }

        moment.locale('zh-cn', {
            longDateFormat: {
                LT: "Ah点mm分",
                LTS: "h:mm:ss A",
                L: "MM/DD/YYYY",
                l: "M/D/YYYY",
                LL: "YYYY年MM月D日",
                ll: "MMM D YYYY",
                LLL: "MMMM Do YYYY LT",
                lll: "MMM D YYYY LT",
                LLLL: "dddd, MMMM Do YYYY LT",
                llll: "ddd, MMM D YYYY LT"
            }
            , meridiem: function (hour, minute, isLower) {
                var hm = hour * 100 + minute;
                if (hm < 600) {
                    return '凌晨';
                } else if (hm < 900) {
                    return '早上';
                } else if (hm < 1130) {
                    return '上午';
                } else if (hm < 1230) {
                    return '中午';
                } else if (hm < 1800) {
                    return '下午';
                } else {
                    return '晚上';
                }
            }
        });
        $rootScope.version = '0.5.2_20160126_1800';
        $rootScope._innerWidth = window.innerWidth
        $rootScope._isHideFloor = false; //底部导航默认不显示
        $rootScope.showScroll = false;
        $rootScope.$on('$stateChangeSuccess', function (event, toState, roParams, fromState, fromParams) {
            //$log.debug('root.Success', arguments);
        });
        $rootScope.$on('$stateChangeError', function (event, toState, roParams, fromState, fromParams, error) {
            //$log.debug('root.Error', arguments);
            //$log.info(arguments);
            if (!error.islogin) {
                iAlert.alert('欢迎使用，请先登录!')
                $state.go('tab.login')
            } else {
                $log.error(error);
            }
        });
        $rootScope.$on('$stateChangeStart', function (event, toState, roParams, fromState, fromParams) {
            //$log.debug('root.Start', arguments);
            if(['/myRsc','/rush','/rushTransp','/eBankIncome','/welcome'].indexOf(toState.url)!=-1){
                //并设置显示底部
                $rootScope._isHideFloor = true
            }else{
                $rootScope._isHideFloor = false
            }

        });
        $rootScope.goBack = function () {
            window.history.go(-1);
        }
        //
        //var cachetest = $cacheFactory('cache');
        //cachetest.put('data', null)

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .config(function (ENV, $stateProvider,
                      $urlRouterProvider,
                      $ionicConfigProvider,
                      RestangularProvider,
                      $logProvider,
                      $httpProvider,
                      ngClipProvider) {
        //bMapServiceProvider.setDefaultPosition(121.49576, 31.240998);

        //$httpProvider.interceptors.push(function() {
        //    return {
        //        'request': function(config) {
        //            config.headers['x-access-token'] = window.JSON.parse(window.sessionStorage.getItem('userInfo')).token;
        //            return config;
        //        }
        //    };
        //});
        ngClipProvider.setPath("../lib/zeroclipboard/dist/ZeroClipboard.swf");

        $httpProvider.interceptors.push('AuthInterceptor');

        RestangularProvider.setBaseUrl(ENV.api.account);
        //$logProvider.debugEnabled(false);

        //RestangularProvider.setDefaultHeaders({token: "x-restangular"});

        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('left');

        $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
        $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

        $ionicConfigProvider.platform.ios.views.transition('ios');
        $ionicConfigProvider.platform.android.views.transition('android');

        if (ionic.Platform.isWebView()) {
            $ionicConfigProvider.scrolling.jsScrolling(ENV.scroll);
        } else {
            $ionicConfigProvider.scrolling.jsScrolling(!ENV.scroll);

        }

        // $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        $stateProvider
            .state(
            'tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'template/tab.html',
                controller: 'tabCtrl'
            })
            // .state('tab.register', {
            //     url: '/register',
            //     views: {
            //         'center-content': {
            //             templateUrl: 'template/general/register.html',
            //             controller: 'RegisterCtrl'
            //         }

            //     }
            // })//企业基础注册
            .state('tab.login', {
                url: '/login',
                views: {
                    'center-content': {
                        templateUrl: 'template/general/login.html',
                        controller: 'loginCtrl'
                    }

                }
            }) //登录

            /*////////////////////////////////交易//////////////////////////////*/

            //采购抢单
            .state('tab.rushList', {   //??? 用于什么情况下
                url: '/rushList',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushList.html',
                        //controller: 'rushListCtrl'
                    }

                }
            }) //采购抢单列表

            .state('tab.rushMap', {
                url: '/rushMap',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushMap.html',
                        //controller: 'rushMapCtrl'
                    }

                }
            }) //采购地图模式

            .state('tab.rushSearchAdv', {
                url: '/rushSearchAdv/:obj',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushSearchAdv.html'
                        //controller: 'rushCtrl'
                    }

                }
            }) //搜索采购

            .state('tab.supply', {
                url: '/supply',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/supply.html'
                        //controller: 'supplyCtrl'
                    }

                }
            }) //现货供应
            .state('tab.supplyList', {
                url: '/supplyList',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/supplyList.html'
                        //controller: 'supplyListCtrl'
                    }

                }
            }) //现货挂牌
            .state('tab.supplySearchAdv', {
                url: '/supplySearchAdv',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/supplySearchAdv.html'
                        //controller: 'supplySearchAdvCtrl'
                    }

                }
            }) //搜索现货
            .state('tab.tradeAgreement', {
                url: '/tradeAgreement',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeAgreement.html'
                        //controller: 'tradeAgreementCtrl'
                    }

                }
            }) //违约条款
            .state('tab.supplyMap', {
                url: '/supplyMap',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/supplyMap.html'
                        //controller: 'supplyMapCtrl'
                    }

                }
            }) //现货地图模式
            .state('tab.supplyDetail', {
                url: '/supplyDetail',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/supplyDetail.html'
                        //controller: 'supplyDetailCtrl'
                    }

                }
            }) //现货详情
            .state('tab.matchTransp', {
                url: '/matchTransp',

                views: {
                    'center-content': {
                        templateUrl: 'template/158/matchTransp.html'
                        //,controller: 'matchTranspCtrl'
                    }

                }
            }) //匹配物流

            /*///////////////////////////////销售方///////////////////////////////////*/

            .state('tab.supplyPublish', {
                url: '/supplyPublish',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/supplyPublish.html'
                        , controller: 'supplyPublishCtrl'
                    }

                }
            }) //发布现货
            .state('tab.rushPublish2', {
                url: '/rushPublish2',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/rushPublish2.html'
                        // ,controller: 'rushPublish2Ctrl'
                    }

                }
            }) //发起物流抢单


            /*////////////////////////////////交易订单//////////////////////////////*/


            .state('tab.tradeOrder2-1', {
                url: '/tradeOrder2-1',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder2-1.html'
                        //controller: 'tradeOrder2-1Ctrl'
                    }

                }
            }) //现货订单-运输
            .state('tab.tradeOrder2-2', {
                url: '/tradeOrder2-2',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder2-2.html'
                        //controller: 'tradeOrder2-2Ctrl'
                    }

                }
            }) //现货订单-收货
            .state('tab.tradeOrder2-2-1', {
                url: '/tradeOrder2-2-1',
                //templateUrl: 'template/158/158-1.html'
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder2-2-1.html'
                        //controller: 'tradeOrder2-2-1Ctrl'
                    }

                }
            }) //现货订单-收货2


            //现货订单-
            /*///////////////////////////////销售方///////////////////////////////////*/

            .state('tab.tradeOrder-1-1', {
                url: '/tradeOrder-1-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder-1-1.html'
                        //controller: 'tradeOrder-1-1Ctrl'
                    }

                }
            }) //现货订单-已关注物流列表


            //抢货源详情
            .state('tab.rushTranspRushEdit', {
                url: '/rushTranspRush/:type/:demand_id/:offer_id',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/rushTranspRush.html',

                        //controller: 'rushTranspRushCtrl'
                    }

                }
            }) //立即抢单
            .state('tab.passOrder1', {
                url: '/passOrder1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder1.html'
                        //controller: 'passOrder1Ctrl'
                    }

                }
            }) //物流订单-确认预付款
            .state('tab.passOrder1-1', {
                url: '/passOrder1-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder1-1.html'
                        //controller: 'passOrder1-1Ctrl'
                    }

                }
            }) //选择车辆信息（物流订单-确认预付款）
            .state('tab.passOrder1-2', {
                url: '/passOrder1-2',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder1-2.html'
                        //controller: 'passOrder1-2Ctrl'
                    }

                }
            }) //选择司机（物流订单-确认预付款）
            .state('tab.passOrder2', {
                url: '/passOrder2',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2.html'
                        //controller: 'passOrder2Ctrl'
                    }

                }
            }) //物流订单-确认收预付款
            .state('tab.passOrder2-1', {
                url: '/passOrder2-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-1.html'
                        //controller: 'passOrder2-1Ctrl'
                    }

                }
            }) //物流订单-物流开始
            .state('tab.passOrder2-2', {
                url: '/passOrder2-2',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-2.html'
                        //controller: 'passOrder2-2Ctrl'
                    }

                }
            }) //查看车辆信息
            .state('tab.passOrder2-3', {
                url: '/passOrder2-3',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-3.html'
                        //controller: 'passOrder2-3Ctrl'
                    }

                }
            }) //物流状态-开始运输
            .state('tab.passOrder2-4', {
                url: '/passOrder2-4',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-4.html'
                        //controller: 'passOrder2-4Ctrl'
                    }

                }
            }) //车辆信息-运输途中1备注
            .state('tab.passOrder2-5', {
                url: '/passOrder2-5',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-5.html'
                        //controller: 'passOrder2-5Ctrl'
                    }

                }
            }) //车辆信息-运输途中2（有故障车）
            .state('tab.passOrder2-6', {
                url: '/passOrder2-6',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-6.html'
                        //controller: 'passOrder2-6Ctrl'
                    }

                }
            }) //选择替换司机1
            .state('tab.passOrder2-7', {
                url: '/passOrder2-7',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-7.html'
                        //controller: 'passOrder2-7Ctrl'
                    }

                }
            }) //物流订单-运输详情
            .state('tab.passOrder2-8', {
                url: '/passOrder2-8',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-8.html'
                        //controller: 'passOrder2-8Ctrl'
                    }

                }
            }) //物流订单-运输详情2备注
            .state('tab.passOrder2-9', {
                url: '/passOrder2-9',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-9.html'
                        //controller: 'passOrder2-9Ctrl'
                    }

                }
            }) //物流订单-运输3实时定位
            .state('tab.passOrder2-10', {
                url: '/passOrder2-10',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder2-10.html'
                        //controller: 'passOrder2-10Ctrl'
                    }

                }
            }) //物流订单-物流完成
            .state('tab.passOrder3', {
                url: '/passOrder3',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder3.html'
                        //controller: 'passOrder3Ctrl'
                    }

                }
            }) //物流订单-检验
            .state('tab.passOrder4', {
                url: '/passOrder4',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder4.html'
                        //controller: 'passOrder4Ctrl'
                    }

                }
            }) //物流订单-交割1 等待付款
            .state('tab.passOrder4-1', {
                url: '/passOrder4-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder4-1.html'
                        //controller: 'passOrder4-1Ctrl'
                    }


                }
            }) //物流订单-交割2 完成收款
            .state('tab.passOrder4-2', {
                url: '/passOrder4-2',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/passOrder4-2.html'
                        //controller: 'passOrder4-2Ctrl'
                    }

                }
            }) //物流订单-完成交割
            /*////////////////////////////////////////////////////////////*/
            .state('tab.myPass', {
                url: '/myPass',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/myPass.html'
                        //controller: 'myPassCtrl'
                    }

                }
            }) //物流我
            .state('tab.driver', {
                url: '/driver',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/driver.html'
                        //controller: 'driverCtrl'
                    }

                }
            }) //司机管理
            .state('tab.driver-1', {
                url: '/driver-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/driver-1.html'
                        //controller: 'driver-1Ctrl'
                    }

                }
            }) //分配司机
            .state('tab.driver-2', {
                url: '/driver-2',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/driver-2.html'
                        //controller: 'driver-2Ctrl'
                    }

                }
            })//主页(自己看)
            .state('tab.nameCard', {
                url: '/nameCard',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/nameCard.html'
                        //controller: 'nameCardCtrl'
                    }

                }
            }) //司机主页
            .state('tab.addLine', {
                url: '/addLine',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/addLine.html'
                        //controller: 'addLineCtrl'
                    }

                }
            }) //添加新线1
            .state('tab.matchLine', {
                url: '/matchLine',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/matchLine.html'
                        //controller: 'matchLineCtrl'
                    }

                }
            }) //添加完成
            .state('tab.addLine1', {
                url: '/addLine1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/addLine1.html'
                        //controller: 'addLine1Ctrl'
                    }

                }
            }) //添加完查看修改
            .state('tab.car', {
                url: '/car',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/car.html'
                        //controller: 'carCtrl'
                    }

                }
            }) //车辆管理1
            .state('tab.carInfor', {
                url: '/carInfor',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/carInfor.html'
                        //controller: 'carInforCtrl'
                    }

                }
            }) //车辆信息
            .state('tab.addCar', {
                url: '/addCar',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/addCar.html'
                        //controller: 'addCarCtrl'
                    }

                }
            }) //添加车辆


            .state('tab.transpSearch', {
                url: '/transpSearch',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/transpSearch.html'
                        //controller: 'transpSearchCtrl'
                    }

                }
            }) //找物流


            /*//////////////////////////////////////ebank/////////////////////////////////////////////*/
            .state('tab.ebank', {
                url: '/ebank',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/ebank.html',
                        controller: 'ebankCtrl'
                    }

                }
            }) //订单


            // general
            .state('tab.welcome', {
                url: '/welcome',
                views: {
                    'center-content': {
                        templateUrl: 'template/general/welcome.html'
                        , controller: 'welcomeCtrl'
                    }
                }
            })

            // 个人中心me

            // 158

            // ebank

            // pass

            // pro
            .state('tab.pro', {
                url: '/pro',
                views: {
                    'center-content': {
                        templateUrl: 'template/pro/pro.html'
                    }
                }
            })


            .state('tab.pass', {
                url: '/pass',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/pass.html',
                        //controller: 'RegisterCtrl'
                    }

                }
            })

            // .state('tab.me', {
            //     url: '/me',
            //     views: {
            //         'center-content': {
            //             templateUrl: 'template/me/me.html',
            //             //controller: 'RegisterCtrl'
            //         }

            //     }
            // })

            //.state('tab.me', {
            //    url: '/me',
            //    views: {
            //        'center-content': {
            //            templateUrl: 'template/me/me.html',
            //            controller: 'MeCtrl',
            //            resolve: {
            //                userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
            //                    var userToken = authenticationService.getUserInfo();
            //                    if (userToken) {
            //                        return $q.when(userToken);
            //                    }
            //                    else {
            //                        return $q.reject({islogin: false});
            //                    }
            //                }]
            //            }
            //        }
            //
            //    }
            //})

            .state('158-1', {
                url: '/158-1',
                templateUrl: 'template/158/158-1.html'
            })


        ;

        $urlRouterProvider.otherwise('/tab/welcome');

        //$urlRouterProvider.when('','/index');
        // $urlRouterProvider.otherwise('/tab/register');

    })
