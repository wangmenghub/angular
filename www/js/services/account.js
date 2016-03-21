/**
 * Created by ID on 15/12/8.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.service.account', [])
    .factory('AccountInformation', function (AccountRestAngular, AccountRestAngularNoToken, authenticationService, $log, $q) {

        var getCompanyinfoById = function (id, type) {
            var data = {
                company_id: id
            };
            var info = AccountRestAngular.allUrl('/company_trade/get_one');
            if (type) {
                if (type == 'traffic') {
                    info = AccountRestAngular.allUrl('/company_traffic/get_one');
                } else {
                    info = AccountRestAngular.allUrl('/company_trade/get_one');
                }
            } else {
                info = AccountRestAngular.allUrl('/company_trade/get_one');
            }
            return info.post(data);
        }
        return {
            getCompanyinfoById: getCompanyinfoById,
            getTrafficCompanyById: function (id) {
                var info = AccountRestAngular.allUrl('/company_traffic/get_one');
                return info.post({company_id: id});
            },
            getAllLine: function () {
                var all = AccountRestAngular.allUrl('/company_traffic_line/get');
                return all.post();
            },
            /**
             * 获取公司所有有司机的车辆
             * @param company_id
             * @returns {*}
             */
            getAllCars: function (company_id) {
                var all = AccountRestAngular.allUrl('/company_traffic/get_use_truck');
                return all.post({company_id: company_id});
            },
            /**
             * 新接口，获取公司所有有司机的车辆
             * {number:''}
             * @returns {*}
             */
            getAllCarsAndDriver: function (data) {
                var all = AccountRestAngular.allUrl('/company_traffic/get_use_truck_user');
                return all.post(data);
            },
            getLineCars: function (line_id) {
                var all = AccountRestAngular.allUrl('/company_traffic/get_line_truck');
                return all.post({line_id: line_id});
            },
            getLineInfoById: function (line_id) {
                var all = AccountRestAngular.allUrl('company_traffic_line/get_one');
                return all.post({line_id: line_id});
            },
            /**
             * 获取线路所有车辆类型对应的价格信息
             * @param line_id
             * @returns {*}
             */
            getLinePriceList: function (line_id) {
                var all = AccountRestAngular.allUrl('company_traffic_line_price/get');
                return all.post({line_id: line_id});
            },
            /**
             * 获取线路下的车辆
             * @param line_id
             * @returns {*}
             */
            getLineCarList: function (line_id) {
                var all = AccountRestAngular.allUrl('company_traffic/get_line_truck');
                return all.post({line_id: line_id});
            },
            /**
             * 邀请注册
             * @param role 被邀请的角色信息
             * @returns {*}
             */
            invitationRegister: function (role, phone) {

                var defer = $q.defer();
                var http;
                if (authenticationService.getUserInfo().user.role == 'TRADE_ADMIN') {
                    http = AccountRestAngular.allUrl('/invitation_trade/invite');
                } else if (authenticationService.getUserInfo().user.role == 'TRAFFIC_ADMIN') {
                    http = AccountRestAngular.allUrl('/invitation_traffic/invite');
                } else {
                    defer.reject('not admin');
                    return defer.promise;
                }
                http.post({role: role, phone: phone}).then(function (result) {
                    defer.resolve(result);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            },
            /**
             * 根据id获取邀请信息(不分交易和物流)
             * @param id
             * @returns {*}
             */
            getInviteInfo: function (id) {
                var all = AccountRestAngularNoToken.allUrl('/invitation_trade/get');
                //return all.post({invite_id: id});
                return all.post({index: id});


            },
            registerForInvitation: function (data) {
                var all = AccountRestAngularNoToken.allUrl('/user_trade/signup_by_invitation');
                return all.post(data);
            },
            getDriverInfoById: function (driver_id) {
                //http://192.168.3.147:18080/api/user_traffic/get_one_driver
                var all = AccountRestAngularNoToken.allUrl('/user_traffic/get_one_driver');
                return all.post({driver_id: driver_id});
            },
            /**
             * 获取车辆信息
             * @param truck_id
             * @returns {*}
             */
            getCarInfoById: function (truck_id) {
                //http://192.168.3.147:18080/api/user_traffic_truck/get_one
                var all = AccountRestAngular.allUrl('/user_traffic_truck/get_one');
                return all.post({truck_id: truck_id});

            },
            /**
             * 根据司机ID获取司机信息
             * @param driver_id
             * @returns {*}
             */
            getDriverInfoById: function (driver_id) {
                //http://192.168.3.147:18080/api/user_traffic/get_one_driver
                var all = AccountRestAngular.allUrl('/user_traffic/get_one_driver');
                return all.post({driver_id: driver_id});
            },
            /**
             * 添加线路
             * @param start_province
             * @param start_city
             * @param start_district
             * @param end_province
             * @param end_city
             * @param end_district
             * @returns {*}
             */
            addRoadLine: function (info) {
                var all = AccountRestAngular.allUrl('/company_traffic_line/add');
                return all.post({
                    start_province: info.start_province,
                    start_city: info.start_city,
                    start_district: info.start_district,
                    end_province: info.end_province,
                    end_city: info.end_city,
                    end_district: info.end_district
                });
            },
            addLinePrice: function (type, money, line_id) {
                var all = AccountRestAngular.allUrl('company_traffic_line_price/add');
                return all.post({
                    type: type,
                    money: money,
                    line_id: line_id
                });
            },
            /**
             * 添加车辆
             * @param type
             * @param long
             * @param weigh
             * @param number
             * @returns {*}
             */
            addCar: function (car) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/add');
                return all.post(car);
            },
            editCar: function (car) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/edit');
                return all.post(car);
            },
            getNotLineCars: function () {
                //user_traffic_truck/get_truck_no_line
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_truck_no_line');
                return all.post();
            },
            /**
             * 获取公司所有仓库
             * @returns {*}
             */
            getCompanyTradeStores: function () {
                var all = AccountRestAngular.allUrl('company_trade_store/get');
                return all.post();
            },
            addStore: function (store) {
                var all = AccountRestAngular.allUrl('company_trade_store/add');
                return all.post(store);
            },
            /**
             * 根据store_id获取仓库所有管理员
             * @param store_id
             * @returns {*}
             */
            storeGetManager: function (store_id) {
                var all = AccountRestAngular.allUrl('user_trade/get_by_store_id');
                return all.post({store_id: store_id});
            },
            /**
             * 给仓库添加管理员
             * @param id
             * @param store_id
             * @returns {*}
             */
            storeAddManager: function (user_id, store_id) {
                //user_trade/modify_other
                var all = AccountRestAngular.allUrl('user_trade/modify_other');
                return all.post({id: user_id, store_id: store_id});
            },
            /**
             * 批量指定仓库管理员
             * @param store_id
             * @param user_id
             * @returns {*}
             */
            storeAddManagerBatch: function (store_id, user_ids) {
                //user_trade/add_user_store_id
                var all = AccountRestAngular.allUrl('user_trade/add_user_store_id');
                return all.post({store_id: store_id, user_id: user_ids});

            },
            /**
             * 解除仓库管理员和仓库的关联
             * @param user_id
             * @param store_id
             * @returns {*}
             */
            storeDelManager: function (user_id, store_id) {
                //user_trade/dec_user_store_id
                var all = AccountRestAngular.allUrl('user_trade/dec_user_store_id');
                return all.post({id: user_id, store_id: store_id});
            },
            /**
             * 查询不是指定仓库管理员的用户（仓库管理员角色）
             * @param store_id
             * @returns {*}
             */
            getAllStoreManagerFilter: function (store_id) {
                var all = AccountRestAngular.allUrl('user_trade/get_store_user_except_store_id');
                return all.post({store_id: store_id});

            },
            /**
             * 管理员给线路指派车辆
             * @param line_id 线路ID
             * @param truck_id 数组
             * @returns {*}
             */
            lineRelationCar: function (line_id, truck_id) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/add_line_id');
                return all.post({line_id: line_id, truck_id: truck_id});
            },
            /**
             * 解除车辆线路关系
             * @param line_id
             * @param truck_id 数组
             * @returns {*}
             */
            delCarFromLines: function (line_id, truck_id) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/dec_line_id');
                return all.post({line_id: line_id, truck_id: truck_id});

            },
            /**
             * 删除车辆
             * @param truck_id
             * @returns {*}
             */
            delCar: function (truck_id) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/dec');
                return all.post({truck_id: truck_id});

            },
            /**
             * 获取待审核司机车辆信息
             * @returns {*}
             */
            getNotUserTruck: function () {
                var all = AccountRestAngular.allUrl('user_traffic/get_driver_apply');
                return all.post();
            },
            /**
             * 同意/拒绝审核司机车辆
             * @returns {*}
             */
            applyDrive: function (userid,agree) {
              var all = AccountRestAngular.allUrl('driver_apply/deal');
              return all.post({apply_id:userid,agree:agree});
            },
            /**
             * 获取所有可用空闲（false）/可用忙碌(true)司机车辆列表
             * @returns {*}
             * @update:
             * 2015-02-25
             */
            getAllUserTruck: function (data) {
                //var all = AccountRestAngular.allUrl('company_traffic/get_user_truck');[弃用]
                var all = AccountRestAngular.allUrl('user_traffic/get_driver_free_busy');
                return all.post(data);

            },
            /**
             * 获取空闲/忙碌/待认证司机数量
             * @returns {*}
             */
            getCount: function () {
              var all = AccountRestAngular.allUrl('user_traffic/get_driver_count');
              return all.post();
            },
            /**
             * 获取没有车辆的司机列表
             * @returns {*}
             */
            getUserNoTruck: function () {
                var all = AccountRestAngular.allUrl('user_traffic/get_user_no_truck');
                return all.post();
            },
            /**
             * 批量关联司机和车辆关系
             * @param truck_id 数组
             * @param user_id
             * @returns {*}
             */
            carRelationDriver: function (user_id, truck_id) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/add_user');
                return all.post({truck_id: truck_id, user_id: user_id});
            },
            /**
             * 获取当前用户所有车
             * @returns {*}
             */
            getCurrentUserAllCars: function () {
                //
                var all = AccountRestAngular.allUrl('user_traffic_truck/get');
                return all.post();

            },
            /**
             * 根据司机ID获取司机的线路和车
             * @param user_id
             * @returns {*}
             */
            getLinCarByUserId: function (user_id) {
                //user_traffic_truck/get_line_truck_by_user_id
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_line_truck_by_user_id');
                return all.post({user_id: user_id});
            },
            /**
             * 根据司机ID获取司机的车（去掉线路之后的）
             * @param user_id
             * @returns {*}
             */
            getCarByUserId: function (user_id) {
                //user_traffic_truck/get_line_truck_by_user_id
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_truck_by_user_id');
                return all.post({user_id: user_id});
            },
            fileUpload: function (type, truck_id, file) {
                var defer = $q.defer();
                var formData = new FormData();
                formData.append('file', file);
                var url = ENV.api.pass + 'file/upload/' + type + "/" + truck_id;
                $http({
                    method: 'POST'
                    , url: url
                    , data: formData
                    , headers: {
                        "Content-Type": undefined
                    }
                    , transformRequest: angular.identity
                }).success(function (data) {
                    if (data.status == "success") {
                        defer.resolve(data);
                    } else {
                        defer.reject(data);
                    }
                }).error(function (error) {
                    console.log(error)
                });
                return defer.promise;
            },
            /**
             * 获取所有可用车辆列表
             * @returns {*}
             */
            getUseTruck: function () {
                ///api/user_traffic_truck/get_use_truck 获取可用的
                ///api/user_traffic_truck/get_used_truck 获取忙碌中的
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_use_truck');
                return all.post();
            },
            /**
             * 获取所有忙碌中车辆列表
             * @returns {*}
             */
            getUsedTruck: function () {
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_used_truck');
                return all.post();
            },

            /**
             * 获取所有未认证车辆列表
             * @returns {*}
             */
            getNotUsedTruck: function () {
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_not_verify_truck');
                return all.post();
            },

            /**
             * 获取所有可用车辆个数
             * @returns {*}
             */
            getUseTruckCount: function () {
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_use_truck_count');
                return all.post();
            },
            /**
             * 获取所有忙碌中车辆个数
             * @returns {*}
             */
            getUsedTruckCount: function () {
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_used_truck_count');
                return all.post();
            },

            /**
             * 获取所有未认证车辆个数
             * @returns {*}
             */
            getNotUsedTruckCount: function () {
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_not_verify_truck_count');
                return all.post();
            },
            /**
             * 根据司机ID获取不是当前司机的车辆信息。
             * @param user_id
             * @returns {*}
             */
            getNotInUserTrucks: function (data) {
                //var all = AccountRestAngular.allUrl('user_traffic_truck/get_not_in_user');
                var all = AccountRestAngular.allUrl('user_traffic_truck/get_default_not_by_user_id');
                return all.post(data);
            },
            passDemandFind: function (data) {
                var all = AccountRestAngular.allUrl('demand/find');
                return all.post(data);
            },

          /**
           * 获取锁定状态
           * @returns {*}
           */
          getUseLock:function (){
            var all = AccountRestAngular.one('user_traffic/me');
            return all.get();
          },

          /**
           * 解锁
           * @returns {*}
           */
          userUnlocked:function (){
            var all = AccountRestAngular.allUrl('driver_verify/off');
            return all.post();
          },

          /**
           * 锁定
           * @returns {*}
           */
          userLocked:function (){
            var all = AccountRestAngular.allUrl('driver_verify/on');
            return all.post();
          },
          /**
           * 获取已认证物流公司列表
           * @returns {*}
           */
          getUseLogistics: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_verify');
            return all.post();
          },

          /**
           * 获取认证中物流公司列表
           * @returns {*}
           */
          getUsedLogistics: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_apply');
            return all.post();
          },

          /**
           * 获取未认证物流公司列表
           * @returns {*}
           */
          getNotUsedLogistics: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_not_verify');
            return all.post();
          },

          /**
           * 获取已认证物流公司数量
           * @returns {*}
           */
          getUseLogisticsCount: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_verify_count');
            return all.post();
          },

          /**
           * 获取认证中物流公司数量
           * @returns {*}
           */
          getUsedLogisticsCount: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_apply_count');
            return all.post();
          },

          /**
           * 获取未认证物流公司数量
           * @returns {*}
           */
          getNotUsedLogisticsCount: function () {
            var all = AccountRestAngular.allUrl('driver_verify/driver_get_company_not_verify_count');
            return all.post();
          },

            /**
             * 短信分享
             * @param data
             * sms_info_list:[
             *      {"phone_target":15300178737,"name_target":"陈源","comp_target":"日升昌"}
             *    ]
             * template_id:111111
             * content[1,2]
             * @returns {*}
             */
            shardForSMS: function (data) {
                var all = AccountRestAngular.allUrl('invitation_trade/invite_by_message');
                return all.post(data);
            },
            /**
             * 删除司机和车辆的关系
             * @param truck_ids
             * @param user_id
             * @returns {*}
             */
            delCanAndUserRelation: function (truck_ids, user_id) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/dec_user');
                return all.post({truck_id: truck_ids, user_id: user_id});
            },
            /**
             * 物流公司或者私人司机添加车辆时验证号码是否存在
             * @param carNumber
             * @returns {true:表示输入的车牌号已存在,false表示不存在*}
             */
            checkCarNumberExist: function (carNumber) {
                var all = AccountRestAngular.allUrl('user_traffic_truck/check_number');
                return all.post({number: carNumber});
            },
          /**
           * 物流公司同意司机认证
           * @param compamy_id
           * @returns {*}
           */
          appliCationDrive:function (create_user_id,agree){
            var info = AccountRestAngular.allUrl("driver_verify/deal");
            return info.post({user_id:create_user_id,agree:agree});
          },
          /**
           * 物流公司获取车辆是否认证
           * @param user_id
           * @returns {*}
           */
          appliCationCar:function (user_id){
            var info = AccountRestAngular.allUrl("driver_verify/get_truck_verify");
            return info.post({user_id:user_id});
          },
          /**
           * 公司获取已认证企业
           *
           *
           */
          getCompanyCertification: function (query) {
            var info = AccountRestAngular.allUrl("company_relation/get_company_verify");
            return info.post(query);
          },
          /**
           * 公司获取认证中企业
           *
           *
           */
          getCompaningCertification: function (query) {
            var info = AccountRestAngular.allUrl("company_relation/get_company_apply");
            return info.post(query);
          },
          /**
           * 公司获取未认证企业
           *
           *
           */
          getNotCompanyCertification: function (query) {
            var info = AccountRestAngular.allUrl("company_relation/get_company_not_verify");
            return info.post(query);
          },
          /**
           * 公司申请认证
           *
           *
           */
          apply: function (id) {
            var info = AccountRestAngular.allUrl("company_relation/apply_verify");
            return info.post({company_id:id});
          },
          /**
           * 公司增加认证
           *
           *
           */
          join: function (id) {
            var info = AccountRestAngular.allUrl("company_relation/add");
            return info.post({company_id:id});
          },
          /**
           * 删除认证关系
           *
           *
           */
          del: function (id) {
            var info = AccountRestAngular.allUrl("company_relation/dec");
            return info.post({company_id:id});
          },
          /**
           * 同意、拒绝认证关系
           *
           *
           */
          agree: function (id,agree) {
            var info = AccountRestAngular.allUrl("company_relation/approve");
            return info.post({company_id:id,agree:agree});
          },
          /**
           * 获取认证公司的列表信息
           * @param query{page,name}
           * @param type:
           *              Company 已认证的公司
           *              Companing 认证中的公司
           *              NotCompany 未认证的公司
           * @returns {*}
           */
          getCompany: function (query, type) {
            var url;
            switch (type) {
              case 'Company':
                url = "company_relation/get_company_verify";
                break;
              case 'Companing':
                url = "company_relation/get_company_apply";
                break;
              case 'NotCompany':
                url = "company_relation/get_company_not_verify";
                break;
              default:
                url = "company_relation/get_company_verify";
            }
            var info = AccountRestAngular.allUrl(url);
            return info.post(query);
          },

        }
    })
    .factory('Account', ['$q', 'Restangular', '$window', 'Storage', function ($q, Restangular, $window, Storage) {
        //var Account = new Restangular.allUrl('one', 'http://192.168.3.104:18080/api/user_trade/');
        return {
            register: function (data) {
                var Account = Restangular.allUrl('/user_trade/signup');
                if (data.type == "TRAFFIC") {
                    Account = Restangular.allUrl('/user_traffic/signup');
                }
                var d = $q.defer();
                Account.post(data).then(function (result) {
                    console.log("result", result);
                    if (result.status == "success") {
                        d.resolve(result);
                    } else {
                        d.reject(result);
                    }
                }, function (error) {
                    d.reject(error);
                })
                return d.promise;
            },
            checkPhoneExist: function (phone) {
                var promis = $q.defer();
                var Phone = Restangular.one('/phone/exist/', phone);
                Phone.get().then(function (result) {
                    promis.resolve(result);
                }, function (error) {
                    promis.reject(error);
                });
                return promis.promise;
            },
            getCode: function (phone) {
                var Phone = Restangular.one('/phone/get_verify_code/', phone);
                var promis = $q.defer();
                Phone.get().then(function (result) {
                    promis.resolve(result);
                }, function (error) {
                    promis.reject(error);
                })
                return promis.promise;
            }
        }
    }])
    .factory('authenticationService', ['Storage', '$log', '$location', function (Storage, $log, $location) {
        var userInfo;
        var companyInfo;

        function getUserInfo() {
            if (Storage.get('userInfo')) {
                userInfo = Storage.get('userInfo');
                return userInfo;
            } else {
                //$log.warn("no login");
                // $location.path('/tab/login')
                // window.location.href = 'http://'+$location.$$host+':'+ $location.$$port + '#/tab/login'
                return null;
            }
        }

        function getCompanyInfo() {
            if (Storage.get('CompanyInfo')) {
                companyInfo = Storage.get('CompanyInfo');
                return companyInfo;
            }
            else {
                return null;
            }
        }

        return {
            getUserInfo: getUserInfo,
            getCompanyInfo: getCompanyInfo
        };

    }])
    .factory('DriverAuthentication', ['$log', 'AccountRestAngular', function ($log, AccountRestAngular) {
        return {
            ///api/driver_apply/driver_get_company_in
            //挂靠司机获取已加入公司
            /**
             * 挂靠司机获取公司的列表信息
             * @param query{page,name}
             * @param type:
             *              join 已经加入的公司
             *              not_in 未加入的公司
             *              review 审核中的公司
             * @returns {*}
             */
            getDriverCompanyList: function (query, type) {
                var url;
                switch (type) {
                    case 'join':
                        url = "driver_apply/driver_get_company_in";
                        break;
                    case 'not_in':
                        url = "driver_apply/driver_get_company_not_in";
                        break;
                    case 'review':
                        url = "driver_apply/driver_get_company_apply";
                        break;
                    default:
                        url = "driver_apply/driver_get_company_in";
                }
                var info = AccountRestAngular.allUrl(url);
                return info.post(query);
            },

            /**
             *挂靠司机获取司机各种公司类型的数量
             * @param type:
             *              join 已经加入的公司
             *              not_in 未加入的公司
             *              review 审核中的公司
             */
            getDriverCompanyCounts: function (type) {
                var url;
                switch (type) {
                    case 'join':
                        url = "driver_apply/driver_get_company_in_count";
                        break;
                    case 'not_in':
                        url = "driver_apply/driver_get_company_not_in_count";
                        break;
                    case 'review':
                        url = "driver_apply/driver_get_company_apply_count";
                        break;
                    default:
                        url = "driver_apply/driver_get_company_in_count";
                }
                var info = AccountRestAngular.allUrl(url);
                return info.post();
            },
            /**
             * 挂靠司机申请加入公司
             * @param compamy_id
             * @returns {*}
             */
            joinCompany: function (company_id) {
                var info = AccountRestAngular.allUrl("driver_apply/apply");
                return info.post({company_id:company_id});
            },
            joinRemind: function () {

            },

            /**
             * 司机申请物流公司认证
             * @param compamy_id
             * @returns {*}
             */
            appliCation:function (company_id){
              var info = AccountRestAngular.allUrl("driver_verify/apply");
              return info.post({company_id:company_id});
            },


        }
    }])

