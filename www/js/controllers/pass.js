/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.controller.pass', ['rsc.service.store'])
    /**
     * 物流需求单列表
     */
    .controller('rushTranspCtrl', ['$scope', 'StoreManage', 'PassService', '$log', '$state', 'PassSearchCondition', '$location', '$http', 'AccountInformation', '$ionicLoading', 'areas', 'authenticationService',
        function ($scope, StoreManage, PassService, $log, $state, PassSearchCondition, $location, $http, AccountInformation, $ionicLoading, areas, authenticationService) {
            //查询条件
            $scope.query = {
                page: 1,
                getType: 1,
                start_province: '',
                start_city: '',
                end_province: '',
                end_city: '',
                payment: '',
                category: '',
                min: '',
                max: '',
                sort: 'date',
                direction: false
            };
            $scope.navbar = {
                'navLeftHref': 'tab.'
                , 'navLeftIco': 'ion-android-pin'
                , 'navLeft': ''
                , 'title': '货源信息'
                , 'navRightHref': 'tab.'
                , 'navLeft': '发物流'
                , 'navLeftHref': 'tab.publishPass({id:""})'
            };

            var run = false;
            $scope.hasMore = false;
            $scope.conditions = {};


            $scope.queryDetail = {
                hide: false
            };
            $scope.selectd = {
                sort: true,
                area: true
            };
            $scope.amount = {};

            if (authenticationService.getUserInfo()) {
                $scope.userInfo = authenticationService.getUserInfo().user.role;
                if ($scope.userInfo == 'TRAFFIC_ADMIN') {
                    $scope.navbar.navRightHref = 'tab.carTeam';
                    $scope.navbar.navRight = '组建车队';

                }
            }


            var queryAction = function () {
                if (!run) {
                    $ionicLoading.show();
                    run = true;
                    AccountInformation.passDemandFind($scope.query).then(function (result) {
                            run = false;
                            $log.info('获取物流需求单', result);
                            if (result.status == 'success') {

                                $scope.hasMore = result.data.exist;
                                if ($scope.query.getType == 3) {
                                    if ($scope.orders) {
                                        $scope.orders = $scope.orders.concat(result.data.demands);
                                    } else {
                                        $scope.orders = result.data.demands;
                                    }
                                } else {
                                    $scope.orders = result.data.demands;
                                }
                            } else {
                                $log.info('', result);
                                run = false;
                            }
                        }, function () {
                            run = false;
                        }
                    ).finally(function () {
                        $ionicLoading.hide();
                    })
                } else {
                    if ($scope.query.getType == 3) {
                        $scope.query.page -= 1;
                    }
                }
            };

            $scope.init = function () {
                $scope.query.getType = 1;
                queryAction($scope.query);

                queryAmountCount();

                $scope.conditions.amount = PassSearchCondition.amount;
                $scope.conditions.areas = PassSearchCondition.areas;
                $scope.conditions.payType = PassSearchCondition.payType;


                $scope.allProvinces = [];


                for (var i in areas.provinces) {
                    $scope.allProvinces[i - 1] = areas.provinces[i]
                }
                $scope.cities = [];
                $scope.endCities = [];
                $scope.areas = [];
                $scope.data = {};
                // $scope.data = {
                //         currentProvinceId: 0,
                //         currentCityId: 0,
                //         currentAreaId: 0
                // };
                $scope.switchProvince = function (currentProvinceId, type) {


                    if (type == 'start') {
                        $scope.cities = [];
                        $scope.query.start_city = '';
                    } else {
                        $scope.endCitie = [];
                        $scope.query.end_city = '';
                    }
                    for (var i in areas.citys[currentProvinceId]) {
                        if (type == 'start') {
                            $scope.cities.push(areas.citys[currentProvinceId][i])
                        } else {
                            $scope.endCities.push(areas.citys[currentProvinceId][i])
                        }
                    }

                    $scope.selectd.area = false;

                    if (type !== 'start') {
                        if ($scope.data.startProvince) {
                            $scope.query.start_province = $scope.data.startProvince.name;
                        } else {
                            $scope.query.start_province = '';
                            $scope.query.start_city = '';
                        }
                    } else {
                        if ($scope.data.endProvince) {
                            $scope.query.end_province = $scope.data.endProvince.name;
                        } else {
                            $scope.query.end_province = '';
                            $scope.query.end_city = '';

                        }
                    }
                    queryAction();

                };
                $scope.switchCity = function (currentCityId, type) {

                    if (type == 'start') {
                        if ($scope.data.startCity) {
                            $scope.query.start_city = $scope.data.startCity.name;
                        } else {
                            $scope.query.start_city = '';
                        }
                    } else {

                        if ($scope.data.endCity) {
                            $scope.query.end_city = $scope.data.endCity.name;
                        } else {
                            $scope.query.end_city = '';
                        }
                    }
                    queryAction();
                };


            };
            //查询总吨数
            var queryAmountCount = function () {
                PassService.getAllAmount().then(function (result) {
                    if (result.status == 'success') {
                        $scope.amount.count = result.data;
                    } else {
                        $scope.amount.count = 0;
                    }
                });
            };
            //选择区域
            $scope.selectedArea = function (item) {
                item.default = true;
                var ss = _.filter($scope.conditions.areas, function (areas) {
                    return areas.value != item.value;
                });
                ss.forEach(function (s) {
                    s.default = false;
                });

                $scope.query.start_city = item.value;
                console.log('条件', $scope.query);
                queryAction();

            };
            $scope.selectedAmount = function (item) {
                item.default = true;

                var ss = _.filter($scope.conditions.amount, function (amount) {
                    return amount.min != item.min;
                });
                ss.forEach(function (s) {
                    s.default = false;
                });

                $scope.query.min = item.min;
                $scope.query.max = item.max;

                queryAction();

            };
            $scope.selectedPayType = function (item) {
                item.default = true;
                var ss = _.filter($scope.conditions.payType, function (amount) {
                    return amount.value != item.value;
                });
                ss.forEach(function (s) {
                    s.default = false;
                });

                $scope.query.payment_choice = item.value;
                queryAction();

            };

            $scope.areaSelect = function () {
                $scope.selectd.area = true;
                $scope.cities = [];
                $scope.endCities = [];
                $scope.data = {};

                $scope.query.start_province = '';
                $scope.query.start_city = '';
                $scope.query.end_province = '';
                $scope.query.end_city = '';

                queryAction();

            };
            $scope.orderByTime = function () {
                $scope.query.sort = 'date';
                $scope.query.getType = 1;
                $scope.query.direction = !$scope.query.direction;
                $scope.selectd.sort = true;
                //var query = angular.extend($scope.query, {order: 'data'});
                queryAction();
            };

            $scope.orderByAmount = function () {
                $scope.query.sort = 'amount';
                $scope.query.direction = !$scope.query.direction;
                $scope.query.getType = 1;
                //var query = angular.extend($scope.query, {order: 'amount'});
                queryAction();
                $scope.selectd.sort = false;
            };

            //无限加载执行的方法
            $scope.loadMore = function () {
                $scope.query.page += 1;
                $scope.query.getType = 3; //加载更多
                queryAction();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
            //下拉刷新执行方法
            $scope.doRefresh = function () {
                //页面在顶部的时候为第一页
                queryAmountCount();

                $scope.query.page = 1;
                $scope.query.getType = 2; //刷新
                queryAction();
                $scope.$broadcast('scroll.refreshComplete');
            };


            $scope.searchForMainPage = function (item) {
                item.default = true;
                var ss = _.filter($scope.conditions.areas, function (areas) {
                    return areas.value != item.value;
                });
                ss.forEach(function (s) {
                    s.default = false;
                });

                //$scope.query.start_city = item.value;
                $scope.query.start_province = item.value;
                $log.info('条件', $scope.query);
                queryAction();
            };
            //列表详情跳转
            $scope.goDetail = function (item) {
                $state.go('tab.rushTranspDetail', {demand_id: item._id});
            }
        }])
    .controller('TranspSearchAdvController', function ($scope, $filter, $state, PassSearchCondition, $ionicPopup, AccountInformation, ListConfig, iAlert) {

        $scope.query = {
            page: 1,
            getType: 1,
            start_province: '',
            start_city: '',
            end_province: '',
            end_city: '',
            payment: '',
            category: '',
            min: '',
            max: '',
            sort: 'date',
            direction: true
        };
        var run = false;
        $scope.hasMore = true;
        $scope.area = {
            end: {},
            start: {}
        };
        $scope.selectd = {
            sort: true,
            area: true
        };

        $scope.conditions = {
            amoutText: ''
        };

        $scope.selectAmount = function () {

            $scope.popup_lists = ListConfig.getAmountList();
            var object = {
                templateUrl: './template/common/popup_radio.html', title: '选择重量范围'
            };
            var objmsg = {type: 'radioObject'};
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                // console.log(res)
                if (res) {
                    $scope.query = _.extend($scope.query, res.subtype.eng);
                    $scope.conditions.amoutText = res.subtype.chn;
                } else {
                    $scope.query.max = '';
                    $scope.query.min = '';
                }
            })
        };

        $scope.selectArea = function (type) {
            var data = {area: true};
            var obj = {templateUrl: '/template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if (type == 'start') {

                        if (res.currentProvince) {
                            $scope.query.start_province = res.currentProvince.name;
                        }
                        if (res.currentCity) {
                            $scope.query.start_city = res.currentCity.name;
                        }
                        $scope.area.start.text = $filter('addressText')(res);
                    } else {

                        if (res.currentProvince) {
                            $scope.query.end_province = res.currentProvince.name;
                        }
                        if (res.currentCity) {
                            $scope.query.end_city = res.currentCity.name;
                        }
                        $scope.area.end.text = $filter('addressText')(res);
                    }
                } else {
                    if (type == 'start') {
                        $scope.area.start.text = '';
                        $scope.query.start_province = '';
                        $scope.query.start_city = '';

                    } else {
                        $scope.area.end.text = '';
                        $scope.query.end_province = '';
                        $scope.query.end_city = '';
                    }
                }
            })
        };
        $scope.init = function () {
            //$scope.conditions.areas = PassSearchCondition.areas;
            //$scope.conditions.payType = PassSearchCondition.payType;

        };
        $scope.orderByTime = function () {
            $scope.query.sort = 'date';
            $scope.query.getType = 1;
            $scope.selectd.sort = true;
            $scope.query.direction = !$scope.query.direction;

            //var query = angular.extend($scope.query, {order: 'data'});
            queryAction();
        };
        $scope.orderByAmount = function () {
            $scope.query.sort = 'amount';
            $scope.query.getType = 1;
            $scope.query.direction = !$scope.query.direction;
            //var query = angular.extend($scope.query, {order: 'amount'});
            queryAction();
            $scope.selectd.sort = false;
        };

        $scope.loadMore = function () {
            $scope.query.page += 1;
            $scope.query.getType = 3; //加载更多
            queryAction();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.doRefresh = function () {
            //页面在顶部的时候为第一页

            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            queryAction();
            $scope.$broadcast('scroll.refreshComplete');
        };


        $scope.search = function () {
            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            queryAction();
        };
        $scope.searchMap = function () {
            iAlert.alert('敬请期待!')
        };

        $scope.goDetail = function (item) {
            $state.go('tab.rushTranspDetail', {demand_id: item._id});
        };

        var queryAction = function () {
            if (!run) {
                run = true;
                AccountInformation.passDemandFind($scope.query).then(function (result) {
                        run = false;
                        if (result.status == 'success') {
                            console.log('$scope.query', $scope.query);
                            $scope.hasMore = result.data.exist;
                            if ($scope.query.getType == 3) {
                                if ($scope.orders) {
                                    $scope.orders = $scope.orders.concat(result.data.demands);
                                } else {
                                    $scope.orders = result.data.demands;
                                }
                            } else {
                                $scope.orders = result.data.demands;
                            }
                        } else {
                            run = false;
                        }
                    }, function () {
                        run = false;
                    }
                )
            } else {
                if ($scope.query.getType == 3) {
                    $scope.query.page -= 1;
                }
            }
        };
    })
    //抢单详情列表
    .controller('rushTranspDetailCtrl', ['$scope', '$ionicModal', '$filter', 'iAlert', '$rootScope', '$log', '$stateParams', '$state', 'PassService', 'StoreManage', 'AccountInformation', 'authenticationService', '$ionicLoading', '$ionicPopup',
        function ($scope, $ionicModal, $filter, iAlert, $rootScope, $log, $stateParams, $state, PassService, StoreManage, AccountInformation, authenticationService, $ionicLoading, $ionicPopup) {
            //$scope.data = {
            //    demand: null,
            //    offers: null
            //}
            $scope.offerQuery = {
                order: 'data',
                pageSize: '1',
                getType: 1
            };

            var run = false;
            $scope.hasMore = true;
            $scope.backType = $stateParams.backtype;

            $scope.selected = {
                sort: "price"
            };
            $scope.company = {};

            $scope.address = {};

            $scope.title = {};

            $scope.canOffer = false;

            $scope.offers = {
                count: 0
            };
            $scope.user = authenticationService.getCompanyInfo();
            $scope.offerQuery = {};

            $scope.loadData = function () {
                $ionicLoading.show();
                PassService.getDemandById($stateParams.demand_id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.order = result.data;
                        $log.info('物流需求单详情', result);
                        AccountInformation.getCompanyinfoById($scope.order.company_id).then(function (result) {
                            if (result.status == 'success') {
                                $scope.company.companyName = result.data.nick_name ? result.data.nick_name : result.data.full_name;
                                if (result.data.verify_phase == 'SUCCESS') {
                                    $scope.company.isVerifySuccess = true;
                                } else {
                                    $scope.company.isVerifySuccess = false;

                                }
                            }
                        });
                        //判断是否超时
                        $scope.timeOut = $filter('timeOut')($scope.order.time_validity);

                        if ($scope.order.type != "TWO") {
                            StoreManage.getInfoById($scope.order.location_arrival).then(function (result) {
                                $scope.title.end = result.province;
                                $scope.address.location_arrival = $filter('rsc.address')(result);

                            });
                            StoreManage.getInfoById($scope.order.location_depart).then(function (result) {
                                $scope.title.begin = result.province;
                                $scope.address.location_depart = $filter('rsc.address')(result);
                            });
                        } else {
                            $scope.address.location_arrival = $scope.order.send_province + $scope.order.send_city + $scope.order.send_district + $scope.order.send_addr;
                            $scope.address.location_depart = $scope.order.receive_province + $scope.order.receive_city + $scope.order.receive_district + $scope.order.receive_addr;
                        }

                        $scope.offerQuery = {
                            demand_id: $scope.order._id,
                            order: 'price',
                            pageSize: '1',
                            getType: 1
                        };
                        queryAction();

                        PassService.checkDemandAuthority($stateParams.demand_id).then(function (result) {
                            if (result.status == 'success') {
                                $log.info('判断用户是否有权限', result.data);
                                $scope.hasAuthority = result.data;
                                $ionicLoading.hide();

                            } else {
                                $log.error('判断用户是否有权限', result);
                                $scope.hasAuthority = false;
                                $ionicLoading.hide();
                            }
                        })

                        //TODO 如果抢单是全网性的
                        PassService.getCompanyOfferCountByDemandId($stateParams.demand_id).then(function (result) {
                            if (result.status == 'success') {
                                $log.info('获取当前公司是否对该抢单是否有权限', result);
                                $scope.hasOffer = result.data.hasOffer > 0;
                                //如果订单不是全网性的则直接可抢单
                                if (!$scope.order.verify_need) {
                                    $scope.canOffer = true;
                                } else {
                                    $scope.canOffer = result.data.canOffer;
                                }
                            } else {
                                $scope.hasOffer = false;
                                $scope.canOffer = false;
                            }
                        })

                    }
                });


            };

            var queryAction = function () {
                if (!run) {
                    $ionicLoading.show();
                    run = true;
                    PassService.getOfferList($scope.offerQuery).then(function (result) {
                        run = false;
                        if (result.status == 'success') {
                            $scope.hasMore = result.data.exist;
                            $scope.offers.count = result.data.offers.length;

                            if ($scope.offerQuery.getType == 3) {
                                if ($scope.offerlist) {
                                    $scope.offerlist = $scope.offerlist.concat(result.data.offers);
                                } else {
                                    $scope.offerlist = result.data.offers;
                                }
                            } else {
                                $scope.offerlist = result.data.offers;
                            }
                        } else {
                            $log.info('获取抢单列表失败', result);
                            run = false;
                        }
                    }).finally(function () {
                        run = false;
                        $ionicLoading.hide();
                    });
                } else {
                    if ($scope.query.getType == 3) {
                        $scope.query.page -= 1;
                    }
                }

            };
            $scope.goNext = function () {
                if ($scope.hasOffer) {
                    iAlert.alert('本公司已有报价!');
                    return;
                }
                $state.go('tab.rushTranspRush', {demand_id: $scope.order._id});
            };
            $scope.companyCertification = function () {
                iAlert.confirm('提示', '是否确定申请该公司认证!', function () {
                    AccountInformation.apply($scope.order.company_id).then(function (result) {
                        if (result.status == 'success') {
                            iAlert.alert('申请成功!');
                        } else {
                            iAlert.alert('申请失败!');
                        }
                    })
                })
            }
            $scope.query = function (order) {
                $scope.offerQuery.getType = 1;

                $scope.offerQuery.order = order;


                $scope.selected.sort = order;
                //if (order == 'price') {
                //    $scope.selected.sort = true;
                //} else {
                //    $scope.selected.sort = false;
                //}

                queryAction();
            };
            $scope.showPopup = function (value) {
                $scope.ammount = {};
                $scope.offer = value;
                console.log(value);
                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="number"  ng-model="ammount.wifi">',
                    title: '请输入吨数',
                    subTitle: '大于等于' + value.min + '小于等于' + value.amount,
                    scope: $scope,
                    buttons: [
                        {text: '取消'},
                        {
                            text: '<b>确定</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.ammount.wifi) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    return $scope.ammount.wifi;
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function (res) {
                    console.log('Tapped!', res);
                });
            };
            //TODO 选单待优化
            $scope.selectedChange = function (value, $event) {
                if (!value.select) {
                    iAlert.popup('提示', '确定针对该抢单下订单?', function () {
                        if ($scope.order.can_join) {
                            $scope.popup_lists = [{eng: "amount", chn: '输入吨数'}];
                            var object = {
                                templateUrl: './template/common/popup_radio.html',
                                title: '大于等于' + value.min + '小于等于' + value.amount
                            };
                            var objmsg = {type: 'number'}    //type类型有radio,text,number3种类型
                            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                                if (res) {
                                    if (res.subtype) {
                                        if (res.subtype.amount >= value.min && res.subtype.amount <= value.amount) {
                                            var postData = {offer_id: value._id, amount: res.subtype.amount};
                                            PassService.selectOffer(postData).then(function (result) {
                                                if (result.status == 'success') {
                                                    var order = result.data;
                                                    $state.go('tab.passOrder.Detail', {order_id: order._id});
                                                } else if (result.status == 'err') {
                                                    if (result.msg == 'offer_is_selected') {
                                                        iAlert.alert('已经选过该公司了,不能再次选择!');
                                                    } else {
                                                        $log.error('选择失败', result);
                                                        iAlert.alert('选择失败,请检查网络!');
                                                    }
                                                }
                                            })
                                        } else {
                                            iAlert.alert('必须大于等于' + value.min + '小于等于' + value.amount);
                                        }
                                    } else {
                                        //输入有误
                                        iAlert.alert('输入有误,必须是数字!');
                                    }
                                }
                            })
                        } else {
                            var postData = {offer_id: value._id};
                            PassService.selectOffer(postData).then(function (result) {
                                if (result.status == 'success') {
                                    var order = result.data;
                                    $state.go('tab.passOrder.Detail', {order_id: order._id});
                                    console.log(result);
                                } else if (result.status == 'err') {
                                    if (result.msg == 'offer_is_selected') {
                                        iAlert.alert('已经选过该公司了,不能再次选择!');
                                    } else {
                                        $log.error('选择失败', result);

                                    }
                                }
                            })
                        }
                    })

                } else {
                    $state.go('tab.passOrder.Detail', {order_id: value.order_id});
                }
            };
            //物流公司修改报价信息
            $scope.EditOffer = function (offer) {
                //修改报价信息
                console.log(offer);
                $state.go('tab.rushTranspRushEdit', {type: 'edit', offer_id: offer._id, demand_id: $scope.order._id});
            };

            //暂时未用
            $scope.goB = function () {
                if ($scope.backType == 'tab.rushTransp') {
                    $state.go($scope.backType)
                } else if ($scope.backType == 'tab.passManage.demand') {
                    $state.go($scope.backType)
                }
            };

            $scope.goBack = function () {
                window.history.go(-1);
            };

            //modal
            $ionicModal.fromTemplateUrl('./template/common/share.html', {
                scope: $scope,
                animation: 'slide-in-up',
                backdropClickToClose: true,
                hardwareBackButtonClose: true
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.share = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            });
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            });
            $scope.shared = function (type) {
                switch (type) {
                    case'sms' :
                        $state.go('tab.shareSMS', {type: 'trafficDemand', id: $scope.order._id});
                        break;
                    case 'wechat':

                        break;
                    default:
                        ;
                }

            };

            $scope.doRefresh = function () {
                //页面在顶部的时候为第一页
                $scope.loadData();
                $scope.$broadcast('scroll.refreshComplete');
            };


            $scope.loadMore = function () {
                $scope.offerQuery.page += 1;
                $scope.offerQuery.getType = 3; //加载更多
                queryAction();
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }])
    //物流抢单
    .controller('rushTranspRushCtrl', ['$scope', 'iAlert', '$filter', '$rootScope', '$log', '$stateParams', '$state', 'PassService', 'AccountInformation', 'StoreManage', '$ionicPopup',
        function ($scope, iAlert, $filter, $rootScope, $log, $stateParams, $state, PassService, AccountInformation, StoreManage, $ionicPopup) {
            $scope.demand_id = $stateParams.demand_id;
            if ($stateParams.type) {
                $scope.type = $stateParams.type;
                $scope.offer_id = $stateParams.offer_id;
            }
            $scope.company = {};

            $scope.address = {};

            $scope.title = {};

            $scope.offer = {};

            $scope.loadData = function () {
                PassService.getDemandById($stateParams.demand_id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.demand = result.data;
                        $log.info('需求单信息', result);
                        AccountInformation.getCompanyinfoById($scope.demand.company_id).then(function (result) {
                            if (result.status == 'success') {
                                $scope.company.companyName = result.data.nick_name;
                                if (result.data.verify_phase == 'SUCCESS') {
                                    $scope.company.isVerifySuccess = true;
                                } else {
                                    $scope.company.isVerifySuccess = false;
                                }
                            }
                        });

                        //AccountInformation.getAllCars(authenticationService.getUserInfo().user.company_id[0]).then(function (result) {
                        //    if (result.status == 'success') {
                        //        $scope.cars = result.data;
                        //        var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$._id', function (key, group) {
                        //            return {type: key, total: group.Count()}
                        //        }, function (key) {
                        //            return key.toString();
                        //        }).ToArray();
                        //        $scope.carTotal = queryResult;
                        //    }
                        //
                        //});
                        //StoreManage.getInfoById($scope.demand.location_arrival).then(function (result) {
                        //    $scope.title.end = result.province;
                        //    $scope.address.location_arrival = $filter('rsc.address')(result);
                        //});
                        //StoreManage.getInfoById($scope.demand.location_depart).then(function (result) {
                        //    $scope.title.begin = result.province;
                        //    $scope.address.location_depart = $filter('rsc.address')(result);
                        //});

                        if (!$scope.demand.can_join) {
                            $scope.offer.amount = $scope.demand.amount;
                        }

                    }
                })

                if ($stateParams.type && $stateParams.type == 'edit') {
                    //加载抢当信息
                    PassService.getOfferById($scope.offer_id).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('offer Info', result);
                            $scope.offer = result.data;

                        } else {
                            $log.error('offer Info', result);
                        }
                    })
                }
            };

            $scope.commit = function () {
                switch ($scope.offer.payment_method) {
                    case  'all_cash' :
                        //款到付货
                        $scope.offer.count_day_extension = null;
                        $scope.offer.ref_day_extension = null;
                        $scope.offer.percentage_remain = null;
                        $scope.offer.percentage_advance = null;
                        break;
                    case  'all_goods' :
                        //货到付款
                        $scope.offer.ref_day_extension = null;
                        $scope.offer.percentage_remain = null;
                        $scope.offer.percentage_advance = null;
                        break;
                    case  'partition' :
                        //分期
                        //$scope.offer.count_day_extension = null;
                        $scope.offer.ref_day_extension = null;
                        if (!$scope.offer.percentage_advance) {
                            iAlert.alert('预付款比例不能为空,且大于0小于等于100!');
                            return;

                        }
                        if(!$scope.offer.count_day_extension){
                            iAlert.alert('付款延期天数不能为空,且大于1小于等于180!');
                            return;
                        }

                        break;
                    case  'credit' :
                        //信用
                        $scope.offer.percentage_remain = null;
                        $scope.offer.percentage_advance = null;
                        break;
                }


                if ($scope.offer.price) {
                    //if ($scope.offer.price > $scope.demand.price) {
                    //    iAlert.alert('报价不能高于最高报价!');
                    //    return;
                    //} else if ($scope.offer.price < 1) {
                    //    iAlert.alert('报价应该大于1元/吨!');
                    //    return;
                    //}
                    if ($scope.offer.price > 9999999) {
                        iAlert.alert('报价应该小于10000000!');
                        return;
                    }

                } else {
                    iAlert.alert('报价不能为空,且不能为0!');
                    return;
                }


                //TODO 判断如果有质保款 则质保款大于0
                if ($scope.offer.exist_payment_final) {
                    if (!$scope.offer.percentage_remain || ($scope.offer.percentage_remain > 100 && $scope.offer.percentage_remain <= 0)
                    ) {
                        iAlert.alert('质保款比例应该大于0小于100!');
                        return;
                    } else if ($scope.offer.percentage_remain + $scope.offer.percentage_advance >= 100) {
                        iAlert.alert('首付款的比例和质保款比例之和要小于100!');
                        return;
                    }

                }


                if ($scope.demand.can_join) {
                    if ($scope.offer.min) {

                        if ($scope.offer.min > $scope.demand.amount_remain) {
                            iAlert.alert('最少吨数不能大于剩余吨数!');
                            return;
                        } else if ($scope.offer.min < 1) {
                            iAlert.alert('最少吨数必须大于1吨!');
                            return;
                        }


                        if ($scope.offer.amount) {
                            if ($scope.offer.min > $scope.offer.amount) {
                                iAlert.alert('最少吨数不能高于最多吨数!');
                                return;
                            }
                        }
                    } else {
                        iAlert.alert('最低吨数不能为空,且不能为0!');
                        return;
                    }


                    if ($scope.offer.amount) {
                        if ($scope.offer.amount > $scope.demand.amount_remain) {
                            iAlert.alert('最多吨数不能大于剩余吨数!');
                            return;
                        } else if ($scope.offer.amount < 1) {
                            iAlert.alert('最多吨数必须大于1吨!')
                        } else if ($scope.offer.min) {
                            if ($scope.offer.min > $scope.offer.amount) {
                                iAlert.alert('最多吨数不能低于最少吨数!');
                                return;
                            }
                        }
                    } else {
                        iAlert.alert('最多吨数不能为空,且不能为0!');
                        return;
                    }
                }

                //if ($scope.offer.style_payment) {
                //    if ($scope.offer.style_payment > $scope.demand.style_payment) {
                //        iAlert.alert('预付款不能高于需求单预付款!');
                //        return;
                //    }
                //} else {
                //    iAlert.alert('预付款比例不能为空!');
                //    return;
                //}

                //offer.amount||!offer.style_payment||!offer.price

                if ($scope.type && $scope.type == 'edit') {
                    var postData = angular.extend({offer_id: $scope.offer._id}, $scope.offer);
                    if ($scope.offer.modify_count > 0) {
                        PassService.offerEdit(postData).then(function (result) {
                            if (result.status == 'success') {
                                iAlert.alert('修改成功!');
                                $state.go('tab.rushTranspDetail', {demand_id: $scope.demand._id});
                            } else if (result.status == 'err') {
                                $log.info('postData', postData);
                                $log.info('修改失败', result);
                                if (result.msg == 'modify_count_max') {
                                    iAlert.alert('已经修改三次,不能再次修改!');
                                } else {
                                    iAlert.alert(result.msg);
                                }
                            }
                        })
                    } else {
                        iAlert.alert('已经修改三次,不能再次修改!');
                    }
                } else {
                    var postData = angular.extend({demand_id: $scope.demand._id}, $scope.offer);

                    $log.info('postData', postData);
                    PassService.offerCommit(postData).then(function (result) {
                        if (result.status == 'success') {
                            iAlert.alert('恭喜你抢单成功!');
                            $state.go('tab.rushTranspDetail', {demand_id: $scope.demand._id});
                        } else {
                            $log.error('抢单失败', result);
                            iAlert.alert(result.msg);
                        }
                    });
                }
            }
            //到货时间,提货时间
            $scope.changeDate = function (type) {
                var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
                var objmsg = {type: 'changeDate', minDate: moment().add('day', 0).format()}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.offer[type] = res.dt;
                        if ($scope.offer.time_depart && $scope.offer.time_arrival) {
                            if ($scope.offer.time_depart > $scope.offer.time_arrival) {
                                iAlert.alert('到货时间要大于等于提货时间!');
                                $scope.offer[type] = null;
                                return;
                            }
                        }
                    }
                })
            }
            //选择结算方式
            $scope.selPaymentChoice = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '结算方式'}
                var data = {type: 'radio'};
                $scope.popup_lists = [{eng: 'cash', chn: '现金结算'}, {eng: 'bill_bank', chn: '银行兑票'}
                    , {eng: 'bill_com', chn: '商业兑票'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        $scope.offer.payment_choice_obj = res.subtype;
                        $scope.offer.payment_choice = res.subtype.eng;
                    }

                })
            }
            //选择付款方式
            $scope.selPaymentMethod = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '付款方式'};
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'all_cash', chn: '款到发货'}, {eng: 'all_goods', chn: '货到付款'}
                    , {eng: 'partition', chn: '分期付款'}, {eng: 'credit', chn: '信用付款'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        $scope.offer.payment_method_obj = res.subtype;
                        $scope.offer.payment_method = res.subtype.eng;

                        //重置数据.
                        $scope.offer.percentage_advance = null;

                        $scope.offer.percentage_remain = null;

                        $scope.offer.exist_payment_final = false;
                    }


                })
            }
            $scope.selRefDayExtension = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '延期计算标准'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'order', chn: '双方确认订单日'}, {eng: 'goods', chn: '货到并完成质检日'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        $scope.offer.ref_day_extension_obj = res.subtype;
                        $scope.offer.ref_day_extension = res.subtype.eng;
                    }

                })
            }

            $scope.checkChange = function (value) {
                if (!value) {
                    $scope.offer.percentage_remain = 0;
                }
            }
        }])
    .controller('passRoadLineCtrl', function ($scope, AccountInformation, $state, $log) {
        $scope.init = function () {
            AccountInformation.getAllLine().then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取线路信息', result);
                    $scope.lines = result.data;

                } else {
                    $log.error('获取线路信息', result);
                }

            })
        };

        $scope.goDetail = function (line) {
            $state.go('tab.roadLineDetail', {line_id: line._id});
        }
    })
    .controller('roadLineDetailCtrl', function ($scope, iAlert, $state, $linq, $stateParams, AccountInformation, $log) {

        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '抢货源'
            , 'navRightHref': '#/tab/rushTranspDetail'
            , 'navRight': '短信'/*'分享'*/
            , 'navRightIco': ''
            , 'navRighthide': ''
        };


        $scope.line_id = $stateParams.line_id;

        //AccountInformation.getLineCarList($scope.line_id).then(function (result) {
        //    if (result.status == 'success') {
        //        $scope.lineCars = result.data;
        //        $scope.lineCars.count = result.data.length;
        //        $log.info('获取线路中所有车辆信息', result);
        //    } else {
        //        $log.error('获取线路中所有车辆信息', result);
        //    }
        //})
        //获取线路信息
        AccountInformation.getLineInfoById($scope.line_id).then(function (result) {
            if (result.status == 'success') {
                $log.info('获取线路信息', result);
                $scope.line = result.data;
                AccountInformation.getLinePriceList($scope.line_id).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('获取线路中车类型报价', result);
                        $scope.prices = result.data[0];

                        AccountInformation.getLineCarList($scope.line_id).then(function (result) {
                            if (result.status == 'success') {
                                $scope.cars = result.data;
                                var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                                    return {type: key, total: group.Count(), values: group}
                                }, function (key) {
                                    return key.toString();
                                }).ToArray();
                                $scope.carTypeList = queryResult;
                                console.log(queryResult);
                                //$scope.lineCars.count = result.data.length;
                                $log.info('获取线路中所有车辆信息', result);
                            } else {
                                $log.error('获取线路中所有车辆信息', result);
                            }
                        })
                    } else {
                        $log.error('获取线路中车类型报价', result);

                    }
                })

            } else {
                $log.error('获取线路信息', result)
            }
        });

        $scope.del = function (car) {


            iAlert.popup('提示', '是否移除', function (res) {
                AccountInformation.delCarFromLines($scope.line_id, [car._id]).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('移除成功', result);
                        $state.reload();
                    } else {
                        //修改失败
                        $log.error('移除失败', result);
                    }
                })
            });

            //iAlert.confirm('提示', '是否移除', function (res) {
            //    if (res) {
            //        AccountInformation.delCarFromLines($scope.line_id, [car._id]).then(function (result) {
            //            if (result.status == 'success') {
            //                $log.info('移除成功', result);
            //                $state.reload();
            //            } else {
            //                //修改失败
            //                $log.error('移除失败', result);
            //            }
            //        })
            //    }
            //})
        }
    })

    .controller('roadLineDetailCtrl-bak', function ($scope, $state, $stateParams, AccountInformation, $log) {
        //备份
        //包含线路车辆价格分类展示
        //线路详情
        //.state('tab.roadLineDetail', {
        //    url: '/road_line_detail/:line_id',
        //    views: {
        //        'center-content': {
        //            templateUrl: 'template/me/roadLine/roadLineDetail.html'
        //            //controller: 'roadLineDetailCtrl'
        //        }
        //    }
        //})

        $scope.navbar = {
            'navLeftHref': ''
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '抢货源'
            , 'navRightHref': '#/tab/rushTranspDetail'
            , 'navRight': '短信'/*'分享'*/
            , 'navRightIco': ''
            , 'navRighthide': ''
        }


        $scope.line_id = $stateParams.line_id;

        //AccountInformation.getLineCarList($scope.line_id).then(function (result) {
        //    if (result.status == 'success') {
        //        $scope.lineCars = result.data;
        //        $scope.lineCars.count = result.data.length;
        //        $log.info('获取线路中所有车辆信息', result);
        //    } else {
        //        $log.error('获取线路中所有车辆信息', result);
        //    }
        //})
        //获取线路信息
        AccountInformation.getLineInfoById($scope.line_id).then(function (result) {
            if (result.status == 'success') {
                $log.info('获取线路信息', result);
                $scope.line = result.data;
                AccountInformation.getLinePriceList($scope.line_id).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('获取线路中车类型报价', result);
                        $scope.prices = result.data;

                        AccountInformation.getLineCarList($scope.line_id).then(function (result) {
                            if (result.status == 'success') {
                                $scope.lineCars = result.data;
                                $scope.lineCars.count = result.data.length;
                                $log.info('获取线路中所有车辆信息', result);
                            } else {
                                $log.error('获取线路中所有车辆信息', result);
                            }
                        })
                    } else {
                        $log.error('获取线路中车类型报价', result);

                    }
                })

            } else {
                $log.error('获取线路信息', result)
            }
        });


        //AccountInformation.getLineCars($scope.line_id).then(function (result) {
        //    console.log(result);
        //})
    })


    .controller('PassRouterCarList', function (iAlert, $ionicPopup, $scope, $state, $ionicHistory, $stateParams, $log, PassService, AccountInformation, authenticationService) {

        var order_id = $stateParams.order_id;
        $scope.orderid = $stateParams.order_id;
        $scope.order = {};
        //车辆列表
        //$scope.carList = [{_id: '2', number: '景AAAAA'}, {_id: '1', number: '景A000AA'}]
        $scope.carList = []
        //司机列表
        //$scope.driverList = [{_id: '2', real_name: '炼焦行业', phone: '18515062004'}, {_id: '1', real_name: '炼焦行业', phone: '1855555555'}]
        $scope.driverList = []

        AccountInformation.getAllCarsAndDriver().then(function (result) {
            if (result.status == 'success') {
                $scope.carList = result.data.truck;
                $scope.driverList = result.data.user;
                $log.info('[获取可用车辆，和司机]', result);
            } else {
                $log.error('[获取可用车辆，和司机]', result)

            }
        });

        PassService.getOrderUseCar(order_id).then(function (result) {
            if (result.status == 'success') {
                $log.info('[获取订单所选车辆]', result)
                $scope.route_info = result.route_info;
                $scope.routes = result.data;
            } else {
                $log.error('[获取订单所选车辆]', result)
            }
        });
        PassService.getOrderById(order_id).then(function (result) {
            if (result.status = 'success') {
                $log.info('获取订单信息', result);

                $scope.order = result.data;

                if (authenticationService.getCompanyInfo()._id == $scope.order.company_buy_id) {
                    //买方管理员
                    $scope.type = 'buy';
                } else if (authenticationService.getCompanyInfo()._id == $scope.order.company_sell_id) {
                    //卖方管理员
                    $scope.type = 'sell';
                } else {
                    console.log('other');
                }


                $scope.route_info = result.data.route_info;
            } else {
                $log.error('获取订单信息失败', result)
            }
        }, function (error) {
            $log.error('获取订单信息失败', error)
        });


        $scope.goNext = function (route) {
            if ($scope.order.step >= 2 && $scope.order.step <= 3) {
                var object = {templateUrl: '/template/common/popup_radio.html', title: '更换车辆或者司机'};
                var objmsg = {type: 'changeCar', subhead: '车辆信息: '};
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        if (res.car) {

                            var data = {order_id: $scope.orderid, route_id: route._id, truck_id: res.car._id};
                            if (res.driver) {
                                data.user_id = res.driver._id;
                            } else {
                                data.user_id = route.user_id;
                            }
                            PassService.replaceCar(data).then(function (result) {
                                if (result.status == 'success') {
                                    iAlert.alert('更换成功!');
                                    //$scope.popup_lists = _.filter($scope.popup_lists, function (item) {
                                    //    return item._id == res.item._id;
                                    //})
                                    $state.reload();
                                } else {
                                    $log.error('更换司机失败', result);
                                    $log.info('selectData', res);
                                    $log.info('PostData', data);
                                    iAlert.alert('更换失败!')
                                }
                            })
                        }
                    }
                })
            }
        }


        $scope.goBack = function () {
            $state.go('tab.passOrder.Detail', {order_id: order_id});
        };

        //同意提货
        $scope.agreePickUp = function (route) {
            //:order_id/:route_id
            $state.go('tab.StorePickUp', {type: "add", order_id: order_id, route_id: route._id})

        }
        //查看过磅信息
        $scope.weightInfo = function (route) {
            $state.go('tab.StorePickUp', {type: "edit", order_id: order_id, route_id: route._id})
        }


    })

    //.controller('PassRouterCarList', function ($scope, $state, $ionicHistory, $stateParams, $log, PassService, AccountInformation, authenticationService) {
    //
    //    var order_id = $stateParams.order_id;
    //    $scope.orderid = $stateParams.order_id;
    //    $scope.order = {};
    //    PassService.getOrderUseCar(order_id).then(function (result) {
    //        if (result.status == 'success') {
    //            $scope.route_info = result.route_info;
    //            $scope.routes = result.data;
    //        } else {
    //            $log.error('[获取订单所选车辆]', result)
    //        }
    //    });
    //    PassService.getOrderById(order_id).then(function (result) {
    //        if (result.status = 'success') {
    //            $log.info('获取订单信息', result);
    //
    //            $scope.order = result.data;
    //
    //            if (authenticationService.getCompanyInfo()._id == $scope.order.company_buy_id) {
    //                //买方管理员
    //                $scope.type = 'buy';
    //            } else if (authenticationService.getCompanyInfo()._id == $scope.order.company_sell_id) {
    //                //卖方管理员
    //                $scope.type = 'sell';
    //            } else {
    //                console.log('other');
    //            }
    //
    //
    //            $scope.route_info = result.data.route_info;
    //        } else {
    //            $log.error('获取订单信息失败', result)
    //        }
    //    }, function (error) {
    //        $log.error('获取订单信息失败', error)
    //    })
    //
    //    $scope.goBack = function () {
    //        $state.go('tab.passOrder', {order_id: order_id});
    //    };
    //
    //    //同意提货
    //    $scope.agreePickUp = function (route) {
    //        //:order_id/:route_id
    //        $state.go('tab.StorePickUp', {type: "add", order_id: order_id, route_id: route._id})
    //
    //    }
    //    //查看过磅信息
    //    $scope.weightInfo = function (route) {
    //        $state.go('tab.StorePickUp', {type: "edit", order_id: order_id, route_id: route._id})
    //    }
    //
    //
    //})
    .controller('PassOrderCtrl', function ($ionicLoading, iAlert, $scope, $state, $stateParams, PassService, $log, authenticationService, $cordovaClipboard, $filter, $ionicPopup) {
        var order_id = $stateParams.order_id;
        $scope.type = authenticationService.getCompanyInfo().type;
        $scope.offer = {};
        $scope.init = function () {
            $ionicLoading.show();

            PassService.getOrderById(order_id).then(function (result) {
                $log.info('orderInfo', result);
                if (result.status = 'success') {
                    $scope.order = result.data;
                    $log.warn('订单步骤', $scope.order.step);

                    if ($scope.order.step >= 2 && $scope.order.step <= 3) {
                        $state.go('tab.passOrder.Detail')
                    } else {
                        $state.go('tab.passOrder.Detail')
                    }
                    $ionicLoading.hide();
                } else {
                    $log.error('获取订单信息失败', result);
                    $ionicLoading.hide();
                    iAlert.alert('获取订单信息失败!');

                }
            }, function (result) {
                $log.error('获取订单信息失败', result);
                $ionicLoading.hide();

            })
        };

        $scope.confirm = function (order) {
            $log.info('order', order);
            $ionicLoading.show();

            //交易公司
            if ($scope.type == 'TRADE') {
                if (order.step == 1) {
                    $log.info('TRADE 第一步确认');
                    PassService.passOrderConfirm(order_id).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('交易第一步确认成功:', result);
                            $state.reload('tab.passOrder.Detail');
                        } else {
                            $log.error('交易第一步确认失败:', result);
                        }
                    })
                } else if (order.step == 2) {
                    //付预付款
                    $log.info("付预付款");
                    $state.go('tab.Pay', {type: 'advanced', order_id: order_id});
                }
                else if (order.step == 2.2) {
                    $log.info("确认支付");
                    PassService.payMentConfirm("advanced", order_id, "", 'credit').then(function (result) {
                        if (result.status == 'success') {
                            //信用额支付成功
                            //$state.go('tab.passOrder', {order_id: order_id});
                            $state.reload('tab.passOrder.Detail');
                        } else if (result.status == 'wait_for_approval') {
                            //信用额支付失败，订单状态  2.4, 等待信用额审核
                            $state.reload('tab.passOrder.Detail');
                            //$state.go('tab.passOrder', {order_id: order_id});
                        } else {
                            $log.error('信用额支付失败', result);
                        }
                    });
                } else if (order.step == 2.6) {
                    //确认收预付款
                } else if (order.step == 3) {
                    // 确认运输完毕
                } else if (order.step == 4) {
                    var postData = {order_id: order._id};

                    if (order.type == 'TWO') {
                        if (order.give_amount && order.give_amount <= order.get_amount) {
                            postData.amount = order.give_amount;
                            PassService.tradeOrder4ConfirmReceipt(postData).then(function (result) {
                                if (result.status == 'success') {
                                    $log.info('TRADE 第四步确认收货');
                                    $state.reload('tab.passOrder.Detail');
                                } else {
                                    $log.debug('TRADE 第四步确认收货', result);
                                }
                            })
                        } else {
                            iAlert.alert('实际交货应大于等于0小于等于物流交货吨数!')
                        }
                    } else {

                        if (order.percentage_remain && order.payment_method == 'partition') {
                            //三期付款,需要支付
                            $log.info('支付中期款', order);
                            $state.go('tab.Pay', {type: 'advanced', order_id: order_id});

                        } else {
                            // 确认运输完毕
                            PassService.tradeOrder4ConfirmReceipt(postData).then(function (result) {
                                if (result.status == 'success') {
                                    $log.info('TRADE 第四步确认收货');
                                    $state.reload('tab.passOrder.Detail');
                                } else {
                                    $log.debug('TRADE 第四步确认收货', result);
                                }
                            })
                        }
                    }

                } else if (order.step == 4.5) {

                } else if (order.step == 5) {
                    $log.info("付预付款");
                    $state.go('tab.Pay', {type: 'final', order_id: order_id});
                } else if (order.step == 5.2) {
                    PassService.payMentConfirm("final", order_id, "", 'credit').then(function (result) {
                        if (result.status == 'success') {
                            //信用额支付成功
                            //$state.go('tab.passOrder', {order_id: order_id});
                            $state.reload('tab.passOrder.Detail');
                        } else if (result.status == 'wait_for_approval') {
                            //信用额支付失败，订单状态  2.4, 等待信用额审核
                            //$state.go('tab.passOrder', {order_id: order_id});
                            $state.reload('tab.passOrder.Detail');
                        } else {
                            $log.error('确认信用额支付失败', result);
                        }
                    });
                } else if (order.step == 5.5) {
                    PassService.payMentConfirm("final", order_id, "", 'credit').then(function (result) {
                        if (result.status == 'success') {
                            //信用额支付成功
                            //$state.go('tab.passOrder', {order_id: order_id});
                            $state.reload('tab.passOrder.Detail');
                        } else if (result.status == 'wait_for_approval') {
                            //信用额支付失败，订单状态  2.4, 等待信用额审核
                            //$state.go('tab.passOrder', {order_id: order_id});
                            $state.reload('tab.passOrder.Detail');
                        } else {
                            $log.error('确认信用额支付失败', result);
                        }
                    });
                }

            }
            else {
                //物流公司
                if (order.step == 1.5) {
                    //确认订单
                    PassService.orderStepTraffic_confirm(order._id).then(function (result) {
                        if (result.status = 'success') {
                            $state.reload('tab.passOrder.Detail');
                            //$state.go('tab.passOrder.Detail', {}, {reload: true});
                            $log.info('物流公司确认订单', result)
                        } else {
                            iAlert.alert('确认失败!请稍后再试!');
                            $log.error('确认运输完毕失败', result)
                        }
                    }, function (error) {
                        $log.error('确认收预付款失败', error)

                    })
                } else if (order.step == 2.25) {
                    //确认收预付款
                    PassService.orderStep2Confirm(order._id).then(function (result) {
                        if (result.status = 'success') {
                            $state.reload('tab.passOrder.Detail');
                            //$state.go('tab.passOrder.Detail', {}, {reload: true});
                            $log.info('确认收预付款')
                        } else {
                            iAlert.alert('确认失败!');

                            $log.error('确认运输完毕失败', result)

                        }
                    }, function (error) {
                        $log.error('确认收预付款失败', error)

                    })
                } else if (order.step == 2.3) {
                    if (order.dispatchTruckTime) {
                        PassService.orderDispatchTruck(order._id, order.dispatchTruckTime).then(function (result) {
                            if (result.status = 'success') {
                                $state.reload('tab.passOrder.Detail');
                                //$state.go('tab.passOrder.Detail', {}, {reload: true});
                                $log.info('申请发车', result);
                            } else {
                                $log.error('申请发车', result);
                            }
                        }, function (error) {
                            $log.error('申请发车', error)
                        })
                    } else {
                        iAlert.alert('请选择发车时间!');
                    }

                } else if (order.step == 3) {
                    // 确认运输完毕
                    if (order.type == 'TWO') {
                        if (!$scope.order.amount_confirm || $scope.order.amount_confirm > $scope.order.amount) {
                            $ionicLoading.hide();
                            iAlert.alert('请填写实际到货吨数!必须大于0小于等于订单总吨数!');
                            return;
                        }
                    }

                    PassService.getAmountLast(order._id).then(function (result) {
                        if (result.status == 'success') {
                            var text = "";
                            var postData = {order_id: order._id};
                            if (order.type == 'TWO') {
                                if ($scope.order.amount_confirm) {
                                    postData.amount = $scope.order.amount_confirm;
                                    text = "应到货" + result.data.amount + "吨,实际提货" + result.data.fact + "吨,实际到货" + result.data.last + "吨,您填写的实际到货" + postData.amount + "吨.确认后无法更改,请慎重选择！";
                                }
                            } else {
                                text = "应到货" + result.data.amount + "吨,实际提货" + result.data.fact + "吨,实际到货" + result.data.last + "吨。" + "确认后无法更改,请慎重选择！";
                            }


                            iAlert.popup('请确认', text, function () {
                                PassService.orderStep3Confirm(postData).then(function (result) {
                                    if (result.status = 'success') {
                                        $log.info('确认运输完毕')
                                        $state.go('tab.passOrder.Detail', {}, {reload: true});
                                    } else {
                                        $log.error('确认运输完毕失败', result);
                                    }
                                }, function (error) {
                                    $log.error('确认运输完毕失败', error);
                                })
                            })
                        } else {

                        }
                    })


                } else if (order.step == 4) {

                    // 确认运输完毕
                } else if (order.step == 5) {

                } else if (order.step == 5.5) {
                    iAlert.confirm('提示', '确认收款,完成收割吗?', function () {
                        PassService.trafficOrder5Confirm(order._id).then(function (result) {
                            if (result.status = 'success') {
                                $log.info('TRAFFIC 确认收尾款');
                                $state.reload();
                            } else {
                                $log.error('TRAFFIC 确认收尾款', result);
                            }
                        })
                    })
                    //$state.go('tab.passViewPayment', {order_id: order_id});
                } else if (order.step == 1) {

                }
            }
            $ionicLoading.hide();

        }
        $scope.applyUnderstanding = function (order) {
            $ionicLoading.show();

            //if ($scope.offer.price && $scope.offer.price > 0) {
            //
            //    $scope.btnApply = true;
            //    PassService.orderStep4ApplyUnderstanding(order._id, false, $scope.offer.price).then(function (result) {
            //        if (result.status == 'success') {
            //            $log.info('TRAFFIC 申请谅解');
            //            $scope.btnApply = true;
            //            $state.reload('tab.passOrder.Detail');
            //
            //        } else {
            //            $log.info('TRAFFIC 申请谅解', result);
            //            $scope.btnApply = false;
            //            iAlert.alert('申请谅解失败!')
            //        }
            //    }, function (error) {
            //        $log.info('申请谅解失败', error);
            //        $scope.btnApply = false;
            //    })
            //} else {
            //    iAlert.alert('谅解金额需大于0!');
            //}

            PassService.orderStep4ApplyUnderstanding(order._id, false, true).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('TRAFFIC 申请谅解');
                        $state.reload('tab.passOrder.Detail');
                    } else {
                        $log.info('TRAFFIC 申请谅解', result);
                        iAlert.alert('申请谅解失败!')
                    }
                }, function (error) {
                    iAlert.alert('申请谅解失败!')
                    $log.info('申请谅解失败', error);
                })
                .finally(function () {
                    $ionicLoading.hide();
                })

        };
        $scope.agreeOrReject = function (confirm) {
            $ionicLoading.show();
            PassService.trafficOrder4ReConfirm(order_id, confirm).then(function (result) {
                if (result.status == 'success') {
                    $log.info('TRADE ' + confirm ? "同意" : "拒绝")
                    $state.reload('tab.passOrder.Detail');
                    $ionicLoading.hide();
                } else {
                    $ionicLoading.hide();
                    $log.info('TRADE ' + confirm ? "同意" : "拒绝", result);
                }
            })
        };

        $scope.accept = function (order) {
            $ionicLoading.show();
            $scope.btnAccept = true;
            PassService.orderStep4ApplyUnderstanding(order._id, true, order.price).then(function (result) {
                if (result.status == 'success') {
                    $log.info('TRAFFIC 接受检验结果');
                    $state.reload('tab.passOrder.Detail');
                    $scope.btnAccept = true;
                    $ionicLoading.hide();

                } else {
                    $scope.btnAccept = false;
                    $log.error('TRAFFIC 接受检验结果', result);
                    $ionicLoading.hide();
                }
            }, function (error) {
                $log.error('TRAFFIC 接受检验结果', error);
                $scope.btnAccept = false;
                $ionicLoading.hide();
            })

        }

        $scope.showMessage = function () {
            iAlert.alert('复制成功!')
        }
        $scope.fallback = function (copy) {
            if (!ionic.Platform.isWebView()) {
                window.prompt('请选中文字使用CTRL+C进行复制!', copy);
            }
        };
        //手机端copy
        $scope.copyIndex = function () {
            if (ionic.Platform.isWebView()) {
                $cordovaClipboard
                    .copy($scope.order.index)
                    .then(function () {
                        // success
                        iAlert.alert('复制成功!');
                    }, function () {
                        // error
                        iAlert.alert('复制失败!');
                    });
            }
        }
        //刷新
        $scope.doRefresh = function () {
            $scope.init();
            $scope.$broadcast('scroll.refreshComplete');
        }
        $scope.confirmDate = function (agree) {
            if (agree) {
                //同意发车时间
                iAlert.confirm('确认发车时间', "是否同意物流方在" + $filter('rsctime')($scope.order.time_add_traffic) + "发车?", function () {
                    PassService.orderConfirmDispatchTruckTime($scope.order._id, $scope.order.time_add_traffic).then(function (result) {
                        if (result.status = 'success') {
                            $state.reload('tab.passOrder.Detail');
                            //$state.go('tab.passOrder.Detail', {}, {reload: true});
                            $log.info('同意物流方发车时间', result);
                        } else {
                            $log.error('同意物流方发车时间', result)
                        }
                    }, function (error) {
                        $log.error('同意物流方发车时间', error)
                    })
                })


            } else {
                //自定义发车时间
                if ($scope.order.customDispatchTruckTime) {
                    iAlert.confirm('确认发车时间', "是否指定物流在" + $filter('rsctime')($scope.order.customDispatchTruckTime) + "发车?", function () {
                        PassService.orderConfirmDispatchTruckTime($scope.order._id, $scope.order.customDispatchTruckTime).then(function (result) {
                            if (result.status = 'success') {
                                $state.reload('tab.passOrder.Detail');
                                //$state.go('tab.passOrder.Detail', {}, {reload: true});
                                $log.info('自定义发车时间', result);
                            } else {
                                $log.error('自定义发车时间', result);
                            }
                        }, function (error) {
                            $log.error('自定义发车时间', error);
                        })
                    })

                } else {
                    iAlert.alert('请选择发车时间!');
                }
            }
        }

        //发车时间
        $scope.changeDate = function (type) {
            var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
            var objmsg = {type: 'changeDate', minDate: moment().add('day', 0).format()}
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                if (res) {
                    if (type == "time_arrival") {
                        $log.info('发车时间', res.dt);
                        $log.info('提货时回', $scope.order.time_depart);
                        $scope.order.dispatchTruckTime = res.dt;

                        //if ($scope.order.time_depart && $scope.order.dispatchTruckTime) {
                        //    var selectData = new Date($scope.order.dispatchTruckTime).getTime();
                        //    var departData = new Date($scope.order.time_depart).getTime();
                        //    $log.info(selectData - departData)
                        //    if (selectData - departData > -86400000) {
                        //        iAlert.alert('发车时间应该在提货时间前一天之内!');
                        //        $scope.order.dispatchTruckTime = null;
                        //    }
                        //}
                    } else {
                        $scope.order[type] = res.dt;
                    }
                }
            })
        }

        //取消订单
        $scope.cancelOrder = function () {
            iAlert.confirm('提示', "确认取消订单吗?", function () {
                PassService.cancelOrder($scope.order._id).then(function (result) {
                    $log.info('取消订单', result);
                    if (result.status == 'success') {
                        iAlert.alert('取消成功!');
                        $state.reload();
                    } else {
                        $log.error('取消订单', result);
                        iAlert.alert('取消失败!');
                    }
                })
            })

        }
    })
    .controller('PassOrderStep2', function ($scope, $state, $stateParams, PassService, $ionicLoading, $log, AccountInformation, authenticationService, iAlert) {
        $scope.order_id = $stateParams.order_id;
        $scope.routes = {};

        var type = authenticationService.getCompanyInfo().type;
        if (type == 'TRAFFIC') {
            $scope.isTraffic = true;
        } else if (type == 'TRADE') {
            $scope.isTraffic = false;
        }

        $scope.init = function () {
            $ionicLoading.show();

            PassService.getOrderById($scope.order_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.order = result.data;
                    //if ($scope.order.step == 2) {
                    //    $state.go('tab.passOrder.Detail')
                    //} else if ($scope.order.step == 1) {
                    //    $state.go('tab.passOrder.Step1')
                    //}
                    //判断是否到 发车时间.
                    var currentDate = new Date();
                    $log.info(currentDate.getTime());
                    var dt1 = new Date($scope.order.time_add_traffic);

                    if (dt1.getTime() - currentDate.getTime() <= 86400000) {
                        $scope.isTime = true;
                    } else {
                        //iAlert.alert('还没有到指定发车时间!')
                        $scope.isTime = false;

                    }
                } else {
                    $log.error('获取订单信息失败', result)
                }

            });
            //获取已经抢单的司机个数

            PassService.getDriverOfferCount($scope.order_id).then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取已经抢单的司机个数', result)

                    $scope.driverOfferCount = result.data;
                } else {
                    $log.error('获取已经抢单的司机个数', result)
                }
            });

            //
            PassService.getOrderUseCar($scope.order_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.routes.count = result.data.length;
                    if (result.data.length != 0) {
                        $scope.hasCars = true;
                        $scope.routes.first = result.data[0];
                        AccountInformation.getCarInfoById($scope.routes.first.truck_id).then(function (car) {
                            if (car.status == 'success') {
                                $scope.car = car.data;
                            } else {
                                $log.info('获取车辆信息失败', driver);
                            }
                        });
                        AccountInformation.getDriverInfoById($scope.routes.first.user_id).then(function (driver) {
                            if (driver.status == 'success') {
                                $scope.driver = driver.data;
                            } else {
                                $log.info('获取司机失败', driver);
                            }
                        })
                    } else {
                        $scope.hasCars = false;
                    }
                } else {
                    $log.error('[获取订单所选车辆]', result)
                }
            }).finally(function () {
                $ionicLoading.hide();
            });
        }
        $scope.init();

        /**
         * 选择车辆信息
         */
        $scope.selectCar = function () {
            var currentDate = new Date();
            $log.info(currentDate.getTime());
            var dt1 = new Date($scope.order.time_add_traffic);

            if (dt1.getTime() - currentDate.getTime() <= 86400000) {
                $state.go('tab.SelectCar', {order_id: $scope.order_id});
            } else {
                iAlert.alert('还没有到指定发车时间!')
            }
        }


    })
    .controller('PassOrderStep1Ctrl', function ($scope, $state, $stateParams, PassService, $log) {
        var order_id = $stateParams.order_id;
        $scope.init = function () {
            PassService.getOrderById(order_id).then(function (result) {
                $scope.order = result.data;
                //if ($scope.order.step == 2) {
                //    $state.go('tab.passOrder.Detail')
                //} else if ($scope.order.step == 1) {
                //    $state.go('tab.passOrder.Step1')
                //}
                $log.info('获取订单信息', result);
            })
        };
        $scope.selectCar = function () {
            $state.go('tab.select_car', {order_id: $scope.order_id});
        }
    })
    .controller('PassSelectCarCtrl', function (iAlert, $linq, AccountInformation, $ionicPopup, $scope, $state, $stateParams, authenticationService, PassService, $log, $filter) {


        //$scope.popup_lists = [{_id: '2', real_name: '炼焦行业', phone: '18515062004'}, {_id: '1', real_name: '炼焦行业', phone: '1855555555'}]
        $scope.popup_lists = [];

        $scope.order_id = $stateParams.order_id;
        //var company_id = "5653f41a4e994f0900266989";
        var company_id = authenticationService.getUserInfo().user.company_id[0];
        var arr = [];
        $scope.search = {};

        var query = function (data) {
            AccountInformation.getAllCarsAndDriver(data).then(function (result) {
                if (result.status == 'success') {
                    $scope.cars = result.data.truck;
                    $log.info('获取可用车辆', result);
                    $scope.carTypeList = $linq.Enumerable().From(result.data.truck).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();

                    $scope.popup_lists = result.data.user;
                    $log.info('可用车辆和可用司机', $scope.carTypeList);
                } else {
                    $log.error('可用车辆和可用司机', result);
                }
            });

        }
        $scope.init = function () {

            query(null);

            //AccountInformation.getAllCarsAndDriver(null).then(function (result) {
            //    if (result.status == 'success') {
            //        $scope.cars = result.data.truck;
            //
            //        $scope.carTypeList = $linq.Enumerable().From(result.data.truck).GroupBy('$.type', '$', function (key, group) {
            //            return {type: key, total: group.Count(), values: group}
            //        }, function (key) {
            //            return key.toString();
            //        }).ToArray();
            //
            //        $scope.popup_lists = result.data.user;
            //        $log.info('可用车辆和可用司机', $scope.carTypeList);
            //    } else {
            //        $log.error('可用车辆和可用司机', result);
            //    }
            //});
            //$scope.$watch('search.number', function () {
            //    query({number: $scope.search.number});
            //
            //})
            //$

            $scope.search = function () {
                query({number: $scope.search.number});
            }
            $scope.$on('selectCar', function (event, car) {
                if (car.isSelect) {
                    car.truck_id = car._id;
                    car.plan = $filter("carWeight")(car.weight);
                    arr.push(car);
                } else {
                    arr = _.reject(arr, function (item) {
                        return item._id == car._id;
                    })
                }
                console.log(arr);
            })

            $scope.$on('changeDriver', function (event, car) {
                if (!car.create_user_id) {
                    var cars = [car._id];
                    var object = {templateUrl: '/template/common/popup_radio.html', title: '更换司机'}
                    var objmsg = {type: 'selectDriver', subhead: '司机信息: '};   //type类型有radio,text,number3种类型
                    _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                        if (res) {
                            if (res.item) {

                                AccountInformation.carRelationDriver(res.item._id, cars).then(function (result) {
                                    if (result.status == 'success') {
                                        iAlert.alert('更换成功!');
                                        $log.info('更换司机成功', result);

                                        $scope.popup_lists = _.filter($scope.popup_lists, function (item) {
                                            return item._id == res.item._id;
                                        })
                                        $state.reload();
                                    } else {
                                        $log.error('更换司机失败', result);
                                        iAlert.alert('更换失败!')
                                    }
                                })
                            }
                        }
                    })
                } else {
                    iAlert.alert('私有司不能更换!')
                }
            })
        }

        //AccountInformation.getAllCars(company_id).then(function (result) {
        //    if (result.status == 'success') {
        //        $scope.cars = result.data;
        //    }
        //});


        //所选车辆信息

        //$scope.selectCar = function (car) {
        //    console.log(car);
        //    if (car.isSelect) {
        //        car.truck_id = car._id;
        //        car.plan = $filter("carWeight")(car.weight);
        //        arr.push(car);
        //    } else {
        //        arr = _.reject(arr, function (item) {
        //            return item._id == car._id;
        //        })
        //    }
        //}
        $scope.complete = function () {
            //发送信息
            //发送
            if (arr.length > 0) {
                iAlert.popup('提示!', '请认真核查所选车辆是否满足需求!', function () {
                    PassService.orderStep2SelectCar($scope.order_id, arr).then(function (result) {
                        $log.info('[发送司机信息]', result);
                        if (result.status == 'success') {
                            //跳转到订单
                            $state.go('tab.passOrder.Detail', {order_id: $scope.order_id});
                        } else if (result.status == 'err') {
                            $log.error('[发送司机信息]', result);
                            switch (result.msg) {
                                case 'user_is_not_driver':
                                    iAlert.alert('所选的车辆中的默认司机有是管理员的,请确认!');
                                    break;
                                case 'user_not_found':
                                    iAlert.alert('所选司机未找到!');
                                    break;
                                case 'user_used_repeat':
                                    iAlert.alert('所选的车辆有司机被重复使用,请确认!');
                                    break;
                                case 'truck_used_repeat':
                                    iAlert.alert('所选的车辆有车辆被重复使用,请确认!');
                                    break;
                                case 'not_allow':
                                    iAlert.alert('不允许!');
                                    break;
                                case 'truck_or_user_is_used':
                                    iAlert.alert('有司机或车辆被占用!');
                                    break;
                                default :

                            }

                        }
                    })
                })
            } else {
                iAlert.alert('请选择运输车辆!')
            }
        }

        //更换司机
        $scope.goNext = function (car) {
            $log.info('car', car);
            if (!car.create_user_id) {
                var cars = [car._id];
                var object = {templateUrl: '/template/common/popup_radio.html', title: '更换司机'}
                var objmsg = {type: 'selectDriver', subhead: '司机信息: '};   //type类型有radio,text,number3种类型
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        if (res.item) {

                            AccountInformation.carRelationDriver(res.item._id, cars).then(function (result) {
                                if (result.status == 'success') {
                                    iAlert.alert('更换成功!');
                                    $scope.popup_lists = _.filter($scope.popup_lists, function (item) {
                                        return item._id == res.item._id;
                                    })
                                    $state.reload();
                                } else {
                                    $log.error('更换司机失败', result);
                                    iAlert.alert('更换失败!')
                                }
                            })
                        }
                    }
                })
            } else {
                iAlert.alert('私有司不能更换!')
            }

        }
    })
    /**
     * 支付页面
     */
    .controller('PayCtrl', function ($scope, $ionicPopup, iAlert, $state, $stateParams, PassService, $log, $filter, CreditService) {

        var order_id = $stateParams.order_id;

        $scope.orderid = order_id;

        //预付款、尾款

        $scope.type;
        //$scope.payment = 'url';

        //支付类型
        $scope.payType = "both";

        $scope.payInfo = {};

        $scope.files = {};

        $scope.init = function () {
            PassService.getOrderById(order_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.order = result.data;
                    $log.info('物流订单', $scope.order);

                    //    all_cash: 'all_cash',   //款到付货
                    //    all_goods: 'all_goods', //货到付款
                    //    partition: 'partition', //分期
                    //    credit: 'credit'        //信用

                    $scope.btnText = $filter('payBtnText')($scope.order);
                    if ($scope.order.payment_method == 'partition') {
                        //分期
                        if ($scope.order.step == 2) {
                            $scope.type = 'advanced';

                        } else if ($scope.order.step == 4) {
                            $scope.type = 'remain';
                        }
                        else if ($scope.order.step == 5) {
                            $scope.type = 'final';
                        }

                    } else if ($scope.order.payment_method == 'all_cash') {
                        if ($scope.order.step == 2) {
                            $scope.type = 'advanced';

                        } else if ($scope.order.step == 5) {
                            $scope.type = 'final';
                        }
                    } else if ($scope.order.payment_method == 'all_goods') {
                        if ($scope.order.step == 5) {
                            $scope.type = 'final';
                        }
                    } else if ($scope.order.payment_method == 'credit') {
                        if ($scope.order.step == 2) {
                            $scope.type = 'advanced';
                        }
                    }
                    $log.info('type', $scope.type);

                } else {
                    $log.error('获取订单信息失败', result);
                }
            });
        }


        $scope.getUploadPic = function (files) {
            console.log(files);
            if (files.length != 0) {
                $scope.files = files;
            }
        };

        //{
        //    var obj = {templateUrl: '/template/common/popup_radio.html', title: '上传支付凭证'}
        //    var data = {type: 'file'}
        //    _popup($scope, obj, $ionicPopup, data).then(function (res) {
        //        if (res) {
        //            if ($scope.file) {
        //                PassService.orderPay(type, order_id, $scope.files[0]).then(function (result) {
        //                    $log.info('上传凭证成功！', result);
        //                    if (result.status == 'success') {
        //                        $log.info('上传凭证成功！');
        //                        $scope.imgUrl = result.data;
        //                    } else {
        //                        $log.error(type, result);
        //                    }
        //                }, function (error) {
        //                    $log.error(type, error);
        //                });
        //            } else {
        //                $scope.msg = {img: '未选择图片'}
        //            }
        //        }
        //    })
        //
        //}
        $scope.uploadFile = function () {
            var obj = {templateUrl: '/template/common/popup_radio.html', title: '上传支付凭证'}
            var data = {type: 'file'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $log.info('res', res);
                if (res) {
                    if ($scope.files) {
                        PassService.orderPay($scope.type, order_id, $scope.files[0]).then(function (result) {
                            $log.info('上传凭证成功！', result);
                            if (result.status == 'success') {
                                $log.info('上传凭证成功！');
                                $scope.payInfo.imgUrl = result.data;
                            } else {
                                $log.error($scope.type, result);
                            }
                        }, function (error) {
                            $log.error($scope.type, error);
                        });
                    } else {
                        $scope.msg = {img: '未选择图片'}
                    }
                }
            })
        }
        $scope.pay = function () {
            //除信用支付外都是上传图片
            if ($scope.order.payment_method != 'credit') {
                if (!$scope.files) {
                    $log.warn('未选择文件');
                    return;
                } else {
                    //2016-03-10 不验证是否上传图片.
                    //if ($scope.payInfo.imgUrl) {
                    PassService.payMentConfirm(order_id, $scope.payInfo.imgUrl, $scope.order.step).then(function (result) {
                        if (result.status == 'success') {
                            $state.go('tab.passOrder.Detail', {order_id: order_id});
                        } else {
                            iAlert.alert('支付失败');
                            $log.error('确认失败', result);
                        }
                    });
                    //} else {
                    //    iAlert.alert('请上传支付凭证!');
                    //}

                }

            } else {
                PassService.payMentConfirm(order_id, "", $scope.order.step).then(function (result) {
                    $log.info(result);
                    if (result.status == 'success') {
                        //信用额支付成功 5.5
                        $state.go('tab.passOrder.Detail', {order_id: order_id});
                    } else if (result.status == 'wait_for_approval') {
                        //信用额支付失败，订单状态  5.1, 等待信用额审核
                        $state.go('tab.passOrder.Detail', {order_id: order_id});
                    } else {
                        $log.error('信用额支付失败', result);
                    }
                });
            }
        }
    })
    .controller('PassViewPaymentCtrl', function ($scope, $state, $stateParams, PassService, $log) {
        var order_id = $stateParams.order_id;

        PassService.getOrderById(order_id).then(function (result) {
            if (result.status == 'success') {
                $scope.order = result.data;
            } else {
                $log.error('TRAFFIC 获取订单失败', result);
            }
        })
        $scope.confirm = function () {
            PassService.trafficOrder5Confirm(order_id).then(function (result) {
                if (result.status = 'success') {
                    $log.info('TRAFFIC 确认收尾款');
                    $state.go('tab.passOrder.Detail', {order_id: order_id});
                } else {
                    $log.error('TRAFFIC 确认收尾款', result);
                }
            })
        };
    })

    //仓管所有管理的仓库
    .controller('MyStoresCtrl', function ($state, $scope, authenticationService, PassService, $log, AccountInformation) {
        //根据store获取仓库信息

        $scope.navbar = {
            navLeftIco: 'ion-ios-arrow-back', navLeft: '返回',
            navLeftHref: 'tab.myRsc',
            title: '仓库管理',
            navRightHref: '',
            navRight: ''
        };
        $scope.stores = [];
//angular.forEach(authenticationService.getUserInfo().user.store_id, function (value, index, array) {
//    PassService.getStores(value).then(function (result) {
//        if (result.status == 'success') {
//            $scope.stores.push(result.data);
//        }
//    })
//});

        $scope.init = function () {

            if (authenticationService.getUserInfo().user.role.indexOf('ADMIN') != -1) {
                $scope.navbar.navRightHref = 'tab.AddStore';
                $scope.navbar.navRight = '+添加仓库';


            } else {
                $scope.navbar.navRightHref = 'tab.';
                $scope.navbar.navRight = '';
            }

            AccountInformation.getCompanyTradeStores().then(function (result) {
                if (result.status == 'success') {
                    $scope.stores = result.data;
                    $log.info('仓库信息', result);
                } else {
                    $log.error('仓库信息', result);
                }
            })
        }
        $scope.goDetail = function (item) {
            $state.go('tab.StoresDetail', {store_id: item._id});
        }

    })
    //获取仓库的提货信息
    .controller('StoresDetailCtrl', function (iAlert, $filter, $scope, authenticationService, $log, $ionicPopup, $state, $stateParams, PassService, AccountInformation) {
        $scope.store_id = $stateParams.store_id;
        //根据ID获取仓库的订单信息
        $scope.isModify = false;
        //初始化
        $scope.init = function () {

            if (authenticationService.getUserInfo().user.role.indexOf('ADMIN') != -1) {
                $scope.allow = true;
            } else {
                $scope.allow = false;
            }


            PassService.getStores($scope.store_id).then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取仓库信息', result);
                    $scope.store = result.data;

                    $scope.storeAddressText = $scope.store.province + $scope.store.city + $scope.store.addr

                } else {
                    $log.error('获取仓库信息', result);
                }
            });

            //获取仓库所有管理员
            AccountInformation.storeGetManager($scope.store_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.storeManagers = result.data;

                    $log.info('获取仓库管理员信息', result);
                } else {
                    $log.error('获取仓库管理员信息', result);
                }
            });
        };
        //添加仓库管理员
        $scope.addStoreManager = function () {
            $state.go('tab.addStoreManage', {})
        }
        //省市选择
        $scope.select = function () {
            var data = {currentProvinceId: 0, currentCityId: 0, currentAreaId: 0};
            var obj = {templateUrl: '/template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    $scope.isModify = true;
                    $scope.store.province = res.currentProvince.ProID;
                    $scope.store.city = res.currentCity.CityID;
                    $scope.store.district = res.currentArea.DisID;

                    $scope.storeAddressText = $filter('addressText')(res);

                    $scope.store.longitude = "118.789572";
                    $scope.store.latitude = "32.048667";
                }
            })
        }

        //修改仓库基本信息
        $scope.edit = function () {

            if (!$scope.store.name) {
                iAlert.alert('仓库名称不能为空!')
                return;
            }
            if (!$scope.store.province || !$scope.store.city || !$scope.store.district) {
                if (!$scope.store.name) {
                    iAlert.alert('请选择仓库所在地区!');
                    return;
                }
            }
            if (!$scope.store.addr) {
                iAlert.alert('请填写仓库详细地址!');
                return;
            }


            if ($scope.isModify) {

                PassService.editStore($scope.store).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('修改仓库信息', result);
                    } else {
                        $log.error('修改仓库信息', $scope.store);
                        $log.error('修改仓库信息', result);
                    }
                });
            } else {
                var s = {
                    name: $scope.store.name,
                    addr: $scope.store.addr,
                    longitude: $scope.store.longitude,
                    latitude: $scope.store.latitude,
                    _id: $scope.store._id,
                };
                PassService.editStore(s).then(function (result) {
                    if (result.status == 'success') {
                        iAlert.alert('修改成功', function () {
                            $state.go('tab.myStores')
                        });
                        $log.info('修改仓库信息', result);
                    } else {
                        $log.error('修改仓库信息', result);
                    }
                });
            }

        }

        $scope.del = function (item) {
            iAlert.popup('提示!', '是否移除该仓库管理员?', function () {
                AccountInformation.storeDelManager(item._id, $scope.store_id).then(function (result) {
                    if (result.status == 'success') {
                        $state.reload();
                        $log.info('删除成功')
                    } else {
                        $log.error('删除失败!', result);
                    }
                })
            })
        }
    })
    .controller('AddStoreCtrl', function (iAlert, authenticationService, $scope, $ionicPopup, $state, $stateParams, AccountInformation, $log, $filter) {
        //添加仓库
        var store_id = $stateParams.store_id;
        //根据ID获取仓库的订单信息
        $scope.store = {};


        $scope.select = function () {
            var data = {currentProvinceId: 0, currentCityId: 0, currentAreaId: 0};
            var obj = {templateUrl: './template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                console.log(res);
                if (res) {
                    $scope.store.province = res.currentProvince.ProID;
                    $scope.store.city = res.currentCity.CityID;
                    $scope.store.district = res.currentArea.DisID;

                    $scope.storeText = $filter('addressText')(res);
                    $scope.store.longitude = "118.789572";
                    $scope.store.latitude = "32.048667";
                }
                //118.789572, 32.048667
            })
        }
        $scope.add = function (e) {


            if (!$scope.store.name) {
                iAlert.alert('仓库名称不能为空!')
                return;
            }
            var regex = /^(?!^\d+$)[(\u4e00-\u9fa5)+1-9\dA-Za-z]{1,20}[^`~!@$%^&()+=|\\\][\]\{\}:;'\,.<>?]$/;
            if (!regex.test($scope.store.name)) {
                iAlert.alert('仓库名称格式错误,2-20个字符且不能包含特殊字符,或者纯数字!');
                return;
            }
            if (!$scope.store.province || !$scope.store.city || !$scope.store.district) {
                if (!$scope.store.name) {
                    iAlert.alert('请选择仓库所在地区!');
                    return;
                }
            }
            if (!$scope.store.addr) {
                iAlert.alert('请填写仓库详细地址!');
                return;
            }
            if (!regex.test($scope.store.addr)) {
                iAlert.alert('仓库详细地址错误,不能包含特殊字符,或者纯数字!');
                return;
            }
            AccountInformation.addStore($scope.store).then(function (result) {
                if (result.status == 'success') {
                    $log.info(result);
                    if (e == '158') {
                        // 回写仓库地址
                        $scope.demand._location_storage = result.data.province + result.data.city + result.data.district + result.data.addr
                        $scope.demand.location_storage = result.data._id
                        $scope.demand.location_longitude = result.data.longitude
                        $scope.demand.location_latitude = result.data.latitude
                        $scope.demand.prov_storage = result.data.province
                        $scope.demand.city_storage = result.data.city
                        $scope.modal.hide();
                    } else {
                        $state.go('tab.myStores');
                    }
                } else {
                    $log.error(result);
                }
            })
        }

        //PassService.getOrderForStorer(store_id, false).then(function (result) {
        //    if (result.status == 'success') {
        //
        //    }
        //});

    })
    .controller('StoreOrderListCtrl', function ($scope, $state, $stateParams, PassService, $log, authenticationService) {
        //orders
        $scope.init = function () {
            $scope.companyType = authenticationService.getCompanyInfo().type;
            $scope.companyId = authenticationService.getCompanyInfo()._id;

            PassService.getOrderForStorer(authenticationService.getUserInfo().user.store_id, false).then(function (result) {
                if (result.status == 'success') {
                    $log.info('仓管获取已完成订单', result);
                    $scope.orders = result.data;
                } else {
                    $log.error('仓管获取已完成订单', result);

                }
            })

        }

        $scope.getOrders = function (value) {
            $scope.selectd = !$scope.selectd;
            PassService.getOrderForStorer(authenticationService.getUserInfo().user.store_id, value).then(function (result) {
                if (result.status == 'success') {
                    $log.info('仓管获取订单', result);
                    $scope.orders = result.data;
                }
            })
        }
        $scope.goDetail = function (order) {
            $state.go('tab.StoreOrderDetail', {order_id: order._id});
        }


    })
    .controller('StoreOrderDetailCtrl', function ($http, ENV, tradePass, $scope, $state, $stateParams, PassService, $log, authenticationService, AccountInformation) {
        //$scope.type = "buy";


        $scope.order_id = $stateParams.order_id;

        $scope.routes = {};
        // 商品属性
        var getctegory = function (category) {
            $http({
                method: 'GET'
                , url: ENV.api.trade + 'demand/standard_for_goods/' + category
                , headers: {}
            }).success(function (data) {
                if (data.status = "success") {
                    $log.info('商品属性', data);
                    $scope.desc = data.data.desc
                }
            })
        }
        $scope.init = function () {
            //获取order
            PassService.getOrderById($scope.order_id).then(function (result) {
                if (result.status == 'success') {
                    $log.info('仓库管理获取订单信息', result);
                    $scope.order = result.data;


                    if (authenticationService.getCompanyInfo()._id == $scope.order.company_buy_id) {
                        //买方管理员
                        $scope.type = 'buy';
                    } else if (authenticationService.getCompanyInfo()._id == $scope.order.company_sell_id) {
                        //卖方管理员
                        $scope.type = 'sell';
                    }
                    tradePass.getDemandOrderDetail('index', $scope.order.index_trade).success(function (data) {
                        if (data.status == "success") {
                            $scope.trade_order = data.data;
                            $log.info('获取采购订单参数', data)
                            // 依据角色 传递不同的公司id
                            getctegory($scope.trade_order.category)
                        } else {
                            $log.error('获取采购订单参数失败', data)
                        }
                    })
                } else {
                    $log.error('仓库管理获取订单信息', result);
                }
            });


        }


        //获取订单所用车辆
        PassService.getOrderUseCar($scope.order_id).then(function (result) {
            if (result.status == 'success') {
                $scope.routes.count = result.data.length;

                $scope.des = result.data.length + '辆车';


                if (result.data.length != 0) {
                    $log.info('获取订单所用车辆', result);
                    $scope.hasCars = true;
                    $scope.routes.first = result.data[0];

                    AccountInformation.getCarInfoById($scope.routes.first.truck_id).then(function (car) {
                        if (car.status == 'success') {
                            $scope.car = car.data;
                        } else {
                            $log.error('获取订单车辆信息', car);
                        }
                    });
                    AccountInformation.getDriverInfoById($scope.routes.first.user_id).then(function (driver) {
                        if (driver.status == 'success') {
                            $scope.driver = driver.data;
                        } else {
                            $log.error('获取司机信息', driver);
                        }
                    })
                } else {
                    $scope.hasCars = false;
                }
            } else {
                $scope.des = '0辆车'
                $log.error('[获取订单所选车辆]', result)
            }
        });

        $scope.giveGoods = function (route) {

        }


        //同意提货
        $scope.agreePickUp = function (route) {
            //:order_id/:route_id
            $state.go('tab.StorePickUp', {type: "add", order_id: $scope.order_id, route_id: route._id});
        }
        //查看过磅信息
        $scope.weightInfo = function (route) {
            $state.go('tab.StorePickUp', {type: "edit", order_id: $scope.order_id, route_id: route._id});
        }


        $scope.goDetail = function (order) {
            console.log(order);
        }


    })
    .controller('StoreRouterCarList', function ($scope, $state, $ionicHistory, $stateParams, $log, PassService, AccountInformation, authenticationService) {
        var order_id = $stateParams.order_id;
        $scope.orderid = $stateParams.order_id;
        $scope.order = {};
        PassService.getOrderUseCar(order_id).then(function (result) {
            if (result.status == 'success') {
                $scope.route_info = result.route_info;
                $scope.routes = result.data;
            } else {
                $log.error('[获取订单所选车辆]', result)
            }
        });
        PassService.getOrderById(order_id).then(function (result) {
            if (result.status = 'success') {
                $log.info('获取订单信息', result);

                $scope.order = result.data;

                if (authenticationService.getCompanyInfo()._id == $scope.order.company_buy_id) {
                    //买方管理员
                    $scope.type = 'buy';
                } else if (authenticationService.getCompanyInfo()._id == $scope.order.company_sell_id) {
                    //卖方管理员
                    $scope.type = 'sell';
                } else {
                    console.log('other');
                }


                $scope.route_info = result.data.route_info;
            } else {
                $log.error('获取订单信息失败', result)
            }
        }, function (error) {
            $log.error('获取订单信息失败', error)
        })

        $scope.goBack = function () {
            $state.go('tab.StoreOrderDetail', {order_id: order_id});
        };

        //同意提货
        $scope.agreePickUp = function (route) {
            //:order_id/:route_id
            $state.go('tab.StorePickUp', {type: "add", order_id: order_id, route_id: route._id})

        }
        //查看过磅信息
        $scope.weightInfo = function (route) {
            $state.go('tab.StorePickUp', {type: "edit", order_id: order_id, route_id: route._id})
        }


    })
    .controller('SelectStoreManagerCtrl', function ($scope, $state, $stateParams, AccountInformation, $log, iAlert) {

        $scope.selectValues = [];
        //仓库管理员选择
        $scope.store_id = $stateParams.store_id;

        $scope.init = function () {
            AccountInformation.getAllStoreManagerFilter($scope.store_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.users = result.data;
                    $log.info('获取仓库管理用户', result);
                } else {
                    $log.error('获取仓库管理用户', result);
                }
            });
        };
        $scope.selectedChange = function (user, t) {
            if (t) {
                if (user.isSelect) {
                    $scope.selectValues.push(user._id);
                } else {
                    $scope.selectValues = _.reject($scope.selectValues, function (item) {
                        return item._id == user._id;
                    })
                }
            } else {
                user.isSelect = !user.isSelect;
                if (user.isSelect) {
                    $scope.selectValues.push(user._id);
                } else {
                    $scope.selectValues = _.reject(selectValues, function (item) {
                        return item._id == user._id;
                    })
                }
            }
        }
        $scope.confirm = function () {
            if ($scope.selectValues.length > 0) {
                AccountInformation.storeAddManagerBatch($scope.store_id, $scope.selectValues).then(function (result) {
                    if (result.status == 'success') {
                        $state.go('tab.StoresDetail', {store_id: $scope.store_id});
                    } else {
                        iAlert.alert('请选择管理员');
                        $log.error('关联失败!', result);
                    }
                })
            } else {
                iAlert.alert('请选择管理员');
            }
            //selectValues
        }
    })
    .controller('LineSelectCarCtrl', function ($scope, $ionicHistory, $state, $location, $stateParams, iAlert, AccountInformation, $log) {

        $scope.line_id = $stateParams.line_id;
        var selectCars = [];
        AccountInformation.getAllLine().then(function (result) {
            if (result.status == 'success') {
                $log.info('获取线路信息', result);
                $scope.lines = result.data;

                //排除当前线路的车辆

                $scope.lines = _.reject($scope.lines, function (item) {
                    return item._id == $scope.line_id;
                })


            } else {
                $log.error('获取线路信息', result);
            }
        })
        AccountInformation.getNotLineCars().then(function (result) {
            if (result.status == 'success') {
                $log.info('获取未指定线路的车辆信息', result);
                $scope.notLineCars = result.data;

            } else {
                $log.error('获取未指定线路的车辆信息', result);
            }
        })
        $scope.selected = function (car) {
            if (car.isSelect == true) {
                selectCars.push(car._id);
            }
            else {
                selectCars = _.reject(selectCars, function (item) {
                    return item._id == car._id;
                })
            }
        }
        $scope.confirm = function () {
            if (selectCars.length > 0) {
                AccountInformation.lineRelationCar($scope.line_id, selectCars).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('关联成功!', result);
                        //iAlert.alert('添加成功!')
                        $state.go('tab.Roadline');
                    } else {
                        $log.error('关联失败!', result);
                        iAlert.alert('添加失败，稍后再试!')
                    }
                })
            } else {
                iAlert.alert('请选择车辆')
            }
        }
        $scope.cancel = function () {
            $state.go('tab.Roadline');
        }
    })
    .controller('CarTeamCtrl', function ($scope, $state, $ionicPopup, $log, iAlert) {
        $scope.navbar = {
            navLeftClick: 'goBack()'
        };

        $scope.applyDriver = function () {
            $state.go('tab.newMessage')
        };

        $scope.selfDriver = function () {
            var obj = {templateUrl: '/template/common/popup_radio.html', title: '自有车辆'};
            var data = {type: 'radio'};
            $scope.popup_lists = [{eng: 'CAR', chn: '添加车辆信息'}, {eng: 'DRIVE', chn: '添加司机信息'}];
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res.subtype.eng == 'CAR') {
                    console.log('CAR');
                    var type = 'team';
                    $state.go('tab.AddCar', {type: type})
                } else {
                    console.log('DRIVE');
                    $state.go('tab.newMessage')
                }

            })
        };

        $scope.goBack = function () {
            window.history.go(-1);
        };
    })
