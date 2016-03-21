/**
 * Created by ID on 15/12/8.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.directive')
    .directive('rscAddress', function () {
        return {
            restrict: 'EAC',
            scope: {
                addressId: '=addressId',
                addressName: '@addressName',
                addressIcon: '@addressIcon',
                textClass: '@textClass',
                order: "="
            },
            templateUrl: 'js/directives/template/passAddress.html',
            replace: true,
            controller: function ($scope, $filter, StoreManage, $log) {
                $scope.$watch("order", function () {
                    if ($scope.order) {
                        $log.info('order', $scope.order);
                        if ($scope.order.type && $scope.order.type == 'TWO') {
                            if ($scope.addressName == '交货地点') {
                                $scope.addressDetail = $scope.order.receive_province + $scope.order.receive_city + $scope.order.receive_district + $scope.order.receive_addr;
                            } else {
                                //提货时间
                                $scope.addressDetail = $scope.order.send_province + $scope.order.send_city + $scope.order.send_district + $scope.order.send_addr;
                            }
                        } else {
                            $scope.$watch("addressId", function () {
                                $log.info('addressId', $scope.addressId);
                                StoreManage.getInfoById($scope.addressId).then(function (result) {
                                    if (result) {
                                        $scope.addressDetail = $filter('rsc.address')(result);
                                    } else {
                                        $log.error('directive.rscAddress', result);
                                    }
                                });
                            })
                        }
                    }

                })


            }
        }
    })
    .directive('passTime', function () {
        return {
            restrict: 'EAC',
            scope: {
                timeValue: '=timeValue',
                timeName: '@timeName',
            },
            templateUrl: 'js/directives/template/passTime.html',
            replace: true,
            controller: function ($scope, $filter) {

                //$scope.time = new Date($scope.timeValue).toLocaleDateString();
                $scope.time = moment(new Date($scope.timeValue)).format('LL');

                // 2015年12月8日
            }
        }
    })
    .directive('passRushList', function () {
        return {
            restrict: 'EAC',
            scope: {
                data: '=data',
                showDetial: '@showDetial',
                showCount: '=showCount',
                showBalanceDetail: '=showBalanceDetail',
                goDetail: '&goDetail',
                hideCountDown: '@'
            },
            templateUrl: 'js/directives/template/passRushList.html',
            replace: true,
            controller: function ($scope, $rootScope, StoreManage) {
                //$scope.title = {
                //    begin: '',
                //    end: '',
                //    //company_id: $scope.data.company_id
                //}
                //StoreManage.getInfoById($scope.data.location_arrival).then(function (result) {
                //    $scope.title.end = result.province;
                //})
                //StoreManage.getInfoById($scope.data.location_depart).then(function (result) {
                //    $scope.title.begin = result.province;
                //})

                //$scope.goDetail = function () {
                //    $state.go('tab.rushTranspDetail', {demand_id: $scope.data._id});
                //}
            }

        }
    })
    .directive('payOpation', function () {
        return {
            restrict: 'EAC',
            scope: {
                stylePayment: '=stylePayment',
                canJoin: '=canJoin'
            },
            templateUrl: 'js/directives/template/payOpation.html',
            replace: true,
            controller: function ($scope, $filter) {
                //if()  ，可凑单
                //$scope.time = new Date($scope.timeValue).toLocaleDateString();
                if ($scope.canJoin) {
                    $scope.canJoinText = '，可凑单';
                }
            }
        }
    })
    .directive('passCount', function () {
        return {
            restrict: 'EAC',
            //scope: true,
            scope: {
                description: '@description',
                count: '=count',
                demandId: '=demandId'
            },
            templateUrl: 'js/directives/template/passCount.html',
            replace: true,
            controller: function ($scope, PassService) {
                PassService.getDemandOfferCountById($scope.demandId).then(function (result) {
                    if (result.status == 'success') {
                        $scope.showText = $scope.description.replace('[]', result.data);
                    }
                });
            }
        }
    })
    .directive('passBalanceDetail', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passBalanceDetail.html',
            scope: {
                data: '=data'
            },
            replace: true


        }
    })
    .directive('passCanJoin', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passCanJoin.html',
            replace: true,
            scope: true,
            controller: function () {

            }

        }
    })
    /**
     * 物流抢单报价价格输入
     */
    .directive('passInputCanJoinAmount', function () {
        return {
            restrict: 'EAC',
            scope: true,
            templateUrl: 'js/directives/template/passInputCanJoinAmount.html',
            replace: true,
            controller: function ($scope) {
                if (!$scope.data.can_join) {
                    $scope.offer.amount = $scope.data.amount;
                }
            }

        }
    })
    /**
     * 需求单明细页面下方物流企业报价列表
     */
    .directive('passOfferList', function () {
        return {
            restrict: 'EAC',
            scope: {
                data: '=data',
                index: '=index',
                selectedChange: '&',
                editOffer: '&',
                timeOut: '=timeOut',
                userType: '=userType',
                hasAuthority: '=hasAuthority'
            },
            templateUrl: 'js/directives/template/passOfferList.html',
            replace: true,
            controller: function ($scope, PassService, AccountInformation, authenticationService, $log) {
                $scope.company = {};
                //$scope.offer = $scope.data;
                $scope.modifyCount = $scope.data.modify_count;
                $scope.price = $scope.data.price;
                $scope.amount = $scope.data.amount;
                if ($scope.data.min) {
                    $scope.min = $scope.data.min;
                }

                $log.info('抢单', $scope.data);
                $scope.style_payment = $scope.data.style_payment;
                AccountInformation.getTrafficCompanyById($scope.data.company_id).then(function (result) {
                    if (result.status == 'success') {
                        var user = authenticationService.getUserInfo().user;
                        //所有的物流角色 TRAFFIC 开头和 记录不是本公司的将显示***
                        if (user.role.indexOf("TRAFFIC") != -1
                            && user.company_id != $scope.data.company_id) {
                            $scope.canEdit = false;
                            $scope.company.name = "****";
                        } else {
                            if ($scope.hasAuthority) {
                                $scope.canEdit = true;
                                $scope.company.name = result.data.full_name;
                            } else {
                                if (user.role.indexOf("TRAFFIC") > -1
                                    && user.company_id == $scope.data.company_id) {
                                    $scope.canEdit = true;
                                    $scope.company.name = result.data.full_name;
                                } else {
                                    $scope.canEdit = true;
                                    $scope.company.name = "****";
                                }
                            }
                        }
                        if (result.data.verify_phase == 'SUCCESS') {
                            $scope.company.isVerifySuccess = true;
                        } else {
                            $scope.company.isVerifySuccess = false;
                        }
                        //TODO 注释车辆信息
                        //AccountInformation.getAllCars($scope.data.company_id).then(function (result) {
                        //    if (result.status == 'success') {
                        //        $scope.cars = result.data;
                        //        var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$._id', function (key, group) {
                        //            return {type: key, total: group.Count()}
                        //        }, function (key) {
                        //            return key.toString();
                        //        }).ToArray();
                        //        $scope.carTotal = queryResult;
                        //    }
                        //});
                    } else {
                        console.log(result)
                    }
                });

                //PassService.getDemandById($scope.demand_id).then(function (result) {
                //    if (result.status == 'success') {
                //      console.log(result)
                //    }
                //});
                //
            }
        }
    })
    .directive('passOfferUserTruck', function () {
    })
    .directive('passTrafficLine', function () {
        return {
            restrict: "EAC",
            scope: {
                line: '=line',
                goDetail: "&goDetail"
            },
            templateUrl: 'js/directives/template/passTrafficLine.html',
            replace: true,
            controller: function ($scope, AccountInformation, $linq) {
                AccountInformation.getLineCars($scope.line._id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.cars = result.data;
                        //var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$._id', function (key, group) {
                        //    return {type: key, total: group.Count()}
                        //}, function (key) {
                        //    return key.toString();
                        //}).ToArray();

                        //$scope.carTotal = queryResult;
                        $scope.carTotal = $scope.cars.length;
                    }

                });

                AccountInformation.getLinePriceList($scope.line._id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.price = result.data[0];
                    } else {
                        console.log(result);
                    }
                });

            }
        }
    })
    //.directive('passMyAllCars', function () {
    //    return {
    //        restrict: "EAC",
    //        scope: true,
    //        templateUrl: 'js/directives/template/passMyAllCars.html',
    //        replace: true,
    //        controller: function ($scope) {
    //
    //        }
    //    }
    //})
    .directive('passCarsTotal', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passCarsTotal.html',
            replace: true,
            //scope:true
            scope: {
                textColor: "@textColor",
                car: "=car"
            }
        }
    })
    .directive('passTrafficLineDetail', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passTrafficLineDetail.html',
            replace: true,
            scope: {
                line: '=line'
            }, controller: function () {

            }
        }
    })
    /**
     * 物流我的订单
     */
    .directive('passOrderItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passOrderItem.html',
            replace: true,
            scope: {
                order: '=order',
                goDetail: '&goDetail',
                orderType: "@"
            }, controller: function () {

            }
        }
    })
    /**
     * 物流订单标题
     */
    .directive('passTitle', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passTitle.html',
            replace: true,
            scope: {
                beginId: '=',
                endId: '=',
                //type: '=',
                //amount: '=',
                textClass: '@',
                text: '@',
                order: '='
            }, controller: function ($scope, StoreManage, $log) {
                $scope.address = {};
                $scope.$watch("order", function () {
                    if ($scope.order) {
                        $scope.type = $scope.order.category_chn;
                        $scope.amount = $scope.order.amount;
                        $log.info($scope.order);
                        if ($scope.order.type && $scope.order.type == 'TWO') {
                            $scope.address.begin = $scope.order.send_province;
                            $scope.address.end = $scope.order.receive_province;
                            $log.info('address', $scope.order.receive_province)
                        } else {
                            if ($scope.order.location_depart) {
                                StoreManage.getInfoById($scope.order.location_depart).then(function (result) {
                                        if (result) {
                                            $log.info(result);
                                            $scope.address.begin = result.province;
                                        } else {
                                            $log.error('仓库地址', result);

                                        }

                                    }
                                )
                            }
                            if ($scope.order.location_arrival) {
                                StoreManage.getInfoById($scope.order.location_arrival).then(function (result) {
                                        if (result) {
                                            $scope.address.end = result.province;
                                        } else {
                                            $log.error('仓库地址', result);
                                        }
                                    }
                                )
                            }
                        }
                    }
                })


                //if ($scope.order && $scope.order.type && $scope.order.type == 'TWO') {
                //    $scope.address.begin = $scope.order.send_province;
                //    $scope.address.end = $scope.order.receive_province;
                //} else {
                //    $scope.$watch("beginId", function () {
                //
                //    }, function (error) {
                //        $log.error('error', error);
                //    });
                //    $scope.$watch("endId", function () {
                //        if ($scope.beginId) {
                //            StoreManage.getInfoById($scope.endId).then(function (result) {
                //                    $scope.address.end = result.province;
                //                }
                //            )
                //        }
                //    })
                //}
            }, link: function (scope, element, attr) {

            }
        }
    })
    .directive('passCarItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passCarItem.html',
            replace: true,
            scope: {
                typeInfo: '=',
                selectedChange: '&selectedChange',
                changeDriver: '&',
                goNext: '&goNext'
            }, controller: function ($filter, $scope, AccountInformation, PassService, $log) {
                $scope.driver = {};

                //获取司机信息  取 user_id 数组第一个[0]
                $scope.init = function (car) {
                    car.driver = {};
                    AccountInformation.getDriverInfoById(car.user_id[car.user_id.length - 1]).then(function (result) {
                        if (result.status == 'success') {
                            car.driver.name = result.data.real_name;
                        }
                    })
                    PassService.getDriverStateById(car.user_id[car.user_id.length - 1]).then(function (result) {
                        if (result.status == 'success') {
                            //$scope.driver.status=
                            car.driver.status = $filter('selectCarDriverStatus')(result.data);
                            car.driver.statusCSS = $filter('selectCarDriverStatusCSS')(result.data);
                        } else {
                            $log.error('司机状态', result.data);
                        }
                    })

                    // 实现运输次数加减
                    car.count = 1;
                    $scope.add = function (car, num) {
                        var n = car.count + num;
                        if (n <= 0) {
                            return;
                        }
                        car.count += num;
                    }

                    $scope.selectedChange = function (car) {
                        $scope.$emit('selectCar', car);
                    }
                    $scope.goNext = function (car) {
                        $scope.$emit('changeDriver', car);
                    }
                }


            }
        }
    })
    .directive('passDriverCarInfo', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passDriverCarInfo.html',
            replace: true,
            scope: {
                selectCar: '=selectCar',
            }, controller: function ($scope, PassService, AccountInformation) {
                console.log($scope.selectCar);
                PassService.getCarInfoById($scope.selectCar.truck_id).then(function () {
                    console.log(result)

                    if (result.status == 'success') {
                        $scope.car = result.data;
                    }
                });
                AccountInformation.getDriverInfoById($scope.selectCar.user_id).then(function () {
                    console.log(result)
                    if (result.status == 'success') {
                        $scope.driver = result.data;
                    }
                })
            }
        }
    })

    .directive('passRouterCarItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passRouterCarItem.html',
            replace: true,
            scope: {
                route: '=route',
                goNext: '&goNext'
            }, controller: function ($scope, PassService, AccountInformation) {

                AccountInformation.getCarInfoById($scope.route.truck_id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.car = result.data;
                    }
                });
                AccountInformation.getDriverInfoById($scope.route.user_id).then(function (driver) {
                    if (driver.status == 'success') {
                        $scope.driver = driver.data;
                    }
                })
            }
        }
    })
    .directive('passRouteComplete', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passRouteComplete.html',
            replace: true,
            scope: {
                route: '=route',
            }, controller: function ($scope, PassService, AccountInformation) {

                AccountInformation.getCarInfoById($scope.route.truck_id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.car = result.data;
                    }
                });
                AccountInformation.getDriverInfoById($scope.route.user_id).then(function (driver) {
                    if (driver.status == 'success') {
                        $scope.driver = driver.data;
                    }
                })
            }
        }
    })
    .directive('passPrice', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/passPrice.html',
            replace: true,
            scope: {
                priceText: '@priceText',
                price: '=price'
            }, controller: function ($scope, StoreManage, $log) {

            }
        }
    })
    .directive('storeRouteCarInfo', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/store/storeRouteCarInfo.html',
            replace: true,
            scope: {
                route: '=route',
                agreePickUp: '&agreePickUp',
                weightInfo: '&weightInfo',
                type: '=type'
            }, controller: function ($scope, StoreManage, $log, AccountInformation) {
                $scope.$watch('route', function () {
                    if ($scope.route) {
                        if ($scope.route.truck_id) {
                            AccountInformation.getCarInfoById($scope.route.truck_id).then(function (car) {
                                if (car.status == 'success') {
                                    $scope.car = car.data;
                                    $log.info('cars', car)
                                }
                            });
                            AccountInformation.getDriverInfoById($scope.route.user_id).then(function (driver) {
                                if (driver.status == 'success') {
                                    $scope.driver = driver.data;
                                }
                            })
                        }
                    }
                })
            }
        }
    })
    .directive('linePriceCarList', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/line/linePriceCarList.html',
            replace: true,
            scope: {
                price: '=price',
                carType: '=carType'
            }, controller: function ($scope, StoreManage, $filter, $stateParams, $log, AccountInformation) {

                AccountInformation.getLineCarList($stateParams.line_id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.lineCars = _.filter(result.data, function (item) {
                            return item.type == $scope.carType;
                        });
                        $log.info('获取线路中所有车辆信息', result);
                    } else {
                        $log.error('获取线路中所有车辆信息', result);
                    }
                })
            }
        }
    })

    .directive('carItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/car/carItem.html',
            replace: true,
            scope: {
                car: '=car',
                showCheck: '=showCheck',
                selected: "&selected",
                goDetail: '&goDetail'
            },
            controller: function ($scope, StoreManage, $filter, $stateParams, $log, AccountInformation) {

            }
        }
    })
    .directive('myCarItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/me/myCarItem.html',
            replace: true,
            scope: {
                line: '=line',
                showCheck: '=showCheck',
                //selected: "&selected",
                selectCar: "&selectCar"
            }
            , link: function (scope, el, attrs) {

            }, controller: function ($scope, $rootScope, StoreManage, $filter, $stateParams, $log, AccountInformation) {

                AccountInformation.getLineCarList($scope.line._id).then(function (result) {
                    if (result.status == 'success') {
                        $scope.lineCars = result.data;
                        //$scope.lineCars = _.filter(result.data, function (item) {
                        //    return item.type == $scope.carType;
                        //});
                        $log.info('获取线路中所有车辆信息', result);
                    } else {
                        $log.error('获取线路中所有车辆信息', result);
                    }
                })
                $scope.selected = function (car) {
                    $scope.$parent.$parent.selected(car);
                }
            }
        }
    })
    .directive('carTypeItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/car/carTypeItem.html',
            replace: true,
            require: '?^MyCarListGroupByType',
            scope: {
                cars: '=cars',
                type: '=type',
                delCar: '&delCar',
                showCarRemove: '=showCarRemove',
                hideDetailIcon: '=',
                showCheck: '=',
                selectCar: "&",
                showDel: '=',
                delText: '@',
                del: '&'


            }
            , link: function (scope, element, attrs, instance) {

            }, controller: function ($scope) {
                //ng-model="car.isSelect" ng-change="selected(car)"
                //$scope.del = function (car) {
                //    //删除车辆和线路关系
                //    //删除车辆和司机的关系
                //    $scope.$parent.$parent.del(car);
                //}
                $scope.goDetail = function (car) {
                    $scope.$parent.$parent.goDetail(car);
                }
                $scope.selected = function (car) {

                    $scope.$parent.$parent.selected(car);
                }
            }
        }
    })
    .directive('storeOrderItem', function () {
        return {
            restrict: 'EAC',
            templateUrl: 'js/directives/template/store/storeOrderItem.html',
            replace: true,
            scope: {
                order: '=order'

            },
            require: "^SelectCarCtrl"
            , controller: function ($scope, authenticationService, PassService, $filter, $stateParams, $log, AccountInformation) {
                $scope.init = function () {
                    $scope.companyId = authenticationService.getCompanyInfo()._id;

                    if ($scope.companyId == $scope.order.company_buy_id) {
                        //买方管理员
                        $scope.type = 'buy';
                    } else if ($scope.companyId == $scope.order.company_sell_id) {
                        //卖方管理员
                        $scope.type = 'sell';
                    }

                    PassService.getOrderUseCar($scope.order._id).then(function (result) {
                        if (result.status == 'success') {
                            $scope.des = result.data.length + '辆车';
                        } else {
                            $scope.des = '0辆车'
                        }
                    })


                }
            }
        }
    })
    .directive('contactItem', function () {
        return {
            restrict: "EAC",
            templateUrl: 'js/directives/template/common/contactItem.html',
            replace: true,
            scope: {
                contact: "=",
                index: "=",
                del: '&'
            }, controller: function () {

            }
        }
    })
    .directive('contactsType', function () {
        return {
            restrict: "EAC",
            templateUrl: 'js/directives/template/me/contact.html',
            replace: true,
            scope: {
                contactsTypes: "=",
            }, controller: function () {

            }
        }
    })
    .directive('myOfferItem', function () {
        return {
            restrict: "EAC",
            templateUrl: 'js/directives/template/me/myOfferItem.html',
            replace: true,
            scope: {
                offer: "=",
                editOffer: "&",
                goDetail: '&'
            },
            controller: function ($scope, PassService, $log, AccountInformation, StoreManage, $filter) {
                $scope.company = {};
                $scope.address = {};
                $scope.title = {};
                $scope.init = function () {
                    PassService.getDemandById($scope.offer.demand_id).then(function (result) {
                        if (result.status == 'success') {
                            $scope.demand = result.data;
                            $log.info('货源信息', result);

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
                            //判断是否超时
                            $scope.timeOut = $filter('timeOut')($scope.demand.time_validity);
                            if ($scope.demand.type == 'TWO') {
                                $scope.title.end = $scope.demand.receive_province;
                                $scope.address.location_arrival = $scope.demand.receive_province + $scope.demand.receive_city + $scope.demand.receive_district + $scope.demand.receive_addr;

                                $scope.title.begin = $scope.demand.send_province;
                                $scope.address.location_depart = $scope.demand.send_province + $scope.demand.send_city + $scope.demand.send_district + $scope.demand.send_addr;

                            } else {
                                StoreManage.getInfoById($scope.demand.location_arrival).then(function (result) {
                                    $scope.title.end = result.province;
                                    $scope.address.location_arrival = $filter('rsc.address')(result);

                                });
                                StoreManage.getInfoById($scope.demand.location_depart).then(function (result) {
                                    $scope.title.begin = result.province;
                                    $scope.address.location_depart = $filter('rsc.address')(result);
                                });
                            }


                        } else {
                            $log.error('获取物流货源信息失败', result);
                        }
                    })
                }
            }

        }
    })


