/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 *
 *   list = $linq.Enumerable().From(InvitationInfo)
 *            .Where("$.type=='TRADE'")
 *            .Select("$").ToArray();
 *
 *
 *
 */
angular.module('rsc.controllers.account', [])
    .controller('RegisterCtrl', ['$rootScope',
        "$scope", "$state", "ListConfig", "Account", "$ionicPopup", "$log", 'Storage', '$interval', 'iAlert', '$stateParams','$ionicModal',
        function ($rootScope, $scope, $state, ListConfig, Account, $ionicPopup, $log, Storage, $interval, iAlert, $stateParams,$ionicModal) {
            $scope.companyTypes = ListConfig.getCompanyType();

            var urlParams = {};
            urlParams.type = $stateParams.type;
            urlParams.id = $stateParams.id;

            $scope.getCodeText = '获取验证码';
            if (urlParams.type && urlParams.id) {
                for (i in $scope.companyTypes) {
                    $scope.companyTypes[i].disabled = true;
                }
                if (urlParams.type == 'traffic_order') {
                    $scope.user = {
                        type: "TRAFFIC"
                    }
                }
                else if (urlParams.type == 'trade_order') {
                    $scope.user = {
                        type: "TRADE"
                    }
                } else {
                    $scope.user = {
                        type: "TRAFFIC"
                    }
                }

            } else {
                $scope.user = {
                    //full_name: '斯塔克文化传媒',
                    //real_name: '斯塔克',
                    //phone: '18515062000',
                    //password: '123qaz',
                    //confirm_password: '123qaz',
                    type: "TRADE"
                }
            }


            $scope.register = function () {

                if (urlParams.type && urlParams.id) {
                    $scope.user.demand_id = urlParams.id;
                }

                Account.register($scope.user).then(function (result) {
                    if (result.status == "success") {
                        // $window.sessionStorage['userInfo'] = JSON.stringify(result.data);
                        //var alertPopup = $ionicPopup.alert({
                        //    title: '提示',
                        //    template: '注册成功!'
                        //});
                        Storage.set('userInfo', result.data);
                        // $state.go('tab.myRsc')
                        if (urlParams.type && urlParams.id) {
                            $log.info('邀请注册,跳转到订单详情!')
                            $state.go('tab.regAdvWithId', {type: urlParams.type, id: urlParams.id});

                        } else {
                            $state.go('tab.regAdv');
                        }

                        //$location.path('tab/main');

                        //alertPopup.then(function (res) {
                        //    console.log('Thank you for not eating my delicious ice cream cone');
                        //    $location.path('tab/main');
                        //});
                    } else {
                        if (result.msg == 'verify_code_timeout') {
                            iAlert.alert('验证码过期,请重新获取!');
                            //
                            //var alertPopup = $ionicPopup.alert({
                            //    title: '系统错误',
                            //    template: JSON.stringify(result)
                            //});
                        } else {
                            iAlert.alert('注册失败,请稍后再试!');
                        }
                    }
                }, function (error) {
                    $log.error('注册失败', error);
                    iAlert.alert('注册失败!')
                })
            }

            $scope.typeChange = function (item) {
                $scope.user.type = item.value;
            }


            $scope.$watch('user.phone', function () {
                if (timePromise) {
                    $interval.cancel(timePromise);
                }
                $scope.getCodeText = '获取验证码';
                $scope.timeDown = false;
                $scope.user.verify_code = '';
            })

            $scope.getCode = function () {
                if (!$scope.timeDown && $scope.register_form.phone.$valid) {
                    $scope.register_form.phone.$error.too_frequent = false;

                    Account.getCode($scope.user.phone).then(function (result) {
                        $log.debug(result);
                        if (result.status != "success") {
                            runTiming();
                            if (result.msg == 'too_frequent') {
                                $scope.register_form.phone.$error.too_frequent = true;
                            }
                        } else {
                            runTiming();
                            $scope.user.verify_code = result.data.code;
                        }
                        //$scope.$apply(function () {
                        //
                        //});
                    }, function (error) {
                        $log.error(error);
                        //console.log(error);
                    });
                    //$event.stopPropagation();
                }
            }


            var timePromise;

            $scope.time = 180;

            var runTiming = function () {
                timePromise = $interval(function () {
                    if ($scope.time <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;
                        $scope.time = 180;
                        $scope.getCodeText = '重新获取';
                        $scope.timeDown = false;

                    } else {
                        $scope.timeDown = true;
                        $scope.getCodeText = '已发送(' + $scope.time + 's)';
                        $scope.time -= 1;
                    }
                }, 1000, 181);
                return timePromise;
            }
            // 同意协议
            _ionicModal($ionicModal,$scope,'./template/general/regAgreement.html').then(function (modal) {
              $scope.modal = modal;
            })

            $scope.share = function () {
                $scope.modal.show();
            }
            $scope.closeModal = function () {
                $scope.modal.hide();
            }
            //Cleanup the modal when we're done with it!
            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            })
            // Execute action on hide modal
            $scope.$on('modal.hidden', function () {
                // Execute action
            })
            // Execute action on remove modal
            $scope.$on('modal.removed', function () {
                // Execute action
            })


        }])
    .controller('InvitationRegisterCtrl', [
        "$scope", "$filter", "$state", "$stateParams", "$ionicPopup", "$log", "AccountInformation", "Account", "Storage", "$interval", "iAlert",
        function ($scope, $filter, $state, $stateParams, $ionicPopup, $log, AccountInformation, Account, Storage, $interval, iAlert) {
            $scope.getCodeText = '获取验证码';

            $scope.user = {
                //full_name: '斯塔克文化传媒',
                //real_name: '斯塔克',
                //phone: '18515062000',
                //password: '123qaz',
                //confirm_password: '123qaz',
            }
            //邀请表ID（URL参数）
            $scope.init = function () {
                $scope.$watch('user.inviteCode', function () {
                    //获取邀请信息
                    //$scope.register_form.inviteCode.$valid = false;
                    //$scope.register_form.inviteCode.$error.errorCode = false;
                    //console.log($scope.user.inviteCode);
                    //console.log($scope.register_form.inviteCode.$valid)

                    //$scope.register_form.inviteCode.$error.errorCode = false;

                    if ($scope.register_form.inviteCode.$valid && $scope.user.inviteCode) {
                        console.log($scope.user.inviteCode);
                        AccountInformation.getInviteInfo($scope.user.inviteCode).then(function (result) {
                            if (result.status == 'success') {
                                console.log(result);
                                if (result.data.length <= 0) {

                                    //$scope.register_form.inviteCode.$valid = false;
                                    //$scope.register_form.inviteCode.$error.errorCode = true;

                                    iAlert.alert('未知邀请码!')

                                } else {
                                    $scope.InviteInfo = result.data[0];
                                    $scope.user.full_name = $scope.InviteInfo.company_name + "诚邀您成为他们的[" + $filter('rolefilter')($scope.InviteInfo.role) + "]";
                                    $scope.user.id = $scope.InviteInfo._id;

                                    //$scope.register_form.inviteCode.$valid = true;
                                    //$scope.register_form.inviteCode.$error.errorCode = false;
                                }

                            } else {
                                //$scope.register_form.inviteCode.$valid = true;
                                //$scope.register_form.inviteCode.$error.errorCode = true;
                                //iAlert.alert('未知邀请码!')
                                $log.error('获取邀请信息失败', result)
                            }
                        })
                    } else {
                        console.log('为发请求!');
                        $scope.user.full_name = '';
                    }
                })
            }

            $scope.$watch('user.phone', function () {
                if (timePromise) {
                    $interval.cancel(timePromise);
                }
                $scope.getCodeText = '获取验证码';
                $scope.timeDown = false;
                $scope.user.verify_code = '';
            })


            //注册按钮点击事件
            $scope.register = function () {
                AccountInformation.registerForInvitation($scope.user).then(function (result) {
                    if (result.status == "success") {
                        // $window.sessionStorage['userInfo'] = JSON.stringify(result.data);
                        //var alertPopup = $ionicPopup.alert({
                        //    title: '提示',
                            //    template: '注册成功!'
                        //});

                        Storage.set('userInfo', result.data);

                        AccountInformation.getCompanyinfoById(result.data.user.company_id[0], angular.lowercase($scope.InviteInfo.type)).then(function (companyInfo) {
                            if (companyInfo.status == 'success') {
                                Storage.set('CompanyInfo', companyInfo.data);
                            } else {
                                $log.error('CompanyInfo', companyInfo);
                            }

                        });
                        //window.history.go(0);

                        //$state.reload();

                        //iAlert.alert('注册成功!');

                        // $state.go('tab.myRsc', {}, {reload: true});
                        $state.go('tab.regSuccess', {}, {reload: true})
                        //$location.path('tab/main');

                        //alertPopup.then(function (res) {
                        //    console.log('Thank you for not eating my delicious ice cream cone');
                        //    $location.path('tab/main');
                        //});
                    } else {
                        if (result.msg == 'verify_code_timeout') {
                            iAlert.alert('验证码过期,请重新获取!');
                            //
                            //var alertPopup = $ionicPopup.alert({
                            //    title: '系统错误',
                            //    template: JSON.stringify(result)
                            //});
                        } else {
                            iAlert.alert('注册失败,请稍后再试!');
                        }

                    }
                }, function (error) {
                    console.log(error)
                })
            }

            /**
             * 获取验证码
             */
            $scope.getCode = function () {
                if (!$scope.timeDown && $scope.register_form.phone.$valid) {
                    $scope.register_form.phone.$error.too_frequent = false;
                    Account.getCode($scope.user.phone).then(function (result) {
                        if (result.status != "success") {
                            runTiming();
                            if (result.msg == 'too_frequent') {
                                $scope.register_form.phone.$error.too_frequent = true;
                            }
                        } else {
                            runTiming();

                            $scope.user.verify_code = result.data.code;
                        }

                    }, function (error) {
                        $log.error(error)
                    });
                }
                //$event.stopPropagation();
            }


            var timePromise;

            $scope.time = 180;

            var runTiming = function () {
                timePromise = $interval(function () {
                    if ($scope.time <= 0) {
                        $interval.cancel(timePromise);
                        timePromise = undefined;
                        $scope.time = 180;
                        $scope.getCodeText = '重新获取';
                        $scope.timeDown = false;

                    } else {
                        $scope.timeDown = true;
                        $scope.getCodeText = '已发送(' + $scope.time + 's)';
                        $scope.time -= 1;
                    }
                }, 1000, 181);
                return timePromise;
            }

        }])
    .controller('NewMemberCtrl', [
        "$scope", "InvitationInfo", "$linq", 'AccountInformation', '$ionicPopup', '$location', 'authenticationService', '$log', '$state', '$stateParams', 'iAlert',
        function ($scope, InvitationInfo, $linq, AccountInformation, $ionicPopup, $location, authenticationService, $log, $state, $stateParams, iAlert) {
            var list;
            $scope.init = function () {
                if (authenticationService.getUserInfo().user.role == 'TRADE_ADMIN') {
                    list = InvitationInfo['TRADE'];
                } else if (authenticationService.getUserInfo().user.role == 'TRAFFIC_ADMIN') {
                    list = InvitationInfo['TRAFFIC'];
                } else {
                    console.log('not admin');
                    return;
                }

                if ($stateParams.role) {
                    list = _.filter(list, function (item) {
                        return item.value == $stateParams.role.toUpperCase();
                    })
                }
                $scope.invitationList = list;

            }
            $scope.info = {};

            $scope.btnClick = function (info) {
                AccountInformation.invitationRegister(info.value).then(function (result) {
                    if (result.status == 'success') {
                        //info.text = $location.host() + ":" + $location.port() + "/#/tab/invite_register/" + result.data;
                        info.text = result.data;
                        $scope.info = info

                        var myPopup = $ionicPopup.show({
                            template: '<textarea   ng-model="info.text"></textarea>',
                            title: '邀请' + info.tips,
                            subTitle: '发送给朋友,用浏览器打开并注册!',
                            scope: $scope,
                            buttons: [
                                {
                                    text: '<button clip-copy="info.text" clip-click="showMessage()" clip-click-fallback="fallback(copy)">确定</button>',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        //if (!$scope.data.wifi) {
                                        //    //don't allow the user to close unless he enters wifi password
                                        //    e.preventDefault();
                                        //} else {
                                        //    return $scope.data.wifi;
                                        //}
                                    }
                                }
                            ]
                        });


                    } else {
                        $log.error('invitationRegister', result);
                    }

                }, function (error) {
                    $log.error('invitationRegister', error);

                })


            }
            $scope.goback = function () {
                window.history.go(-1)
            }
            $scope.showMessage = function () {
                //iAlert.alert('复制成功!')
                console.log('复制成功!')
            }
            $scope.fallback = function (copy) {
                console.log('复制失败!')
                //window.prompt('请选中文字使用CTRL+C进行复制!', copy);
            };
        }])
    .controller('RegisterAdvCtrl', ["$scope", function ($scope) {
        $scope.uploadPic = function (file) {
            file.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {file: file, username: $scope.username},
            });
            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
    }])
    .controller('RegCtrl', function ($scope, $state, $stateParams) {
        $scope.info = {};
        $scope.info.type = $stateParams.type;
        $scope.info.id = $stateParams.id;

        $scope.goRegister = function () {
            if ($scope.info.type && $scope.info.id) {
                $state.go('tab.regBaseWithId', {type: $scope.info.type, id: $scope.info.id});
            } else {
                $state.go('tab.regBase');
            }
        };
        $scope.goInviteRegister = function () {
            $state.go('tab.invite_register');

        }
    })
    