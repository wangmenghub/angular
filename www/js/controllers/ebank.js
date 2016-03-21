// 订单页面
angular.module('rsc.controllers.ebank', [])

    .config(['$httpProvider', function ($httpProvider) {
        // 初始所有请求都携带 headers ['x-access-token']头信息
        //if (window.sessionStorage.getItem('userInfo')) {
        //
        //    $httpProvider.defaults.headers.common['x-access-token'] = JSON.parse(window.sessionStorage.getItem('userInfo')).token
        //
        //}
    }])

    // 整合不同的http请求协议
    .factory('tradePass',function(ENV,$http,Storage){
        // 物流服务，交易服务，用户信息
        return {
            // 物流服务
            orderGetone:function(_data){
                var _url = ENV.api.pass + 'order/get_one/'
                return $http.post(_url,_data,{headers: {
                     'x-access-token': Storage.get('userInfo').token
                    } })
            }
            ,routeGet:function(_data){
                var _url = ENV.api.pass + 'route/get/'
                return $http.post(_url,_data,{headers: {
                     'x-access-token': Storage.get('userInfo').token
                    } })
            }
            ,passDemandAdd:function(_data){
                var _url = ENV.api.pass + 'demand/add'
                return $http.post(_url,_data)
            }
            // 获取订单信息
            ,getDemandOrderDetail:function(method,id){
                var _url = ENV.api.trade + 'demand/order_detail/' + method + '/' + id;
                return $http.get(_url)
            }
            // 用户信息
            ,getUserInfo:function(type,data){
                if(type="user_trade"){
                    var _url = ENV.api.account + type + '/get_by_id'
                }else{
                    var data = {driver_id:data.user_id}
                    var _url = ENV.api.account + type + '/get_one_driver'
                }

                // console.log(_url)
                return $http.post(_url,data)
            }
            ,trafficTruckGetone:function(_data){
                var _url = ENV.api.account + 'user_traffic_truck/get_one'
                return $http.post(_url,_data)
            }
            // 获取订单
            ,getOrderList:function(_side,_entity,_page){
                var _url = ENV.api.trade + 'demand/order_list/' + _side + '/all/' + _entity + '/'+_page
                return $http({
                    method: 'GET', url: _url
                })
            }
            // 确认订单。操作后，订单步骤由第一步变为第二步。
            ,getDemandOrder1Confirm:function(_id){
                var _url = ENV.api.trade + 'demand/order_1_confirm/id/'+ _id
                console.log(_url)
                return $http.get(_url)
            }
            // 在第二步时供应方确认预付款。操作后，步骤变为第三步，状态变为已生效（effective）
            ,getDemandOrder2Confirm:function(_id){
                var _url=ENV.api.trade + 'demand/order_2_confirm/id/' + _id
                return $http.get(_url)
            }
            //
            ,getDemandOrder2Payment:function(_method,_id){
                var _url=ENV.api.trade + 'demand/order_2_payment/' + _method + '/' + _id
                return $http.get(_url)
            }
            //
            ,getDemandOrderApplyCredit:function(_id){
                // _type,
                // var _url=ENV.api.trade + 'demand/order_apply_credit/id/'+_type+'/' + _id
                var _url=ENV.api.trade + 'demand/order_apply_credit/id/'+_id
                return $http.get(_url)
            }
            //
            ,getDemandOrder23TrafficOrders:function(_id,_data){
                var _url = ENV.api.trade + 'demand/order_2_3_traffic_orders/id/' + _id
                return $http.post(_url,_data)
            }
            //
            ,getDemandOrder4Confirm:function(_id){
                var _url=ENV.api.trade + 'demand/order_4_confirm/id/' + _id
                return $http.get(_url)
            }
            //
            ,getDemandOrder4Validation:function(_id,_data,_confirm){
                var _url=ENV.api.trade + 'demand/order_4_validation/'+_confirm+'/id/' +_id
                return $http.post(_url,_data)
            }
            //
            ,getDemandOrder5ReqForgiven:function(_id,_data){
                var _url = ENV.api.trade + 'demand/order_5_req_forgiven/id/' + _id;
                return $http.get(_url)
            }
            //
            ,getDemandOrder5NoForgiven:function(_id){
                var _url = ENV.api.trade + 'demand/order_5_no_forgiven/id/' + _id;
                return $http.get(_url)
            }
            //
            ,getDemandOrder5Confirm:function(_id){
                var _url = ENV.api.trade + 'demand/order_5_confirm/id/' + _id;
                return $http.get(_url)
            }
            //
            ,getDemandOrder5ConfirmForgiven:function(_id,_type){
                var _url = ENV.api.trade + 'demand/order_5_confirm_forgiven/id/'+_type+'/' + _id;
                return $http.get(_url)
            }
            //
            ,getDemandOrder5Payment:function(_id){
                var _url = ENV.api.trade + 'demand/order_5_payment/id/' + _id
                return $http.get(_url)
            }
            // 20160229 订单接口变更
            ,order1ConfirmDemand:function(_id){
                // 采购方确认订单。操作后，订单步骤由第一步变为第1.5步
                var _url = ENV.api.trade + 'demand/order_1_confirm_demand/id/'+ _id
                return $http.get(_url)
            }
            ,orderCancel:function(_id){
                // 采购方确认订单。操作后，订单步骤由第一步变为第1.5步
                var _url = ENV.api.trade + 'demand/order_cancel/id/'+ _id
                return $http.get(_url)
            }
            ,order1ConfirmSupply:function(_id){
                var _url = ENV.api.trade + 'demand/order_1_confirm_supply/id/'+ _id
                return $http.get(_url)
            }
            ,order2Confirm:function(_id){
                var _url = ENV.api.trade + 'demand/order_2_confirm/id/'+ _id
                return $http.get(_url)
            }
            ,order3TrafficChoice:function(_id,_choice){
                var _url = ENV.api.trade + 'demand/order_3_traffic_choice/id/'+_choice+'/'+ _id
                return $http.get(_url)
            }
            ,order3TrafficAllDepart:function(_id,_data){
                var _url = ENV.api.trade + 'demand/order_3_traffic_all_depart/id/'+ _id
                return $http.post(_url,_data)
            }
            ,order3TrafficAllArrival:function(_id,_data){
                var _url = ENV.api.trade + 'demand/order_3_traffic_all_arrival/id/'+_id
                return $http.post(_url,_data)
            }
            ,'order4Payment':function(_id){
                var _url=ENV.api.trade + 'demand/order_4_payment/id/'+_id
                return $http.get(_url)
            }
            ,'order4PaymentReceived':function(_id){
                var _url=ENV.api.trade + 'demand/order_4_payment_received/id/'+_id
                return $http.get(_url)
            }
            ,passDemandAddBoth:function(_data){
                var _url = ENV.api.pass + 'demand/add_both'
                return $http.post(_url,_data)
            }
            ,order4AllOk:function(_id){
                var _url=ENV.api.trade + 'demand/order_4_all_ok/id/'+_id
                return $http.get(_url)
            }
        }
    })
// --------------------- 采购方 ---------------//

    //
    .controller('ordertradeCtrl', function ($scope, $http, ENV, Storage,StoreManage,$filter,tradePass,trade158,$ionicLoading) {
        // 判断角色 展示订单列表
        var user = Storage.get('userInfo').user
        var role = user.role.split('_')
        $scope.isCompany = user.company_id // 获取当前用户公司id 判断买卖方
        $scope.page = 1
        // $scope.role =role[1]

        // 管理员和非管理员获取的订单信息
        var noAdminOrder = function(_side,_entity,_page){
            $ionicLoading.show()
            tradePass.getOrderList(_side,_entity,_page).success(function (data) {
                if (data.status == 'success') {
                    console.log(data.data)
                    $scope.lists = data.data
                    for (var i = 0; i < $scope.lists.length; i++) {
                        getcategory($scope.lists[i].category, i)
                        $scope.lists[i].side = _side
                    }
                }
                $ionicLoading.hide()
            })
        }
        var adminOrder = function(_entity,_page){
            $ionicLoading.show()
            tradePass.getOrderList('supply',_entity,_page).success(function (data) {
                if (data.status == 'success') {
                    var _supplys = data.data
                    tradePass.getOrderList('demand',_entity,_page).success(function (data) {
                        if(data.status=='success'){
                            var _demands=data.data
                            for(var i=0;i<_demands.length;i++){
                                _demands[i].side='demand'
                                _supplys.push(_demands[i])
                            }
                            $scope.lists = _supplys
                            for (var i = 0; i < $scope.lists.length; i++) {
                                getcategory($scope.lists[i].category, i)
                            }
                        }
                    })
                    $ionicLoading.hide()
                }
            })
        }
        // 依据角色判断调用的函数
        if (role[1] == 'SALE') {
            $scope.side = 'supply'
            $scope.entity = 'self'
            noAdminOrder($scope.side,$scope.entity,$scope.page)
        } else if (role[1] == 'PURCHASE') {
            $scope.side = 'demand'
            $scope.entity = 'self'
            noAdminOrder($scope.side,$scope.entity,$scope.page)
        } else if (role[1] == 'ADMIN') {
            $scope.side = 'demand'
            $scope.entity = 'company'
            adminOrder($scope.entity,$scope.page)
        }

        var getcategory = function (category, i) {
            trade158.getGoodsDescs(category).success(function (data) {
                if (data.status = "success") {
                    $scope.lists[i].desc = data.data.desc
                }
            })
        }
    })
    // 采购订单第一,二步 	tradeOrder 交易订单 路由表
    .controller('tradeOrderCtrl',
    function ($scope, $stateParams, $http, $location, ENV, Storage, $filter, StoreManage,$ionicPopup,tradePass,trade158,$ionicLoading) {

        $scope.id = $stateParams.id;		//订单id
        $scope.demand={}
        $scope.start=function(){
            $ionicLoading.show()
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                console.log(data)
                if (data.status == "success") {
                    $scope.order = data.data
                    getuseInfo($scope.order.user_supply_id)
                    console.log($scope.order)
                    if($scope.order.traffic_orders.length > 0){
                        $scope.getPassinfo()
                    }
                    $scope.order.att_product.cost_total = attr_cost_total($scope.order.att_product)
                }
                $ionicLoading.hide()
            })
        }
        if(Storage.get('userInfo') && Storage.get('userInfo').user){
            var user = Storage.get('userInfo').user
            var role = user.role.split('_')
            $scope.isCompany = user.company_id // 获取当前用户公司id 判断买卖方
            $scope.start()
        }else{
            $location.path('/tab/login')
        }



        // 获取用户信息
        var getuseInfo = function (userid) {
            // 返回用户信息
            $scope.order.user_supply_name = userid
            var _data = {user_id: userid}
            tradePass.getUserInfo('user_trade',_data).success(function (data) {
                if (data.status = "success") {
                    $scope.userInfo = data.data
                }
            })
        }
        // --------物流信息获取
        // 获取单个物流信息
        $scope.getPassinfo = function(_passinfo){
            var _data = {order_index: $scope.order.traffic_orders[0].index}
            // var _data = {order_index: _passinfo.index}
            tradePass.orderGetone(_data).success(function(data){
                console.log('物流订单',data.data)
                if(data.status=='success'){
                    $scope.passinfo = data.data
                    // 运输完毕为真，运输未完毕为假
                    if($scope.passinfo.route_info.length >0){
                        getcompany2($scope.passinfo.company_traffic_id,$scope.passinfo,$http,ENV)
                        for(var i=0;i<$scope.passinfo.route_info.length;i++){
                            $scope.getCarInfo($scope.passinfo.route_info[i].truck_id,$scope.passinfo.route_info[i])
                            $scope.getUserInfo($scope.passinfo.route_info[i].user_id,$scope.passinfo.route_info[i])
                        }
                        $scope.passinfo.counts = _mergeCars($scope.passinfo.route_info)
                    }else{
                        getcompany2($scope.passinfo.company_traffic_id,$scope.passinfo,$http,ENV)
                        $scope.getCars()
                    }
                }
            })

        }
        // 获取派车数据 车辆总数
        $scope.getCars = function(){
            var _data ={order_id:$scope.passinfo._id}
            tradePass.routeGet(_data).success(function(data){
                        console.log(data)
                        $scope._driveinfo = data.data
                        for(var i=0;i<$scope._driveinfo.length;i++){
                            $scope.getCarInfo($scope._driveinfo[i].truck_id,$scope._driveinfo[i])
                            $scope.getUserInfo($scope._driveinfo[i].user_id,$scope._driveinfo[i])
                        }
                        console.log('合成处理',_mergeCars($scope._driveinfo))
                        $scope.driveinfo = _mergeCars($scope._driveinfo)
                    })
        }
        // 获取车辆类型和数量
        $scope.getCarInfo = function(id,obj){
            var _data ={truck_id: id}
            tradePass.trafficTruckGetone(_data).success(function(data){
                        obj.truck_info = data.data
                    })
        }
        // 获取车辆司机信息
        $scope.getUserInfo=function(id,obj){
            var _data = {user_id: id}
            tradePass.getUserInfo('user_trade',_data).success(function(data){
                obj.user_info = data.data
            })
        }
        $scope.changeDate = function () {
            console.log('--')
                var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
                var objmsg = {type: 'changeDate',maxDate:moment().format() }
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        console.log(res)
                        $scope.demand.time_traffic = res.dt
                    }
                })
            }
        // -----按钮组
        // 采购方
        $scope.demandStep = {
            'order1ConfirmDemand':function () {
                // 确认订单。操作后，订单步骤由第一步变为第二步。
                console.log('ok')
                tradePass.order1ConfirmDemand($scope.id).success(function (data) {
                    console.log('订单第一步', data)
                    window.history.go(0)
                })
            }
            ,'orderCancel':function(){
                console.log('no')
                tradePass.orderCancel($scope.id).success(function(data){
                    console.log(data)
                    window.history.go(0)
                })
            }
            ,'percentAdvance':function(){
                console.log('跳转支付页面')
                $location.path("/tab/tradeOrder1-2/"+$scope.id)

            }
            ,'order3TrafficAllArrival':function(){
                if($scope.demand.time_traffic && $scope.demand.amount){
                    var _data ={
                        amount:parseFloat($scope.demand.amount)
                        ,date:formatdata($scope.demand.time_traffic)
                    }
                    tradePass.order3TrafficAllArrival($scope.id,_data).success(function(data){
                        if(data.status=='success'){
                            window.history.go(0)
                        }
                        console.log(data)
                    })
                }else{
                    showAlert($ionicPopup,$location,{template:'请填写最终到货时间和重量',title:'提示'})
                }
            }
            ,'order4Validation':function(){
                $location.path('/tab/tradeOrder3-1/' + $scope.id)
            }
            ,'order4AllOk':function(){
                tradePass.order4AllOk($scope.id).success(function(){
                    window.history.go(0)
                })
            }
            ,'order4Payment':function(){

                // tradePass.order4Payment($scope.id).success(function(data){
                //     if(data.status=='success'){
                //         window.history.go(0)
                //     }
                // })
                $location.path('/tab/tradeOrder4-2/' + $scope.id)
            }
            ,'order5ConfirmForgiven':function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '是否接受谅解协议'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'yes', chn: '接受'}, {eng: 'no', chn: '不接受'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if(res && res.subtype){
                        console.log(res.subtype.eng)
                        tradePass.getDemandOrder5ConfirmForgiven($scope.id,res.subtype.eng).success(function(data){
                            console.log(data)
                            if(data.status=='success'){
                                window.history.go(0)
                            }else{
                                showAlert($ionicPopup,$location,{template:'请截取错误提示'+ data.status,title:'提示'})
                            }
                        })
                    }
                })
            }
            ,'order5Payment':function(){
                $location.path('/tab/tradeOrder4-1/' + $scope.id)
            }
        }
        // 销售方
        $scope.supplyStep = {
            'order1ConfirmSupply':function () {
                // 确认订单。操作后，订单步骤由第一步变为第二步。
                console.log('ok')
                tradePass.order1ConfirmSupply($scope.id).success(function (data) {
                    console.log('订单第一步', data)
                    window.history.go(0)
                })
            }
            ,'orderCancel':function(){
                console.log('no')
                tradePass.orderCancel($scope.id).success(function(data){
                    window.history.go(0)
                })
            }
            ,'order2Confirm':function(){
                tradePass.order2Confirm($scope.id).success(function(data){
                    window.history.go(0)
                })
            }
            ,'order3TrafficChoice':function(){
                // 选择货运方式
                // 弹窗,选择性跳转
                var obj = {templateUrl: './template/common/popup_radio.html', title: '选择货运方式'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: '2', chn: '两方物流'}, {eng: '3', chn: '三方物流'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if(res && res.subtype){
                       tradePass.order3TrafficChoice($scope.id,res.subtype.eng).success(function(data){
                        if(data.status=='success'){
                            if(res.subtype.eng==3){
                                $location.path("/tab/tradeOrder-1/"+$scope.order._id)
                            }else{
                                // $location.path("/tab/tradeOrder-1-2/"+$scope.order._id)
                                $location.path("/tab/publishPass/null")
                            }
                        }
                       })
                    }
                })
            }
            ,'order3TrafficAllDepart':function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '输入到货吨数'}
                var data = {type: 'number'}
                $scope.popup_lists = [{eng: 'amount', chn: '吨数'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if(res && res.subtype){
                       tradePass.order3TrafficAllDepart($scope.id,{amount:res.subtype.amount}).success(function(data){
                        window.history.go(0)
                       })
                    }
                })
            }
            ,'order4PaymentReceived':function(){
                tradePass.order4PaymentReceived($scope.id).success(function(data){
                    window.history.go(0)
                })
            }
            ,'order5ReqForgiven':function(){
                tradePass.getDemandOrder5ReqForgiven($scope.id).success(function(data){
                   if(data.status=='success'){
                    showAlert($ionicPopup,$location,{template:'申请谅解成功',title:'提示'}).then(function(res){
                         window.history.go(0)
                    })
                   }
                })
            }
            ,'order5NoForgiven':function(){
                showAlert($ionicPopup,$location,{template:'确认尾款已获得，订单结束',title:'提示'}).then(function(res){
                    if(res){
                        tradePass.getDemandOrder5NoForgiven($scope.id).success(function(data){
                             window.history.go(0)
                        })
                    }
                })
            }
            ,'order5Confirm':function(){
                tradePass.getDemandOrder5Confirm($scope.id).success(function(data){
                    console.log(data)
                    if(data.status=='success'){
                        showAlert($ionicPopup,$location,{template:'确认尾款已获得，订单结束',title:'提示'}).then(function(res){
                            window.history.go(0)
                        })
                    }
                })
            }
        }
        //

    })

    // -----采购上传支付凭证 更新step 信用待审核2.1 信用通过2.2 // 上传支付凭证通过2.5
    .controller('tradeOrder1-2Ctrl',
        function ($scope, $http, $stateParams, $location, ENV,$ionicPopup,tradePass,fileReader) {
        $scope.navbar = {
            'navLeftHref': 'tab.tradeOrder({id:$stateParams.id})'
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '支付预付款'
            , 'navRightHref': 'tab.tradeOrder1-2'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
        console.log($stateParams.id)
        $scope.id = $stateParams.id
        $scope.method = 'id'
        // 获取总金额和预付款额
        $scope.start = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                if (data.status == "success") {
                    $scope.order = data.data
                    console.log($scope.order)
                    // if($scope.order.step>=2.5){
                    //     $location.path('/tab/tradeOrder/'+$scope.id)
                    // }
                }
            })
        }

        // 提交支付凭证
          $scope.getUploadPic = function (e) {
            $scope.file = e
            $scope.getFile()
          }
          $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file[0], $scope).then(function (result) {
              $scope.previewImageSrc = result
              console.log($scope.previewImageSrc)
            })
          }

        //$scope.getUploadPic = function(e){
        //    $scope.file = e
        //}
        $scope.order_img = function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '上传支付凭证'}
            var data = {type: 'file'}
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if ($scope.file) {
                        var type="payment_gross"
                        if($scope.order.payment_method=='partition'){
                            // 款到发货，
                            type="payment_advance"
                        }
                        var _url = ENV.api.trade + 'demand/order_img_upload/id/'+type+'/' + $scope.id
                        console.log(_url)
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                            console.log('_upimg',data)
                            if (data.status == "success") {
                                $scope.order_img=data.data.url
                                $scope.msg = {file: '上传成功'}
                            }else{
                              $scope.msg = {file: '上传失败'}
                            }
                        })
                    } else {
                        $scope.msg = {file: '未选择图片'}
                    }
                }
            })
        }
        $scope.pushpayment=function(){
            if($scope.order.payment_method != 'credit'){
                console.log('url')
                $scope.payment()
                // if($scope.file){
                //     $scope.payment()
                // }else{
                //     $scope.msg={file:'请上传图片'}
                // }
            }else{
                console.log('credit')
                // 申请信用额度
                $scope.get_order_credit()
            }
        }
        //确认付款
        $scope.payment = function(){
            tradePass.getDemandOrder2Payment('id',$scope.id).success(function(data){
                    console.log(data)
                    if(data.status == "success"){
                        $location.path('/tab/tradeOrder/'+$scope.id)
                    }
                })
        }
        // ? 是否注销掉下面的函数
        // $scope.getcredit = function(){
        //     var _url = ENV.api.credit+'credit/get_account'
        //     $http({
        //         method:'POST'
        //         ,url: _url
        //         , headers: {

        //         }
        //     }).success(function(data){
        //         console.log('getaccount',data)
        //         $scope.credit = data.data
        //     })
        // }
        // // 申请信用额度/order_apply_credit/:method/:phase/:id
        $scope.get_order_credit=function(){
            tradePass.getDemandOrderApplyCredit($scope.id).success(function(data){
                    console.log('申请信用',data)
                    if(data.status=='success'){
                        $scope.payment()
                    }else if(data.status=='wait_for_approval'){
                        showAlert($ionicPopup, $location, {template: '等待对方公司负责人员审核', title: '提示'})
                        .then(function(){
                            $location.path('/tab/tradeOrder/'+$scope.id)
                        })

                    }

                })
        }
        $scope.start()
    })

    // --填写质检报告
    .controller('tradeOrder3-1Ctrl', function ($scope, $http, $stateParams, $location, ENV,Storage,$ionicPopup,tradePass,trade158) {

        var user = Storage.get('userInfo').user
        $scope.isCompany = user.company_id // 获取当前用户公司id 判断买卖方

        $scope.goback=function(){
            window.history.go(-1)
        }
        // 获取角色
        $scope.role = Storage.get('userInfo').user
        // 获取订单信息
        $scope.id = $stateParams.id
        // 初始值设置
        $scope._obj={}
        $scope.order={}
        tradePass.getDemandOrderDetail('id', $scope.id).success(function (data) {
            console.log(data)
            if (data.status == "success") {
                $scope.order = data.data
                getctegory($scope.order.category)
                $scope._obj = $scope.order.att_product
                $scope.order.att_product.cost_total = attr_cost_total($scope.order.att_product)
            }
        })
        // 商品属性
        var getctegory = function (category) {
            trade158.getGoodsDescs(category).success(function (data) {
                if (data.status = "success") {
                    $scope.desc = data.data.desc
                }
            })
        }
        $scope.attr = {}

        //采购方填写 order_4_validation/:method/:id ？此时步骤step必须为4
        $scope.order_4_validation = function () {
            // 组合提交数组
            var _check_product = []
            for(var i in $scope._obj){
                var qualified=$scope._obj[i].qualified === true ? true:false
                if(i!='cost_total'){
                    _check_product.push([i,$scope._obj[i].actual,qualified])
                }
            }
            var _data ={check_product: _check_product}
            tradePass.getDemandOrder4Validation($scope.id,_data,'no').success(function (data) {
                if (data.status == 'success') {

                    $location.path('/tab/tradeOrder/'+$scope.id)
                }
            })
        }

        // 供应方发布质检项目
        $scope.order_4_confirm=function(){
            _showConfirm($ionicPopup,$location,{template:'确认发布质检报告?',title:'提示'}).then(function(res){
                var _check_product = []
                for(var i in $scope._obj){
                    if(i!='cost_total'){
                        _check_product.push([i,$scope._obj[i].actual])
                    }
                }
                var _data ={check_product: _check_product}
                tradePass.getDemandOrder4Validation($scope.id,_data,'ok').success(function (data) {
                    if (data.status == 'success') {
                        $location.path('/tab/tradeOrder/'+$scope.id)
                    }
                })

            })
        }
        $scope.getUploadPic = function(e){
            $scope.file = e
        }
        $scope.order_img = function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '上传质检报告'}
            var data = {type: 'file'}
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if ($scope.file) {
                        var type="product_demand"
                        var _url = ENV.api.trade + 'demand/order_img_upload/id/'+type+'/' + $scope.id
                        console.log(_url)
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                            console.log('_upimg',data)
                            if (data.status == "success") {
                                $scope.order.produce_demand_url=data.data.url
                                $scope.msg = {file: '上传成功'}
                            }else{
                              $scope.msg = {file: '上传失败'}
                            }
                        })
                    } else {
                        $scope.msg = {file: '未选择图片'}
                    }
                }
            })
        }

    })
    // 分期 中间款
    .controller('tradeOrder4-2Ctrl',function($scope,$stateParams, $http, $location, ENV,$ionicPopup,tradePass){
        // 角色判断
        $scope.id = $stateParams.id
        $scope.onload = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                if (data.status == "success") {
                    $scope.order = data.data
                }
            })
        }

        $scope.getUploadPic = function(e){
            $scope.file = e
        }
        // 上传尾款凭证
        $scope.order_img = function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '上传尾款支付凭证'}
            var data = {type: 'file'}
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if ($scope.file) {
                        console.log(res)
                        var _url = ENV.api.trade + 'demand/order_img_upload/id/payment_middle/' + $scope.id
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                            if (data.status == "success") {
                                $scope.order_img=data.data.url
                                $scope.msg = {file: '上传成功'}
                            }else{
                              $scope.msg = {file: '上传失败'}
                            }
                        })
                    } else {
                        $scope.msg = {file: '未选择图片'}
                    }
                }
            })
        }
        // 通知付款成功
        $scope.pushpayment=function(){
            tradePass.order4Payment($scope.id).success(function(data){
                if(data.status=='success'){
                    $location.path('/tab/tradeOrder/'+$scope.id)
                }
            })
        }
        // 自动加载
        $scope.onload()
    })
    // --上传尾款凭证 tradeOrder4-1
    .controller('tradeOrder4-1Ctrl',function($scope,$stateParams, $http, $location, ENV,$ionicPopup,tradePass){
        // 角色判断
        $scope.id = $stateParams.id
        $scope.onload = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                if (data.status == "success") {
                    $scope.order = data.data
                }
            })
        }

        $scope.getUploadPic = function(e){
            $scope.file = e
        }
        // 上传尾款凭证
        $scope.order_img = function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '上传尾款支付凭证'}
            var data = {type: 'file'}
            if($scope.order.payment_method == 'partition'){
                var _type='payment_remain'
            }else{
                var _type='payment_gross'
            }
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res) {
                    if ($scope.file) {
                        // payment_gross ，payment_remain

                        var _url = ENV.api.trade + 'demand/order_img_upload/id/'+_type+'/' + $scope.id
                        _upimg($scope.file[0], _url, $http).success(function (data) {
                            if (data.status == "success") {
                                $scope.order_img=data.data.url
                                $scope.msg = {file: '上传成功'}
                            }else{
                              $scope.msg = {file: '上传失败'}
                            }
                        })
                    } else {
                        $scope.msg = {file: '未选择图片'}
                    }
                }
            })
        }
        // 通知付款成功
        $scope.pushpayment=function(){

            if($scope.order.choice_final_payment != 'credit'){
                console.log('url')
                $scope.order_5_payment()
                // if($scope.file){
                //     $scope.order_5_payment()
                // }else{
                //     $scope.msg={file:'请上传凭证'}
                //     showAlert($ionicPopup,$location,{template:'请上传支付凭证',title:'提示'})
                // }
            }else{
                console.log('credit')
                $scope.get_order_credit()
            }
        }
        //确认付款
        // $scope.trade_delivery = function(){
        //     tradePass.getDemandOrder2Payment('id',$scope.id) .success(function(data){
        //         console.log(data)
        //         if(data.status == "success"){
        //             $location.path('/tab/tradeOrder2/'+$scope.id)
        //         }
        //     })
        // }
        // 申请信用额度/order_apply_credit/:method/:phase/:id
        $scope.get_order_credit=function(){
            tradePass.getDemandOrderApplyCredit('final',$scope.id).success(function(data){
                    console.log('申请信用',data)
                    if(data.status=='success'){
                        $scope.order_5_payment()
                        // $location.path('/tab/eBankIncome/eBankIncomeL/eBankIncomeLts')
                        $location.path('/tab/tradeOrder/'+$scope.id)
                    }else{
                        // 请等待审核审核中
                        showAlert($ionicPopup,$location,{template:'等待本公司管理员信用额度审核',title:'提示'}).then(function(res){
                            $location.path('/tab/tradeOrder/'+$scope.id)
                        })
                    }

                })
        }
        // 在第5步时通知供应方已经支付尾款 /demand/order_5_payment/:method/:id
        $scope.order_5_payment=function(){
            tradePass.getDemandOrder5Payment($scope.id).success(function(data){
                    if(data.status=='success'){
                        showAlert($ionicPopup,$location,{template:'通知对方付款成功',title:'提示'}).then(function(e){
                            $location.path('/tab/tradeOrder/'+$scope.id)
                        })
                    }else{
                        showAlert($ionicPopup,$location,{template:'未发送付款通知',title:'提示'}).then(function(res){
                            $location.path('/tab/tradeOrder/'+$scope.id)
                        })
                    }
                })
        }
        // 自动加载
        $scope.onload()
    })


// --------------------- 销售方/物流采购方 ---------------//
    // 三方采购
    .controller('tradeOrder_1ctrl', function ($scope, $http, $stateParams, $ionicPopup, $location, ENV, StoreManage, $filter,tradePass) {
        $scope.id = $stateParams.id
        $scope.method = 'id'
        $scope.start = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                if (data.status == "success") {
                    $scope.orderInfo = data.data
                    StoreManage.getInfoById($scope.orderInfo.location_arrival).then(function (result) {
                        $scope.orderInfo.stor_end = result.province;
                    });
                    StoreManage.getInfoById($scope.orderInfo.location_depart).then(function (result) {
                        $scope.orderInfo.stor_begin = result.province;
                    });
                    console.log($scope.orderInfo)
                }
            })
        }

        $scope.order={}
        // 发布物流需求单
        $scope.submit = function () {
            if(!$scope.order.price){
                $scope.msg = {price:'请选择合理价格'}
                showAlert($ionicPopup,$location,{template:'请选择合理价格',title:'提示'})
            }// 20160229 更新结算方式和付款方式种类
            else if ($scope.order.payment_choice === undefined) {
              showAlert($ionicPopup, $location, {template: '结算方式不完整'})
            }else if ($scope.order.payment_method === undefined) {
              showAlert($ionicPopup, $location, {template: '付款方式不完整'})
            }else if ($scope.order.time_traffic < $scope.order.time_validity) {
              $scope.order = {time_validity: '请选择正确有效期'}
              showAlert($ionicPopup, $location, {template: '请选择正确有效期'})
            }
            // else if(!$scope.order.date2 || (new Date($scope.order.date2 ) < new Date() ) ){
            //     $scope.msg = {date2:'请选择合理时间'}
            //     showAlert($ionicPopup,$location,{template:'请选择合理时间',title:'提示'})
            // }
            else{
                var _traffic = $scope.orderInfo.att_traffic
                var att_traffic = {
                    'one': [0, _traffic.weight_step, _traffic.weight_cost]
                    , 'two': [_traffic.cost_time_trade, _traffic.cost_time_traffic]
                }
                if( typeof($scope.order.amount)=='undefined' || isNaN(parseFloat($scope.order.amount)) || $scope.order.amount>$scope.orderInfo.amount ){
                    $scope.order.amount = $scope.orderInfo.amount
                }

                var _data = {
                    amount: parseFloat($scope.order.amount) 				//运输数量
                    // , style_payment: parseFloat($scope.order.payment) 					//预付款百分比
                    , licenseURL: ''										//凭证地址
                    , can_join: $scope.order.can_join ? $scope.order.can_join : false				//是否可以拼单
                    , insurance: false										//是否有保险
                    , att_traffic: att_traffic					 			//物流细则
                    , category: $scope.orderInfo.category 				//货物类型索引，英文字符串
                    , time_arrival: formatdata( new Date ($scope.orderInfo.time_arrival) )			//到货时间
                    , time_depart: 	formatdata( new Date ($scope.orderInfo.time_depart) )	//取货时间
                    , time_validity: formatdata(distanceDate($scope.order.date2))				//有效期
                    , company_sell_id: $scope.orderInfo.company_supply_id 		//卖家公司id
                    , company_buy_id: $scope.orderInfo.company_demand_id 		//买家公司id
                    , location_arrival: $scope.orderInfo.location_arrival		//到货仓库id 采购方
                    , location_depart: $scope.orderInfo.location_depart 		//取货仓库id 销售方
                    , index_trade: $scope.orderInfo.index 					//交易订单号
                    , price: parseFloat($scope.order.price)                   //支付价格
                    // , choice_advanced_payment: $scope.orderInfo.choice_advanced_payment   //预付款支付类型
                    // , choice_final_payment: $scope.orderInfo.choice_final_payment
                    , user_partner_id: $scope.orderInfo.user_demand_id      //交易订单需求方用户id和公司id
                    , company_partner_id: $scope.orderInfo.company_demand_id
                    // ,choice_advanced_payment:$scope.order.choice_advanced_payment[0]
                    // ,choice_final_payment:$scope.order.choice_final_payment[0]
                    // 20160229 新增结算方式，支付方式,质检方
                    ,payment_choice:$scope.order.payment_choice.eng
                    ,payment_method:$scope.order.payment_method.eng
                    ,weigh_settlement: $scope.orderInfo.att_traffic.weight_actual ? 'fact' : 'theory'
                    ,time_settlement: $scope.orderInfo.att_traffic.time_valid ? 'day' : 'not_used'
                    ,verify:$scope.order.verify.eng
                }
                if($scope.order.payment_method.eng == 'partition'){
                    // 复制再执行发布
                    _data.percentage_advance= parseInt($scope.order.percent_advance)
                    //_data.exist_payment_middle=$scope.order.exist_payment_middle ? true:false;
                    _data.exist_payment_middle=false
                    //_data.percentage_remain=$scope.order.exist_payment_middle ? parseInt($scope.order.percent_middle) : 0
                    // _data.percent_remain=$scope.order.exist_payment_middle ?(100 - parseInt($scope.order.percent_advance)-parseInt($scope.order.percent_middle)) :( 100-parseInt($scope.order.percent_advance))
                  _data.count_day_extension=parseInt($scope.order.count_day_extension)
                    console.log(_data)
                    $scope.passAdd(_data)
                }
                // 20160229 若信用，则新增到期时长，计息器
                if($scope.order.payment_method.eng == 'credit'){
                    _data.ref_day_extension=$scope.order.ref_day_extension.eng
                    _data.count_day_extension=parseInt($scope.order.count_day_extension)
                    console.log(_data)
                    $scope.passAdd(_data)
                }
                if($scope.order.payment_method.eng == 'all_cash'){
                    console.log(_data)
                    $scope.passAdd(_data)
                }
                if($scope.order.payment_method.eng == 'all_goods'){
                    console.log(_data)
                    _data.count_day_extension=parseInt($scope.order.count_day_extension)
                    $scope.passAdd(_data)
                }

            }
        }
        $scope.passAdd=function(_data){
            tradePass.passDemandAdd(_data).success(function (data) {
                console.log(data)   //status: "success"
                if (data.status == 'success') {
                    showAlert($ionicPopup,$location,{template:'发布物流需求单成功',title:'提示'}).then(function(res){
                       $location.path('/tab/rushTransp')
                    })
                }else{
                    showAlert($ionicPopup,$location,{template:'发布物流需求单失败',title:'提示'})
                }
            })
        }
        // 弹出框
        $scope.show_payment = function(){
            console.log('showPayment')
            var object = {templateUrl:'./template/common/popup_radio.html',title:'请选择付款方式'}
            var objmsg = {type:'advanced_payment'}
            _popup($scope, object, $ionicPopup, objmsg).then(function(res){
                if(res){
                    $scope.order.choice_advanced_payment = res.advanced_payment
                    $scope.order.choice_final_payment = res.final_payment
                }
            })
        }

        // 调整结算方式，支付方式，质检等
        $scope.selPaymentChoice=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '结算方式'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'cash', chn: '现金结算'}, {eng: 'bill_bank', chn: '银行兑票'}
            , {eng: 'bill_com', chn: '商业兑票'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                console.log(res)
                $scope.order.payment_choice=res.subtype
            })
        }
        $scope.selPaymentMethod=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '付款方式'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'all_cash', chn: '款到发货'}, {eng: 'all_goods', chn: '货到付款'}
            , {eng: 'partition', chn: '分期支付'},{eng: 'credit', chn: '信用支付'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $scope.order.payment_method=res.subtype
            })
        }
        $scope.selRefDayExtension=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '延期计算标准'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'order', chn: '双方确认订单日'}, {eng: 'goods', chn: '货到并完成质检日'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $scope.order.ref_day_extension=res.subtype
            })
        }
        //
        $scope.selOfferLimit=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '发布范围'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: false, chn: '全平台'}, {eng: true, chn: '认证企业'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                console.log(res)
                $scope.order.verify=res.subtype
            })
        }
        $scope.start()

    })
    // 双方物流
    .controller('publishPassCtrl',function($scope,$stateParams,tradePass,StoreManage,$ionicPopup,trade158,$filter,$location){
        $scope.id = $stateParams.id
        $scope.method = 'id'
        $scope.goback = function () {
            window.history.go(-1);
        }
        $scope.start = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                if (data.status == "success") {
                    $scope.orderInfo = data.data
                    StoreManage.getInfoById($scope.orderInfo.location_arrival).then(function (result) {
                        $scope.orderInfo.stor_end = result.province;
                    });
                    StoreManage.getInfoById($scope.orderInfo.location_depart).then(function (result) {
                        $scope.orderInfo.stor_begin = result.province;
                    });
                    console.log($scope.orderInfo)
                }
            })
        }
        $scope.start()
        // 发货人姓名，电话，发货地址，收货人姓名，收货人电话，收货地址，发货省市县，收货省市县
        // 发货种类，吨数，是否凑单，物流细则，提货时间，交货时间，发布有效期，支付方式，物流细则结算方式
        $scope.id = $stateParams.id
        $scope.method = 'id'
        $scope.orderInfo={}
        $scope.start = function(){
            tradePass.getDemandOrderDetail('id',$scope.id).success(function (data) {
                console.log(data)
                if (data.status == "success") {
                    $scope.orderInfo = data.data
                    StoreManage.getInfoById($scope.orderInfo.location_arrival).then(function (result) {
                        $scope.orderInfo.stor_end = result.province;
                    });
                    StoreManage.getInfoById($scope.orderInfo.location_depart).then(function (result) {
                        $scope.orderInfo.stor_begin = result.province;
                    });
                    console.log($scope.orderInfo)
                }
            })
        }

        $scope.order={}
        // 发布物流需求单
        $scope.submit = function () {
            if(!$scope.order.price){
                $scope.msg = {price:'请选择合理价格'}
                showAlert($ionicPopup,$location,{template:'请选择合理价格',title:'提示'})
            }
            else if ($scope.order.payment_choice === undefined) {
              showAlert($ionicPopup, $location, {template: '结算方式不完整'})
            }else if ($scope.order.payment_method === undefined) {
              showAlert($ionicPopup, $location, {template: '付款方式不完整'})
            }else if ($scope.order.time_traffic < $scope.order.time_validity) {
              $scope.order = {time_validity: '请选择正确有效期'}
              showAlert($ionicPopup, $location, {template: '请选择正确有效期'})
            }else{
                var _traffic = $scope.orderInfo.att_traffic
                var att_traffic = {
                    'one': [0, _traffic.weight_step, _traffic.weight_cost]
                    , 'two': [_traffic.cost_time_trade, _traffic.cost_time_traffic]
                }
                if( typeof($scope.order.amount)=='undefined' || isNaN(parseFloat($scope.order.amount)) || $scope.order.amount>$scope.orderInfo.amount ){
                    $scope.order.amount = $scope.orderInfo.amount
                }

                var _data = {
                    amount: parseFloat($scope.order.amount)                 //运输数量
                    , licenseURL: ''                                        //凭证地址
                    , can_join: $scope.order.can_join ? $scope.order.can_join : false               //是否可以拼单
                    , insurance: false                                      //是否有保险
                    , att_traffic: $scope.orderInfo.att_traffic                              //物流细则
                    , category: $scope.orderInfo.category.chn               //货物类型索引，英文字符串
                    , time_arrival: formatdata( new Date ($scope.orderInfo.time_arrival) )          //到货时间
                    , time_depart:  formatdata( new Date ($scope.orderInfo.time_depart) )   //取货时间
                    , time_validity: formatdata(distanceDate($scope.order.validity))               //有效期
                    , company_sell_id: $scope.orderInfo.company_supply_id       //卖家公司id
                    , company_buy_id: $scope.orderInfo.company_demand_id        //买家公司id
                    , location_arrival: $scope.orderInfo.location_arrival       //到货仓库id 采购方
                    , location_depart: $scope.orderInfo.location_depart         //取货仓库id 销售方
                    , index_trade: $scope.orderInfo.index                   //交易订单号
                    , price: parseFloat($scope.order.price)                   //支付价格
                    , user_partner_id: $scope.orderInfo.user_demand_id      //交易订单需求方用户id和公司id
                    , company_partner_id: $scope.orderInfo.company_demand_id
                    // 20160229 新增结算方式，支付方式,质检方
                    ,payment_choice:$scope.order.payment_choice.eng
                    ,payment_method:$scope.order.payment_method.eng
                    ,weigh_settlement: $scope.orderInfo.att_traffic.weight_actual ? 'fact' : 'theory'
                    ,time_settlement: $scope.orderInfo.att_traffic.time_valid ? 'day' : 'not_used'
                    // 双方物流
                    ,send_name:         $scope.order.send_name
                    ,send_phone:        $scope.order.send_phone
                    ,send_addr:         $scope.order.send_addr
                    ,send_province:     $scope.order.send_province
                    ,send_city:         $scope.order.send_city
                    ,send_district:     $scope.order.send_district
                    ,receive_name:      $scope.order.receive_name
                    ,receive_phone:     $scope.order.receive_phone
                    ,receive_addr:         $scope.order.receive_addr
                    ,receive_province: $scope.order.receive_province
                    ,receive_city:     $scope.order.receive_city
                    ,receive_district: $scope.order.receive_district

                }
                if($scope.order.payment_method.eng == 'partition'){
                    _data.percentage_advance= parseInt($scope.order.percent_advance)
                    _data.exist_payment_middle=false;
                    // _data.percentage_remain= 100-parseInt($scope.order.percent_advance)
                   $scope.passAdd(_data)
                }
                // 20160229 若信用，则新增到期时长，计息器
                if($scope.order.payment_method.eng == 'credit'){
                    _data.ref_day_extension=$scope.order.ref_day_extension.eng
                    _data.count_day_extension=parseInt($scope.order.count_day_extension)
                    $scope.passAdd(_data)
                }
                if($scope.order.payment_method.eng == 'all_cash'){
                    $scope.passAdd(_data)
                }
                if($scope.order.payment_method.eng == 'all_goods'){
                    // _data.count_day_extension=parseInt($scope.order.count_day_extension)
                    $scope.passAdd(_data)
                }

            }
        }
        $scope.passAdd=function(_data){
            console.log(_data)
            tradePass.passDemandAddBoth(_data).success(function (data) {
                console.log(data)
                if (data.status == 'success') {
                    showAlert($ionicPopup,$location,{template:'发布物流需求单成功',title:'提示'}).then(function(res){
                       $location.path('/tab/rushTransp')
                    })
                }else{
                    showAlert($ionicPopup,$location,{template:'发布物流需求单失败',title:'提示'})
                }
            })
        }
        // 弹出框
        $scope.show_payment = function(){
            console.log('showPayment')
            var object = {templateUrl:'./template/common/popup_radio.html',title:'请选择付款方式'}
            var objmsg = {type:'advanced_payment'}
            _popup($scope, object, $ionicPopup, objmsg).then(function(res){
                if(res){
                    $scope.order.choice_advanced_payment = res.advanced_payment
                    $scope.order.choice_final_payment = res.final_payment
                }
            })
        }

        // 调整结算方式，支付方式，质检等
        $scope.selPaymentChoice=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '结算方式'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'cash', chn: '现金结算'}, {eng: 'bill_bank', chn: '银行兑票'}
            , {eng: 'bill_com', chn: '商业兑票'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                console.log(res)
                $scope.order.payment_choice=res.subtype
            })
        }
        $scope.selPaymentMethod=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '付款方式'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'all_cash', chn: '款到发货'}, {eng: 'all_goods', chn: '货到付款'}
            , {eng: 'partition', chn: '分期付款'},{eng: 'credit', chn: '信用付款'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $scope.order.payment_method=res.subtype
            })
        }
        $scope.selRefDayExtension=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '延期计算标准'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'order', chn: '双方确认订单日'}, {eng: 'goods', chn: '货到并完成质检日'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $scope.order.ref_day_extension=res.subtype
            })
        }
        $scope.selOfferLimit=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '发布范围'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'false', chn: '全平台'}, {eng: 'true', chn: '认证企业'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                console.log(res)
                $scope.order.verify=res.subtype
            })
        }
        $scope.start()
        $scope.changeDate = function (e) {
            var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
            var objmsg = {type: 'changeDate'}
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                if (res) {
                    console.log(res)
                    if(e=='depart'){
                        $scope.orderInfo.time_depart = res.dt
                    }else{
                        $scope.orderInfo.time_arrival = res.dt
                    }

                }
            })
        }
        $scope.showCategory = function () {
            // 获取产品分类
            $scope.msg = null
            $scope.getCategory()
            var _object = {templateUrl: './template/common/popup_radio.html', title: '请选择产品种类'}
            var _objmsg = {type: 'radio'}
            _popup($scope, _object, $ionicPopup, _objmsg).then(function (res) {
                if(res && res.subtype){
                    $scope.orderInfo.category=res.subtype
                }
            })
        }
        $scope.getCategory = function () {
            trade158.getCategory().success(function (data) {
                if (data.status == 'success') {
                    $scope.popup_lists = data.data
                } else {
                    $scope.msg = {error: '获取产品分类失败'}
                }
            })
        }
        $scope.amountChange=function(e){
            console.log(e)
            $scope.orderInfo.amount=e
        }
        $scope.changeArr = function (type) {
            var data = {};
            var obj = {templateUrl: './template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if(res){
                    if(type=='send'){
                        $scope.order.startChn = $filter('addressText')(res);
                        $scope.order.send_province = res.currentProvince.ProID
                        $scope.order.send_city = typeof(res.currentCity) != 'undefined' ? res.currentCity.CityID : ''
                        $scope.order.send_district = typeof(res.currentArea) != 'undefined' ? res.currentArea.DisID : ''
                    }else{
                        $scope.order.endChn = $filter('addressText')(res);
                        $scope.order.receive_province = res.currentProvince.ProID
                        $scope.order.receive_city = typeof(res.currentCity) != 'undefined' ? res.currentCity.CityID : ''
                        $scope.order.receive_district = typeof(res.currentArea) != 'undefined' ? res.currentArea.DisID : ''
                    }
                }
                console.log($scope.order)
            })
        }
        $scope.modifAtttraffic = function () {
            // 获取弹窗,[false,0.5,1,100,true,1,100]
            $scope.msg = null
            var object = {templateUrl: 'rushPublish/atttraffic4.html', title: '物流结算细则',css: 'trade'}
            var objmsg = {time:'false',weight:'false'}
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {

                $scope.orderInfo.att_traffic ={}
                if(res.weight=='true'){
                    $scope.orderInfo.weigh_settlement='theory'
                    var _tmp = [parseFloat(res.weight_step),parseFloat(res.weight_cost)]
                    $scope.orderInfo.att_traffic.one  = _tmp
                }else{
                    $scope.orderInfo.weigh_settlement='fact'

                    $scope.orderInfo.att_traffic.one  =[0,0]
                }
                if(res.time=='true'){
                    $scope.orderInfo.time_settlement= 'day'
                    var _tmp = [parseFloat(res.cost_time_trade),parseFloat(res.cost_time_traffic)]
                    $scope.orderInfo.att_traffic.two = _tmp
                }else{
                    $scope.orderInfo.time_settlement= 'not_used'

                    $scope.orderInfo.att_traffic.two= [0,0]
                }
                console.log($scope.orderInfo)
                $scope.atttraffic = true;
            })
        }
    })
// --------------------- 物流抢单方 ---------------//

// --------------------- 物流订单 ---------------//
    .controller('trafficOrderCtrl', function ($scope, PassService, $log, $state,authenticationService) {

        PassService.getAllOrders(authenticationService.getCompanyInfo().type).then(function (result) {
            if (result.status == 'success') {
                $scope.orders = result.data;
            } else {
                $log.error(result);
            }
        });

        $scope.goDetail = function (order) {
            $state.go('tab.passOrder.Detail', {order_id: order._id});
        }
    })

// --------------------- 常用函数----------------------//

// 合并重复车辆类型，计算每种类型的车量数据
    var _mergeCars = function(arr){
        var _arr=[]
        for(var i=0;i<arr.length;i++){
            // 如果新数组中有该车辆类型，则数量加1，否则新建数组
            if(_arr.length==0){
                arr[i].count=1
                _arr.push(arr[i])
                continue;
            }else{
                var flag = false;
                var xx = 0;
                for(var j=0;j<_arr.length;j++){
                    if(arr[i].truck_id == _arr[j].truck_id){
                        flag=true;
                        xx=j
                    }
                }
                if(flag){
                    _arr[xx].count +=1
                }else{
                    arr[i].count=1
                    _arr.push(arr[i])
                }
            }
        }
        return _arr
    }

 // 计算质量扣款总值
var attr_cost_total = function(arr){
    var total = 0
    for(var i in arr){
        if(arr[i].cost_total){
            total += arr[i].cost_total
        }
    }
    return total
}
