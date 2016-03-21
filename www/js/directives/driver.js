/**
 * Created by ID on 15/12/21.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.directive')
    .directive('driverOrderCurrentItem', function () {
        return {
            restrict: 'EAC',
            scope: {
                route: '=',
                goDetail: '&'
            },
            templateUrl: 'js/directives/template/driver/driverOrderItem.html',
            replace: true,
            controller: function ($scope, $log, DriverService) {
                DriverService.getOrderById($scope.route.order_id).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('获取司机订单', result);
                        $scope.order = result.data[0];
                    } else {
                        $log.error('获取司机订单', result);
                    }
                }, function (error) {
                    $log.error('获取司机订单', error);
                });
            }
        }
    })
    .directive('driverUserItem', function () {
        return {
            restrict: 'EAC',
            scope: {
                driver: '=driver',
                goDetail: '&'
            },
            templateUrl: 'js/directives/template/driver/driverUserItem.html',
            replace: true,
            controller: function ($scope, $log, DriverService) {

            }
        }
    })
    .directive('driverCarInfoItem', function () {
        return {
            restrict: 'EAC',
            scope: {
                user: '=item',
                goDetail: '&',
                button:'=showbtn',
                applyDrive:'&applyDrive'
            },
            templateUrl: 'js/directives/template/driver/driverCarInfoItem.html',
            replace: true,
            controller: function ($scope, $filter, $state, $log, DriverService, PassService) {

                $scope.goDriverDetail = function (user) {
                    $scope.$parent.$parent.goDriverDetail(user);
                }
                $scope.get = function (user) {
                    DriverService.getDriverOrderCount(user._id).then(function (result) {
                        if (result.status == 'success') {
                            user.orderCount = result.data;
                        } else {
                            $log.error('获取司机订单总数', result);
                            user.orderCount = 0;
                        }
                    })
                }
            }
        }
    })
    .directive('driverCarInfoItemGroupByStatus', function () {
        return {
            restrict: 'EAC',
            scope: {
                typeItem: '=typeItem',
                goDetail: '&'
            },
            templateUrl: 'js/directives/template/driver/driverCarInfoItemGroupByStatus.html',
            replace: true,
            controller: function ($scope, $filter, $state, $log, DriverService, PassService) {
                $scope.goDriverDetail = function (user) {
                    $scope.$parent.$parent.goDriverDetail(user);
                }
                $scope.get = function (user) {
                    DriverService.getDriverOrderCount(user._id).then(function (result) {
                        if (result.status == 'success') {
                            user.orderCount = result.data;
                        } else {
                            $log.error('获取司机订单总数', result);
                            user.orderCount = 0;
                        }
                    })
                }
            }
        }
    })
    .directive('carTypeTotal', function () {
        return {
            restrict: 'EAC',
            scope: {
                items: '=items',
                truck: '=truck'
            },
            templateUrl: 'js/directives/template/driver/carTypeTotal.html',
            replace: true,
            controller: function ($scope, $log, $linq, DriverService) {
                //-------------------
                //var queryResult = $linq.Enumerable().From($scope.truck).GroupBy('$.type', '$._id', function (key, group) {
                //    return {type: key, total: group.Count()}
                //}, function (key) {
                //    return key.toString();
                //}).ToArray();

                //$scope.items = queryResult;
                //-------------------


            }
        }
    })
    .directive('carTypeDriverInfo', function () {
        return {
            restrict: 'EAC',
            scope: {
                userId: '@userId',
                goDetail: '&'
            },
            templateUrl: 'js/directives/template/driver/carTypeDriverInfo.html',
            replace: true,
            controller: function ($scope, $log, AccountInformation) {
                $scope.init = function () {
                    AccountInformation.getDriverInfoById($scope.userId).then(
                        function (result) {
                            if (result.status == 'success') {
                                $scope.user = result.data;
                            } else {
                                $scope.user = null;
                            }
                        }
                    )
                }
            }
        }
    })
    .directive('driverOldOrderItem', function () {
        return {
            restrict: 'EAC',
            scope: {
                orderId: '=orderId',
                gain:'&',
                grab:'=grab',
                over:'=over'
            },
            templateUrl: 'js/directives/template/driver/driverOldOrderItem.html',
            replace: true,
            controller: function ($scope, $log, DriverService, authenticationService) {
                $scope.$watch('orderId', function () {
                    DriverService.getOrderById($scope.orderId).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('司机历史订单', result)
                            //司机的历史订单,返回的是数组。
                            $scope.order = result.data[0];
                            console.log($scope.order.route_info)
                            //遍历出
                            var count = _.filter($scope.order.route_info, function (item) {
                                return item.user_id == authenticationService.getUserInfo().user._id
                            });
                            $scope.count = count.length;

                        } else {
                            $log.error('司机历史订单', result)
                        }
                    })
                })

            }
        }
    })

