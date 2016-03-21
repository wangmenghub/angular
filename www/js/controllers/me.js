/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 * Modified by Haoran Z, at 2015-12-14
 */
angular.module('rsc.controllers.me', [])
    // 2015-12-14添加的controller们
    // 主页
    .controller('MyRscCtrl', ['$http', 'authenticationService', '$location', '$q', 'rolesConfig', 'ENV', '$interval', 'Storage', '$ionicPopup', 'rolesConfig', 'tradePass', '$stateParams', '$ionicModal', '$scope',
        function ($http, authenticationService, $location, $q, rolesConfig, ENV, $interval, Storage, $ionicPopup, rolesConfig, tradePass, $stateParams, $ionicModal, $scope) {
            var vm = this;
            vm.user_info = {};
            vm.company_info = {};
            vm.role = '';
            vm.portrait_url = '';
            vm.role_chn = '';
            vm.count_colleagues = 0;
            vm.count_clients = 0;
            vm.count_msg = 0;

            // 查找我的同事个数
            vm.getCountColleague = function () {
                var url_type = '';
                var company_type = vm.role.split('_').shift();
                if (company_type == 'TRADE') {
                    url_type = 'user_trade/get_colleague_count';
                }
                else {
                    url_type = 'user_traffic/get_colleague_count';
                }


                $http.post(ENV.api.account + url_type, {}, {
                        headers: {}
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.status == 'success') {
                            vm.count_colleagues = data.data;
                        }
                        else {
                            console.log('获取同事个数信息失败');
                        }
                    })
                    .error(function () {
                        console.log('获取同事个数信息失败');
                    });

                vm.count_colleagues = 0;
            };
            // 查找我认证企业的个数
            vm.getCountClients = function () {
              $http.post(ENV.api.account + 'company_relation/get_verify_count').success(function (data) {
                console.log('认证企业的个数',data);
                vm.count_clients = data.data
              })
                //vm.count_clients = 0;
            };
            // 系统通知个数
            vm.getCountMsg = function () {
                // TODO: 连接相应的API
                console.log(vm.user_info.user._id, 'get_msg_unread_count');
                $http.get(ENV.api.msg + 'get_msg_unread_count/' + vm.user_info.user._id).success(function (data) {
                    vm.count_msg = data.data
                })
            };

            // 查找公司信息
            vm.getCompanyInfo = function () {
                var url_type = '';
                var company_type = vm.role.split('_').shift();
                if (company_type == 'TRADE') {
                    url_type = 'company_trade/';
                }
                else {
                    url_type = 'company_traffic/';
                }
                console.log(ENV.api.account + url_type + 'get');
                $http.post(ENV.api.account + url_type + 'get', {}, {
                        headers: {}
                    })
                    .success(function (data) {
                        if (data.status == 'success') {
                            console.log('公司信息2', data.data);
                            vm.company_info = data.data;
                        }
                        else {
                            // ERR
                            console.log('获取公司信息出错');
                        }
                    });
            };
            // 获取个人头像
            vm.getUserInfo = function (_id) {
                var company_type = vm.role.split('_').shift();

                if (company_type === 'TRADE') {
                    url_type = 'user_trade';
                }
                else {
                    url_type = 'user_traffic';
                }
                var _data = {user_id: _id};
                tradePass.getUserInfo(url_type, _data).success(function (data) {
                        if (data.status == 'success') {
                            vm.userinfo = data.data;
                            console.log('用户信息', vm.userinfo);
                            console.log(typeof(vm.userinfo.photo_url), vm.userinfo.photo_url);
                            vm.portrait_url = vm.userinfo.photo_url ? vm.userinfo.photo_url : './img/me/face_13.png';
                        }
                    })
                    .error(function () {
                        console.log('获取个人信息出错');
                    });
            };

            var start = function () {
                //if (Storage.get('userInfo')) {
                    vm.compansetlist = rolesConfig.getCompSet(Storage.get('userInfo').user.role);
                    vm.user_info = authenticationService.getUserInfo();
                    vm.role = vm.user_info.user.role;
                    vm.role_chn = rolesConfig.getRoles(vm.role).name;
                    if ($stateParams.id) {
                        // 如果有参数传递则或传递参数用户信息
                        vm.getUserInfo($stateParams.id)
                    } else {
                        vm.getUserInfo(Storage.get('userInfo').user._id)
                    }
                    vm.getCountClients();
                    vm.getCountColleague();
                    vm.getCountMsg();
                    vm.getCompanyInfo();
                //} else {
                //    showAlert($ionicPopup, $location).then(function (res) {
                //        $location.path('/tab/login')
                //    });
                //}
            };
            // 每10分钟刷新一次页面，读取是否有新的消息
            $interval(function () {
                start()
            }, 1000 * 60 * 10);

            start();
            vm.goback = function () {
                window.history.go(-1);
                // console.log('后退',window.history)
                // window.history.back()
            }
            // 分享页
            _ionicModal($ionicModal, $scope, './template/common/share.html').then(function (modal) {
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
                console.log(type);
                switch (type) {
                    case'sms' :
                        $state.go('tab.shareSMS', {type: 'tradeDemand', id: $scope.demand_detail._id});
                        break;
                }
            }

        }])

    // 修改我的信息
    .controller('MySetCtrl', ['$scope','$log', '$cordovaCamera', '$filter', '$http', '$location', 'ENV', 'authenticationService', 'rolesConfig', 'Storage', '$ionicPopup', '$interval', 'iAlert', 'tradePass', '$ionicActionSheet', '$cordovaImagePicker', '$timeout', '$cordovaFileTransfer', '$ionicLoading','AccountInformation',
      function ($scope,$log, $cordovaCamera, $filter, $http, $location, ENV, authenticationService, rolesConfig, Storage, $ionicPopup, $interval, iAlert, tradePass, $ionicActionSheet, $cordovaImagePicker, $timeout, $cordovaFileTransfer, $ionicLoading, AccountInformation) {
        var vm = this;
            //vm.search_id = '';
            vm.role = '';
            vm.acc_real_name = '';
            vm.acc_photo_url = '';
            vm.acc_phone = '';
            vm.acc_gender = '';
            vm.acc_role = '';
            vm.url_type = '';
            vm.getUserInfo = function (_id) {
                var company_type = vm.role.split('_').shift();

                if (company_type === 'TRADE') {
                    url_type = 'user_trade';
                }
                else {
                    url_type = 'user_traffic';
                }
                console.log(url_type);
                var _data = {user_id: _id};
                tradePass.getUserInfo(url_type, _data)
                    // $http.get(ENV.api.account + url_type + '/me')
                    .success(function (data) {
                        //console.log(url_type);
                        console.log(data);
                        if (data.status == 'success') {
                            vm.acc_real_name = data.data.real_name;
                            vm.acc_photo_url = data.data.photo_url != '' ? data.data.photo_url : './img/me/face_13.png';
                            vm.acc_phone = data.data.phone;
                            vm.acc_gender = data.data.gender == 'MALE' ? '男' : '女';
                            vm.acc_role = rolesConfig.getRoles(vm.role).name;
                            console.log(vm.role)

                            vm.acc_id_card_number = data.data.id_card_number;
                            vm.acc_id_card_number_url = data.data.id_card_number_url;
                            vm.acc_jia_shi_zheng_url = data.data.jia_shi_zheng_url;
                            vm.acc_email = data.data.mail;
                            if (data.data.province == data.data.city) {
                                vm.acc_address = data.data.city + data.data.district;
                            } else {
                                vm.acc_address = data.data.province + data.data.city + data.data.district;
                            }
                            vm.acc_addr = data.data.addr;
                            vm.post = data.data.post;
                            vm.sign = data.data.sign
                        }
                    })
                    .error(function () {
                        console.log('获取个人信息出错');
                    });
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();

                if (!vm.user_info) {
                    return $location.path('/tab/login');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    //vm.search_id = user_info.user._id;
                }
                console.log(vm.user_info.user._id);
                vm.getUserInfo(vm.user_info.user._id);
                console.log(vm.user_info)


            };
            start();

            // sj 增加
            vm.logOut = function () {
                Storage.remove('userInfo');
                Storage.remove('CompanyInfo');
                $location.path('/tab/login');
                window.history.go(0)
            };
            vm.popup = function (e) {
                switch (e) {
                    case 'img':
                        $scope.modify_touxiang();
                        break;
                    case 'name':
                        $scope.modify_name();
                        break;
                    case 'sex':
                        $scope.modify_sex();
                        break;
                    case 'role':
                        $scope.modify_role();
                        break;
                    case 'idCard':
                        $scope.modifyIdCard();
                        break;
                    case 'idCardImg':
                        $scope.modifyIdCardImg();
                        break;
                    case 'JiaShiZheng':
                        $scope.modifyJiaShiZhengImg();
                        break;
                    case 'address':
                        $scope.modifyAddress();
                        break;
                    case 'email':
                        $scope.modify_email();
                        break;
                    case 'addr':
                        $scope.modify_addr();
                        break;
                    case 'post':
                        $scope.modify_post();
                        break;
                    case 'sign':
                        $scope.modify_sign();
                        break;
                    default:
                        console.log(e)
                }


            };


            $scope.modifyAddress = function () {
                var data = {};
                var obj = {templateUrl: '/template/common/pro_city.html', title: '请选择地区'};
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        $scope.addressText = $filter('addressText')(res);
                        console.log(res);
                        var _data = {province: res.currentProvince.ProID, city: res.currentCity.CityID, district: res.currentArea.DisID};
                        $scope.modify_self(_data)

                    }
                })
            }
            $scope.modify_email = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改邮箱'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'real_name', chn: '邮箱'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        var reg = /\w+[@]{1}\w+[.]\w+/;
                        if (res.subtype && res.subtype.real_name && reg.test(res.subtype.real_name)) {
                            var _data = {mail: res.subtype.real_name};
                            $scope.modify_self(_data)
                        } else {
                            $scope.msg = {email: '未修改或邮箱不合法'}
                        }
                    }
                })
            };
            $scope.getLock = function(){
              AccountInformation.getUseLock().then(function (result) {
                if (result.status == 'success') {
                  $scope.verify_lock = result.data.user.verify_lock;
                  $log.info('获取锁定状态', $scope.verify_lock);
                }
              })
            }

            $scope.modifyJiaShiZhengImg = function () {
                if($scope.verify_lock == "UNLOCK"){
                  var obj = {templateUrl: './template/common/popup_radio.html', title: '驾驶证照片'};
                  var data = {type: 'file'};
                  _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                      if ($scope.file) {
                        console.log(res);
                        var _url = ENV.api.account + 'file/upload/jia_shi_zheng/null';
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                          console.log('上传图片失败', data);
                          if (data.status == "success") {
                            console.log('图片上传成功 进入下一步');
                            acc_jia_shi_zheng_url = data.data;
                            // 写入数据库
                            var _data = {jia_shi_zheng_url: acc_jia_shi_zheng_url};
                            $scope.modify_self(_data)
                          }
                        })
                      } else {
                        $scope.msg = {img: '未选择图片'}
                      }

                    }
                  })
                }else{
                  iAlert.alert('锁定状态不可修改身份证、驾驶证、行驶证信息。如需修改请解锁！')
                }
            };

            $scope.modifyIdCardImg = function () {
              //if($scope.verify_lock == "UNLOCK"){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '上传身份证照片'};
                var data = {type: 'file'};
                _popup($scope, obj, $ionicPopup, data).then(function (res) {

                    if (res) {

                        if ($scope.file) {
                            console.log(res);
                            var _url = ENV.api.account + 'file/upload/id_card_number/null';
                            _upimg($scope.file[0], _url, $http).success(function (data) {
                                console.log('上传图片失败', data);
                                if (data.status == "success") {
                                    console.log('图片上传成功 进入下一步');
                                    acc_id_card_number_url = data.data;
                                    // 写入数据库
                                    var _data = {id_card_number_url: acc_id_card_number_url};
                                    $scope.modify_self(_data)
                                }
                            })
                        } else {
                            $scope.msg = {img: '未选择图片'}
                        }

                    }
                })
              //}else{
              //  iAlert.alert('锁定状态不可修改身份证、驾驶证、行驶证信息。如需修改请解锁！')
              //}
            };

            $scope.modifyIdCard = function () {
              //if($scope.verify_lock == "UNLOCK"){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改身份证号码'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'id_card_number', chn: '身份证号码'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

                        if (res.subtype && res.subtype.id_card_number && reg.test(res.subtype.id_card_number)) {
                            var _data = {id_card_number: res.subtype.id_card_number};
                            $scope.modify_self(_data)
                        } else {
                            $scope.msg = {id_card_number: '未修改或身份证号码不合法'}
                        }
                    }
                })
              //}else{
              //  iAlert.alert('锁定状态不可修改身份证、驾驶证、行驶证信息。如需修改请解锁！')
              //}
            };

            $scope.modify_role = function () {
                if (vm.role == 'TRADE_ADMIN') {
                    //有权限修改  TRADE_ADMIN
                    iAlert.popup('警告', '修改角色信息将无法恢复,是否继续?', function () {

                        var obj = {templateUrl: './template/common/popup_radio.html', title: '修改角色'};
                        var data = {type: 'radio'};
                        //TRADE_ADMIN: '企业管理员',
                        //    TRADE_PURCHASE: '采购负责人',
                        //    TRADE_SALE: '销售负责人',
                        //    TRADE_MANUFACTURE: '生产负责人',
                        //    TRADE_FINANCE: '财务负责人',
                        //    TRAFFIC_ADMIN: '物流负责人',
                        //    TRAFFIC_DRIVER: '司机',
                        //    TRADE_STORAGE: '仓库管理员'
                        $scope.popup_lists = [
                            {eng: 'TRADE_PURCHASE', chn: '采购负责人'},
                            {eng: 'TRADE_SALE', chn: '销售负责人'},
                            {eng: 'TRADE_FINANCE', chn: '财务负责人'},
                            {eng: 'TRADE_STORAGE', chn: '仓库管理员'}
                        ];
                        _popup($scope, obj, $ionicPopup, data).then(function (res) {
                            console.log(res);
                            if (res) {
                                if (res.subtype && res.subtype.chn) {
                                    var _data = {role: res.subtype.eng};
                                    console.log(_data);
                                    $scope.updata_role(_data);
                                } else {
                                    //$scope.msg = {real_name: '未修改或名字不合法'}
                                }
                            }
                        })


                    })

                } else {
                    return;
                }
            };

            $scope.getUploadPic = function (e) {
                console.log(e);
                $scope.file = e
            };
            // 上传图片
            $scope.images_list = [];
            $scope.modify_touxiang = function () {
                if (ionic.Platform.isWebView()) {


                    var uploadImg = function (fileUrl) {
                        $ionicLoading.show({
                            template: '图片上传中...'
                        });

                        //window.alert('fileUrl:'+fileUrl)

                        vm.imgUrl = fileUrl;
                        var _url = ENV.api.account + 'file/upload/tou_xiang/null';

                        var options = new FileUploadOptions();
                        options.fileKey = "file";
                        options.fileName = vm.imgUrl.substr(vm.imgUrl.lastIndexOf('/') + 1);
                        options.mimeType = "text/plain";
                        options.headers = {'x-access-token': Storage.get('userInfo').token, "Content-Type": undefined};
                        //window.alert('options:'+JSON.stringify(options))


                        $cordovaFileTransfer.upload(_url, vm.imgUrl, options)
                            .then(function (json) {
                                var result = JSON.parse(json.response);
                                if (result.status == "success") {
                                    vm.acc_photo_url = result.data;
                                    var _data = {photo_url: vm.acc_photo_url};
                                    //iAlert.alert('上传成功!');
                                    $scope.modify_self(_data);
                                    $ionicLoading.hide();
                                } else {
                                    iAlert.alert('上传失败!' + JSON.stringify(result));
                                    $ionicLoading.hide();

                                }

                            }, function (err) {
                                $ionicLoading.hide();
                                iAlert.alert('上传失败!');

                            }, function (progress) {

                                //window.alert(progress);
                                //iAlert.alert(progress)
                                // constant progress updates
                            }).finally(function () {
                            $ionicLoading.hide();
                        });

                    };


                    var pickImage = function () {
                        var options = {
                            maximumImagesCount: 1,
                            width: 800,
                            height: 800,
                            quality: 80
                        };
                        $cordovaImagePicker.getPictures(options)
                            .then(function (results) {
                                //vm.imgUrl = results[0];
                                if (results && results.length > 0) {
                                    uploadImg(results[0]);
                                }
                            }, function (error) {
                                // error getting photos
                            });
                    };

                    var takePhoto = function () {


                        var options = {
                            quality: 50,
                            destinationType: Camera.DestinationType.FILE_URI,
                            //destinationType: Camera.DestinationType.DATA_URL,
                            sourceType: Camera.PictureSourceType.CAMERA
                            //sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
                        };

                        //udpate camera image directive
                        $cordovaCamera.getPicture(options).then(function (imageURL) {

                            //$cordovaFileTransfer.upload(server, filePath, options)
                            //    .then(function (result) {
                            //        // Success!
                            //    }, function (err) {
                            //        // Error
                            //    }, function (progress) {
                            //        // constant progress updates
                            //    });

                            //vm.acc_photo_url = "data:image/jpeg;base64," + imageData;
                            if (imageURL) {
                                vm.acc_photo_url = imageURL;

                                uploadImg(imageURL);
                            }

                            //$cordovaCamera.cleanup()


                        }, function (err) {
                            console.log('Failed because: ');
                            console.log(err);
                        });

                    };


                    // Show the action sheet
                    var hideSheet = $ionicActionSheet.show({
                        buttons: [
                            {text: '<b class="text-center">拍照</b>'},
                            {text: '<b class="text-center">选择文件</b>'}
                        ],
                        //destructiveText: 'Delete',
                        titleText: '选择头像',
                        cancelText: '取消',
                        cancel: function () {
                            // add cancel code..
                        },
                        buttonClicked: function (index) {
                            switch (index) {
                                case  0:
                                    takePhoto();
                                    break;
                                case  1:
                                    pickImage();
                                    break;
                                default :
                                    break;

                            }
                        }
                    });

                    // For example's sake, hide the sheet after two seconds
                    $timeout(function () {
                        hideSheet();
                    }, 2000);


                    //iAlert.selectFile('选择文件')
                }
                else {
                    var obj = {templateUrl: './template/common/popup_radio.html', title: '上传头像'};
                    var data = {type: 'file'};
                    _popup($scope, obj, $ionicPopup, data).then(function (res) {

                        if (res) {

                            if ($scope.file) {
                                console.log(res);
                                var _url = ENV.api.account + 'file/upload/tou_xiang/null';
                                _upimg($scope.file[0], _url, $http).success(function (data) {
                                    console.log('上传图片失败', data);
                                    if (data.status == "success") {
                                        console.log('图片上传成功 进入下一步');
                                        acc_photo_url = data.data;
                                        // 写入数据库
                                        var _data = {photo_url: acc_photo_url};
                                        $scope.modify_self(_data)
                                    }
                                })
                            } else {
                                $scope.msg = {img: '未选择图片'}
                            }

                        }
                    })
                }


            };
            // 修改姓名
            $scope.modify_name = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改名字'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'real_name', chn: '名字'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        var reg = /^[a-zA-Z\u4e00-\u9fa5\s]{2,10}$/;
                        if (res.subtype && res.subtype.real_name && reg.test(res.subtype.real_name)) {
                            var _data = {real_name: res.subtype.real_name};
                            $scope.modify_self(_data)
                        } else {
                            $scope.msg = {real_name: '未修改或名字不合法'}
                        }
                    }
                })
            };
            // 修改性别
            $scope.modify_sex = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改性别'};
                var data = {type: 'radio'};
                $scope.popup_lists = [{eng: 'MALE', chn: '男'}, {eng: 'FEMALE', chn: '女'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res);
                    if (res) {
                        if (res.subtype && res.subtype.chn) {
                            var _data = {gender: res.subtype.eng};
                            console.log(_data);
                            $scope.modify_self(_data)
                        } else {
                            $scope.msg = {real_name: '未修改或名字不合法'}
                        }
                    }
                })
            };
            // 修改个人信息--图片
            $scope.modify_self = function (_data) {
                var _url = ENV.api.account + url_type + '/modify_self';
                $http({
                    method: 'POST'
                    , url: _url
                    , data: _data
                    , headers: {}
                }).success(function (data) {

                    if (data.status == 'success') {
                        var userInfo = Storage.get('userInfo');
                        userInfo.user = data.data;
                        Storage.set('userInfo', userInfo);
                        window.history.go(0)
                    } else {
                        iAlert.alert('修改失败!')
                    }
                })
            };

            $scope.updata_role = function (_data) {
                var _url = ENV.api.account + url_type + '/modify_self';
                console.log(_data, _url);
                $http({
                    method: 'POST'
                    , url: _url
                    , data: _data
                    , headers: {}
                }).success(function (data) {
                    console.log(data);
                    if (data.status == 'success') {
                        vm.logOut();
                    } else if (data.status == 'err') {
                        if (data.msg == 'admin_must_exist_one') {
                            iAlert.alert("修改失败,该公司只有当前这一个管理员!");
                        } else {
                            iAlert.alert("修改失败!");
                        }
                    }
                })
            };
            // navbar
            $scope.navbar = {
                'navLeftHref': 'tab.myRsc'
                , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
                , 'navLeft': '返回'
                , 'title': '个人设置'
                , 'navRightHref': 'tab.'
                , 'navRight': ''
                , 'navRightIco': ''
                , 'navRighthide': ''
            };
            // 修改地址
            $scope.modify_addr = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改地址'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'real_addr', chn: '地址'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res);
                    if (res) {
                        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\s]{2,20}$/;
                        if (res.subtype && res.subtype.real_addr && reg.test(res.subtype.real_addr)) {
                            var _data = {addr: res.subtype.real_addr};
                            $scope.modify_self(_data)
                        }
                    }
                })
            };
            //
            $scope.modify_sign = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改签名'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'real_sign', chn: '签名'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res);
                    if (res) {
                        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\s]{2,20}$/;
                        if (res.subtype && res.subtype.real_sign && reg.test(res.subtype.real_sign)) {
                            var _data = {sign: res.subtype.real_sign};
                            $scope.modify_self(_data)
                        }
                    }
                })
            }
            //
            $scope.modify_post = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改职务'};
                var data = {type: 'text'};
                $scope.popup_lists = [{eng: 'real_post', chn: '职务'}];
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res);
                    if (res) {
                        var reg = /^[a-zA-Z\u4e00-\u9fa5\s]{2,10}$/;
                        if (res.subtype && res.subtype.real_post && reg.test(res.subtype.real_post)) {
                            var _data = {post: res.subtype.real_post};
                            $scope.modify_self(_data)
                        }
                    }
                })
            }
        }])

    // 修改公司信息
    .controller('MyCompSetCtrl', ['$scope', '$http', '$location', 'authenticationService', 'ENV', '$ionicPopup', '$state', 'Storage', 'fileReader',
        function ($scope, $http, $location, authenticationService, ENV, $ionicPopup, $state, Storage, fileReader) {
            var vm = this;
            vm.company_info = null;
            vm.company_name = '';
            vm.company_type = '';
            vm.license = 'ISO 239232';
            vm.url_type = '';

            vm.getCompanyInfo = function () {

                var company_type = vm.comp_info_local.type;
                if (company_type == 'TRADE') {
                    url_type = 'company_trade/';
                }
                else {
                    url_type = 'company_traffic/';
                }

                $http.post(ENV.api.account + url_type + 'get')
                    .success(function (data) {
                        console.log('公司信息', data);
                        if (data.status == 'success') {
                            vm.company_info = data.data;
                            console.log(vm.company_info);
                            vm.company_info.type = vm.company_info.type == 'TRADE' ? '交易型企业' : '物流企业';
                            vm.company_info.url_logo = vm.company_info.url_logo ? vm.company_info.url_logo : './img/me/face_15_15.png';
                            // vm.company_info.url_yingyezhizhao = vm.company_info.url_yingyezhizhao ? vm.company_info.url_yingyezhizhao : './img/me/license_2.png'
                            vm.company_info.url_yingyezhizhao = vm.company_info.url_yingyezhizhao
                        }
                        else {
                            // ERR
                            console.log('获取公司信息出错');
                        }
                    });
            };

            var start = function () {
              if (Storage.get('userInfo')) {
                vm.comp_info_local = authenticationService.getCompanyInfo();
                if (vm.comp_info_local) {
                  vm.getCompanyInfo();
                }
                else {
                  showAlert($ionicPopup, $location, {template: '获取公司信息失败，请重新登录'}).then(function (res) {
                    $location.path('/tab/login');
                  })
                }
              } else {
                showAlert($ionicPopup, $location).then(function (res) {
                  $location.path('/tab/login')
                });
              }

            };
            start();
            // ---sj_start 修改
            $scope.navbar = {
                'navLeftHref': 'tab.myRsc'
                , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
                , 'navLeft': '返回'
                , 'title': '企业设置'
                , 'navRightHref': 'tab.'
                , 'navRight': ''
                , 'navRightIco': ''
                , 'navRighthide': ''
            };
            // 及时修改公司信息
            vm.modify_companyinfo = function (e) {
                console.log(e);
                switch (e) {
                    case 'url_logo':
                        $scope.popup_headerimg();
                        break;
                    case 'sub_type':
                        $scope.getsub_type();
                        break;
                    case 'des':
                        $scope.popup_desc();
                        break;
                    case 'province':
                        $scope.getpro_city();
                        break;
                    case 'licenseimg':
                        vm.popup_licenseimg();
                        break;
                    case 'manage':
                        vm.popup_manage();
                        break;
                    case 'addr':
                        vm.popup_addr();
                        break;
                    default:
                        console.log(e)
                }
            };
            // 公司简介弹窗
            $scope.popup_desc = function () {
                var data = {desc: vm.company_info.des};
                var obj = {templateUrl: 'myCompanySet/describe.html', title: '公司简介'};
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        console.log('公司简介', res);
                        vm.company_info.des = res.desc;
                        var _data = {des: vm.company_info.des};
                        $scope.company_modify(_data)
                    }
                })
            };
            // 公司头像
            $scope.popup_headerimg = function () {
                var data = {type: 'file'}
                var obj = {templateUrl: 'template/common/popup_radio.html', title: '上传公司LOGO'}
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        if ($scope.file && vm.company_info.verify_phase == 'NO') {
                            console.log($scope.file[0])
                            var _url = ENV.api.account + 'file/upload/logo/null';
                            console.log(_url)
                            _upimg($scope.file[0], _url, $http).success(function (data) {
                                console.log('上传图片失败', data)
                                if (data.status == "success") {
                                    console.log('图片上传成功 进入下一步', data.data)

                                    // 写入数据库
                                    var _data = {url_logo: data.data}
                                    $scope.company_modify(_data)
                                }
                            })
                        } else {
                            if (vm.company_info.verify_phase != 'NO') {
                                showAlert($ionicPopup, $location, {template: '企业认证中，不能随意修改', title: '提示'})
                            }
                            $scope.msg = {img: '未选择图片'}
                        }

                    }
                })
            }
            // 获取input中files 信息
            $scope.getUploadPic = function (e) {
                $scope.file = e
                console.log($scope.file)
                $scope.getFile()
            }
            // 省市县弹窗返回确认值
            // $scope.pro_city = '';
            $scope.getpro_city = function () {
                var data = {}
                var obj = {templateUrl: '/template/common/pro_city.html', title: '请选择地区'}
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res && typeof(res.currentProvince) != 'undefined' && typeof(res.currentCity) != 'undefined') {
                        // $scope.pro_city = res
                        var _data = {
                            province: res.currentProvince.ProID
                            , city: res.currentCity.CityID
                            , district: res.currentArea.DisID
                        }
                        $scope.company_modify(_data)
                    }
                })
            }
            // 所属行业

            $scope.getsub_type = function () {
                console.log('hangye')
                $scope.popup_lists = [{chn: '炼焦行业', eng: 'IRON'}, {chn: '煤炭行业', eng: 'COAL'}]
                var object = {templateUrl: './template/common/popup_radio.html', title: '选择行业'}
                var objmsg = {type: 'radio'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        vm.company_info.sub_type = res.subtype.eng
                        var _data = {sub_type: vm.company_info.sub_type}
                        $scope.company_modify(_data)
                    }
                })
            }
            // 修改公司信息
            $scope.company_modify = function (_data) {
                // province,city,sub_type,des,url_logo
                // var _data = {
                //     province: $scope.pro_city.currentProvinceId
                //     , city: $scope.pro_city.currentCityId
                //     , sub_type: vm.company_info.sub_type
                //     , des: vm.company_info.des
                //     , url_logo: vm.company_info.url_logo
                // }
                // if (vm.company_info.verify_phase != 'NO') {
                // showAlert($ionicPopup, $location, {template: '企业认证中，不能随意修改', title: '提示'})
                // } else {
                // 上传到服务器
                $http.post(ENV.api.account + url_type + '/edit', _data)
                    .success(function (data) {
                        console.log(data)
                        if (data.status == 'success') {
                            var CompanyInfo = Storage.get('CompanyInfo')
                            CompanyInfo = data.data
                            Storage.set('CompanyInfo', CompanyInfo)
                            // console.log(data.data,Storage.get('CompanyInfo'))
                            // $state.reload()
                            window.history.go(0)
                        }
                    })
                // }
            }
            // 营业执照
            vm.popup_licenseimg = function () {
                var data = {type: 'file'}
                var obj = {templateUrl: 'template/common/popup_radio.html', title: '营业执照'}
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        if ($scope.file) {
                            var _url = ENV.api.account + 'file/upload/ying_ye_zhi_zhao/null'
                            console.log(_url)
                            _upimg($scope.file[0], _url, $http).success(function (data) {
                                console.log('上传图片成功', data)
                                if (data.status == "success") {
                                    vm.licenseURL = data.data
                                    // window.history.go(0)
                                    vm.company_info.url_yingyezhizhao = vm.licenseURL
                                    $scope.msg = {licenseimg: '上传成功'}
                                }
                            })
                        } else {
                            $scope.msg = {licenseimg: '上传成功'}
                        }
                    }
                })
            }
            // 提交认证
            $scope.submit = function () {
                if (!vm.company_info.url_yingyezhizhao) {
                    showAlert($ionicPopup, $location, {template: '缺少营业执照', title: '提示'})
                } else if (!vm.company_info.nick_name) {
                    showAlert($ionicPopup, $location, {template: '缺少昵称', title: '提示'})
                } else if (!vm.company_info.currency) {
                    showAlert($ionicPopup, $location, {template: '缺少营业资金', title: '提示'})
                } else {
                    var _data = {
                        currency: vm.company_info.currency
                        , nickName: vm.company_info.nick_name
                        , licenseURL: vm.company_info.url_yingyezhizhao
                    }
                    var _url = ENV.api.account + url_type + '/authentication'
                    $http.post(_url, _data).success(function (data) {
                        console.log('待完成', data)
                        if (data.status == 'success') {
                            showAlert($ionicPopup, $location, {template: '提交成功，请等待审核'}).then(function (res) {
                                $state.reload()
                            })
                        } else {
                            showAlert($ionicPopup, $location, {template: '提交失败，请稍后再提交'})
                        }
                    })
                }

            }
            // $scope.random = Math.random()
            $scope.getFile = function () {
                fileReader.readAsDataUrl($scope.file[0], $scope).then(function (result) {
                    $scope.previewImageSrc = result
                    console.log($scope.previewImageSrc)
                })
            }
            // 办公地点
            vm.popup_addr = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '修改办公地点'}
                var data = {type: 'text'}
                $scope.popup_lists = [{eng: 'real_addr', chn: '地点'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res)
                    if (res) {
                        var reg = /^[a-zA-Z0-9\u4e00-\u9fa5\s]{2,20}$/
                        if (res.subtype && res.subtype.real_addr && reg.test(res.subtype.real_addr)) {
                            var _data = {addr: res.subtype.real_addr}
                            $scope.company_modify(_data)
                        }
                    }
                })
            }
            // 经营品类
            vm.popup_manage = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '经营品类'}
                var data = {type: 'text'}
                $scope.popup_lists = [{eng: 'real_manage', chn: '经营'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res)
                    if (res) {
                        // var reg = /^[a-zA-Z\u4e00-\u9fa5\s\,]{2,10}$/;&& reg.test(res.subtype.real_manage)
                        if (res.subtype && res.subtype.real_manage) {
                            var _data = {manage: res.subtype.real_manage}
                            $scope.company_modify(_data)
                        }
                    }
                })
            }
            // ------sj_end
        }])

    // 同事列表，左上角的那个 放弃contact4
    .controller('MyContact1Ctrl', ['$http', '$location', 'authenticationService', 'rolesConfig', 'ENV', '$scope', 'Storage', '$linq',
        function ($http, $location, authenticationService, rolesConfig, ENV, $scope, Storage, $linq) {
            $scope.navbar = {
                'navLeftHref': 'tab.myRsc'
                , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
                , 'navLeft': '返回'
                , 'title': '我的同事'
                // , 'navRightHref': Storage.get('userInfo').user.role.split('_')[1] == 'ADMIN' ? 'tab.newMember' : 'tab.'
                , 'navRightHref': Storage.get('userInfo').user.role.split('_')[1] == 'ADMIN' ? 'tab.newMessage' : 'tab.'
                , 'navRight': Storage.get('userInfo').user.role.split('_')[1] == 'ADMIN' ? '添加联系人' : ''
                , 'navRightIco': ''
                , 'navRighthide': ''
            }
            var vm = this;
            vm.role = '';
            vm.colleague_list = [];

            vm.getColleagueList = function () {
                var url_remain = '';
                var comp_type = vm.role.split('_').shift();
                if (comp_type == 'TRADE') {
                    url_remain = 'user_trade/get_colleague';
                }
                else {
                    url_remain = 'user_traffic/get_colleague';
                }
                $http.post(ENV.api.account + url_remain, {}, {
                    headers: {}
                }).success(function (data) {
                    //console.log(data);
                    if (data.status == 'success') {
                        console.log('用户列表', data)
                        //var temp_list = data.data;
                        //vm.colleague_list = data.data;

                        var queryResult = $linq.Enumerable().From(data.data).GroupBy('$.role', '$', function (key, group) {
                            return {type: key, total: group.Count(), values: group}
                        }, function (key) {
                            return key.toString();
                        }).ToArray();

                        $scope.constacts = queryResult;

                        console.log($scope.constacts)


                        //for (var index in temp_list) {
                        //    var photo_url = temp_list[index].photo_url == '' ? './img/me/face_13.png' : temp_list[index].photo_url;
                        //    var real_name = temp_list[index].real_name;
                        //    var phone = temp_list[index].phone;
                        //    var role = rolesConfig.getRoles(temp_list[index].role).name;
                        //    var user =
                        //    {
                        //        photo_url: photo_url,
                        //        real_name: real_name,
                        //        phone: phone,
                        //        role: role
                        //        , _id: temp_list[index]._id
                        //        , company_id: temp_list[index].company_id
                        //    };
                        //    vm.colleague_list.push(user);
                        //}

                        //console.log('vm', vm.colleague_list)

                    }
                    else {
                        console.log('获取同事列表失败');
                    }
                });
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (vm.user_info) {
                    vm.role = vm.user_info.user.role;
                    vm.getColleagueList();
                }
                else {
                    return $location.path('/tab/login');
                }
            };
            start();
            // 跳转到个人名片
            $scope.goNameCard = function (x) {
                if (x) {
                    $location.path('/tab/nameCard_trade/' + x)
                }
            }

        }])

    // 成员管理
    .controller('MyContact4Ctrl', ['$http', '$location', 'authenticationService', 'rolesConfig', 'ENV', '$scope', 'Storage',
        function ($http, $location, authenticationService, rolesConfig, ENV, $scope, Storage) {
            $scope.navbar = {
                'navLeftHref': 'tab.myRsc'
                , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
                , 'navLeft': '返回'
                , 'title': '人员管理'
                , 'navRightHref': 'tab.newMember'
                , 'navRight': '添加联系人'
                , 'navRightIco': ''
                , 'navRighthide': ''
            }
            var vm = this;
            vm.role = '';
            vm.colleague_list = [];

            vm.getColleagueList = function () {
                var url_remain = '';
                var comp_type = vm.role.split('_').shift();
                if (comp_type == 'TRADE') {
                    url_remain = 'user_trade/get_colleague';
                }
                else {
                    url_remain = 'user_traffic/get_colleague';
                }
                $http.post(ENV.api.account + url_remain, {}, {
                        headers: {}
                    })
                    .success(function (data) {
                        //console.log(data);
                        if (data.status == 'success') {
                            var temp_list = data.data;
                            for (var index in temp_list) {
                                var photo_url = temp_list[index].photo_url == '' ? './img/me/face_13.png' : temp_list[index].photo_url;
                                var real_name = temp_list[index].real_name;
                                var phone = temp_list[index].phone;
                                var role = rolesConfig.getRoles(temp_list[index].role).name;
                                var user =
                                {
                                    photo_url: photo_url,
                                    real_name: real_name,
                                    phone: phone,
                                    role: role
                                };
                                vm.colleague_list.push(user);
                            }
                        }
                        else {
                            console.log('获取同事列表失败');
                        }
                    });
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (vm.user_info) {
                    vm.role = vm.user_info.user.role;
                    vm.getColleagueList();
                }
                else {
                    return $location.path('/tab/login');
                }
            };
            start();
        }])

    // 邀请注册(20160123 已废弃)
    .controller('MyNewMemberCtrl', ['$http', '$location', 'authenticationService', 'ENV',
        function ($http, $location, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            vm.getInvitation = function (role) {
                var valid = false;
                var url_invite = '';
                switch (role) {
                    case 'TRADE_ADMIN':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRADE_SALE':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRADE_PURCHASE':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRADE_FINANCE':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRADE_MANUFACTURE':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRADE_STORAGE':
                    {
                        if (vm.role == 'TRADE_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_trade/invite/' + role;
                        }
                        break;
                    }
                    case 'TRAFFIC_ADMIN':
                    {
                        if (vm.role == 'TRAFFIC_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_traffic/invite/' + role;
                        }
                        break;
                    }
                    case 'TRAFFIC_DRIVER':
                    {
                        if (vm.role == 'TRAFFIC_ADMIN') {
                            valid = true;
                            url_invite = 'invitation_traffic/invite/' + role;
                        }
                        break;
                    }
                }
                if (valid) {
                    $http.get(ENV.api.account + url_invite)
                        .success(function (data) {
                            console.log(data);
                        })
                        .error(function () {
                            console.log('请求邀请链接出错。');
                        });
                }
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    return $location.path('/tab/login');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role != 'TRADE_ADMIN' && vm.role != 'TRAFFIC_ADMIN') {
                        console.log('非管理员，不能邀请。');
                        return $location.path('/tab/myRsc');
                    }
                }
            };
            start();

        }])

    // 我的采购数据 my_demand_list
    .controller('MyDemandCtrl', ['$scope', '$http', '$location', 'authenticationService', 'rolesConfig', 'ENV', 'StoreManage', '$filter',
        function ($scope, $http, $location, authenticationService, rolesConfig, ENV, StoreManage, $filter) {
            var vm = this;
            vm.role = '';
            vm.list_type = '';
            vm.current_list_type = '';

            vm.demand_list = [];
            vm.offer_list = [];

            vm.getDemandCount = function () {

            };
            // 采购列表
            vm.getDemandList = function (status) {
                if (vm.list_type === 'demand' || vm.list_type === 'both') {
                    var entity = vm.list_type === 'both' ? 'company' : 'self';
                    console.log(ENV.api.trade + 'demand/demand_list_self/all/' + entity + '/' + status + '/1')
                    $http.get(ENV.api.trade + 'demand/demand_list_self/all/' + entity + '/' + status + '/1', {headers: {'x-access-token': vm.token}})
                        .success(function (data) {
                            console.log('getDemandList', data);
                            vm.DemandLists = data.data
                            for (var i = 0; i < vm.DemandLists.length; i++) {
                                _getcategory($http, ENV, vm.DemandLists[i].category, vm.DemandLists[i])
                                // _getLocation(vm.DemandLists[i].location_storage, vm.DemandLists[i], StoreManage, $filter, 'storage')
                                // _getLocation($scope.lists[i].location_storage, $scope.lists[i],StoreManage,$filter,'storage')
                                // vm.DemandLists[i].time_validity_s = formvalidity(vm.DemandLists[i].time_validity)
                                getImmedia(vm.DemandLists[i]._id, vm.DemandLists[i], $http, ENV)
                            }
                        })
                        .error(function () {
                            console.log('获取采购需求单失败。');
                        });
                }
            };
            // 抢单列表
            vm.getOfferList = function () {
                if (vm.list_type === 'offer' || vm.list_type === 'both') {
                    var entity = vm.list_type === 'both' ? 'company' : 'self';
                    $http.get(ENV.api.trade + 'demand/offer_list_self/' + entity + '/all/1', {headers: {'x-access-token': vm.token}})
                        .success(function (data) {
                            console.log('getOfferList', data)
                            vm.OfferLists = data.data
                            // for (var i = 0; i < vm.DemandLists.length; i++) {
                            // _getcategory($http, ENV, vm.DemandLists[i].category, vm.DemandLists[i])
                            // _getLocation(vm.DemandLists[i].location_storage, vm.DemandLists[i], StoreManage, $filter, 'storage')
                            // _getLocation($scope.lists[i].location_storage, $scope.lists[i],StoreManage,$filter,'storage')
                            // vm.DemandLists[i].time_validity_s = formvalidity(vm.DemandLists[i].time_validity)
                            // $scope.getDemandDetail(vm.DemandLists[i].demand_id, vm.DemandLists[i])
                            // getImmedia(vm.DemandLists[i].demand_id, vm.DemandLists[i], $http, ENV)
                            // }
                        })
                        .error(function () {
                            console.log('获取采购抢单失败。');
                        });
                }
            };

            vm.changeCurrentList = function (list_type) {
                vm.current_list_type = list_type;
            };
            vm.validity = true;
            vm.left_active = 'active'
            vm.leftClick = function () {
                vm.left_active = 'active'
                vm.right_active = ''
                var status = 'valid'
                if (vm.is_admin) {
                    vm.getDemandList(status)
                } else {
                    // 如果是销售单,左为正在进行中，右为已完成或过期，
                }

            }
            vm.rightClick = function () {
                var status = 'invalid'
                vm.left_active = ''
                vm.right_active = 'active'
                if (vm.is_admin) {
                    vm.getDemandList(status)
                } else {
                    // 如果是销售单,左为正在进行中，右为已完成或过期，
                }

            }
            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                var status = 'valid'
                if (vm.user_info) {
                    vm.role = vm.user_info.user.role;
                    vm.token = vm.user_info.token;
                    if (vm.role == 'TRADE_SALE') {
                        vm.list_type = 'offer';
                        vm.current_list_type = 'offer';
                        vm.is_admin = false
                        vm.getOfferList()
                    }
                    else if (vm.role == 'TRADE_PURCHASE') {
                        vm.list_type = 'demand';
                        vm.current_list_type = 'demand';
                        vm.is_admin = true
                        vm.getDemandList(status);
                    }
                    else if (vm.role == 'TRADE_ADMIN') {
                        vm.list_type = 'both'
                        vm.current_list_type = 'demand'
                        vm.is_admin = true
                        vm.adminShowA = 'active'
                        vm.getDemandList(status)

                    }
                }
                else {
                    return $location.path('/tab/login');
                }
            };

            start();
            // $scope.navbar = {
            //     'navLeftHref': 'tab.myRsc'
            //     , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            //     , 'navLeft': '返回'
            //     , 'title': '采购管理'
            //     , 'navRightHref': 'tab.'
            //     , 'navRight': ''
            //     , 'navRightIco': ''
            //     , 'navRighthide': ''
            // }
            // -----------sj
            vm.adminShowL = function () {
                vm.is_admin = true
                vm.adminShowA = 'active'
                vm.adminShowB = ''

            }
            vm.adminShowR = function () {
                vm.is_admin = false
                vm.adminShowA = ''
                vm.adminShowB = 'active'
                vm.getOfferList()
            }
            // $scope.getDemandDetail = function (id, i) {
            //     console.log(ENV.api.trade + 'demand/demand_detail/id/' + id)
            //     $http({
            //         method: 'GET'
            //         , url: ENV.api.trade + 'demand/demand_detail/id/' + id
            //         , headers: {
            //
            //         }
            //     }).success(function (data) {
            //         console.log(data)
            //         i.time_validity = formvalidity(data.data.entry.time_validity)
            //     })
            // }

        }])

    // 我的专线 及相关操作
    .controller('MyRoutesCtrl', ['$http', '$location', '$state', 'authenticationService', 'ENV',
        function ($http, $location, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';
            vm.routes = [];

            vm.goDetail = function (id) {
                console.log('转向专线详细信息：' + id);
                //tab.myRsc#/tab/my_route_detail/123423423
                $state.go('tab.my_route_detail', {id: id});
            };

            // 获取现有的路径信息
            vm.getRoutesInfo = function () {
                $http.post(ENV.api.account + 'company_traffic_line/get')
                    .success(function (data) {
                        //console.log(data);
                        switch (data.status) {
                            case 'success':
                            {
                                //console.log('获取路径信息成功');
                                vm.routes = data.data;
                                console.log(vm.routes);
                                break;
                            }
                            case 'not_allow':
                            {
                                console.log('没有权限');
                                break;
                            }
                            default:
                            {
                                console.log('获取所有路径信息，服务器出错。');
                                break;
                            }
                        }
                    })
                    .error(function () {
                        console.log('获取所有路径信息，服务器出错。');
                    });
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    //console.log('尚未登录');
                    $state.go('tab.myRsc');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role == 'TRAFFIC_ADMIN' || vm.role == 'TRAFFIC_DRIVER') {
                        vm.getRoutesInfo();
                    }
                    else {
                        $location.path('/tab/MyRsc');
                    }
                }
            };

            start();
        }])

    .controller('MyRouteNewCtrl', ['$http', '$location', 'authenticationService', 'ENV',
        function ($http, $location, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            vm.start_province = '';
            vm.start_city = '';
            vm.start_district = '';
            vm.end_province = '';
            vm.end_city = '';
            vm.end_district = '';


            // 添加路径信息
            vm.newRoute = function () {
                var upload_data =
                {
                    //start_province: vm.start_province,
                    //start_city: vm.start_city,
                    //start_district: vm.start_district,
                    //end_province: vm.end_province,
                    //end_city: vm.end_city,
                    //end_district: vm.end_district

                    // 以下是测试信息
                    start_province: '3',
                    start_city: '6',
                    start_district: '116',
                    end_province: '5',
                    end_city: '351',
                    end_district: '2724'
                };

                $http.post(ENV.api.account + 'company_traffic_line/add', upload_data)
                    .success(function (data) {
                        console.log(data);
                        switch (data.status) {
                            case 'success':
                            {
                                console.log('上传成功。\n' + data.data);
                                break;
                            }
                            case 'invalid_format':
                            {
                                console.log('上传格式有误。');
                                break;
                            }
                            case 'not_allow':
                            {
                                console.log('没有操作权限。');
                                break;
                            }
                            default:
                            {
                                console.log('上传新路径，服务器出错。');
                                break;
                            }
                        }
                    })
                    .error(function () {
                        console.log('上传新路径，服务器出错。');
                    });
            };

            // 读取地域信息
            vm.getRegionInfo = function () {
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    //console.log('尚未登录');
                    $location.path('/tab/login');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    //console.log('登陆成功，角色是' + vm.role);
                    if (vm.role != 'TRAFFIC_ADMIN' && vm.role != 'TRAFFIC_DRIVER') {
                        $location.path('/tab/MyRsc');
                    }
                }
            };

            start();
        }])

    .controller('MyRouteEditCtrl', ['$http', '$location', '$stateParams', 'authenticationService', 'ENV',
        function ($http, $location, $stateParams, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            // 修改路径信息
            vm.editRoute = function () {
            };

            // 读取路径信息
            vm.getRouteInfo = function () {
                console.log('获取专有路径信息');
            };

            // 读取地域信息
            vm.getRegionInfo = function () {
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    //console.log('尚未登录');
                    $location.path('/tab/login');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role == 'TRAFFIC_ADMIN' || vm.role == 'TRAFFIC_DRIVER') {
                        console.log('登陆成功，角色是' + vm.role + '。需要修改的路径ID是：' + $stateParams.id);
                        vm.getRouteInfo();
                    }
                    else {
                        $location.path('/tab/MyRsc');
                    }
                }
            };

            start();
        }])

    .controller('MyRouteDetailCtrl', ['$http', '$location', '$stateParams', '$state', 'authenticationService', 'ENV',
        function ($http, $location, $stateParams, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';
            vm.route = {};

            // 读取路径信息
            vm.getRouteInfo = function () {
                $http.post(ENV.api.account + 'company_traffic_line/get_one', {line_id: $stateParams.id})
                    .success(function (data) {
                        //console.log(data);
                        switch (data.status) {
                            case 'success':
                            {
                                vm.route = data.data;
                                console.log(vm.route);
                                break;
                            }
                            case 'not_allow':
                            {
                                console.log('没有权限');
                                break;
                            }
                            default:
                            {
                                console.log('获取所有路径信息，服务器出错。');
                                break;
                            }
                        }
                    })
                    .error(function () {
                        console.log('获取路径信息，服务器出错');
                    });
            };


            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    //console.log('尚未登录');
                    $location.path('/tab/login');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role == 'TRAFFIC_ADMIN' || vm.role == 'TRAFFIC_DRIVER') {
                        //console.log('登陆成功，角色是' + vm.role + '。需要修改的路径ID是：' + $stateParams.id);
                        vm.getRouteInfo();
                    }
                    else {
                        $location.path('/tab/MyRsc');
                    }
                }
            };

            start();
        }])

    // 我的车辆 及相关操作
    .controller('MyTruckListCtrl', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';
            vm.truck_list = [];

            vm.getTruckList = function () {
                $http.post(ENV.api.account + 'user_traffic_truck/get')
                    .success(function (data) {
                        console.log(data);
                        switch (data.status) {
                            case 'success':
                            {
                                vm.truck_list = data.data;
                                break;
                            }
                            case 'not_allow':
                            {
                                console.log('没有相应权限');
                                break;
                            }
                            case 'invalid_format':
                            {
                                console.log('输入格式错误');
                                break;
                            }
                            case 'not_found':
                            {
                                console.log('未找到相应信息');
                                break;
                            }
                            default:
                            {
                                console.log('查找车辆列表，服务器错误。');
                                break;
                            }
                        }
                    })
                    .error(function () {
                        console.log('查找车辆列表，服务器错误。');
                    });
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    $state.go('tab.myRsc');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role == 'TRAFFIC_ADMIN' || vm.role == 'TRAFFIC_DRIVER') {
                        vm.getTruckList();
                    }
                    else {
                        $state.go('tab.myRsc');
                    }
                }
            };

            start();
        }])

    .controller('MyTruckNewCtrl', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            vm.money = 0;
            vm.route_id = '';

            // 此处前后端需求的录入数据不匹配？
            vm.newTruck = function () {

            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    $state.go('tab.myRsc');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role != 'TRAFFIC_ADMIN' && vm.role != 'TRAFFIC_DRIVER') {
                        $state.go('tab.myRsc');
                    }
                }
            };

            start();
        }])

    // 我的仓储，及相关操作
    .controller('MyStorageListCtrl', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            // 获得当前仓库列表
            vm.getStorageList = function () {
            };

            // 跳转到detail
            vm.goDetail = function (id) {
                console.log('跳转到相应的细节表单，ID:' + id);
            };

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    return $state.go('tab.myRsc');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role != 'TRADE_ADMIN' && vm.role != 'TRADE_STORAGE') {
                        return $state.go('tab.myRsc');
                    }
                }
                vm.getStorageList();
            };

            start();
        }])

    .controller('MyStorageNewCtrl', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;

            var start = function () {
            };
            start();
        }])

    // 企业主页
    .controller('MyCompHomeCtrl', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;
            vm.role = '';

            var start = function () {
                vm.user_info = authenticationService.getUserInfo();
                if (!vm.user_info) {
                    $state.go('tab.myRsc');
                }
                else {
                    vm.role = vm.user_info.user.role;
                    if (vm.role != 'TRAFFIC_ADMIN' && vm.role != 'TRAFFIC_DRIVER') {
                        $state.go('tab.myRsc');
                    }
                }
            };
            start();
        }])

    // 司机管理及相关功能
    .controller('MyDriverList', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;

            var start = function () {
            };
            start();
        }])

    .controller('MyDriverAssign', ['$http', '$state', 'authenticationService', 'ENV',
        function ($http, $state, authenticationService, ENV) {
            var vm = this;

            var start = function () {
            };

            start();
        }])

    // 系统通知---------
    .controller('inforSystermCtrl', ['$scope', '$interval', 'Storage', '$http', 'ENV', function ($scope, $interval, Storage, $http, ENV) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '系统通知'
            , 'navRightHref': 'tab.'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
        var vm = this;
        vm.perlists = ''

        // 获取个人消息
        vm.msgs = {
            count: ''
            , lists: ''
        }
        vm.user = Storage.get('userInfo').user

        vm.lists = function () {
            // /get_msg/:target/:page
            vm.date = new Date()
            console.log(ENV.api.msg + 'get_msg/' + vm.user._id + '/1')
            $http.get(ENV.api.msg + 'get_msg/' + vm.user._id + '/1').success(function (data) {
                console.log('person', data)
                vm.perlists = data.data
            })
        }

        vm.getmsgs = function () {
            // vm.msgcount();
            vm.lists();
        }
        // 10分钟刷一次。1000毫秒 * 60秒 * 10分
        $interval(function () {
            vm.getmsgs()
        }, 1000 * 60 * 10)

        // 初始化
        var start = function () {
            vm.getmsgs()
        }
        start();

    }])

    // 2015-12-14之前的controller们
    .controller('MeCtrl', function ($log, $scope, userToken) {
        $scope.$on('$stateChangeStart', function (evt, toState, roParams, fromState, fromParams) {
            //$log.debug(arguments);
            //evt.preventDefault();
        })

        $scope.$on('$stateChangeSuccess', function (evt, toState, roParams, fromState, fromParams) {
            //$log.debug('$stateChangeSuccess', arguments);
        })
        $scope.userInfo = userToken;

    })

    .controller('myRsc1Ctrl', ['$scope', function ($scope) {
        $scope.navbar = {
            'navLeftHref': 'tab.'
            , 'navLeftIco': ''
            , 'navLeft': ''
            , 'title': '我'
            , 'navRightHref': '#/tab/mySet'
            , 'navRight': ''
            , 'navRightIco': 'glyphicon glyphicon-cog'
            , 'navRighthide': ''
        }
    }])

    .controller('mySetCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': '#/tab/myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '个人设置'
            , 'navRightHref': ''
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    .controller('contact1Ctrl', function ($scope) {
        // $scope.navbar = {
        //     'navLeftHref': '#/tab/myRsc'
        //     , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
        //     , 'navLeft': '返回'
        //     , 'title': '我的同事'
        //     , 'navRightHref': ''
        //     , 'navRight': ''
        //     , 'navRightIco': ''
        //     , 'navRighthide': ''
        // }
    })

    .controller('contact2Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '我的客户'
            , 'navRightHref': 'tab.'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    .controller('contact3Ctrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': '#/tab/myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '我的关注'
            , 'navRightHref': ''
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    .controller('contact4Ctrl', function ($scope) {

    })

    // 公司主页
    .controller('companyProHomeCtrl', function ($scope, $state, Storage, $http, ENV, StoreManage, $filter, $location, PassService, authenticationService, $log, $ionicModal, $ionicPopup) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '企业主页'
            , 'navRightHref': 'tab.'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
        $scope.vm = {}
        // 获取公司信息

        $scope.getCompanyInfo = function (url_type) {

            $http.post(ENV.api.account + url_type + 'get', {headers: {'x-access-token': Storage.get('userInfo').token}})
                .success(function (data) {
                    console.log('---', data)
                    if (data.status == 'success') {
                        $scope.vm.company_info = data.data;
                        $scope.vm.company_info.url_logo = typeof($scope.vm.company_info.url_logo) == 'undefined' ? './img/me/com_face_1.jpg' : $scope.vm.company_info.url_logo;
                    }
                });
        };

        var url_type = ''
        // 启动
        $scope.start = function () {
            // 角色判断
            $scope.userInfo = Storage.get('userInfo').user.role.split('_');

            if ($scope.userInfo[0] == 'TRADE') {
                url_type = 'company_trade/';

            } else {
                url_type = 'company_traffic/';
            }
            // 判断企业类型
            $scope.getCompanyInfo(url_type)

        }
        $scope.start()

        $scope.orders = [];
        $scope.initTrafficOrders = function () {
            PassService.getAllOrders(authenticationService.getCompanyInfo().type).then(function (result) {
                if (result.status == 'success') {
                    $scope.orders = result.data;
                    $log.info(result);

                } else {
                    $log.error(result);
                }
            });

        }
        $scope.goDetail = function (order) {
            //$state.go('tab.passOrder', {order_id: order._id});
        }
        // 图片
        _ionicModal($ionicModal, $scope, 'templates/honorModal.html').then(function (modal) {
            $scope.honorModal = modal;
        })
        _ionicModal($ionicModal, $scope, 'templates/cultureModal.html').then(function (modal) {
            $scope.cultureModal = modal;
        })

        _ionicModal($ionicModal, $scope, './template/common/share.html').then(function (modal) {
            $scope.modal = modal;
        })
        $scope.share = function (e) {
            console.log(e)
            if (e == 'honor') {
                $scope.honorModal.show()
            } else if (e == 'culture') {
                $scope.cultureModal.show()
            } else {
                $scope.modal.show()
            }

        }
        $scope.closeModal = function (e) {
            if (e == 'honor') {
                $scope.honorModal.hide()
            } else if (e == 'culture') {
                $scope.cultureModal.hide()
            } else {
                $scope.modal.hide()
            }
        }
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
            console.log(type)
        }
        // 添加图片
        $scope.getUploadPic = function (e) {
            $scope.file = e
        }
        $scope.addImg = function (_type, _index) {
            var filename = _type + '_' + _index
            console.log(_type, _index)
            console.log(_type, _index)
            var obj = {templateUrl: './template/common/popup_radio.html', title: '上传图片'};
            var data = {type: 'file'}
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if ($scope.file) {
                        var _url = ENV.api.account + 'file/upload/' + filename + '/null';
                        console.log(_url)
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                            console.log('上传图片失败', data)
                            if (data.status == "success") {
                                console.log('图片上传成功 进入下一步')
                                // 写入数据库
                                if (_type == 'honor') {
                                    var url_honor = $scope.vm.company_info.url_honor
                                    url_honor[_index - 1] = data.data
                                    var _data = {url_honor: url_honor}
                                } else {
                                    var url_culture = $scope.vm.company_info.url_culture
                                    url_culture[_index - 1] = data.data
                                    var _data = {url_culture: url_culture}
                                }
                                $scope.modify_company(_type, _index, _data)
                            }
                        })
                    }
                }
            })

        }
        $scope.delImg = function (_type, _index) {
            console.log(_type, _index)
            if (_type == 'honor') {
                var url_honor = $scope.vm.company_info.url_honor
                url_honor[_index - 1] = ''
                var _data = {url_honor: url_honor}
            } else {
                var url_culture = $scope.vm.company_info.url_culture
                url_culture[_index - 1] = ''
                var _data = {url_culture: url_culture}
            }
            $scope.modify_company(_type, _index, _data)

        }
        // 修改图
        $scope.modify_company = function (_type, _index, _data) {
            console.log(_data)
            $http.post(ENV.api.account + url_type + 'edit', _data)
                .success(function (data) {
                    console.log(data)
                })
        }
    })

    //
    .controller('attentionCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '企业关系管理'
            , 'navRightHref': '#/tab/partner1'
            , 'navRight': '邀请'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }


    })

    .controller('myCompanySetCtrl', function ($scope) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'title': '企业设置'
            , 'navRightHref': 'tab.'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
    })

    // 仓库管理
    .controller('companyStoreCtrl', function ($scope, $http, $location, ENV) {

        var _url = 'http://' + $location.$$host + ':' + $location.$$port + '/config'
        console.log(_url)
        $http({
            method: 'GET'
            , url: _url + '/config_province.js'
        }).success(function (data) {
            for (var i in data) {
                $scope.allProvinces[i] = data[i]
            }
        })

        $scope.allProvinces = [{ProID: 0, name: '请选择省份'}];
        $scope.cities = [{CityID: 0, name: '请选择城市'}];
        $scope.areas = [{DisID: 0, name: '请选择区/县'}];

        $scope.data = {
            currentProvinceId: 0,
            currentCityId: 0,
            currentAreaId: 0
        };

        $scope.switchProvince = function (currentProvinceId) {
            $scope.data.currentCityId = 0;
            $scope.data.currentAreaId = 0;
            // cities
            $http({
                method: 'GET'
                , url: _url + '/config_city.js'
            }).success(function (data) {
                $scope.cities = [{CityID: 0, name: '请选择城市'}];
                for (var i in data[currentProvinceId]) {
                    $scope.cities.push(data[currentProvinceId][i])
                }
                // console.log($scope.cities)
            })
        };

        $scope.switchCity = function (currentCityId) {
            $scope.data.currentAreaId = 0;
            // 地区
            $http({
                method: 'GET'
                , url: _url + '/config_district.js'
            }).success(function (data) {
                $scope.areas = [{DisID: 0, name: '请选择区/县'}];
                for (var i in data[currentCityId]) {
                    $scope.areas.push(data[currentCityId][i])
                }
                // console.log($scope.areas)
            })
        };

        $scope.submit = function () {
            var _url = ENV.api.account + "company_trade_store/add"
            var _data = {
                province: $scope.data.currentProvinceId.toString()
                , city: $scope.data.currentCityId.toString()
                , district: $scope.data.currentAreaId.toString()
                , addr: $scope.data.detail
                , latitude: $scope.data.latitude
                , longitude: $scope.data.longitude
                , name: $scope.data.name
            }
            console.log(_url)
            console.log(_data)
            $http({
                method: 'POST'
                , url: _url
                , data: _data
            }).success(function (data) {
                console.log(data)
            })

        }
        // 获取仓库
        $http({
            method: 'POST'
            , url: ENV.api.account + 'company_trade_store/get'
        }).success(function (data) {
            $scope.lists = data.data

            console.log(data)
        })
    })

    //物流管理界面
    .controller('PassManageCtrl', function ($scope, $rootScope, $state, PassService, $log, $ionicLoading, authenticationService) {

        $scope.$on('$stateChangeSuccess', function (event, toState, roParams, fromState, fromParams) {
            if (authenticationService.getCompanyInfo().type == 'TRADE') {
                $state.go('tab.passManage.trade');
            } else if (authenticationService.getCompanyInfo().type == 'TRAFFIC') {
                $state.go('tab.passManage.traffic');
            }
        });

        $scope.$on('refreshComplete', function () {
            $scope.$broadcast('scroll.refreshComplete');

        })
        $scope.$on('loadMoreComplete', function () {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        })


        $scope.doRefresh = function () {
            $scope.$broadcast('refresh');

        }

        $scope.loadMore = function () {
            $scope.$broadcast('loadMore');

        }
        //$scope.init = function () {
        //    if (authenticationService.getCompanyInfo().type == 'TRADE') {
        //        $state.go('tab.passManage.trade');
        //    }
        //}

    })

    .controller('TradePassManageCtrl', function ($scope, $state, PassService, $log, $ionicLoading) {
        $scope.query = {
            page: 1,
            getType: 1,
            hasOrder: false,

        };
        var run = false;
        $scope.hasMore = true;

        $scope.selected = {
            selectedType: false
        }

        $scope.init = function () {
            //$state.go('tab.passManage.demand');
            $scope.query.getType = 1;

            queryAction();
        }
        var queryAction = function () {
            if (!run) {
                $ionicLoading.show();
                run = true;
                console.log($scope.query)
                PassService.getAllDemand($scope.query).then(function (result) {
                    run = false;

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
                        $log.info('获取我的需求单', result);

                    } else {
                        $log.info('', result)
                        run = false;
                    }

                }, function (error) {
                    run = false;
                    $ionicLoading.hide();
                }).finally(function () {
                    $ionicLoading.hide();

                })
            } else {
                if ($scope.query.getType == 3) {
                    $scope.query.page -= 1;
                }
            }
        }

        $scope.queryHasOrder = function (type) {
            $scope.query.getType == 1;
            $scope.query.hasOrder = type;
            $scope.selected.selectedType = type;
            queryAction();
        }
        $scope.loadMore = function () {
            $scope.query.page += 1;
            $scope.query.getType = 3; //加载更多
            queryAction();

            $scope.$broadcast('scroll.infiniteScrollComplete');
            //$scope.$emit('loadMoreComplete');

        }


        $scope.$on('refresh', function () {
            $scope.doRefresh();
        })
        $scope.$on('loadMore', function () {
            $scope.loadMore();
        })

        $scope.doRefresh = function () {
            //页面在顶部的时候为第一页 trade
            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            queryAction();
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$emit('refreshComplete');

        }

        $scope.goDetail = function (demand) {
            $state.go('tab.rushTranspDetail', {demand_id: demand._id});
        }
    })

    .controller('TrafficPassManageCtrl', function ($scope, $state, PassService, $log, $ionicLoading) {
        $scope.query = {
            page: 1,
            getType: 1,
            hasOrder: false,
            select: false

        };
        var run = false;
        $scope.hasMore = true;

        $scope.selected = {
            selectedType: false
        }

        $scope.init = function () {
            //$state.go('tab.passManage.demand');
            $scope.query.getType = 1;

            queryAction();
        }
        var queryAction = function () {
            if (!run) {
                $ionicLoading.show();
                run = true;
                console.log($scope.query)
                PassService.getOfferListByCompany($scope.query).then(function (result) {
                    run = false;
                    if (result.status == 'success') {
                        $scope.hasMore = result.data.exist;
                        if ($scope.query.getType == 3) {
                            if ($scope.offers) {
                                $scope.offers = $scope.offers.concat(result.data.offers);
                            } else {
                                $scope.offers = result.data.offers;
                            }
                        } else {
                            $scope.offers = result.data.offers;
                        }
                        $log.info('获取我的抢单', result);

                    } else {
                        $log.error('获取我的抢单失败', result);
                        run = false;
                    }
                    //$ionicLoading.hide();

                }, function (error) {
                    run = false;
                    $ionicLoading.hide();
                }).finally(function () {
                    run = false;
                    $ionicLoading.hide();
                })
            } else {
                if ($scope.query.getType == 3) {
                    $scope.query.page -= 1;
                }
            }
        }

        $scope.queryHasOrder = function (type) {
            $scope.query.getType = 1;
            $scope.query.page = 1;
            $scope.query.hasOrder = type;
            $scope.query.select = type;
            $scope.selected.selectedType = type;
            queryAction();
        }
        $scope.loadMore = function () {
            $scope.query.page += 1;
            $scope.query.getType = 3; //加载更多
            queryAction();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $scope.doRefresh = function () {
            //页面在顶部的时候为第一页
            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            queryAction();
            $scope.$broadcast('scroll.refreshComplete');
        }

        $scope.goDetail = function (demand) {
            $state.go('tab.rushTranspDetail', {demand_id: demand._id});
        }

        $scope.editOffer = function (offer, $event) {
            $event.stopPropagation()
            console.log(offer)
            $state.go('tab.rushTranspRushEdit', {
                type: 'edit',
                offer_id: offer._id,
                demand_id: offer.demand_id
            });

        }
    })

    //物流管理下的需求订单
    .controller('passManageDemand', function ($scope, $log, PassService, $state) {


        $scope.init = function () {
            PassService.getAllDemand().then(function (result) {
                console.log(result);
                if (result.status == 'success') {
                    $scope.orders = result.data;
                } else {
                    $log.error('获取我的需求单', result);
                }
            })
        }


        $scope.goDetail = function (demand) {
            $state.go('tab.rushTranspDetail', {demand_id: demand._id});
        }
        $scope.selectedChange = function (value) {


            console.log(value)
        }
    })

    // 获取公司订单 管理员依据公司id 查询物流和交易的单据
    .controller('tradedemandCtrl', ['$scope', '$http', 'ENV', 'StoreManage', '$filter', 'Storage',
        function ($scope, $http, ENV, StoreManage, $filter, Storage) {
            $scope.status = 'valid'
            $scope.page = 1
            var userInfo = Storage.get('userInfo').user.role.split('_');
            $scope.entity = userInfo[1] == 'ADMIN' ? 'company' : 'self'

            $scope.demandlist = function (entity, status, page) {

                var _url = ENV.api.trade + 'demand/demand_list_self/all/' + entity + '/valid/' + page
                console.log(_url)
                $http({
                    method: 'GET'
                    , url: _url
                    , headers: {}
                }).success(function (data) {
                    console.log('来自tradedemandCtrl', data)
                    if (data.status == 'success') {
                        $scope.lists = data.data
                        for (var i = 0; i < $scope.lists.length; i++) {
                            _getcategory($http, ENV, $scope.lists[i].category, $scope.lists[i])
                            _getLocation($scope.lists[i].location_storage, $scope.lists[i], StoreManage, $filter, 'storage')
                            getImmedia($scope.lists[i]._id, $scope.lists[i], $http, ENV)
                        }
                        $http({
                            method: 'GET'
                            , url: ENV.api.trade + 'demand/demand_list_self/all/' + entity + '/invalid/' + page
                            , headers: {}
                        }).success(function (data) {
                            console.log(data)
                            if (data.status == 'success' && data.data.length >= 1) {
                                console.log('谁会报错')
                                var temp = data.data
                                for (var i = 0; i < temp.length; i++) {
                                    $scope.lists.push(temp[i])
                                }
                                for (var i = 0; i < $scope.lists.length; i++) {
                                    _getcategory($http, ENV, $scope.lists[i].category, $scope.lists[i])
                                    _getLocation($scope.lists[i].location_storage, $scope.lists[i], StoreManage, $filter, 'storage')
                                    getImmedia($scope.lists[i]._id, $scope.lists[i], $http, ENV)
                                }

                                console.log('数据', $scope.lists)
                            }
                        })
                    }
                    // console.log('数据',$scope.lists)
                })
            }
            $scope.demandlist($scope.entity, $scope.status, $scope.page)

        }])

    // ----------------自定义函数

    // ---省份选择器
    .controller('procityCtrl', function ($location, $http, ENV, $scope, areas) {
        //document.write("");
        //var _url = 'http://' + $location.$$host + ':' + $location.$$port + '/config'
        //$http({
        //    method: 'GET'
        //    , url: _url + '/config_province.js'
        //}).success(function (data) {
        //
        //})
        $scope.allProvinces = [];
        $scope.cities = [];
        $scope.areas = [];

        console.log('test.province', areas.provinces)
        for (var i in areas.provinces) {
            $scope.allProvinces[i - 1] = areas.provinces[i]
        }
        // $scope.data = {
        //         currentProvinceId: 0,
        //         currentCityId: 0,
        //         currentAreaId: 0
        // };
        $scope.switchProvince = function (currentProvinceId) {
            //$scope.data.currentCityId = 0;
            //$scope.data.currentAreaId = 0;
            // cities
            //$http({
            //    method: 'GET'
            //    , url: _url + '/config_city.js'
            //}).success(function (data) {
            //    $scope.cities = [];
            //    for (var i in data[currentProvinceId]) {
            //        $scope.cities.push(data[currentProvinceId][i])
            //    }
            //    // console.log($scope.cities)
            //})

            $scope.cities = []; //重新选择是初始化城市和地区
            $scope.areas = [];
            for (var i in areas.citys[currentProvinceId]) {
                // console.log(i);
                $scope.cities.push(areas.citys[currentProvinceId][i])
            }
        };
        $scope.switchCity = function (currentCityId) {
            //$scope.data.currentAreaId = 0;
            // 地区
            //$http({
            //    method: 'GET'
            //    , url: _url + '/config_district.js'
            //}).success(function (data) {
            //    $scope.areas = [];
            //    for (var i in data[currentCityId]) {
            //        $scope.areas.push(data[currentCityId][i])
            //    }
            //    // console.log($scope.areas)
            //})

            for (var i in areas.areas[currentCityId]) {
                $scope.areas.push(areas.areas[currentCityId][i])
            }
        };
        $scope.city = function (value) {
            console.log(value);
        }

    })

    //添加车辆
    .controller('AddCarCtrl', function ($scope, $ionicPopup, ListConfig, $state, AccountInformation, $log, iAlert, PassService, $stateParams) {
        $scope.car = {};
        $scope.isCommit = false;
        $scope.carType = $stateParams.type;
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
        $scope.init = function () {
            $scope.$watch('car.number', function () {
                if ($scope.car.number && $scope.add_form.carNumber.$valid) {
                    AccountInformation.checkCarNumberExist($scope.car.number).then(function (result) {
                        if (result.status == 'success') {
                            $scope.hasNumber = result.data;
                        }
                    })
                }
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

        $scope.add = function () {
            console.log('1212')
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
                    if($scope.carType == 'team'){
                      $state.go('tab.CarDetail',{car_id: result.data._id});
                      $scope.isCommit = true;
                    } else {
                      $state.go('tab.MyCarListGroupByType');
                      $scope.isCommit = true;
                    }

                } else {
                    $scope.isCommit = false;
                    $log.error('添加车辆', result);
                }
            })
        }

        $scope.goBack = function () {
            window.history.go(-1);
        }
    })

    //车辆详情
    .controller('CarDetailCtrl', function ($filter, EnumType, iAlert, $scope, $state, $log, ListConfig,authenticationService, $ionicPopup, $stateParams, AccountInformation, PassService) {
        //TODO 根据
        var role = authenticationService.getUserInfo().user.role;
        //console.log('角色',role)
        $scope.role = role;
        //$log.info('userType',userType);
        var car_id = $stateParams.car_id;
        $scope.init = function () {
            //获取车辆详情
            AccountInformation.getCarInfoById(car_id).then(function (result) {
                if (result.status == 'success') {
                    $log.info('获取车辆信息', result);
                    $scope.car = result.data
                    AccountInformation.getDriverInfoById($scope.car.user_id[0]).then(function (result) {
                        if (result.status == 'success') {
                            $scope.driverInfo = result.data;
                            $scope.verifyLock = result.data.verify_lock;
                            $log.info('driverinfo', result.data);
                            //$log.info('driverinfo', $scope.verifyLock);
                        } else {
                            $log.error('driverInfo', result)
                        }
                    })
                } else {

                }
            })
        };
        $scope.goBack =function () {
          window.history.go(-1);
        }

        $scope.selectCarType = function () {

            if (!$filter('authenticationStatus')($scope.car.verify_phase, 'btnDisabled')) {
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
            } else {
                iAlert.alert('车辆已经认证中或者证通过,不能修改!');
            }
        }
        $scope.selectCarWeigh = function () {
            if (!$filter('authenticationStatus')($scope.car.verify_phase, 'btnDisabled')) {
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
            } else {
                iAlert.alert('车辆已经认证中或者证通过,不能修改!');
            }
        }
        $scope.selectCarLong = function () {
            if (!$filter('authenticationStatus')($scope.car.verify_phase, 'btnDisabled')) {
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
            } else {
                iAlert.alert('车辆已经认证中或者证通过,不能修改!');
            }
        }
        $scope.fileUpload = function (type) {
          if (type == "xing_shi_zheng"){
            AccountInformation.getUseLock().then(function (result) {
              if (result.status == 'success') {
                $scope.verify_lock = result.data.user.verify_lock;
                $log.info('获取锁定状态', $scope.verify_lock);
                $log.info('状态', type);
                if($scope.verify_lock == "UNLOCK"){
                  if (!$filter('authenticationStatus')($scope.car.verify_phase, 'btnDisabled')) {
                    //btnDisabled
                    var obj = {templateUrl: './template/common/popup_radio.html', title: '上传图片'}
                    var data = {type: 'file'}
                    _popup($scope, obj, $ionicPopup, data).then(function (res) {
                      if (res) {
                        if ($scope.file) {
                          PassService.carImgUpload(EnumType.file_type[type], $scope.car._id, $scope.file[0]).then(function (result) {
                            if (result.status == 'success') {
                              $scope.car[EnumType.file_type[type] + '_url'] = result.data;
                              $log.info(type, result);
                            } else {
                              $log.error(type, result);
                            }
                          }, function (error) {
                            $log.error(type, error);
                          });
                        } else {
                          $scope.msg = {img: '未选择图片'}
                        }
                      }
                    });
                  } else {
                    iAlert.alert('车辆已经认证中或者证通过,不能修改!');
                  }
                }else{
                  iAlert.alert('锁定状态不可修改驾驶证、行驶证信息。如需修改请解锁！')
                }
              }else{
                $log.info('获取锁定状态失败', result);
              }
            });
          }else{
            if (!$filter('authenticationStatus')($scope.car.verify_phase, 'btnDisabled')) {
              //btnDisabled
              var obj = {templateUrl: './template/common/popup_radio.html', title: '上传图片'}
              var data = {type: 'file'}
              _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                  if ($scope.file) {
                    PassService.carImgUpload(EnumType.file_type[type], $scope.car._id, $scope.file[0]).then(function (result) {
                      if (result.status == 'success') {
                        $scope.car[EnumType.file_type[type] + '_url'] = result.data;
                        $log.info(type, result);
                      } else {
                        $log.error(type, result);
                      }
                    }, function (error) {
                      $log.error(type, error);
                    });
                  } else {
                    $scope.msg = {img: '未选择图片'}
                  }
                }
              });
            } else {
              iAlert.alert('车辆已经认证中或者证通过,不能修改!');
            }
          }

        };

        $scope.getUploadPic = function (e) {
            $scope.file = e
        }

        $scope.update = function () {

            if ($scope.verifyLock == "LOCK"){
                iAlert.alert('请先解锁用户状态!');
                return;
            }

            if (!$scope.car.type) {
                iAlert.alert('请选择车辆类型!');
                return;
            }
            if (!$scope.car.number) {
                iAlert.alert('请填写车牌号码!');
                return;
            }
            var reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
            if (!reg.test($scope.car.number)) {
                iAlert.alert('车牌号格式错误,字母需大写,例如:京A00001。');
                return;
            }

            if (!$scope.car.weight) {
                iAlert.alert('请选择车载重!');
                return;
            }
            //TODO 私人司机  行驶证还有驾驶证必填.

            //if()
            //{
            //
            //}
            if (!$scope.car.xing_shi_zheng_url) {
                iAlert.alert('请上传行驶证照片!');
                return;
            }
            if (!$scope.car.yun_ying_zheng_url) {
                iAlert.alert('请上传运营证照片!');
                return;
            }
            //if (!$scope.car.che_tou_zhao_url) {
            //    iAlert.alert('请上传车辆照片!');
            //    return;
            //}


            $scope.car.truck_id = car_id;
            $log.info($scope.car);
            AccountInformation.editCar($scope.car).then(function (result) {
              $log.info(result)
                if (result.status == 'success') {
                    $log.info('修改成功', result);
                  if($scope.role == 'TRAFFIC_ADMIN'){
                    $state.go('tab.MyCarListGroupByType');
                  }else{
                    $state.go('tab.PrivateDriverCarList');
                  }

                    //iAlert.alert('修改成功')

                } else {
                    $log.error('post data', $scope.car);
                    $log.error('修改失败', result);
                    iAlert.alert('修改失败!');
                }
            })
        };

        $scope.del = function () {
          if ($scope.verifyLock == "LOCK"){
            iAlert.alert('请先解锁用户状态!');
            return;
          } else {
            iAlert.popup('提示', '是否确认删除?', function (res) {
              AccountInformation.delCar(car_id).then(function (result) {
                if (result.status == 'success') {
                  $log.info('删除成功');
                  iAlert.alert('删除成功!')
                  $state.go("tab.MyCarListGroupByType");
                } else {
                  $log.error('删除失败!', result);
                  if (result.msg == 'not_allow') {
                    iAlert.alert('无权删除非自有车辆!');
                  } else {
                    iAlert.alert('删除失败!');
                  }
                }
              })
            })
          }

        }

    })

    .controller('AddLineCtrl', function ($scope, $ionicPopup, AccountInformation, $log, $state, iAlert, $filter) {

        $scope.isConfirm = false;

        $scope.address = {
            begin: {},
            end: {}
        };
        $scope.select = function (type) {
            var data = {};
            var obj = {templateUrl: '/template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if (type == 'begin') {
                        console.log(res)
                        $scope.address.begin.value = {};

                        if (res.currentProvince) {
                            $scope.address.begin.value.currentProvinceId = res.currentProvince.ProID;
                        }
                        if (res.currentCity) {
                            $scope.address.begin.value.currentCityId = res.currentCity.CityID;
                        }
                        if (res.currentArea) {
                            $scope.address.begin.value.currentAreaId = res.currentArea.DisID;
                        }
                        $scope.address.begin.text = $filter('addressText')(res);
                    } else {
                        $scope.address.end.value = {};
                        if (res.currentProvince) {
                            $scope.address.end.value.currentProvinceId = res.currentProvince.ProID;
                        }
                        if (res.currentCity) {
                            $scope.address.end.value.currentCityId = res.currentCity.CityID;
                        }
                        if (res.currentArea) {
                            $scope.address.end.value.currentAreaId = res.currentArea.DisID;
                        }
                        $scope.address.end.text = $filter('addressText')(res);
                    }
                }
            })
        }
        $scope.add = function () {
            if (!$scope.address.begin.value || !$scope.address.begin.value.currentCityId || !$scope.address.end.value || !$scope.address.end.value.currentCityId) {
                iAlert.alert('请填写出发地和到达地,具体到市!');
                return;
            }

            if (!$scope.price) {
                iAlert.alert('物流报价不能为空,且大于0');
                return;
            } else {
                if ($scope.price < 0) {
                    iAlert.alert('物流报价必须大于0');
                    return;
                }
            }
            var info = {
                start_province: $scope.address.begin.value.currentProvinceId,
                start_city: $scope.address.begin.value.currentCityId,
                start_district: $scope.address.begin.value.currentAreaId,
                end_province: $scope.address.end.value.currentProvinceId,
                end_city: $scope.address.end.value.currentCityId,
                end_district: $scope.address.end.value.currentAreaId
            };

            AccountInformation.addRoadLine(info).then(function (result) {
                if (result.status == 'success') {
                    $scope.isConfirm = true;
                    $log.info('添加线路', result)

                    AccountInformation.addLinePrice(null, $scope.price, result.data._id).then(function (result) {
                        if (result.status == 'success') {
                            $state.go('tab.Roadline');
                            $log.info('添加线路价格', result);
                        } else {
                            $log.error('添加线路价格失败', result);
                        }
                    })
                } else {
                    $log.error('添加线路', result)
                }
            })
        }
    })

    .controller('MyCarListCtrl', function ($scope, AccountInformation, $log) {

        $scope.init = function () {


        }

        AccountInformation.getAllLine().then(function (result) {
            if (result.status == 'success') {
                $log.info('获取线路信息', result);
                $scope.lines = result.data;

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
    })


    .controller('MyCarListGroupByType', function ($scope, $state, AccountInformation, $log, $linq) {
        $scope.init = function () {
            $scope.count = {};
            AccountInformation.getUseTruckCount().then(function (result) {
                if (result.status == 'success') {
                    $scope.count.use = result.data;
                }
                else {
                    $scope.count.use = 0;
                    $log.error('获取可用车辆总数失败', result)
                }
            })
            AccountInformation.getUsedTruckCount().then(function (result) {
                if (result.status == 'success') {
                    $scope.count.used = result.data;
                }
                else {
                    $scope.count.used = 0;
                    $log.error('获取忙碌中车辆总数失败', result)
                }
            })
            AccountInformation.getNotUsedTruckCount().then(function (result) {
                if (result.status == 'success') {
                    $scope.count.notUsed = result.data;
                }
                else {
                    $scope.count.notUsed = 0;
                    $log.error('获取未认证车辆总数失败', result)
                }
            })
            AccountInformation.getUseTruck().then(function (result) {
                if (result.status == 'success') {
                    $log.info('当前用户可用所有车辆', result);
                    //$scope.lines = result.data;
                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();
                    $scope.carTypeList = queryResult;

                } else {
                    $log.error('当前用户可用所有车辆', result);
                }
            })
        }
        $scope.getUseTruck = function () {
            $scope.a = true;$scope.b = false;$scope.c = false;
            AccountInformation.getUseTruck().then(function (result) {
                if (result.status == 'success') {
                    $log.info('当前可用车辆', result);
                    //$scope.lines = result.data;

                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();
                    $scope.carTypeList = queryResult;

                } else {
                    $log.error('当前可用车辆', result);

                }
            })
        }

        $scope.getUsedTruck = function () {
            $scope.a = false;
            $scope.b = true;
            $scope.c = false;
            AccountInformation.getUsedTruck().then(function (result) {
                if (result.status == 'success') {
                    //$scope.lines = result.data;
                    $log.info('当前忙碌中车辆', result);

                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();
                    $scope.carTypeList = queryResult;

                } else {
                    $log.error('当前忙碌中车辆', result);
                }
            })
        }

        $scope.getNotUsedTruck = function () {
            $scope.a = false;
            $scope.b = false;
            $scope.c = true;
            AccountInformation.getNotUsedTruck().then(function (result) {
                if (result.status == 'success') {
                    $log.info('当前未认证车辆', result);
                    //$scope.lines = result.data;
                    var queryResult = $linq.Enumerable().From(result.data).GroupBy('$.type', '$', function (key, group) {
                        return {type: key, total: group.Count(), values: group}
                    }, function (key) {
                        return key.toString();
                    }).ToArray();
                    $scope.carTypeList = queryResult;

                } else {
                    $log.error('当前未认证车辆', result);

                }
            })
        }


        $scope.goDetail = function (car) {
            if (car) {
              console.log(car)
                $state.go(car.create_user_id == '' ? 'tab.CarDetail' :'tab.carReview', {car_id: car._id,create_user_id:car.create_user_id});
            }
        }

    })

    .controller('FileSelectCtrl', function ($scope, $cordovaCamera, iAlert, $cordovaImagePicker) {
        $scope.selectFile = function () {
            if (ionic.Platform.isWebView()) {
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.FILE_URI,
                    //sourceType: Camera.PictureSourceType.CAMERA,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
                };

                //udpate camera image directive
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    iAlert.alert(imageData);
                    //$scope.cameraimage = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    console.log('Failed because: ');
                    console.log(err);
                });
            }
        }
        $scope.cameraPhoto = function () {
            if (ionic.Platform.isWebView()) {
                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    //sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
                };

                //udpate camera image directive
                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.cameraimage = "data:image/jpeg;base64," + imageData;
                    //$scope.cameraimage = "data:image/jpeg;base64," + imageData;
                }, function (err) {
                    console.log('Failed because: ');
                    console.log(err);
                });
            }
        }

    })

    // 20160123 新邀请用户
    .controller('MynewMessage2Ctrl', function ($scope, InvitationInfo, Storage, $log, AccountInformation, $ionicPopup, $location) {
        $scope.listuser = [{eng: '', chn: 'a_'}]
        $scope.sel_role = {}
        // 增加一个空元素
        $scope.add = function () {
            $log.info('2')
            var length = $scope.listuser.length
            var chn = 'a_' + length
            $log.info($scope.listuser[length - 1].chn + length)
            // $scope.list.push({eng:'',chn:chn})
            $scope.listuser.unshift({eng: '', chn: chn})
        }
        // 删除当前数组中的值
        $scope.del = function (e) {
            $log.info(e)
            $scope.listuser.splice(e, 1)
        }
        // 提交数据
        $scope.submit = function () {
            var arr_phone = []
            for (var i = 0; i < $scope.listuser.length; i++) {
                var reg = /(^13[0-9]{9}$)|(^15[0-9]{9}$)|(^17[0-9]{9}$)|(^18[012356789][0-9]{8}$)/
                if (reg.test($scope.listuser[i].eng) && arr_phone.indexOf($scope.listuser[i].eng) == -1) {
                    arr_phone.push($scope.listuser[i].eng)
                } else {
                    $log.info('重复', $scope.listuser[i])
                }
            }
            if(arr_phone.length==0) {
                showAlert($ionicPopup, $location, {template: '不填手机号不可发送邀请码'})
                return false
            }
            AccountInformation.invitationRegister($scope.sel_role.type, arr_phone).then(function (result) {
                if (result.status == 'success') {
                    $scope.invite = result.data
                    showAlert($ionicPopup, $location, {template: '获取验证码:' + $scope.invite, title: '提示'})
                } else {
                    showAlert($ionicPopup, $location, {template: '发送失败,请稍后再试', title: '提示'})
                }
            })
        }
        // pc端
        $scope.showMessage = function () {
            showAlert($ionicPopup, $location, {template: '复制成功', title: '提示'})
        }
        $scope.start = function () {
          if (Storage.get('userInfo')) {
            $scope.user = Storage.get('userInfo').user
            if ($scope.user.role == 'TRADE_ADMIN') {
                $log.info('TRADE_ADMIN')
                $scope.rolelist = InvitationInfo['TRADE'];
            } else if ($scope.user.role == 'TRAFFIC_ADMIN') {
                console.log('TRAFFIC_ADMIN')
                $scope.rolelist = InvitationInfo['TRAFFIC'];

                $log.info('可选司机', $scope.rolelist)

            } else {
                return false
            }
          } else {
            showAlert($ionicPopup, $location).then(function (res) {
              $location.path('/tab/login')
            });
          }
        }
        $scope.start()
        // 更改设置后清空邀请码
        $scope.change = function () {
            if ($scope.invite) {
                $scope.invite = ''
            }
        }

    })

    .controller('DriverAttentionCtrl', function ($scope, $log, DriverAuthentication, $ionicLoading, iAlert) {
        $scope.navbar = {
            'navLeftHref': 'tab.myRsc'
            , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
            , 'navLeft': '返回'
            , 'navRightHref': '#/tab/partner1'
            , 'navRight': '邀请'
            , 'navRightIco': ''
            , 'navRighthide': ''
        };
        $scope.query = {
            page: 1,
            name: '',
            getType: 1
        };
        var run = false;
        $scope.hasMore = false;

        //每种公司代码的字符串
        var types = ["join", "not_in", "review"];
        //查询列表方法
        var queryAction = function () {
            if (!run) {
                $ionicLoading.show();
                run = true;
                DriverAuthentication.getDriverCompanyList($scope.query, $scope.queryType).then(function (result) {
                  console.log($scope.query,result);
                    if (result.status == 'success') {
                        $scope.hasMore = result.data.exist;
                        if ($scope.query.getType == 3) {
                            if ($scope.companys) {
                                $scope.companys = $scope.companys.concat(result.data.company);
                            } else {
                                $scope.companys = result.data.company;
                            }
                        } else {
                            $scope.companys = result.data.company;

                        }
                        $log.info('获取司机已加入的公司', result)
                    } else {
                        $log.error('获取司机已加入的公司', result)
                    }
                }).finally(function () {
                    run = false;
                    $ionicLoading.hide();
                })
            }
        };
        //查询各种公司的个数
        var getCounts = function () {
            types.forEach(function (item, index, arrarys) {
                DriverAuthentication.getDriverCompanyCounts(item).then(function (result) {
                    if (result.status == 'success') {
                        $scope[item] = result.data;

                    } else {
                        $log.error('获取审核中总数', result)
                    }
                })
            })
        };


        $scope.init = function () {
            $scope.queryType = 'join';
            queryAction();

            getCounts();
        };


        $scope.queryCompany = function (type) {
            $scope.query.getType = 1;
            $scope.query.page = 1;
            $scope.queryType = type;

            queryAction();
            getCounts();
        };

        $scope.joinCompany = function (item) {
            iAlert.confirm('提示', '是否确定申请加入该公司!', function () {
                $log.info('item', item);
                DriverAuthentication.joinCompany(item._id).then(function (result) {
                    if (result.status == 'success') {
                        $log.info('申请加入公司', result);
                        getCounts();
                        iAlert.alert('申请成功!');
                    } else {
                        $log.error('申请加入公司失败', result);
                    }
                })
            })

        };

        $scope.remind = function (item) {
            DriverAuthentication.joinRemind().then(function (result) {
                if (result.status == 'success') {
                    $log.info('提醒成功!');
                    //TODO 提醒功能未完成,等待消息服务接口
                    iAlert.alert('功能待完善!');
                    //iAlert.alert('提醒成功!');
                } else {
                    $log.error('提醒审核', result);
                }
            })
        }
        $scope.loadMore = function () {
            $scope.query.page += 1;
            $scope.query.getType = 3; //加载更多
            queryAction();
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
        $scope.doRefresh = function () {
            //页面在顶部的时候为第一页
            getCounts();
            $scope.query.page = 1;
            $scope.query.getType = 2; //刷新
            queryAction();
            $scope.$broadcast('scroll.refreshComplete');
        };
    })

    // 我的物流公司
    .controller('myLogistics', function ($scope, $state, AccountInformation, $log, $linq, iAlert, DriverAuthentication) {
      $scope.init = function () {
        $scope.navbar = {
          'navLeftHref': 'tab.myRsc'
          , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
          , 'navLeft': '返回'
          , 'title': '我的物流公司'
          , 'navRightHref': ''
          , 'navRight': ''
          , 'navRightIco': $scope.verifyLock == 'UNLOCK' ? 'ion-locked' : 'ion-unlocked'
          , 'navRighthide': ''
          , 'navRightClick': 'userLock()'
        }
        $scope.count = {};
        getUserlock()

        AccountInformation.getUseLogisticsCount().then(function (result) {
          if (result.status == 'success') {
            $scope.count.use = result.data;
          }
          else {
            $scope.count.use = 0;
            $log.error('获取认证物流公司总数失败', result)
          }
        })
        AccountInformation.getUsedLogisticsCount().then(function (result) {
          if (result.status == 'success') {
            $scope.count.used = result.data;
          }
          else {
            $scope.count.used = 0;
            $log.error('获取认证中物流公司总数失败', result)
          }
        })
        AccountInformation.getNotUsedLogisticsCount().then(function (result) {
          if (result.status == 'success') {
            $scope.count.notUsed = result.data;
          }
          else {
            $scope.count.notUsed = 0;
            $log.error('获取未认证物流公司总数失败', result)
          }
        })
        AccountInformation.getUseLogistics().then(function (result) {
          if (result.status == 'success') {
            $log.info('认证物流公司', result);
            var queryResult = result.data.company;
            $scope.LogisticsList = queryResult;

          } else {
            $log.error('当前用户可用所有车辆', result);
          }
        })
      }

      // 获取锁定状态
      var getUserlock = function (){
        AccountInformation.getUseLock().then(function (result) {
          if (result.status == 'success') {
            $scope.verifyLock = result.data.user.verify_lock;
            $scope.jiaShiZheng = result.data.user.jia_shi_zheng_url;
            $scope.idCardNumber = result.data.user.id_card_number;
            $scope.idCardNumberUrl = result.data.user.id_card_number_url;
            $scope.navbar.navRightIco = $scope.verifyLock == 'UNLOCK' ? 'ion-unlocked' : 'ion-locked';
            $log.info('获取锁定状态', result);
          }
        })
      }

      // 锁定状态
      $scope.userLock = function () {
        if($scope.verifyLock == 'UNLOCK'){
          iAlert.confirm('状态：锁定', '锁定状态不能更改已认证图片，解锁后可重新上传。是否锁定？', function () {
            AccountInformation.userLocked().then(function (result) {
              if (result.status == 'success') {
                $log.info('锁定成功', result);
                getUserlock()
              } else {
                $log.error('锁定失败', result);

              }
            })
          })
        } else {
          iAlert.confirm('状态：解锁', '锁定状态不能更改已认证图片，解锁后可重新上传，所有认证关系取消。是否解锁？', function () {
            AccountInformation.userUnlocked().then(function (result) {
              if (result.status == 'success') {
                $log.info('解锁成功', result);
                getUserlock()
                window.history.go(0)
              } else {
                $log.error('解锁失败', result);

              }
            })
          })
        }
      }

      // 获取认证物流公司
      $scope.getUseLogistics = function () {
        $scope.a = true;
        $scope.b = false;
        $scope.c = false;
        AccountInformation.getUseLogistics().then(function (result) {
          if (result.status == 'success') {
            $log.info('认证物流公司', result);
            var queryResult = result.data.company;
            $scope.LogisticsList = queryResult;

          } else {
            $log.error('认证物流公司', result);

          }
        })
      }

      // 获取认证中物流公司

      $scope.getUsedLogistics = function () {
        $scope.a = false;$scope.b = true;$scope.c = false;
        AccountInformation.getUsedLogistics().then(function (result) {
          if (result.status == 'success') {
            $log.info('认证中物流公司', result);
            var queryResult = result.data.company;
            $scope.LogisticsList = queryResult;

          } else {
            $log.error('认证中物流公司', result);

          }
        })
      }

      // 获取未认证物流公司
      $scope.getNotUsedLogistics = function () {
        $scope.a = false;$scope.b = false;$scope.c = true;
        AccountInformation.getNotUsedLogistics().then(function (result) {
          if (result.status == 'success') {
            $log.info('未认证物流公司', result);
            var queryResult = result.data.company;
            $scope.LogisticsList = queryResult;
          } else {
            $log.error('未认证物流公司', result);
          }
        })
      }

      //申请认证
      $scope.appliCation = function (item) {
        AccountInformation.getCurrentUserAllCars().then(function (result) {
          if (result.status == 'success') {
            $log.info(result)
            $scope.hasCars = result.data[0].number;
            $scope.xingShiZheng = result.data[0].xing_shi_zheng_url;

            if($scope.verifyLock == 'UNLOCK') {
              iAlert.alert('请先锁定用户信息!');
            } else if (!$scope.idCardNumber) {
              iAlert.alert('请先上传身份证号码!');
            } else if (!$scope.idCardNumberUrl){
              iAlert.alert('请先上传身份证照片!');
            } else if (!$scope.xingShiZheng) {
              iAlert.alert('请先上传行驶证信息!');
            } else if ($scope.jiaShiZheng == '') {
              iAlert.alert('请先上传驾驶证信息!');
            } else if ($scope.hasCars == '') {
              iAlert.alert('请先为司机添加车辆信息!');
            } else {
              $log.info('获取用户车辆', $scope.xingShiZheng)
              iAlert.confirm('提示', '是否确定申请加入该公司!', function () {
                $log.info('item', item);
                DriverAuthentication.appliCation(item._id).then(function (result) {
                  if (result.status == 'success') {
                    $log.info('申请加入公司', result);
                    $state.reload();
                  } else {
                    $log.error('申请加入公司失败', result);
                  }
                })
              })
            }
          } else {
            $log.error('获取用户车辆失败', result)
          }
        })

      }
    })

    //物流公司认证车辆页面
    .controller('carReview', function ($filter, EnumType, iAlert, $scope, $state, $log, ListConfig, $ionicPopup, $stateParams, AccountInformation ) {
      var car_id = $stateParams.car_id;
      var create_user_id = $stateParams.create_user_id;
      $scope.init = function () {
        //获取车辆详情
        AccountInformation.getCarInfoById(car_id).then(function (result) {
          if (result.status == 'success') {
            $log.info('获取车辆信息', result);
             $scope.car = result.data
            AccountInformation.getDriverInfoById($scope.car.user_id[$scope.car.user_id.length - 1]).then(function (result) {
              if (result.status == 'success') {
                $scope.driverInfo = result.data;
              } else {
                $log.error('driverInfo', result)
              }
            })
          } else {
            $log.error('获取车辆信息失败', result);
          }
        })
        AccountInformation.appliCationCar(create_user_id).then(function (result) {
          if (result.status == 'success') {

            $scope.CarappliCation = result.data;

            $log.info('认证车辆状态', $scope.CarappliCation);
          } else {
            $log.error('认证车辆状态', result);
          }
        })
      };
      $scope.appliCationDrive = function (agree) {
        $scope.create_user_id = create_user_id;
        //$log.info($scope.create_user_id);
        AccountInformation.appliCationDrive($scope.create_user_id,agree).then(function (result) {
          if (result.status == 'success') {
            $log.info('认证成功', result);
            $state.go('tab.MyCarListGroupByType');
            //iAlert.alert('修改成功')
          } else {
            $log.error('认证失败', result);
            //iAlert.alert('认证失败!');
          }
        })
      };
      $scope.notAppliCationDrive = function (agree) {
        $scope.create_user_id = create_user_id;
        AccountInformation.appliCationDrive($scope.create_user_id,agree).then(function (result) {
          if (result.status == 'success') {
            $log.info('拒绝成功', result);
            $state.go('tab.MyCarListGroupByType');
            //iAlert.alert('修改成功')
          } else {
            $log.error('拒绝失败', result);
            //iAlert.alert('认证失败!');
          }
        })
      };
    })

    // 公司认证企业
    .controller('myCompanyCertification', function ($scope, $state, AccountInformation, $log, $ionicLoading, authenticationService) {

    $scope.query = {
      page: 0,
      name: '',
      type: 'TRADE',
      getType: 1
    };

    var run = false;
    $scope.hasMore = true;

    //查询列表方法
    var queryAction = function () {
      if (!run) {
        $ionicLoading.show();
        run = true;
        //console.log($scope.query,'111');
        AccountInformation.getCompany($scope.query, $scope.queryType).then(function (result) {
          if (result.status == 'success') {
            $scope.hasMore = result.data.exist;
            if ($scope.query.getType == 3) {
              if ($scope.companys) {
                $scope.orders = $scope.orders.concat(result.data.demands);
              } else {
                $scope.companys = result.data.company;
              }
            } else {
              $scope.companys = result.data.company;

            }
          } else {
            $log.error('刷新失败', result)
          }
        }).finally(function () {
          run = false;
          $ionicLoading.hide();
        })
      }
    };

    $scope.typeChange = function (){
      $scope.query.type = $scope.navbar.item;
      //$state.reload();
      $scope.getCompanyCertification()

      console.log($scope.navbar.item,'change')
    }
    $scope.init = function () {
      $scope.queryType = 'Company';
      AccountInformation.getCompanyCertification($scope.query).then(function (result) {
        if (result.status == 'success') {
          $log.info('获取已认证企业', result);
          $scope.getCompanyCertification();
          } else {
          $log.error('获取已认证企业失败', result);
        }
      });
      if(authenticationService.getUserInfo()){
        var role = authenticationService.getUserInfo().user.role;
        console.log(role)
        $scope.role = role;
      }
    }
    $scope.getCompanyCertification = function () {
      $scope.a = true;$scope.b = false;$scope.c = false;
      $scope.queryType = 'Company'
      AccountInformation.getCompanyCertification($scope.query).then(function (result) {
        if (result.status == 'success') {
          $log.info('获取已认证企业', result);
          $scope.Certification = result.data.company;

        } else {
          $log.error('获取已认证企业失败', result);

        }
      })
    }

    $scope.getCompaningCertification = function () {
      $scope.a = false;$scope.b = true;$scope.c = false;
      $scope.queryType = 'Companing';
      AccountInformation.getCompaningCertification($scope.query).then(function (result) {
        if (result.status == 'success') {
          $log.info('获取认证中企业', result);
          $scope.Certification = result.data.company;

        } else {
          $log.error('获取认证中企业失败', result);
        }
      })
    }

    $scope.getNotCompanyCertification = function () {
      $scope.a = false;$scope.b = false;$scope.c = true;
      $scope.queryType = 'NotCompany';
      AccountInformation.getNotCompanyCertification($scope.query).then(function (result) {
        if (result.status == 'success') {
          $log.info('获取未认证企业', result);
          $scope.Certification = result.data.company;

        } else {
          $log.error('获取未认证企业失败', result);

        }
      })
    }

    $scope.apply = function (id,$event) {
      $event.stopPropagation()
      AccountInformation.apply(id).then(function (result) {
        if (result.status == 'success') {
          $log.info('申请认证', result);
          $scope.Certification = result.data.company;
          //$state.reload();
          $scope.getNotCompanyCertification();
        } else {
          $log.error('申请认证失败', result);

        }
      })
    }

    $scope.join = function (id,$event) {
      $event.stopPropagation()
      AccountInformation.join(id).then(function (result) {
        if (result.status == 'success') {
          $log.info('申请认证', result);
          $scope.Certification = result.data.company;
          //$state.reload();
          $scope.getCompanyCertification();
        } else {
          $log.error('申请认证失败', result);

        }
      })
    }

    $scope.del = function (id,$event) {
      $event.stopPropagation()
      AccountInformation.del(id).then(function (result) {
        if (result.status == 'success') {
          $log.info('删除认证', result);
          $scope.getCompanyCertification();
        } else {
          $log.error('删除认证失败', result);

        }
      })
    }

    $scope.agree = function (agree,id,$event) {
      $event.stopPropagation()
      AccountInformation.agree(id,agree).then(function (result) {
        if (result.status == 'success') {
          $log.info('同意拒绝', result);
          $scope.getCompanyCertification();
        } else {
          $log.error('同意拒绝失败', result);

        }
      })
    }


    $scope.goDetail = function (item) {
        $state.go('tab.companyProHomeCard',{id:item._id});
      }

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

  })


