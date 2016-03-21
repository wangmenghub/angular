angular.module('rsc.controllers.welcome', ['highcharts-ng'])
    .directive('noDataHint', function () {
        return {
            restrict: 'EA'
            , scope: {
                nodata: '=noData'
            }
            , templateUrl: './template/common/nodata_hint.html'
            , replace: true
            , controller: function ($scope) {
                if (!$scope.nodata) {
                    $scope.nodata = {img: './img/ebank/store-img.png', msg1: '暂无数据'}
                }
            }
        }
    })
    .directive('attProduct', function (trade158) {
        return {
            restrict: 'E'
            ,
            scope: {
                data: '=data'
                // , desc: '=desc'
                ,attrCategory:'='
            }
            ,
            template: "<h6 ng-show='$index<attrShow' ng-if='key!=\"cost_total\"' ng-repeat='(key,i) in data'>{{$index+1}},{{ desc[[i.name]].chn }}以{{i.value}} {{desc[[i.name]].unit}}为基准，每{{desc[[i.name]].vary |paymentChoice }}{{ i.step }} {{desc[[i.name]].unit}} ,每吨降{{ i.cost }}元。<span ng-show='ishow' ng-if='$index==temp-1' ng-click='show()' class='pull-right'>↓...</span><span ng-hide='ishow' ng-if='$last' ng-click='hide()' class='pull-right'>↑...</span></h6>"
            ,
            controller: function ($scope) {
                $scope.attrShow = 4
                $scope.temp = $scope.attrShow;    //存储自定义标签初始值
                $scope.ishow = true;               //是否显示点击按键
                $scope.show = function () {
                    $scope.attrShow = Object.keys($scope.data).length
                    $scope.ishow = !$scope.ishow
                }
                $scope.hide = function () {
                    $scope.attrShow = $scope.temp
                    $scope.ishow = !$scope.ishow
                }
                $scope.$watch('attrCategory',function(){
                    if($scope.attrCategory){
                       trade158.getGoodsDescs($scope.attrCategory).success(function (data) {
                            if (data.status = "success") {
                                $scope.desc = data.data.desc
                            }
                        })
                    }
                })
            }
        }
    })
    .directive('attTraffic', function () {
        return {
            restrict: 'E'
            ,
            scope: {
                data: '=data'
            }
            ,
            // template: "<h6>1,运送到目的地,+-0.5吨为正常损耗,不涉及违约。</h6><h6>2,如超过0.5吨,每减少{{data.weight_step}}吨，扣{{data.weight_cost}}元</h6><h6>3,延期运输到目的地,每延期{{data.time_step}}天，扣除{{data.time_cost}}元</h6>"
            template:"<h6 ng-if='data.weight_actual'>*按照实际到货吨数计算</h6><h6 ng-if='!data.weight_actual'>*按照到厂实际吨数计算,每减少{{data.weight_step}}吨，扣{{data.weight_cost}}元</h6><h6 ng-if='!data.time_valid'>*忽略时效扣款</h6><h6 ng-if='data.time_valid'>*买方与卖方制度，按晚到每天扣{{data.cost_time_trade}}元,不能超过1%;付款方与物流，按每车晚到一天扣{{data.cost_time_traffic}}元</h6>"

        }
    })
    .directive('myAttrProdInfo', function (trade158) {
        return {
            restrict: 'EA'
            ,
            scope: {
                attrProduct: '=attrProduct'
                // , attrDesc: '=attrDesc'
                , attrClass: '@'
                , attrShow: '@'
                ,attrCategory:'='
                ,status:'@'
            }

            // ,template: "<div ng-show='$index<attrShow' class='col-xs-12' ng-class='attrCss' ng-repeat='i in attrProduct'><div class='col-xs-6 text-brown'><h5>{{attrDesc[[i.name]].chn}}</h5></div><div class='col-xs-6 text-brown'><h5>{{i.value}}{{attrDesc[[i.name]].unit}} <span ng-show='ishow' ng-if='$index==temp-1' ng-click='show()' class='pull-right'>↓...</span><span ng-hide='ishow' ng-if='$last' ng-click='hide()' class='pull-right'>↑...</span></h5></div></div>"
            ,templateUrl:'./template/158/attrProdInfo.html'
            ,
            controller: function ($scope) {
                $scope.$watch('attrCategory',function(){
                    if($scope.attrCategory){
                       trade158.getGoodsDescs($scope.attrCategory).success(function (data) {
                            if (data.status = "success") {
                                $scope.attrDesc = data.data.desc
                            }
                        })
                    }
                })
                
                $scope.temp = $scope.attrShow;    //存储自定义标签初始值
                $scope.ishow = true;               //是否显示点击按键
                $scope.$watch('attrShow', function () {
                    if (!$scope.attrShow) {
                        $scope.attrShow = 2;          //如果没有定义attrShow，则默认为2
                    }
                })
                $scope.$watch('attrClass', function () {
                    if ($scope.attrClass == 'order') {
                        $scope.attrCss = 'col-sm-6 col-md-6'
                    } else {
                        $scope.attrCss = ''
                    }
                })
                $scope.show = function () {
                    // $scope.attrShow = Object.keys($scope.attrProduct).length
                    $scope.attrShow = Object.getOwnPropertyNames($scope.attrProduct).length
                    $scope.ishow = !$scope.ishow
                }
                $scope.hide = function () {
                    $scope.attrShow = $scope.temp
                    $scope.ishow = !$scope.ishow
                }
            }
        }
    })
    .directive('myHighCharts', function () {
        return {
            restrict: 'E'
            , scope: {
                xdata: '=xdata'
            }
            , template: '<highchart id="chart1" config="chartConfig" ></highchart>'
            , controller: function ($scope) {
                $scope.$watch('xdata', function () {
                    $scope.chartConfig = {
                        options: {
                            chart: {
                                type: 'line',
                                height: 250,   //设置高度
                                // width:300
                            },
                            credits: {
                                enabled: false   //取消版权信息
                            },
                            title: {
                                text: null          //取消标题
                            },
                            xAxis: {
                                categories: $scope.xdata['x'],
                                // tickLength: 1,
                                labels: {
                                    enabled: true
                                }
                                , max: $scope.xdata['x'].length - 1
                            },
                            legend: {
                                enabled: false       //取消图例
                            },
                            yAxis: {
                                title: {text: null},
                                tickInterval: $scope.xdata['interval'],
                            },
                            tooltip: {
                                valueSuffix: $scope.xdata['suffix']
                            }
                        }
                        , series: $scope.xdata['y']
                    }
                })


            }
        }
    })
    .directive('demandDetail',function(){
        return {
            restrict:'E'
            ,scope:{
                data:'='
            }
            ,templateUrl:'./template/158/demandDetail.html'
            ,controller:function($scope){
                $scope.$watch('data',function(){
                    $scope.demand_detail = $scope.data
                })
            }
        }
    })
    // 交易物信息
    .directive('tradeOrderShop',function(){
        return {
            restrict:'E'
            ,scope:{
                order:'='
                ,userInfo:'='
            }
            ,templateUrl:'./template/158/tradeOrder_shop.html'
        }
    })
    // 交易单货运信息
    .directive('tradeOrderPass',function(){
        return {
            restrict:'E'
            ,scope:{
                passinfo:'='
                ,driveinfo:'='
                ,order:'='
            }
            ,templateUrl:'./template/158/tradeOrder_pass.html'
        }
    })
    // 交易协议
    .directive('tradeOrderPact',function(){
        return {
            restrict:'E'
            ,scope:{
                order:'='
            }
            ,templateUrl:'./template/158/tradeOrder_pact.html'
        }
    })
    // 交易支付
    .directive('tradeOrderPayment',function(){
        return {
            restrict:'E'
            ,scope:{
                order:'='
                ,isCompany:'='
            }
            ,templateUrl:'./template/158/tradeOrder_payment.html'
        }
    })
    // 交易步骤
    .directive('tradeOrderStep',function(){
        return {
            restrict:'E'
            ,scope:{
                order:'='
                ,isCompany:'='
                ,demandStep:'='
                ,supplyStep:'='
            }
            ,templateUrl:'./template/158/tradeOrder_step.html'
        }
    })
    // 支付方式
    .directive('paymentMethod',function(){
        return {
            restrict:'E'
            ,scope:{
                order:'='
            }
            ,templateUrl:'./template/158/payment_method.html'
        }
    })
    .controller('welcomeCtrl', function ($scope, Storage, rolesConfig, trade158, ENV, $http) {
        $scope.navbar = {
            'navLeftHref': 'tab.welcome'
            // ,'navLeftIco':'fa fa-university'
            , 'navLefthide': 'pc-hide'
            , 'navLeft': ''
            , 'title': '日升昌'
            , 'navRightHref': 'tab.login'
            , 'navRight': '登录'
            , 'navRightIco': ''
            , 'navRighthide': 'pc-hide'
        }
        $scope.iswelcome = "active"
        // 获取权限列表,显示目录列表
        // console.log(Storage.get('userInfo'))
        if (Storage.get('userInfo')) {
            var user = Storage.get('userInfo').user

            $scope.roles = rolesConfig.getRoles(user.role).menuObj
            $scope.shortcutRole = rolesConfig.getShortcut(user.role).menuObj
            $scope.navbar = {
                'navLeftHref': 'tab.welcome'
                // ,'navLeftIco':'fa fa-university'
                , 'navLefthide': 'pc-hide'
                , 'navLeft': ''
                , 'title': '日升昌'
                , 'navRightHref': 'tab.myRsc'
                , 'navRight': user.real_name
                , 'navRightIco': ''
                , 'navRighthide': 'pc-hide'
                // ,'navRightClick':'logOut()'
            }
            $scope.logOut = function () {
                Storage.remove('userInfo')
                Storage.remove('CompanyInfo')
                window.history.go(0)
            }
        } else {
            $scope.roles = rolesConfig.getRoles('TRADE_ADMIN').menuObj
            $scope.shortcutRole = rolesConfig.getShortcut('TRADE_ADMIN').menuObj
        }
        // 获取采购信息

        // 获取物流信息

        // 获取列表

        // 获取激活状态
        $scope.xor = 66
        $scope.getXor = function (e) {
            $scope.xor = 64 ^ e
            console.log(e, $scope.xor)
        }
        $scope.getStatistics = function () {
            // 物流 金融 公司
            trade158.getCompanyInfo().success(function (data) {
                // console.log(data.data)
                if (data.status == 'success') {
                    $scope.companyS = data.data
                }
            })
            trade158.getTruckLineInfo().success(function (data) {
                // console.log(data.data)
                if (data.status == 'success') {
                    $scope.tLineS = data.data
                }
            })
            trade158.getPassDemandInfo().success(function (data) {
                // console.log(data.data)
                if (data.status == 'success') {
                    $scope.passS = data.data
                }
            })
            trade158.getCreditInfo().success(function (data) {
                // console.log(data.data)
                if (data.status == 'success') {
                    $scope.creditS = data.data
                }
            })
            // 交易
            trade158.getWeightDemandDaily().success(function (data) {
                console.log('weightDemandDail', data)
                if (data.status == "success") {
                    $scope.weightDemandDaily = data.data
                } else {
                    $scope.weightDemandDaily = 0
                }
            })
            trade158.getWeightDemandTotal().success(function (data) {
                console.log('weightDemandTotal', data)
                if (data.status == "success") {
                    $scope.weightDemandTotal = data.data
                } else {
                    $scope.weightDemandTotal = 0
                }
            })
            trade158.getOfferCount().success(function (data) {
                console.log('offerCount', data)
                if (data.status == "success") {
                    $scope.offerCount = data.data
                } else {
                    $scope.offerCount = 0
                }
            })
            trade158.getOfferCountWeek().success(function (data) {
                console.log('offerCountWeek', data)
                if (data.status == "success") {
                    $scope.offerCountWeek = data.data
                } else {
                    $scope.offerCountWeek = 0
                }
            })
            trade158.getAvgOfferPerDemand().success(function (data) {
                console.log('avgOfferPerDemand', data)
                if (data.status == "success") {
                    $scope.avgOfferPerDemand = data.data
                } else {
                    $scope.avgOfferPerDemand = 0
                }
            })
            trade158.getWeightAndOfferDemandValid().success(function (data) {
                console.log('weightAndOfferDemandValid', data)
                if (data.status == "success") {
                    $scope.weightAndOfferDemandValid = data.data
                } else {
                    $scope.weightAndOfferDemandValid = 0
                }
            })
            trade158.getPriceCallStat('coal_donglimei').success(function (data) {
                console.log('priceCallStat', data)
                if (data.status == "success") {
                    $scope.priceCallStat = data.data
                } else {
                    $scope.priceCallStat = {'high': 0, 'low': 0}
                }
            })
            trade158.getPriceDealStat('coal_donglimei').success(function (data) {
                console.log('priceDealStat', data)
                if (data.status == "success") {
                    $scope.priceDealStat = data.data
                } else {
                    $scope.priceDealStat = {'high': 0, 'low': 0}
                }
            })
        }
        $scope.start = function () {
            $scope.getStatistics()
        }
        $scope.start()
        $scope.text = function () {
            // 获取最新采购需求吨数 console.log(ENV.api.trade + 'stat/weight_demand_daily')
            // 获取采购需求总吨数 ENV.api.trade + 'stat/weight_demand_total'
            // 获取总抢单数  ENV.api.trade + 'stat/offer_count'
            //获取本周新增抢单数 ENV.api.trade + 'stat/offer_count_week'
            // 获取平均每个需求单有多少个抢单 ENV.api.trade + 'stat/avg_offer_per_demand'
            // 获取有效需求吨数和抢单数 ENV.api.trade + 'stat/weight_and_offer_demand_valid'
            // /price_call_stat/:category
            $http({
                method: 'GET'
                , url: ENV.api.trade + 'stat/weight_and_offer_demand_valid'
            }).success(function (data) {
                console.log(data)
            })
        }
    })
    //登录页面控制器
    .controller('loginCtrl', ['$scope', '$http', '$location', 'Storage', 'rolesConfig', 'ENV', '$window', '$ionicPopup',
        function ($scope, $http, $location, Storage, rolesConfig, ENV, $window, $ionicPopup) {
            $scope.navbar = {
                'navLeftHref': 'tab.welcome'
                , 'navLeftIco': 'glyphicon glyphicon-chevron-left'
                , 'navLeft': '返回'
                , 'title': '登录'
                , 'navRightHref': 'tab.reg'
                , 'navRight': '注册'
                , 'navRightIco': ''
                , 'navRighthide': 'pc-hide'
            }

            // 获得焦点
            // document.myform.phoneNum.focus()
            // 登录验证 需优化
            $scope.person = {};
            // 登录验证与获取token
            $scope.login = function () {
                if (!$scope.myform.$invalid) {
                    var _url = ENV.api.account + "user_trade/login";
                    _blod = {
                        phone: $scope.person.phone
                        , password: $scope.person.pwd
                    };
                    $http({
                        method: 'POST'
                        , url: _url
                        , data: _blod
                    })
                        .success(function (data, status, headers, config) {
                            console.log(data)
                            if (data.status == 'err') {
                                $scope.msg = {'login': data.msg == 'password_err' ? '密码错误' : '手机号不存在'}
                                showAlert($ionicPopup, $location, {template: $scope.msg.login})
                            } else {
                                // 成功登录后,存储用户token、角色
                                console.log('用户信息登记成功')
                                Storage.set('userInfo', data.data);   //自定义函数 services.js/"Storage"
                                // 如果用户角色为司机或仓管则进入个人中心否则仅首页
                                if (data.data.user.role.substr(0,14) == 'TRAFFIC_DRIVER' || data.data.user.role == 'TRADE_STORAGE') {
                                    $location.path('/tab/myRsc')
                                } else {
                                    $location.path('/tab/welcome')
                                }
                                $scope.getCompanyInfo(data.data)
                            }
                        })
                } else {
                    $scope.msg = {'login': '请输入正确的手机号和密码'}
                    showAlert($ionicPopup, $location, {template: "请输入正确的手机号和密码", title: '提示'})
                }
            }

            //获取公司信息
            $scope.getCompanyInfo = function (e) {
                $scope.userInfo = e        //
                // 根据角色判断请求公司的信息
                var role = e.user.role.split('_')
                if (role[0] == 'TRADE') {
                    var _url = ENV.api.account + 'company_trade/get'
                } else if (role[0] == 'TRAFFIC') {
                    var _url = ENV.api.account + 'company_traffic/get'
                }
                // 获取公司昵称 company_name
                $http({
                    method: 'POST'
                    , url: _url
                    , headers: {
                        'x-access-token': e.token
                    }
                }).success(function (data) {
                    Storage.set('CompanyInfo', data.data)
                    $scope.getNewtoken();   //获取新token
                    window.history.go(0)
                })
            }
            // 获取新token
            $scope.getNewtoken = function () {
                $scope.companyInfo = Storage.get('CompanyInfo')
            }

        }])

    // 企业注册认证
    .controller('regAdvController', ['$scope', '$http', '$location', '$ionicPopup', 'ENV', 'Storage', '$stateParams', '$state',
        function ($scope, $http, $location, $ionicPopup, ENV, Storage, $stateParams, $state) {

            var urlParams = {};
            urlParams.type = $stateParams.type;
            urlParams.id = $stateParams.id;


            $scope.navbar = {
                'navLeftHref': 'tab.'
                , 'navLeftIco': ''
                , 'navLeft': ''
                , 'title': '认证注册'
                , 'navRightHref': 'tab.'
                , 'navRight': ''
                , 'navRightIco': ''
            }
            // 用户角色
            $scope.userInfo = Storage.get('userInfo')
            console.log($scope.userInfo)
            $scope.url_type = get_company_type($scope.userInfo.user.role)
            $scope.companyInfo = {}
            //获取公司信息
            $scope.getCompanyInfo = function () {
                var _url = ENV.api.account + 'company_' + $scope.url_type + 'get'
                console.log(_url)
                var _data = {company_id: $scope.userInfo.user.company_id}
                $http.post(_url, {headers: {'x-access-token': $scope.userInfo.token}}).success(function (data) {
                    console.log(data)
                    if (data.status == 'success')
                        $scope.companyInfo = data.data
                    Storage.set('CompanyInfo', data.data)
                })

            }
            $scope.getUploadPic = function (e) {
                $scope.file = e
            }
            // 上传图片
            $scope.popup = function () {
                var obj = {templateUrl: './template/common/popup_radio.html', title: '上传营业执照'}
                var data = {type: 'file'}
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if (res) {
                        if ($scope.file) {
                            console.log(res)
                            var _url = ENV.api.account + 'file/upload/logo/null';
                            _upimg($scope.file[0], _url, $http).success(function (data) {
                                console.log('上传图片失败', data)
                                if (data.status == "success") {
                                    $scope.msg = {img: '上传成功'}
                                    $scope.companyInfo.licenseURL = data.data
                                } else {
                                    $scope.msg = {img: '上传失败'}
                                }
                            })
                        } else {
                            $scope.msg = {img: '未选择图片'}
                        }
                    }
                })
            }
            // 公司认证
            // 表单验证
            $scope.submit = function (validation) {
                if (validation) {
                    if (!$scope.companyInfo.licenseURL) {
                        showAlert($ionicPopup, $location, {template: '未上传营业执照'})
                    } else if (!$scope.companyInfo.nick_name) {
                        showAlert($ionicPopup, $location, {template: '未填写昵称'})
                    } else if (!$scope.companyInfo._currency) {
                        showAlert($ionicPopup, $location, {template: '未填写资金'})
                    } else {
                        $scope.modifyCompany()
                    }
                } else {
                    if (urlParams.type && urlParams.id) {
                        switch (urlParams.type) {
                            case 'trade_order':
                                $state.go('tab.rushDetail',{id:urlParams.id});
                                break;
                            case 'traffic_order':
                                $state.go('tab.rushTranspDetail',{demand_id:urlParams.id});
                                break;
                            case 'trade_plan':
                                $state.go('tab.tradeCarListPlan-1',{companyid:urlParams.id});
                                break;
                            default :
                        }
                    } else {
                        $location.path('/tab/regSuccess')
                    }
                }
            }
            $scope.modifyCompany = function () {
                // 上传营业执照
                var _url = ENV.api.account + 'file/upload/ying_ye_zhi_zhao/null'
                var _data = {
                    currency: $scope.companyInfo._currency
                    , nickName: $scope.companyInfo.nick_name
                    , licenseURL: $scope.companyInfo.licenseURL
                }
                var _url = ENV.api.account + 'company_' + $scope.url_type + 'authentication'
                $http.post(_url, _data).success(function (data) {
                    if (data.status == 'success') {
                        showAlert($ionicPopup, $location, {template: '提交成功，等待认证'}).then(function (res) {
                            // $location.path('/tab/welcome')
                            if (urlParams.type && urlParams.id) {
                                switch (urlParams.type) {
                                    case 'trade_order':
                                        $state.go('tab.rushDetail',{id:urlParams.id});
                                        break;
                                    case 'traffic_order':
                                        $state.go('tab.rushTranspDetail',{demand_id:urlParams.id});
                                        break;
                                    case 'trade_plan':
                                        $state.go('tab.tradeCarListPlan-1',{companyid:urlParams.id});
                                        break;
                                    default :
                                }
                            } else {
                                $location.path('/tab/regSuccess')
                            }
                        })
                    }
                })

            }

            $scope.getCompanyInfo()

        }])

    // 用户修改密码
    .controller('findPassCtrl', [
        "$scope", "$state", "ListConfig", "Account", "$ionicPopup", "$log", 'Storage', '$interval', 'ENV', '$http', '$location',
        function ($scope, $state, ListConfig, Account, $ionicPopup, $log, Storage, $interval, ENV, $http, $location) {


            $scope.getCodeText = '获取验证码';
            $scope.user = {
                // type: "TRADE"
            }
            // $scope.companyTypes = ListConfig.getCompanyType();


            $scope.forgetPassword = function () {
                var _url = ENV.api.account + 'user/forget_password'
                var _data = {verify_code: $scope.user.verify_code, phone: $scope.user.phone, password: $scope.user.password}
                console.log(_url, _data)
                $http.post(_url, _data).success(function (data) {
                    if (data.status == 'success') {
                        showAlert($ionicPopup, $location, {template: '密码更改成功', title: '提示'}).then(function(res){
                            $location.path('/tab/login')
                        })
                    } else {
                        showAlert($ionicPopup, $location, {template: '密码更改失败,请稍后再试', title: '提示'})
                    }
                })
            }

            // $scope.typeChange = function (item) {
            //     $scope.user.type = item.value;
            // }


            $scope.$watch('user.phone', function () {
                if (timePromise) {
                    $interval.cancel(timePromise);
                }
                $scope.getCodeText = '获取验证码';
                $scope.timeDown = false;
                $scope.user.verify_code = '';
            })

            $scope.getCode = function () {
                if (!$scope.timeDown && $scope.myform.phone.$error.valueUnique) {
                    $scope.myform.phone.$error.too_frequent = false;

                    Account.getCode($scope.user.phone).then(function (result) {
                        $log.debug(result);
                        if (result.status != "success") {
                            runTiming();
                            if (result.msg == 'too_frequent') {
                                $scope.myform.phone.$error.too_frequent = true;
                            }
                        } else {
                            runTiming();
                            $scope.user.verify_code = result.data.code;
                        }
                    }, function (error) {
                        $log.error(error);
                    });
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

  }])
  //注册中转页
  .controller('regSuccessCtrl',function($scope,rolesConfig,Storage){
    
    var user = Storage.get('userInfo').user
    // console.log(user)
    $scope.shortcutRole = rolesConfig.getShortcut(user.role).menuObj
    // console.log($scope.shortcutRole)
    // window.history.go(0)
  })
  // 获取企业类型
  var get_company_type=function(e){
    var  company_type = e.split('_')

    console.log(company_type)
    if (company_type [0] == 'TRADE') {
        return 'trade/';
    }
    else {
        return 'traffic/';
    }
}
//
