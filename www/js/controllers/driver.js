/**
 * Created by ID on 15/12/21.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.controllers.driver', [])
    .controller('DriverOrderListCtrl', function ($scope, DriverService, $state, $log, authenticationService) {
      $scope.init = function () {
        $scope.role = authenticationService.getUserInfo().user.role;
        if($scope.role == 'TRAFFIC_DRIVER_PRIVATE'){
          $scope.canGrab();
        }else{
          $scope.loding();
        }
        $scope.goDetail = function (route) {
        $state.go('tab.driverOrderDetail', {route_id: route._id});
      }
    };
    //  可抢单（false）
    $scope.canGrab = function (type) {
      $scope.a=true;$scope.b=false;$scope.c=false;$scope.d=false;
      DriverService.getCanGrab(type).then(function (result) {
        if (result.status == 'success') {
          $log.info('获取可抢订单',result);
          $scope.currents = '';$scope.robbeds = '';$scope.orders = '';
          $scope.grabs = result.data;
        } else {
          $log.error('获取可抢订单失败', result)
        }
      })


    };
    //  已抢单（true）
    $scope.robbed = function (type) {
      $scope.a=false;$scope.b=true;$scope.c=false;$scope.d=false;
        DriverService.getCanGrab(type).then(function (result) {
          if (result.status == 'success') {
            $log.info('获取已抢订单',result);
            $scope.currents = '';$scope.orders = '';$scope.grabs = '';
            $scope.robbeds = result.data;
          } else {
            $log.error('获取已抢订单失败', result)
          }
        })


    };
    //  进行中
    $scope.loding = function () {
      $scope.a=false;$scope.b=false;$scope.c=true;$scope.d=false;
      DriverService.getOrderList().then(function (result) {
        if (result.status == 'success') {
          $log.info('获取进行中订单',result);
          $scope.robbeds = '';$scope.orders = '';$scope.grabs = '';
          $scope.currents = result.data.current;
        } else {
          $log.error('获取进行中订单失败', result)
        }
      })


    };
    //  已完成
    $scope.isOk = function () {
      $scope.a=false;$scope.b=false;$scope.c=false;$scope.d=true;
      DriverService.getOrderList().then(function (result) {
        if (result.status == 'success') {
          $log.info('获取已完成订单',result);
          $scope.currents = '';$scope.robbeds = '';$scope.grabs = '';
          $scope.orders = result.data.order_list;
        } else {
          $log.error('获取已完成订单失败', result)
        }
      })
    }
    // 抢单
    $scope.gain = function (id) {
      DriverService.gain(id).then(function (result) {
        if (result.status == 'success') {
          $scope.gaining = true;
          $log.info('抢单成功',result);
          $scope.init();
        } else {
          $log.error('抢单失败', result,id)
        }
      })
    }

    })

    .controller('DriverRouterCarList', function ($scope, $state, $ionicHistory, $stateParams, $log, PassService, AccountInformation, DriverService, authenticationService) {

        var order_id = $stateParams.order_id;
        $scope.route_id = $stateParams.route_id;

        $scope.init = function () {
            PassService.getAllRouteByOrderId(order_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.route_info = result.route_info;
                    $scope.routes = result.data;
                    $log.info('[获取订单所选车辆]', result);

                } else {
                    $log.error('[获取订单所选车辆]', result);
                }
            });
            DriverService.getOrderById(order_id).then(function (result) {
                if (result.status = 'success') {
                    $scope.route_info = result.data[0].route_info;
                    $log.info('司机获取订单信息', result)
                } else {
                    $log.error('获取订单信息失败', result)
                }
            }, function (error) {
                $log.error('获取订单信息失败', error)
            })
        }


        $scope.goNext = function (route) {
            if (route.user_id != authenticationService.getUserInfo().user._id) {
                $log.warn('not allow');
                return;
            } else {
                $state.go('tab.driverPickUp', {order_id: order_id, route_id: route._id});
            }
        }

        $scope.goBack = function () {
            $state.go('tab.driverOrderDetail', {route_id: $stateParams.route_id});
        }

    })

    .controller('DriverOrderDetailCtrl', function (iAlert, $scope, DriverService, $log, $state, $stateParams, PassService, AccountInformation) {
        $scope.routes = {};
        $scope.init = function () {
            DriverService.getRouteById($stateParams.route_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.route = result.data;
                    DriverService.getOrderById($scope.route.order_id).then(function (order) {
                        if (result.status == 'success') {
                            $scope.order = order.data[0];
                            $log.info('订单信息', order);
                            PassService.getAllRouteByOrderId($scope.order._id).then(function (result) {
                                if (result.status == 'success') {
                                    if (result.data.length != 0) {
                                        $scope.routes = result.data;
                                        $scope.routes.count = result.data.length;

                                        $scope.routes.first = result.data[0];

                                        AccountInformation.getCarInfoById($scope.routes.first.truck_id).then(function (car) {
                                            if (car.status == 'success') {
                                                $scope.car = car.data;
                                                $log.info('cars', car)
                                            } else {
                                                $log.error('get Car info error', result);
                                            }
                                        });
                                        AccountInformation.getDriverInfoById($scope.routes.first.user_id).then(function (driver) {
                                            if (driver.status == 'success') {
                                                $scope.driver = driver.data;
                                            }
                                        })
                                    } else {
                                        $log.debug('not found')
                                    }
                                } else {
                                    $log.error('[获取订单所选车辆]', result)
                                }
                            });

                        } else {
                            $log.error('获取订单信息失败', order);
                        }
                    }, function (error) {

                    })
                }
            });
        }

        //确认订单
        $scope.confirm = function (order) {

            DriverService.driverAgreeOrder(order._id, true).then(function (result) {
                if (result.status == 'success') {
                    $log.info('司机确认订单')
                    $state.reload('tab.driverOrderDetail')
                } else {
                    $log.error('司机确认订单', result)
                }
            })
        };

        //$scope.navbar = {
        //    navRightHref: "#/tab/driver_add_message/" + ""
        //    //"tab.rul({order_id})"
        //};
        //拒绝订单
        $scope.reject = function (order) {
            DriverService.driverAgreeOrder(order._id, false).then(function (result) {
                if (result.status == 'success') {
                    $log.info('司机拒绝订单')
                    $state.go('tab.driverOrderList');
                } else {
                    $log.error('司机拒绝订单', result)
                }
            })
        };
        $scope.goDetail = function (route) {
            $state.go('tab.RouteList', {order_id: route.order_id});
        };

        //申请提货
        $scope.pickUp = function () {
            if ($scope.order.step >= 3) {
                if ($scope.order.type == 'TWO') {
                    if ($scope.route.fact && $scope.route.fact <= $scope.order.amount) {
                        DriverService.driveTwoPackage($scope.route.order_id, $scope.route.fact).then(function (result) {
                            if (result.status == 'success') {
                                $log.info('申请提货');
                                $state.reload('tab.driverOrderDetail');
                            } else {
                                $log.error('申请提货', result);
                            }
                        })
                    } else {
                        iAlert.alert('请填写提货数量,大于0小于等于订单吨数!');
                    }

                } else {
                    DriverService.pickUp($scope.route.order_id).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('申请提货');
                            $state.reload('tab.driverOrderDetail');
                        } else {
                            $log.error('申请提货', result);
                        }
                    })
                }

            } else {
                iAlert.alert('等待收预付款之后才能申请。');
            }
        };
        //查看提货详情并确认。
        $scope.showPickInfo = function () {
            $state.go('tab.driverPickUp', {order_id: $scope.route.order_id, route_id: $scope.route._id});

            //$state.go('tab.RouteList', {order_id: $scope.route.order_id});
        }

        $scope.logLocation = function () {

        }

        $scope.deliverGoods = function () {
            if ($scope.order.type == 'TWO') {
                if ($scope.route.last && $scope.route.last <= $scope.order.amount && $scope.route.last <= $scope.route.fact) {
                    DriverService.driverTWoGive($scope.route.order_id, $scope.route.last).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('两方司机申请交货');
                            $state.reload('tab.driverOrderDetail');
                        } else {
                            iAlert.alert('交货失败!');
                            $log.error('两方司机申请交货', result);
                        }
                    })
                } else {
                    iAlert.alert('请填写交货数量,大于0小于等于订单吨数且小于等于提货吨数!');
                }
            } else {
                DriverService.giveGoods($scope.route.order_id).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('申请提货')
                        $state.reload('tab.driverOrderDetail');
                    } else {
                        iAlert.alert('交货失败!');
                        $log.error('申请提货', result)
                    }
                })
            }

        }
    })
    .controller('DriverPickUpCtrl', function (iAlert, $scope, $state, $stateParams, PassService, DriverService, $log, AccountInformation, DriverService, authenticationService, StoreManage) {
        var order_id = $stateParams.order_id;
        $scope.orderid = $stateParams.order_id;
        var route_id = $stateParams.route_id;
        var type = $stateParams.type;

        $scope.route = {};
        $scope.order = {};
        $scope.car = {};
        $scope.company = {};
        $scope.route.number = 1;
        $scope.init = function () {

            PassService.getOrderById(order_id).then(function (result) {
                if (result.status == 'success') {
                    $scope.order = result.data;
                    if (authenticationService.getCompanyInfo()._id == result.data.company_buy_id) {
                        //买方管理员
                        $scope.type = 'buy';
                    } else if (authenticationService.getCompanyInfo()._id == result.data.company_sell_id) {
                        //卖方管理员
                        $scope.type = 'sell';
                    }
                } else {
                    $log.error('', result)
                }
            });

            //获取route信息，获取司机、获取公司信息、获取车辆信息
            DriverService.getRouteById(route_id).then(function (result) {
                if (result.status == 'success') {

                    $scope.route = result.data;

                    if (type == 'edit') {
                        $scope.route.number = $scope.route.fact;
                    }
                    AccountInformation.getTrafficCompanyById($scope.route.company_id).then(function (company) {
                        if (result.status == 'success') {
                            $scope.company = company.data;
                        } else {
                            $log.error('获取物流公司信息失败', result);
                        }
                    });
                    AccountInformation.getCarInfoById($scope.route.truck_id).then(function (car) {
                        if (car.status == 'success') {
                            $scope.car = car.data;
                        } else {
                            $log.error('AccountInformation.getCarInfoById', result);
                        }
                    });
                    AccountInformation.getDriverInfoById($scope.route.user_id).then(function (driver) {
                        if (driver.status == 'success') {
                            $scope.driver = driver.data;
                        } else {
                            $log.error('AccountInformation.getDriverInfoById', result);

                        }
                    });
                }
            });

        }


        //司机提货
        $scope.pickUp = function () {
            DriverService.pickUp($scope.route.order_id).then(function (result) {
                if (result.status == 'success') {
                    $state.reload();
                    $log.info(result);
                } else {
                    iAlert.alert('申请失败!');
                    $log.error(result);
                }
            })
        };
        //过磅
        $scope.storeWeigh = function () {
            if ($scope.route.number && $scope.route.number > 0) {
                if (type == 'add') {
                    if ($scope.type == 'sell') {
                        iAlert.popup('请确认过磅信息,', '请和司机确认装载重量' + $scope.route.number + '吨，司机对装载量无异议!', function () {
                            PassService.storeWeigh($scope.route.order_id, $scope.route.user_id, $scope.route.number).then(function (result) {
                                if (result.status == 'success') {
                                    $state.go('tab.StoreRouteCarList', {order_id: order_id});
                                    $log.info(result);
                                } else {
                                    $log.error('填写过磅信息有误', result);
                                }
                            })
                        })
                    } else {
                        PassService.storeWeighForBuy($scope.route.order_id, $scope.route.user_id, $scope.route.number).then(function (result) {
                            if (result.status == 'success') {
                                $state.go('tab.StoreRouteCarList', {order_id: order_id});
                                $log.info(result);
                            } else {
                                $log.error('填写过磅信息有误', result);
                            }
                        })
                    }

                } else if (type == 'edit') {
                    if ($scope.type == 'sell') {
                        iAlert.popup('请确认过磅信息,', '请和司机确认装载重量' + $scope.route.number + '吨，司机对装载量无异议!', function () {
                            StoreManage.storeEditWeigh($scope.route.number, $scope.route.user_id, $scope.route.order_id).then(function (result) {
                                if (result.status == 'success') {
                                    $log.info('修改成功！');
                                    $state.go('tab.StoreRouteCarList', {order_id: $scope.route.order_id})
                                } else {
                                    $log.error('修改过磅信息', result)
                                }
                            })
                        })
                    } else {
                        StoreManage.storeEditWeighForBuy($scope.route.number, $scope.route.user_id, $scope.route.order_id).then(function (result) {
                            if (result.status == 'success') {
                                $log.info('修改成功！');
                                $state.go('tab.StoreRouteCarList', {order_id: $scope.route.order_id})
                            } else {
                                $log.error('修改过磅信息', result)
                            }
                        })
                    }
                }
            } else {
                iAlert.alert('请填写正确的吨数!');
            }
        };
        $scope.add = function (value) {
            if ($scope.route.number + value <= 0) {
                return;
            }
            if ($scope.route.number) {
                $scope.route.number += value;
            } else {
                $scope.route.number = 1;
            }
        };

    })
    .controller('DriverAddMessage', function ($scope, $state, $stateParams, DriverService, $log) {
        var order_id = $stateParams.order_id;
        $scope.route_id = $stateParams.route_id;
        $scope.info = {
            message: ''
        };

        DriverService.getRouteById($scope.route_id).then(function (result) {
            if (result.status == 'success') {
                $scope.route = result.data;
            }
        });

        $scope.send = function () {
            if ($scope.info.message) {
                DriverService.addNote(order_id, $scope.info.message).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('发送成功');
                        $scope.info.message = '';
                        DriverService.getRouteById($scope.route_id).then(function (result) {
                            if (result.status == 'success') {
                                $scope.route = result.data;
                            }
                        });
                    } else {
                        $log.error('发送失败', result);
                    }
                })
            }
        }

    })

    .controller('DriverManageCtrl', function ($scope, $linq, $state, AccountInformation, $log, $ionicLoading) {
        $scope.query = {
            getType: 1,
            page: 1,
            name: '',
            busy: false
        };
        var run = false;
        $scope.hasMore = true;

        var queryAction = function () {
            if (!run) {
                $ionicLoading.show();
                run = true;
                console.log($scope.query);
                AccountInformation.getAllUserTruck($scope.query).then(function (result) {
                    run = false;

                    if (result.status == 'success') {
                        $log.info('查询司机', result);

                        $scope.hasMore = result.data.exist;

                        //var queryResult = $linq.Enumerable().From(result.data.users).GroupBy('$.status', '$', function (key, group) {
                        //    return {status: key, total: group.Count(), values: group}
                        //}, function (key) {
                        //    return key;
                        //}).ToArray();
                        //$scope.typeList = queryResult;

                        if ($scope.query.getType == 3) {
                            if ($scope.typeList) {
                                $scope.typeList = $scope.typeList.concat(result.data.users);
                            } else {
                                $scope.typeList = result.data.users;
                            }
                        } else {
                            $scope.typeList = result.data.users;
                        }

                    } else {
                        $log.error('查询司机', result);
                        $scope.hasMore = false;
                    }
                }, function () {
                    $scope.hasMore = false;
                }).finally(function () {
                    $ionicLoading.hide();
                })
            } else {
                if ($scope.query.getType == 3) {
                    $scope.query.page -= 1;
                }
            }
        }
        $scope.init = function () {
            $scope.query.getType = 1;
            $scope.navbar = {
                navLeftIco: 'ion-ios-arrow-back',
                navLeftHref: 'tab.myRsc',
                navLeft: '返回',
                title: '司机管理',
                // navRightHref: "tab.newMemberForRole({role:'traffic_driver'})",
                navRightHref: "tab.newMessage({role:'traffic_driver'})",
                navRight: '邀请新司机'
            };

            AccountInformation.getCount().then(function (result) {
                if (result.status == 'success') {

                    $log.info('获取各个数量', result);

                    $scope.use = result.data.free;
                    $scope.used = result.data.busy;
                    $scope.Notuse = result.data.apply;

                } else {
                    $log.error('获取各个数量失败', result)
                }

            })

            queryAction();

            //AccountInformation.getAllUserTruck(null).then(function (result) {
            //    if (result.status == 'success') {
            //        $log.info('查询司机', result);
            //
            //        var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.status', '$', function (key, group) {
            //            return {status: key, total: group.Count(), values: group}
            //        }, function (key) {
            //            return key;
            //        }).ToArray();
            //        $scope.typeList = queryResult;
            //
            //    } else {
            //        $log.error('查询司机', result);
            //
            //    }
            //})


            //AccountInformation.getNoTruckUserCount().then(function (result) {
            //    if (result.status == 'success') {
            //        $log.info('获取没有车辆的司机个数', result);
            //        $scope.UserCount = result.data;
            //    } else {
            //        $log.error('获取没有车辆的司机个数', result);
            //    }
            //})

        }
        //$scope.$watch('search.driverName', function () {
        //    query({driver_name: $scope.search.driverName});
        //})

        // 获取未认证司机
        $scope.getNotUserTruck = function () {
            $scope.c = true;
            $scope.b = false;
            $scope.a = true;
            $scope.query.page = 1;
            $scope.query.getType = 1; //刷新
            if (!run) {
                $ionicLoading.show();
                run = true;
                console.log($scope.query);
                AccountInformation.getNotUserTruck($scope.query).then(function (result) {
                    run = false;
                    if (result.status == 'success') {
                        $log.info('查询司机', result);
                        $scope.hasMore = result.data.exist;

                        //var queryResult = $linq.Enumerable().From(result.data.users).GroupBy('$.status', '$', function (key, group) {
                        //    return {status: key, total: group.Count(), values: group}
                        //}, function (key) {
                        //    return key;
                        //}).ToArray();
                        //$scope.typeList = queryResult;

                        if ($scope.query.getType == 3) {
                            if ($scope.typeList) {
                                $scope.typeList = $scope.typeList.concat(result.data.users);
                            } else {
                                $scope.typeList = result.data.users;
                            }
                        } else {
                            $scope.typeList = result.data.users;
                        }
                    } else {
                        $log.error('查询司机', result);
                        $scope.hasMore = false;
                    }
                }, function () {
                    $scope.hasMore = false;
                }).finally(function () {
                    $ionicLoading.hide();
                })
            } else {
                if ($scope.query.getType == 3) {
                    $scope.query.page -= 1;
                }
            }
        };

        // 司机详情页查看车辆详情
        $scope.goDriverDetail = function (user) {
            $state.go('tab.DriverCard', {user_id: user._id});
            //$state.go('tab.DriverHome', {user_id: user._id});
        };

        // 查询忙碌（busy = false）、空闲（busy = true）司机
        $scope.queryDrivers = function (busy) {
            $scope.a = busy;
            $scope.b = busy;
            $scope.c = false;
            $scope.query.busy = busy;
            $scope.query.page = 1;
            $scope.query.getType = 1; //刷新
            queryAction();
        };

        // 审核认证司机
        $scope.applyDrive = function (userid, agree) {
            AccountInformation.applyDrive(userid, agree).then(function (result) {
                if (result.status == 'success') {
                    $log.info(agree, result);
                    $scope.queryDrivers();
                    $scope.init()
                } else {
                    $log.error(agree, result);
                }
            })
        };

        $scope.goCarAssign = function () {

        };
        // 搜索
        $scope.searchByName = function () {

            queryAction();
        };
        // 下拉刷新
        $scope.doRefresh = function () {
            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            if ($scope.c) {
                $scope.getNotUserTruck();
            } else {
                queryAction();
            }
            $scope.$broadcast('scroll.refreshComplete');
        };
        // 加载更多
        $scope.loadMore = function () {
            $scope.query.page += 1;
            $scope.query.getType = 3; //加载更多
            if ($scope.c) {
                $scope.getNotUserTruck();
            } else {
                queryAction();
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
    })
    .controller('DriverNotHasCarCtrl', function ($scope, $state, AccountInformation, $log) {
        AccountInformation.getUserNoTruck().then(function (result) {
            if (result.status == 'success') {
                $log.info('获取没有车辆的司机信息', result);
                $scope.users = result.data;
            } else {
                $log.error('获取没有车辆的司机信息', result);
            }
        })


        $scope.goDetail = function (user) {
            $state.go('tab.DriverSelectCar', {user_id: user._id, type: 0});
        }
    })
    .controller('DriverSelectCarCtrl', function ($scope, $linq, $ionicHistory, $state, $location, $stateParams, iAlert, AccountInformation, $log) {

        $scope.driver_id = $stateParams.user_id;
        $scope.type = $stateParams.type;

        var selectCars = [];
        $scope.search = {};
        $scope.init = function () {
            AccountInformation.getNotInUserTrucks({user_id: $scope.driver_id}).then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取不属于该司机的车辆', result);

                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();

                    $scope.carTypeList = queryResult;
                    $log.info('[分组]获取不属于该司机的车辆', $scope.carTypeList);

                } else {
                    $log.error('获取不属于该司机的车辆', result);
                }
            })


            //$scope.$watch('search.number', function () {
            //    AccountInformation.getNotInUserTrucks({user_id: $scope.driver_id, number: $scope.search.number}).then(function (result) {
            //        if (result.status == 'success') {
            //            $log.info('获取不属于该司机的车辆', result);
            //
            //            var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
            //                return {type: key, total: group.Count(), values: group}
            //            }, function (key) {
            //                return key.toString();
            //            }).ToArray();
            //            $scope.carTypeList = queryResult;
            //
            //        } else {
            //            $log.error('获取不属于该司机的车辆', result);
            //        }
            //    })
            //})
            //AccountInformation.getNotLineCars().then(function (result) {
            //    if (result.status == 'success') {
            //        $log.info('获取未指定线路的车辆信息', result);
            //        $scope.notLineCars = result.data;
            //
            //    } else {
            //        $log.error('获取未指定线路的车辆信息', result);
            //    }
            //})

            $scope.searchByNumber = function () {
                AccountInformation.getNotInUserTrucks({user_id: $scope.driver_id, number: $scope.search.number}).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('获取不属于该司机的车辆', result);

                        var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                            return {type: key, total: group.Count(), values: group}
                        }, function (key) {
                            return key.toString();
                        }).ToArray();
                        $scope.carTypeList = queryResult;

                    } else {
                        $log.error('获取不属于该司机的车辆', result);
                    }
                })
            }
        }

        $scope.selected = function (car) {
            if (car.isSelect == true) {
                selectCars[0] = car._id;
                _.each($scope.carTypeList, function (item) {
                    _.each(item.values.source, function (cars) {
                        if (cars._id != car._id) {
                            cars.isSelect = false;
                        }
                    })
                })
            }
            else {
                selectCars = _.reject(selectCars, function (item) {
                    return item == car._id;
                })
            }
        }
        $scope.confirm = function () {
            if (selectCars.length > 0) {
                AccountInformation.carRelationDriver($scope.driver_id, selectCars).then(function (result) {
                    if (result.status == 'success') {

                        $log.info('关联成功!', result);
                        //iAlert.alert('添加成功!')
                        if ($scope.type == 0) {
                            $state.go('tab.DriverNotHasCar');

                        } else if ($scope.type == 1) {
                            $state.go('tab.DriverHome', {user_id: $scope.driver_id});

                        }
                    } else {
                        $log.error('关联失败!', result);
                        iAlert.alert('添加失败，稍后再试!');
                    }
                })
            } else {
                iAlert.alert('请选择车辆');
            }
        }
        $scope.cancel = function () {

            if ($scope.type == 0) {
                $state.go('tab.Roadline');
            } else if ($scope.type == 1) {
                $state.go('tab.DriverHome', {user_id: $scope.driver_id});
            }
        }

        $scope.leftClick = function () {
            if ($scope.type == 0) {
                $state.go('tab.Roadline');
            } else if ($scope.type == 1) {
                $state.go('tab.DriverHome', {user_id: $scope.driver_id});
            }
        }
    })
    .controller('DriverHomeCtrl', function ($scope, iAlert, $log, $state, $stateParams, AccountInformation, $linq, DriverService) {
        $scope.user_id = $stateParams.user_id;
        $scope.init = function () {
            //获取司机信息
            //获取所属公司
            //获取线路
            AccountInformation.getDriverInfoById($scope.user_id).then(function (result) {
                if (result.status = 'success') {
                    $scope.user = result.data;
                    $log.info('司机信息', result.data);

                    AccountInformation.getTrafficCompanyById($scope.user.company_id[0]).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('公司信息', result.data);
                            $scope.company = result.data;
                        } else {
                            $log.error('公司信息', result);
                        }
                    })

                    DriverService.getDriverOrderCount($scope.user_id).then(function (result) {
                        if (result.status == 'success') {
                            $scope.user.orderCount = result.data;
                        } else {
                            $log.error('获取司机订单总数', result);
                            $scope.user.orderCount = 0;
                        }
                    })
                    DriverService.getDriverAmountCount($scope.user_id).then(function (result) {
                        if (result.status == 'success') {
                            $scope.user.amountCount = result.data.give;
                        } else {
                            $log.error('获取司机总吨数', result);
                            $scope.user.amountCount = 0;
                        }
                    })

                } else {
                    $log.error('司机信息', result.data);
                }
            })


            AccountInformation.getCarByUserId($scope.user_id).then(function (result) {
                if (result.status == 'success') {
                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();
                    $scope.carTypeList = queryResult;
                } else {
                    $log.error('获取司机的线路和车辆', result);
                }
            })
            //备份
            //AccountInformation.getCarByUserId($scope.user_id).then(function (result) {
            //    if (result.status == 'success') {
            //        $log.info('获取司机的线路和车辆', result.data);
            //        $scope.items = result.data;
            //    } else {
            //        $log.error('获取司机的线路和车辆', result);
            //    }
            //})

            $scope.goCard = function () {
                $state.go("tab.DriverCard", {user_id: $scope.user_id});
            }
            $scope.del = function (car) {
                AccountInformation.delCanAndUserRelation([car._id], $scope.user_id).then(function (result) {
                    if (result.status == 'success') {
                        iAlert.alert('删除成功!');
                        $state.reload();
                    } else {
                        $log.error('删除车辆和司机的关系失败', result);
                        iAlert.alert('删除成功!');
                    }
                })
            }

        }
    })
    .controller('DriverCardCtrl', function ($scope, $log, $state, $stateParams, AccountInformation) {

        $scope.user_id = $stateParams.user_id;
        $scope.init = function () {
            //获取司机信息
            //获取所属公司
            //获取线路
            AccountInformation.getDriverInfoById($scope.user_id).then(function (result) {
                if (result.status = 'success') {
                    $scope.user = result.data;
                    $log.info('司机信息', result.data);

                    AccountInformation.getTrafficCompanyById($scope.user.company_id[0]).then(function (result) {
                        if (result.status == 'success') {
                            $log.info('公司信息', result.data);
                            $scope.company = result.data;
                        } else {
                            $log.error('公司信息', result);
                        }
                    })
                } else {
                    $log.error('司机信息', result.data);
                }
            })

            AccountInformation.getLinCarByUserId($scope.user_id).then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取司机的线路和车辆', result.data);
                    $scope.items = result.data;
                }
            })


        }
        $scope.goBack = function () {
            $state.go("tab.DriverHome", {user_id: $scope.user_id})
        }
    })
    /**
     * 私人司机的车辆界面(暂时不用,单页显示);
     * 1,先添加车辆基本信息,后添加车辆图片信息
     *
     */
    .controller('DriverCarInfoCtrl', ['$scope', '$log', '$ionicPopup', 'AccountInformation', 'ListConfig', function ($scope, $log, $ionicPopup, AccountInformation, ListConfig) {
        $scope.hasCarInfo = false;
        $scope.car = {};
        // 判断是否已经添加了车辆信息.如果添加车辆信息了才能上传图片.
        $scope.init = function () {
            AccountInformation.getCurrentUserAllCars().then(function (result) {
                if (result.status == 'success') {
                    if (result.data.length > 0) {
                        $scope.car = result.data[0];
                        $scope.hasCarInfo = true;
                        $log.info('carInfo', result.data[0])
                    } else {
                        $scope.hasCarInfo = false;
                        $log.info('该司机没有车辆');
                    }
                } else {
                    $scope.hasCarInfo = false;
                    $log.error('获取个人车辆信息失败!', result);
                }
            })
        }
        $scope.selectCarType = function () {

            $scope.popup_lists = ListConfig.getCarType();
            var object = {
                templateUrl: './template/common/popup_radio.html', title: '选择车辆类型'
            };
            var objmsg = {type: 'radio'};

            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                // console.log(res)
                if (res) {
                    $scope.car.typeText = res.subtype.chn;
                    $scope.car.type = res.subtype.eng;
                }

                //vm.company_info.sub_type = res.subtype.eng
            })
        }
        $scope.selectCarWeigh = function () {

            $scope.popup_lists = ListConfig.getCarWeighList();
            var object = {
                templateUrl: './template/common/popup_radio.html', title: '选择车辆类型'
            };
            var objmsg = {type: 'radio'};

            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                // console.log(res)
                if (res) {
                    $scope.car.weighText = res.subtype.chn;
                    $scope.car.weight = res.subtype.eng;
                }

                //vm.company_info.sub_type = res.subtype.eng
            })
        }

        $scope.selectCarLong = function () {

            $scope.popup_lists = ListConfig.getCarLongList();
            var object = {
                templateUrl: './template/common/popup_radio.html', title: '选择车辆类型'
            };
            var objmsg = {type: 'radio'};

            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                // console.log(res)
                if (res) {
                    $scope.car.longText = res.subtype.chn;
                    $scope.car.long = res.subtype.eng;
                }

                //vm.company_info.sub_type = res.subtype.eng
            })
        }
        /**
         *
         */
        $scope.updateOrSet = function () {
            //验证
            if (!$scope.car.type) {
                iAlert.alert('请选择车辆类型');
                return;
            }
            if (!$scope.car.number) {
                iAlert.alert('请填写车牌号码');
                return;
            }
            var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
            if (!reg.test($scope.car.number)) {
                iAlert.alert('车牌号格式错误,字母需大写,例如京A00001。');
                return;
            }

            if (!$scope.car.weight) {
                iAlert.alert('请选择车载重');
                return;
            }
            //if (!car.che_tou_zhao_url) {
            //    iAlert.alert('请上传');
            //    return;
            //}
            AccountInformation.addCar($scope.car).then(function (result) {
                if (result.status == 'success') {
                    $log.info('添加车辆', result);
                    //$state.go('tab.MyCarList');
                    //$state.go('tab.MyCarListGroupByType');
                    $scope.isCommit = true;
                } else {
                    $scope.isCommit = false;
                    $log.error('添加车辆', result);
                }
            })
        }


    }])
    .controller('PrivateDriverCarListCtrl', ['$scope', '$log', 'AccountInformation', '$state', function ($scope, $log, AccountInformation, $state) {
        $scope.navbar = {
            navLeft: '返回',
            title: '我的车辆',
            navRightHref: 'tab.AddCar',
            navRight: '+添加车辆',
            navLeftHref: 'tab.myRsc',
            navLeftIco: 'glyphicon glyphicon-chevron-left'
        }
        $scope.init = function () {
            AccountInformation.getCurrentUserAllCars().then(function (result) {
                if (result.status == 'success') {
                    if (result.data.length > 0) {
                        $scope.cars = result.data;
                        $scope.hasCarInfo = true;
                        $log.info('carInfo', result)

                        $scope.navbar.navRightHref = 'tab.';
                        $scope.navbar.navRight = '';
                    } else {
                        $scope.hasCarInfo = false;
                        $log.info('该司机没有车辆');
                    }
                } else {
                    $scope.hasCarInfo = false;
                    $log.error('获取个人车辆信息失败!', result);
                }
            })
        }

        $scope.goDetail = function (car) {
            $state.go("tab.CarDetail", {car_id: car._id});
        }
    }]);
