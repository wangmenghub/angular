/**
 * Created by ID on 15/12/3.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.controllers.trace', [])
    // 工厂模式
    .factory('trade158', function (ENV, $http, Storage) {
        // 拥有 获取产品类型,获取产品详细参数,获取资源交易量,获取所有交易数据,
        return {
            // 获取产品类型
            getCategory: function () {
                return $http({
                    method: 'GET'
                    , url: ENV.api.trade + 'demand/list_goods'
                })
            }
            // 获取产品详细参数
            , getGoodsDescs: function (goods_name) {
                return $http({
                    method: 'GET'
                    , url: ENV.api.trade + 'demand/standard_for_goods/' + goods_name
                })
            }
            // 获取资源交易量 param:e 煤炭种类
            , getDemandAmount: function (e) {
                return $http({
                    method: 'GET'
                    , url: ENV.api.trade + 'demand/get_amount/' + e
                })
            }
            // 获取所有交易数据,post
            , getDemandList: function (_data) {
                return $http({
                  method: 'POST'
                  , url: ENV.api.trade + 'demand/demand_list/'
                  , data: _data
                })
            }

            // get方式,以某种顺序读取某一个类型货物的挂单数据。仅查找当前还有效的挂单,
            , getDemandList2: function (_order,_startPage) {
                var _url = ENV.api.trade + 'demand/demand_list/' + 'all' + _order + '/' + _startPage
                return $http.get(_url)
            }
            //发布采购
            ,getDemandNew:function(_data){
                var _url = ENV.api.trade + 'demand/demand_new'
                return $http.post(_url,_data)
            }
            // 获取仓库
            ,getCompanyTradeStore:function(){
                var _url=ENV.api.account + 'company_trade_store/get'
                return $http.post(_url)
            }
            // 根据id获取需求单
            ,getDemandDetail:function(_id){
                return $http({
                    method: 'GET'
                    , url: ENV.api.trade + 'demand/demand_detail/id/' + _id
                })
            }
            // 获取抢单数量
            ,getDemandofferCount:function(_id){
                var _url=ENV.api.trade + 'demand/offer_count/' + _id
                return $http.get(_url)
            }
            // 获取抢单列表
            ,getDemandOfferList:function(_id,_page,method){
                var _url=ENV.api.trade + 'demand/offer_list/' + _id + '/'+method+'/' + _page
                console.log(_url)
                return $http.get(_url)
            }
            // 发起订单流程
            ,getDemandOrderNew:function(_demandid,_offerid,_data){
                var _url = ENV.api.trade + 'demand/order_new/' + _demandid + '/' + _offerid
                return $http.post(_url,_data)
            }
            // 获取自己的挂单数据
            ,getDemandOfferDetail:function(_offerid){
                var _url=ENV.api.trade + 'demand/offer_detail/' + _offerid
                return $http.get(_url)
            }
            // 修改自己的挂单数据
            ,getDemandOfferEdit:function(_offerid,_data){
                var _url = ENV.api.trade + 'demand/offer_edit/' + _offerid;
                return $http.post(_url,_data)
            }
            // 获取金融统计
            ,getCreditInfo:function(){
                var _url =ENV.api.credit + 'home/get_credit_info'
                return $http({method:'POST',url:_url})
            }
            // 获取物流数据
            ,getPassDemandInfo:function(){
                var _url = ENV.api.pass + 'home/get_demand_info'
                return $http({method:'POST',url:_url})
            }
            // 获取线路数据
            ,getTruckLineInfo:function(){
                var _url =ENV.api.account + 'home/get_truck_line_info'
                return $http({method:'POST',url:_url})
            }
            // 获取公司数量
            ,getCompanyInfo:function(){
                var _url =ENV.api.account + 'home/get_company_info'
                return $http({method:'POST',url:_url})
            }
            // 获取最新采购需求吨数 console.log(ENV.api.trade + 'stat/weight_demand_daily')
            ,getWeightDemandDaily:function(){
                var _url = ENV.api.trade + 'stat/weight_demand_daily'
                return $http({method:'GET',url:_url})
            }
            // 获取采购需求总吨数 ENV.api.trade + 'stat/weight_demand_total'
            ,getWeightDemandTotal:function(){
                var _url = ENV.api.trade + 'stat/weight_demand_total'
                return $http({method:'GET',url:_url})
            }
            // 获取总抢单数  ENV.api.trade + 'stat/offer_count'
            ,getOfferCount:function(){
                var _url = ENV.api.trade + 'stat/offer_count'
                return $http({method:'GET',url:_url})
            }
            //获取本周新增抢单数 ENV.api.trade + 'stat/offer_count_week'
            ,getOfferCountWeek:function(){
                var _url = ENV.api.trade + 'stat/offer_count_week'
                return $http({method:'GET',url:_url})
            }
            // 获取平均每个需求单有多少个抢单 ENV.api.trade + 'stat/avg_offer_per_demand'
            ,getAvgOfferPerDemand:function(){
                var _url = ENV.api.trade + 'stat/avg_offer_per_demand'
                return $http({method:'GET',url:_url})
            }
            // 获取有效需求吨数和抢单数 ENV.api.trade + 'stat/weight_and_offer_demand_valid'
            ,getWeightAndOfferDemandValid:function(){
                var _url = ENV.api.trade + 'stat/weight_and_offer_demand_valid'
                return $http({method:'GET',url:_url})
            }
            // 获取某种货物的报价最高和最低值 ENV.api.trade + 'stat/price_call_stat/'+_category
            ,getPriceCallStat:function(_category){
                var _url = ENV.api.trade + 'stat/price_call_stat/'+_category
                console.log(_url)
                return $http({method:'GET',url:_url})
            }
            // 获取某种货物的成交价最高和最低值 ENV.api.trade + 'stat/price_deal_stat/'+category
            ,getPriceDealStat:function(_category){
                var _url = ENV.api.trade + 'stat/price_deal_stat/'+_category
                console.log(_url)
                return $http({method:'GET',url:_url})
            }
            // 销售方抢单
            ,demandOfferNew:function(_data,_id){
                var _url = ENV.api.trade + 'demand/offer_new/' + _id;
                return $http.post(_url,_data)
            }
            // 添加物流计划
            ,passPlandAdd:function(_data){
                var _url =ENV.api.pass + 'plan/add'
                console.log(_data)
                return $http.post(_url,_data)
            }
            // 获取物流计划列表
            ,passPlandGet:function(_data){
                var _url =ENV.api.pass + 'plan/get'
                return $http.post(_url,_data)
            }
            // 添加物流计划
            ,passPlandAllow:function(){
                var _url =ENV.api.pass + 'plan/allow_add'
                return $http.post(_url)
            }
            // 删除物流计划
            ,passPlandDec:function(id){
                var _url =ENV.api.pass + 'plan/dec'
                return $http.post(_url,{'plan_id':id})
            }


        }
    })
    // 上传图片显示
    .factory('fileReader', ['$q', '$log', function ($q, $log) {
        var onLoad = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result)
                })
            }
        }
        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result)
                })
            }
        }
        var getReader = function (deferred, scope) {
            var reader = new FileReader()
            reader.onload = onLoad(reader, deferred, scope)
            reader.onerror = onError(reader, deferred, scope)
            console.log(reader)
            return reader

        }
        var readAsDataURL = function (file, scope) {
            console.log('readAsDataURL', file, scope)
            var deferred = $q.defer()
            var reader = getReader(deferred, scope)
            reader.readAsDataURL(file)
            return deferred.promise
        }
        return {
            readAsDataUrl: readAsDataURL
        }

    }])


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
    // 交易各页面 navbar 信息

    // --------------- rush 订单大厅----------------//
    .controller('rushCtrl', function ($scope, $http, ENV, Storage, $ionicPopup, $location, trade158, $ionicLoading, areas,$stateParams) {

        // 判断角色，调整navright的链接地址
        $scope.navbar = {
            'navLeftHref': 'tab.tradeCarList'
            , 'navLeftIco': ''
            , 'navLeft': '组建车队'
            , 'title': '交易'
            , 'navRightHref': 'tab.rushPublish'
            , 'navRight': '发布采购'
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
        $scope.total_amount = 0
        $scope.start_page = 1
        // 请求抢单列表,拼接数据
        $scope.order = '/date';
        $scope.get_date_active = "btn-navbar3-active"
        // 搜索排序
        $scope.get_amount = function () {
            $scope.order = '/amount';
            $scope.get_amount_active = "btn-navbar3-active"
            $scope.get_date_active = ""
            $scope.getlists()
        }
        $scope.get_date = function () {
            $scope.order = '/date';
            $scope.get_date_active = "btn-navbar3-active"
            $scope.get_amount_active = ""
            $scope.getlists()
        }
        // 搜索省市县
        $scope.search_category = function (cate) {
            $scope.cate = cate
            $scope.search()
        }
        $scope.search_prov = function (prov) {
            $scope.prov = prov
            $scope.search()
        }
        $scope.search = function () {
            $ionicLoading.show();
            $scope.total_amount = 0
            var _data = {category_chn: $scope.cate, prov_storage: $scope.prov, amount: $scope.selectAmount,index:$scope.demandIndex}
            console.log('查询条件', _data)
            trade158.getDemandList(_data).success(function (data) {
                console.log('search', data)
                $scope.lists = data.data
                $scope.total_page=data.data.length;//分页，显示每个煤炭种类分页
                // 获取公司信息、获取商品信息,日期 报价方式修改
                for (var i = 0; i < $scope.lists.length; i++) {
                    getctegory($scope.lists[i].category, $scope.lists[i])
                    //获取挂单被抢数
                    getImmedia($scope.lists[i]._id, $scope.lists[i], $http, ENV)
                    $scope.total_amount += $scope.lists[i].amount

                }
                $ionicLoading.hide();
                console.log($scope.lists)
            })
            .error(function(data){
                $ionicLoading.hide();
            })
        }
        // 搜索下拉框
        $scope.search_state = false
        $scope.changeSearch = function () {
            $scope.search_state = !$scope.search_state
        }
        $scope.getlists = function (e) {
            $ionicLoading.show();
            trade158.getDemandList2($scope.order,$scope.start_page).success(function (data) {
                // if(data.status == "success"){
                console.log('getlists', data)
                // hs 标示是否需要上下刷新页面
                if (e == 'hs') {
                    var _tmp = $scope.lists
                }
                $scope.lists = data.data
                // 获取公司信息、获取商品信息,日期 报价方式修改
                for (var i = 0; i < $scope.lists.length; i++) {
                    getctegory($scope.lists[i].category, $scope.lists[i])
                    getImmedia($scope.lists[i]._id, $scope.lists[i], $http, ENV) 		//获取挂单被抢数
                  }
                if (e == 'hs') {
                    console.log('下滑之后...', $scope.start_page, Math.ceil($scope.total_page / 10))
                    for (var j = 0; j < $scope.lists.length; j++) {
                        _tmp.push($scope.lists[j])
                    }
                    if ($scope.start_page >= Math.ceil($scope.total_page / 10)) {
                        $scope.hasMore = false
                    }
                    $scope.lists = _tmp
                }
                $ionicLoading.hide();
                // console.log('订单列表',$scope.lists)
                // }
            })
            .error(function(data, status, headers, config){
                console.log(data, status, headers, config)
                $ionicLoading.hide();
            })
        }
        $scope.verification = function () {
            // 如果是销售则发布现货，如果是采购则不变
            if (Storage.get('userInfo') && Storage.get('userInfo').user.role == 'TRADE_SALE') {
                $scope.navbar.navRightHref = 'tab.'
                $scope.navbar.navRight = ''
            }
            $scope.get_total_page()
            $scope.getlists()
            // $scope.coal_total()
            $scope.getCategory()
            $scope.getProvince()
        }
        // -------产品属性
        var getctegory = function (category, i) {
            trade158.getGoodsDescs(category).success(function (data) {
                if (data.status = "success") {
                    // $scope.lists[i].desc = data.data.desc
                    i.desc = data.data.desc
                }
            })
        }
        // app搜索------
        $scope.getCategory = function () {
            trade158.getCategory().success(function (data) {
                console.log('getCategory', data)
                if (data.status == 'success') {
                    $scope.category = data.data
                    $scope.popup_lists = data.data //给app搜索产品使用
                } else {
                    $scope.msg = {error: '获取产品分类失败'}
                }
            })
        }
        // app搜索产品
        $scope.app_selectCategory = function () {
            $scope.getCategory()
            // 获取产品分类
            var _object = {templateUrl: './template/common/popup_radio.html', title: '请选择产品种类'}
            var _objmsg = {type: 'radio'}
            _popup($scope, _object, $ionicPopup, _objmsg).then(function (res) {
                if (res && res.subtype) {
                    $scope.cate = res.subtype.chn
                } else {
                    $scope.cate = ''
                }
                // $scope.changeSearch()
                // $scope.search()
            })
        }
        // 获取省份
        $scope.getProvince = function () {
            $scope.province = areas.provinces
        }
        $scope.province_nums = 6
        $scope.show_province = function () {
            $scope.province_nums = $scope.province_nums == 6 ? 32 : 6
        }
        // app搜索省份
        $scope.app_selectProcity = function () {
            var data = {city: true, area: true}
            var obj = {templateUrl: './template/common/pro_city.html', title: '请选择地区'}
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if (res && res.currentProvince) {
                    $scope.prov = res.currentProvince.name
                } else {
                    $scope.prov = ''
                }
                // 	$scope.changeSearch()
                // $scope.search()
            })
        }
        // app搜索吨位
        $scope.app_selectAmount = function () {
            $scope.popup_lists = [{chn: '最低重量数', eng: 'amount'}]
            var object = {templateUrl: './template/common/popup_radio.html', title: '请输入最低重量'}
            var objmsg = {type: 'number'}    //type类型有radio,text,number3种类型
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                if (res && res.subtype) {
                    $scope.selectAmount = res.subtype.amount
                } else {
                    $scope.selectAmount = ''
                }
                // $scope.changeSearch()
                // $scope.search()
            })
        }
        // app搜索按钮
        $scope.app_search = function (e) {
            if($stateParams.obj){
                $scope.cate = $stateParams.obj
                $scope.changeSearch()
                $scope.search()
            }
            if(e=='click'){
                $scope.changeSearch()
                $scope.search()
            }
        }
        // 上翻页下反应
        $scope.get_page = function (e) {
            console.log('上下翻页', $scope.start_page, Math.ceil($scope.total_page / 10))
            if (e == 'down' && $scope.start_page > 1) {
                $scope.start_page -= 1
                $scope.getlists()
            }
            if (e == 'up' && $scope.start_page <= Math.ceil($scope.total_page / 10) - 1) {
                $scope.start_page += 1
                $scope.getlists()
            }
        }
        // 下拉页面刷新
        $scope.doRefresh = function () {
            console.log('加载中....', $scope.start_page)
            $scope.start_page = 1
            $scope.getlists()
            $scope.$broadcast('scroll.refreshComplete');
        }
        // 上拉页面刷新
        $scope.hasMore = true
        $scope.loadMore = function () {
            console.log('总数', Math.ceil($scope.total_page / 10), '当前页', $scope.start_page)
            console.log('已有数据', $scope.lists.length)
            $scope.start_page += 1
            $scope.getlists('hs')
            $scope.$broadcast('scroll.infiniteScrollComplete');

        }
        // 获取总订单数
        $scope.get_total_page = function () {
            var _data = {}
            trade158.getDemandList(_data).success(function (data) {
                $scope.total_page = data.data.length
                for (var i = 0; i < data.data.length; i++) {
                    $scope.total_amount += data.data[i].amount
                }
                console.log('总数', $scope.total_page, $scope.total_amount)
            })
        }
        // 来自首页的跳转 地址栏传参 搜索页，即如果搜索页有参数传入，则执行下列搜索

        //
    })
//-------------采购方-----------//

    // -----------------发布抢单页--------------------//
    .controller('rushPublishController', ['$scope', '$http', 'Storage', 'ENV', '$ionicPopup', '$location', 'trade158', '$ionicModal','AccountInformation',
        function ($scope, $http, Storage, ENV, $ionicPopup, $location, trade158, $ionicModal,AccountInformation) {

            $scope.roletype=Storage.get('userInfo').user.role.split('_')[1]
            console.log($scope.roletype)
            // 初始化表单数据
            $scope.demand = {'can_join': false,message:''}
            $scope.param = {}
            // 初始显示5个属性
            $scope.show_desc_num = 7
            $scope.show_desc = function () {
                $scope.show_desc_num = $scope.show_desc_num == 7 ? 15 : 5
            }

            // 未登录退出
            if (!Storage.get('userInfo')) {
                showAlert($ionicPopup, $location).then(function (res) {
                    $location.path('/tab/login')
                });
            }

            //备注弹窗
          $scope.rushPublish_desc = function () {
            var data = {};
            var obj = {templateUrl: 'rushPublish/describe.html', title: '产品备注'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
              if (res) {
               console.log(res.comment)
                $scope.demand.comment=res.comment;
              }
            })
          };
            //$scope.demand.message = "";
            $scope.left= function() {return 2000 - $scope.demand.message.length};
            // 弹窗 category $scope.demand.category
            $scope.showCategory = function () {
                // 获取产品分类
                $scope.msg = null
                $scope.getCategory()
                var _object = {templateUrl: './template/common/popup_radio.html', title: '请选择产品种类'}
                var _objmsg = {type: 'radio'}
                _popup($scope, _object, $ionicPopup, _objmsg).then(function (res) {
                    if (res) {
                        var result = res.subtype
                        $scope.demand.category = result
                        $scope.getGoodsDescs()
                    }
                })
            }
            // 付款方式选择 $scope.demand.payment_advance $scope.demand.payment_style
            $scope.show_payment = function () {
                console.log('showPayment')
                var object = {templateUrl: './template/common/popup_radio.html', title: '请选择付款方式'}
                var objmsg = {type: 'advanced_payment'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.demand.choice_advanced_payment = res.advanced_payment
                        $scope.demand.choice_final_payment = res.final_payment
                    }
                })
            }
            $scope.showPayment_style = function () {
                // $scope.popup_lists = [{eng:['CIF','到岸价'],chn:'到岸价'},{eng:['FOB','出厂价'],chn:'出厂价'}]
                $scope.popup_lists = [{eng: ['CIF', '到岸价'], chn: '到岸价'}]
                var object = {templateUrl: './template/common/popup_radio.html', title: '请选择'}
                var objmsg = {type: 'select', subhead: '报价类型'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.demand.payment_style = res.subtype
                    }
                })
            }
            // 获取产品分类
            $scope.getCategory = function () {
                trade158.getCategory().success(function (data) {
                    console.log('getCategory', data)
                    if (data.status == 'success') {
                        $scope.popup_lists = data.data
                    } else {
                        $scope.msg = {error: '获取产品分类失败'}
                    }
                })
            }
            // 依据产品类型获取对应属性值集合 $scope.demand._desc
            $scope.getGoodsDescs = function () {
                console.log($scope.demand.category)
                if ($scope.demand.category) {
                    var goods_name = $scope.demand.category.eng
                    trade158.getGoodsDescs(goods_name).success(function (data) {
                        console.log('商品属性', data)
                        $scope.demand._desc = data.data
                    })
                }
            }
            // 获取自定义产品属性
            // 20160219 更改产品属性
            $scope.getDesc = function () {
                var _desc = $scope.demand._desc.desc
                var desc = document.getElementsByClassName('desc')
                // console.log(desc)
                for (var i = 0; i < desc.length; i++) {
                    // 如果属性值value=0 则不计入
                    if (isNaN(parseFloat(desc[i].value)) || desc[i].value == 0) continue;
                    var name = desc[i].name
                    var value = desc[i].value
                    _desc[name].value=value
                }
                // 仅保留用户修改过的属性值，新构建一个属性集合
                var newObj = {}
                for (var i in _desc) {
                    if (_desc[i].value >0) {
                        newObj[i] = _desc[i]
                    }
                }
                // 返回一个属性数组[name,value,limit,step,cost,vary]
                var re_Array = []
                for (var i in newObj) {
                    var temp = []
                    temp[0] = newObj[i].eng
                    temp[1] = newObj[i].value
                    temp[4] = newObj[i].vary
                    re_Array.push(temp)
                }
                // [“huifen”,25,1,1,10,”plus”] ,重新组织属性数组
                return re_Array
            }
            $scope.msg = {}
            // 表单判断

            $scope.submit2 = function () {
                // 获取产品类型、属性 、地点、支付方式、质检等

                if (!$scope.demand.category) {
                    $scope.msg = {category: '请选择品种'}
                    showAlert($ionicPopup, $location, {template: '请选择品种'})
                } else if (!$scope.demand.amount) {
                    $scope.msg = {amount: '请输入货物量'}
                    showAlert($ionicPopup, $location, {template: '请输入货物量'})
                } else if (!$scope.demand.location_storage) {
                    $scope.msg = {location_storage: '请选择交货地点'}
                    showAlert($ionicPopup, $location, {template: '请选择交货地点'})
                } else if (!$scope.demand.time_traffic || (new Date($scope.demand.time_traffic) < new Date() )) {
                    $scope.msg = {time_traffic: '请选择正确交货时间'}
                    showAlert($ionicPopup, $location, {template: '请选择正确交货时间'})
                }
                // else if (!$scope.demand.payment_advance) {
                //     $scope.msg = {payment_advance: '请选择预付款'}
                //     showAlert($ionicPopup, $location, {template: '请选择预付款'})
                // }
                // else if (!$scope.demand.choice_advanced_payment || !$scope.demand.choice_final_payment) {

                //     $scope.msg = {choice_advanced_payment: '请选择付款方式'}
                //     showAlert($ionicPopup, $location, {template: '请选择付款方式'})
                // }
                // 20160229,不同的结算方式和付款方式校验不同的数据
                // else if (!$scope.demand.maxprice) {
                //     $scope.msg = {maxprice: '请选择可接受最高报价'}
                //     showAlert($ionicPopup, $location, {template: '请选择可接受最高报价'})
                // }
                // 20160229 更新结算方式和付款方式种类
                else if ($scope.demand.payment_choice === undefined) {
                    showAlert($ionicPopup, $location, {template: '结算方式不完整'})
                }else if ($scope.demand.payment_method === undefined) {
                    showAlert($ionicPopup, $location, {template: '付款方式不完整'})
                }
                //
                else if ($scope.demand.desc ==undefined || $scope.demand.desc =='') {
                    $scope.msg = {desc: '产品结算细则描述不完整'}
                    showAlert($ionicPopup, $location, {template: '产品结算细则描述不完整'})
                } else if ($scope.demand.att_traffic === undefined) {
                    $scope.msg = {att_traffic: '物流结算细则描述不完整'}
                    showAlert($ionicPopup, $location, {template: '物流结算细则描述不完整'})
                }
                else if ($scope.demand.time_traffic < $scope.demand.time_validity) {
                    $scope.msg = {time_validity: '请选择正确有效期'}
                    showAlert($ionicPopup, $location, {template: '请选择正确有效期'})
                } else if (!$scope.demand.quality_origin) {

                  $scope.msg = {quality_origin: '质检结果'}
                  showAlert($ionicPopup, $location, {template: '质检结果'})
                } else {
                    var rushPushlish_bold = {
                        category: $scope.demand.category.eng 				//产品类型
                        // ,category_chn: 									//产品类型中文名
                        , price: $scope.demand.maxprice ? parseFloat($scope.demand.maxprice) : 0 	//价格
                        , amount: parseFloat($scope.demand.amount) 				//数量
                        , amount_remain: parseFloat($scope.demand.amount) 			//货物总吨数剩余
                        // ,desc				: $scope.demand.desc 					//产品参数
                        , time_traffic: formatdata($scope.demand.time_traffic) 			//提货/到货时间
                        , location_storage: $scope.demand.location_storage 		//交货地点
                        // , payment_advance: parseInt($scope.demand.payment_advance) 		//预付款 20160229废弃
                        // ,payment_style		: $scope.demand.payment_style[0] 			//报价方式
                        , payment_style: 'CIF' 	//到岸价
                        , time_validity: formatdata(distanceDate($scope.demand.time_validity)) 			//有效期
                        ,appendix:$scope.demand.message  //货物备注
                        , can_join: $scope.demand.can_join 				//凑单
                        , att_product: $scope.demand.desc 			//货品结算细则
                        , att_traffic: $scope.demand.att_traffic 			//物流结算细则
                        // ,att_liability		: $scope.demand.att_liability 			//违约责任
                        // 20151216 新增2个属性 20160229 废弃
                        // , choice_advanced_payment: $scope.demand.choice_advanced_payment[0]  	//预付款支付方式
                        // , choice_final_payment: $scope.demand.choice_final_payment[0]  	//尾款支付方式
                        // 20160105增加4个属性
                        , location_longitude: $scope.demand.location_longitude 	//仓库经度值
                        , location_latitude: $scope.demand.location_latitude 		//仓库纬度值
                        , prov_storage: $scope.demand.prov_storage 				//仓库所在省代号
                        , city_storage: $scope.demand.city_storage 				//仓库所在市代号
                        // 20160229 新增结算方式，支付方式,质检方
                        ,payment_choice:$scope.demand.payment_choice.eng
                        ,payment_method:$scope.demand.payment_method.eng
                        ,quality_origin:$scope.demand.quality_origin.eng
                        ,offer_limit:$scope.demand.offer_limit ? $scope.demand.offer_limit.eng : 'all'
                        ,list_un_offer:$scope.demand.offer_limit=='all' ? [] : $scope.demand.listUnOffer
                    }
                     console.log(rushPushlish_bold)
                    // 20160229 若分期，则增加首款尾款质保款 发布范围(需要判断是否需要拉取用户列表)
                    if($scope.demand.payment_method.eng == 'partition'){
                        // 复制再执行发布
                        rushPushlish_bold.percent_advance= parseInt($scope.demand.percent_advance)
                        // rushPushlish_bold.exist_payment_middle=$scope.demand.exist_payment_middle ? true:false;
                        // rushPushlish_bold.percent_middle=$scope.demand.exist_payment_middle ? parseInt($scope.demand.percent_middle) : 0
                         // rushPushlish_bold.percent_remain=$scope.demand.exist_payment_middle ?(100 - parseInt($scope.demand.percent_advance)-parseInt($scope.demand.percent_middle)) :( 100-parseInt($scope.demand.percent_advance))
                         rushPushlish_bold.percent_remain= 100-parseInt($scope.demand.percent_advance)
                        console.log(rushPushlish_bold)
                        $scope.publish2(rushPushlish_bold)
                    }
                    // 20160229 若信用，则新增到期时长，计息器
                    if($scope.demand.payment_method.eng == 'credit'){
                        rushPushlish_bold.ref_day_extension=$scope.demand.ref_day_extension.eng
                        rushPushlish_bold.count_day_extension=parseInt($scope.demand.count_day_extension)
                        $scope.publish2(rushPushlish_bold)
                    }
                    if($scope.demand.payment_method.eng == 'all_cash'){
                        $scope.publish2(rushPushlish_bold)
                    }
                    if($scope.demand.payment_method.eng == 'all_goods'){
                        // rushPushlish_bold.count_day_extension=parseInt($scope.demand.count_day_extension)
                        $scope.publish2(rushPushlish_bold)
                    }
                    // $scope.publish2(rushPushlish_bold)


                }
            }
            // 发布数据
            $scope.publish2 = function (rushPushlish_bold) {
                trade158.getDemandNew(rushPushlish_bold).success(function (data) {
                        console.log(data)
                        if (data.status == 'invalid_format') {
                            showAlert($ionicPopup, $location, {template: '产品细则和物流细则必须填写完整'})
                        }
                        if (data.status == 'success') {
                            var obj = {template: "发布成功", title: '提示'}
                            showAlert($ionicPopup, $location, obj).then(function (res) {
                                $location.path('/tab/rush')
                            })
                        }
                    })
            }
            //修改产品细则 $scope.demand.desc $scope.demand.att_product
            $scope.attr_obj = {}
            $scope.modifAttproduct = function () {
                // 获取自定义属性
                $scope.msg = null
                console.log($scope.demand._desc)
                if ( !$scope.demand._desc || $scope.demand._desc=='') {
                    var obj = {template: '<span>请选择产品类型</span>', title: '提示'}
                    $scope.msg = {category: '请选择产品属性'};
                    _showConfirm($ionicPopup, $location, obj)
                    return false
                }
                $scope.demand.desc = $scope.getDesc()
                if ( $scope.demand.desc=='') {
                    var obj = {template: '<span>至少给一个产品属性赋值</span>', title: '提示'}
                    _showConfirm($ionicPopup, $location, obj)
                    return false
                }
                console.log('获取自定义属性', $scope.getDesc())
                var object = {templateUrl: 'rushPublish/attproduct4.html', title: '产品结算细则', css: 'trade'}
                // 回填数据
                var objmsg = {data: {}}
                for (var i in $scope.attr_obj) {
                    objmsg.data[i] = $scope.attr_obj[i]
                    console.log('objmsg', objmsg.data)
                }
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.attr_obj = res.data
                        for (var i = 0; i < $scope.demand.desc.length; i++) {
                            var _temp = $scope.demand.desc[i][0]
                            if ($scope.attr_obj[_temp]) {
                                $scope.demand.desc[i][2] = typeof($scope.attr_obj[_temp].step) != 'undefined' ? $scope.attr_obj[_temp].step : 0
                                $scope.demand.desc[i][3] = typeof($scope.attr_obj[_temp].cost) != 'undefined' ? $scope.attr_obj[_temp].cost : 0
                            }
                        }
                        $scope.attproduct = true;
                    }

                })
            }
            // 修改物流细则 $scope.demand.att_traffic
            $scope.modifAtttraffic = function () {
                // 获取弹窗,[false,0.5,1,100,true,1,100]
                $scope.msg = null
                var object = {templateUrl: 'rushPublish/atttraffic5.html', title: '物流结算细则',css: 'trade'}
                var objmsg = {time:'false',weight:'1'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {

                    $scope.demand.att_traffic =[]
                    if(res.weight=='3'){
                        $scope.demand.att_traffic[0]= parseInt(res.weight)
                        $scope.demand.att_traffic[1]= parseFloat(res.weight_step)
                        $scope.demand.att_traffic[2]= parseFloat(res.weight_cost)
                    }else{
                        $scope.demand.att_traffic[0]= parseInt(res.weight)
                        $scope.demand.att_traffic[1]=0
                        $scope.demand.att_traffic[2]=0
                    }
                    if(res.time=='true'){
                        $scope.demand.att_traffic[3]=res.time
                        $scope.demand.att_traffic[4]= parseFloat(res.cost_time_trade)
                        $scope.demand.att_traffic[5]= parseFloat(res.cost_time_traffic)
                    }else{
                        $scope.demand.att_traffic[3]=res.time
                        $scope.demand.att_traffic[4]=0
                        $scope.demand.att_traffic[5]=0
                    }
                    $scope.atttraffic = true;
                })
            }
            // 违约责任
            // $scope.modifAttliability=function(){
            // 	var object = {templateUrl:'rushPublish/attliability.html',title:'违约责任细则'}
            //     var objmsg = {}
            // 	_popup($scope, object, $ionicPopup, objmsg).then(function(res){
            // 		if(res)	$scope.demand.att_liability = res.text
            // 	})
            // }
            // 选择仓库弹窗
            $scope.getstorage = function () {
                // 获取仓库列表
                trade158.getCompanyTradeStore().success(function (data) {
                    if (data.status == 'success') {
                        $scope.location_storages = data.data
                    } else {
                      console.log('')
                        // 获取仓库失败
                    }
                })
                // 配置弹窗
                var object = {templateUrl: 'rushPublish/locationstorage.html', title: '选择仓库地址'}
                var objmsg = {}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    console.log('仓库弹窗',res)
                    if (res && res.storage) {
                        if (res.storage[4] == res.storage[3]) {
                            $scope.demand._location_storage = res.storage[4] + res.storage[2] + res.storage[1]
                        } else {
                            $scope.demand._location_storage = res.storage[4] + res.storage[3] + res.storage[2] + res.storage[1]
                        }
                        // $scope.demand._location_storage = res.storage[4] + res.storage[3] + res.storage[2] + res.storage[1]
                        $scope.demand.location_storage = res.storage[0]
                        $scope.demand.location_longitude = res.storage[6]
                        $scope.demand.location_latitude = res.storage[5]
                        $scope.demand.prov_storage = res.storage[4]
                        $scope.demand.city_storage = res.storage[3]

                    }
                })
            }
            // 获取键盘事件
            // 日历
            $scope.changeDate = function () {
                var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
                var objmsg = {type: 'changeDate',minDate:moment().add('day',1).format()}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        console.log(res)
                        $scope.demand.time_traffic = res.dt
                    }
                })
            }
            // 分享页面
          _ionicModal($ionicModal,$scope,'./template/common/publish_store.html').then(function (modal) {
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
            // 20160229 改版
            // 调整结算方式，支付方式，质检等
            $scope.selPaymentChoice=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '结算方式'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'cash', chn: '现金结算'}, {eng: 'bill_bank', chn: '银行兑票'}
                , {eng: 'bill_com', chn: '商业兑票'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res)
                    $scope.demand.payment_choice=res.subtype
                })
            }
            $scope.selPaymentMethod=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '付款方式'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'all_cash', chn: '款到发货'}, {eng: 'all_goods', chn: '货到付款'}
                , {eng: 'partition', chn: '分期付款'},{eng: 'credit', chn: '信用付款'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    if(res && res.subtype){
                        $scope.demand.payment_method=res.subtype
                    }
                    // 使用partition 页面提示错误信息，或许是关键字
                })
            }
            $scope.selRefDayExtension=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '延期计算标准'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'order', chn: '双方确认订单日'}, {eng: 'goods', chn: '货到并完成质检日'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    $scope.demand.ref_day_extension=res.subtype
                })
            }
            $scope.selQualityOrigin=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '质检方选择'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'demand', chn: '以采购方的质检结果为准'}, {eng: 'other', chn: '以第三方的质检结果为准'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res)
                    $scope.demand.quality_origin=res.subtype
                })
            }
            $scope.selOfferLimit=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '发布范围'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'all', chn: '全平台'}, {eng: 'limited', chn: '认证企业'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    $scope.demand.offer_limit=res.subtype
                    if(res.subtype.eng=='limited'){
                        var _param = {page: 0,name: '', type: 'TRADE',getType: 1}
                      AccountInformation.getCompanyCertification(_param).then(function (result) {
                        if (result.status == 'success') {
                            var _arr = result.data.company
                            var arr =[]
                            for(var i=0;i<_arr.length;i++){
                                arr.push(_arr[i]._id)
                            }
                            console.log(arr)
                            $scope.demand.listUnOffer=arr
                          } else {
                            console.log(result)
                        }
                      });
                    }
                })
            }

        }])

    // ------------------ rushDetailCtrl 采购抢单详情页 -------------//
    .controller('rushDetailCtrl', function ($scope, $http, $stateParams, ENV, Storage, $location, $ionicPopup, $ionicModal,$state,trade158,$interval,$filter,AccountInformation) {
        // 未登录退出
        // if (!Storage.get('userInfo')) {
        //     showAlert($ionicPopup, $location).then(function (res) {
        //         console.log(res)
        //         // $location.path('/tab/login')
        //     });
        // }

        $scope.goback = function () {
            window.history.go(-1)
        }
        // 增加一个加载页面，逐步执行：获取订单详情、货品字典、
        $scope.demand_detail = {}
        // 挂单信息 ：demand_detail/:id
        // 角色判断 和 不是自己的订单是否可以编辑
        $scope.user = Storage.get('userInfo').user
        console.log($scope.user)
        $scope.demand_detail={}
        // 获取订单信息
        $scope.id = $stateParams.id;

        trade158.getDemandDetail($scope.id).success(function (data) {
            console.log('元数据', data)
            if (data.status = "success") {
                $scope.demand_detail = data.data.entry
                getDetail($scope.demand_detail.company_id, $scope.demand_detail.category)
                $scope.getofferlists()
                console.log('元数据', $scope.demand_detail)

            }
        })
        // 倒计时


        // $scope.$watch('demand_detail.time_validity',function(){
        //     if($scope.demand_detail.time_validity){
        //         console.log('-----33------')
        //         $interval(function(){
        //             $scope.clock = $filter('dateInterval')($scope.demand_detail.time_traffic,'hs')
        //         },1000)
        //     }
        // })

        // 获取抢单信息
        $scope.offer = {}
        $scope.detail_Immediately = true 	//是否允许抢单
        $scope.getPriceActive = 4; //初始值

        // 价格排名
        $scope.get_price = function (e) {
            console.log('价格')
            switch(e){
                case 'price':
                    $scope.getPriceActive=4
                    $scope.getofferlists('price')
                    break;
                case 'gross':
                    $scope.getPriceActive=8
                    $scope.getofferlists('gross')
                    break
                case 'time_arrival':
                    $scope.getPriceActive=16
                    $scope.getofferlists('time_arrival')
                    break
                case 'self':
                    $scope.getPriceActive=32
                    $scope.Myofferid = {company_id: $scope.user.company_id}
                    break
                default:
                    console.log(e)
                    return false
            }
        }
        // 抢单列表
        $scope.getofferlists = function (method) {
            var page = 1;
            $scope.Myofferid = {}
            trade158.getDemandofferCount($scope.id).success(function (data) {
                console.log(data)
                $scope.offer.count = data.data.entry_count
            })
            trade158.getDemandOfferList($scope.id,page,method).success(function (data) {
                // var lists=data.data
                $scope.offerLists = data.data
                for (var i = 0; i < $scope.offerLists.length; i++) {
                    getlocation($scope.offerLists[i].location_storage, $scope.offerLists[i], $http, ENV)
                    $scope.offerLists[i].select = true
                    if ($scope.offerLists[i].company_id == $scope.user.company_id) {
                        $scope.offerLists[i].offer_edit = true
                        $scope.detail_Immediately = false 	//不允许抢单
                    } else {
                        $scope.offerLists[i].offer_edit = false
                    }
                    getcompany($scope.offerLists[i].company_id, $scope.offerLists[i], $http, ENV)

                }
                // $scope.offer.lists = lists
                console.log('offer.lists', $scope.offerLists)
            })
        }

        // 选择销售方
        $scope.sucOffer = []; //存放抢单id
        $scope.orderCount = $scope.sucOffer.length; 	//已选家数

        /// 当点击选购时
        $scope.seloffer = function (a, b, c, d) {
            var a = a + '_' + c + '_' + d
            _showConfirm($ionicPopup, $location, {template:"确认针对该抢单下单?",title:"提示"}).then(function(res){
                if(res){
                    $scope.sucOffer.push(a)
                    $scope.orderSubmit()
                }else{
                    $scope.sucOffer=[]
                }
            })
        }
        // 统计已选采购方,并提交形成订单
        /*
         *	若需要在订单流程中才可以形成订单，则需要传递参数到订单列表中
         *	若不到挂单结束不让执行。对此可以修改服务端
         */
        $scope.orderSubmit = function () {
            // 未登录退出
                // 发起订单流程
                var orderChangeAmount = $scope.sucOffer[0].split('_')
                console.log(orderChangeAmount)
                var object = {
                    templateUrl: './template/common/popup_radio.html',
                    title: '提示:' + orderChangeAmount[1] + '≥分配吨数不低于≥' + orderChangeAmount[2]
                }
                var objmsg = {type: 'number'}
                $scope.popup_lists = [{eng: 'amount', chn: '分配吨数'}]
                if (!$scope.demand_detail.can_join) {
                    $scope.pushOrder(orderChangeAmount[0], $scope.demand_detail.amount)
                } else {
                    _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                        if (res && res.subtype) {
                            if (res.subtype.amount >= parseFloat(orderChangeAmount[2]) && res.subtype.amount <= parseFloat(orderChangeAmount[1])) {
                                // console.log('tong',res.subtype.amount,$scope.demand_detail.amount)
                                $scope.pushOrder(orderChangeAmount[0], parseFloat(res.subtype.amount))
                            } else {
                                showAlert($ionicPopup, $location, {template: '采购方最高凑单数 ≥ 分配吨数 ≥ 采购方最低凑单数', title: '提示'})
                            }
                        }
                    })
                }
            // }
        }
        // 发起订单
        $scope.pushOrder = function (_id, _amount) {
            var _data = {amount: _amount}
            trade158.getDemandOrderNew($scope.demand_detail._id,_id,_data).success(function (data) {
                console.log(data) //id:"5681ffe50dd4558c1459cbe6"
                if (data.status == 'success') {
                    // $location.path('/tab/eBankIncome/eBankIncomeL/eBankIncomeLts')
                    console.log('/tab/tradeOrder/' + data.data.id)
                    $location.path('/tab/tradeOrder/' + data.data.id)
                } else {
                    if (data.status == 'not_allow') {
                        if ($scope.demand_detail.validity) {
                            var obj = {template: '需等该挂单有效期失效后才可操作。', title: '信息提示'}
                            showAlert($ionicPopup, $location, obj)
                        } else {
                            var obj = {template: '不允许下单', title: '信息提示'}
                            showAlert($ionicPopup, $location, obj)
                        }

                    }
                    if (data.status == 'already_exist') {
                        var obj = {template: '不允许重复下单', title: '信息提示'}
                        showAlert($ionicPopup, $location, obj)
                    }
                }
            })
        }
        //销售抢单
        $scope.saleSubmit = function () {
            // 未登录退出
            if (!Storage.get('userInfo')) {
                showAlert($ionicPopup, $location).then(function (res) {
                    $location.path('/tab/login')
                });
            }
            if ($scope.demand_detail.company_id == $scope.user.company_id) {
                var obj = {template: '这是自己公司的需求单,不能抢单', title: '提示'}
                showAlert($ionicPopup, $location, obj)
            } else if (!$scope.detail_Immediately) {
                var obj = {template: '不允许重复下单', title: '提示'}
                showAlert($ionicPopup, $location, obj)
            } else {
                $location.path('tab/rushImmediately/' + $scope.demand_detail._id + '/null')
            }

        }

        // 公司名称、发单人、商品属性
        var getDetail = function (company_id, category) {
            $http({
                method: 'POST'
                , url: ENV.api.account + 'company_trade/get_one/'
                , data: {company_id: company_id}
            }).success(function (data) {
                $scope.demand_detail.company_fullname = data.data.full_name
            })

            trade158.getGoodsDescs(category).success(function (data) {
                if (data.status = "success") {
                    $scope.desc = data.data.desc
                }
            })
        }
        // 修改自己的挂单数据
        $scope.getdemandoffer = function (x) {
            return $http({
                method: 'GET'
                , url: ENV.api.trade + 'demand/offer_detail/' + x
            })
        }
        $scope.self_offer_edit = function (x, y) {
            console.log(x, y)
            $scope.getdemandoffer(x).success(function (data) {
                if (data.status == 'success') {
                    var cishu = data.data.entry.change_remain
                    var object = {templateUrl: './template/common/popup_radio.html', title: '提示信息'}
                    if (cishu <= 0) {
                        var objmsg = {type: 'confirm', text: '修改次数已用完'}
                        _popup($scope, object, $ionicPopup, objmsg)
                    } else {
                        var objmsg = {type: 'confirm', text: '剩余修改次数' + cishu + '，确认修改吗？'}
                        _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                            if (res) {
                                $location.path('tab/rushImmediately/' + $scope.demand_detail._id + '/' + x)
                            }
                        })
                    }
                }

            })

        }
        // 销售查看自己发布的抢单
        $scope.getMyoffer = function () {

            $scope.Myofferid = {company_id: $scope.user.company_id}
        }
        // 分享页面
        // $ionicModal.fromTemplateUrl(, {
        //     scope: $scope,
        //     animation: 'slide-in-up',
        //     backdropClickToClose: true,
        //     hardwareBackButtonClose: true
        // })
        _ionicModal($ionicModal,$scope,'./template/common/share.html').then(function (modal) {
            $scope.modal = modal;
        });

        $scope.share = function () {
            $scope.modal.show();
        }
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
            console.log(type)
            switch (type) {
                case'sms' :
                    $state.go('tab.shareSMS', {type: 'tradeDemand', id: $scope.demand_detail._id});
                    break;
            }
        }
        // 20160308 新增申请认证
        $scope.demandApply=function(){
            AccountInformation.apply($scope.demand_detail.company_id).then(function (result) {
               if(result.status=='success'){
                    showAlert($ionicPopup, $location, {template: '提交成功'})
               }
           })
        }
    })

// ------------销售方-------------//
    // 立即抢单
    .controller('rushImmediatelyCtrl', function ($scope, $http, $ionicPopup, $stateParams, $location, ENV, StoreManage, $filter,trade158,$ionicModal,Storage) {
        $scope.navbar = {
            'navLeftHref': 'tab.'
            , 'navLeftIco': 'ion-ios-arrow-back'
            , 'navLeft': '返回'
            , 'title': '立即抢单'
            , 'navRightHref': 'tab.rushImmediately'
            , 'navRight': ''
            , 'navRightIco': ''
            , 'navRighthide': ''
        }
        // 显示订单详情
        // var id = '5667f2327664dbd020054942'; //页面参数传递
        $scope.id = $stateParams.id;
        $scope.roletype=Storage.get('userInfo').user.role.split('_')[1]
        $scope.getdemand = function () {
            trade158.getDemandDetail($scope.id).success(function (data) {
                if (data.status = "success") {
                    $scope.demand_detail = data.data.entry
                    getDetail($scope.demand_detail.category)

                }
            })
        }
        //商品属性
        var getDetail = function (category) {
            // 商品属性
            trade158.getGoodsDescs(category).success(function (data) {
                if (data.status = "success") {
                    $scope.desc = data.data.desc
                }
            })
        }
        // 提交抢单信息
        $scope.sale = {}
        $scope.upImmediate = function () {
            if ($scope.demand_detail.payment_method.eng=='partition' && !$scope.sale.percent_advance) {
                $scope.msg = {percent_advance: '请选择合理付款比例'}
                console.log($scope.demand_detail)
                showAlert($ionicPopup, $location, {template: '预付款比例不能为空，且不能高于采购需求', title: '提示'})
            } else
            if (!$scope.sale.time_depart || (new Date($scope.sale.time_depart) < new Date() )) {
                $scope.msg = {time_depart: '请选择合理时间'}
                showAlert($ionicPopup, $location, {template: '时间不能为空,且不能小于当前时间', title: '提示'})
            } else if(!$scope.sale.time_arrival || (new Date($scope.sale.time_arrival) < new Date($scope.sale.time_depart) )){
                showAlert($ionicPopup, $location, {template: '到货时间需大于交货时间', title: '提示'})
            }
            else if (!$scope.sale.location_storage) {
                $scope.msg = {location_storage: '请选择仓库'}
                showAlert($ionicPopup, $location, {template: '请选择仓库', title: '提示'})
            } else if (parseFloat($scope.sale.amount) > $scope.demand_detail.amount > parseFloat($scope.sale.amount)) {
                $scope.msg = {amount: '不能超过采购量'}
                showAlert($ionicPopup, $location, {template: '凑单数不能超过采购量', title: '提示'})
            }else if ( parseFloat($scope.sale.amount_low) > parseFloat($scope.sale.amount)) {
              $scope.msg = {amount: '不能超过采购量'}
              showAlert($ionicPopup, $location, {template: '最低凑单数不高于最高凑单数', title: '提示'})
            }else if($scope.sale.exist_payment_middle && ( 100-parseInt($scope.sale.percent_advance)-parseInt($scope.sale.percent_middle) ) < 1){
                showAlert($ionicPopup, $location, {template: '首付款和质保款之后不能超过99', title: '提示'})
            } else {
                var _data = {
                    price: parseFloat($scope.sale.price)
                    // , payment_advance: parseInt($scope.sale.payment_advance)
                    , amount: $scope.sale.amount ? parseFloat($scope.sale.amount) : $scope.demand_detail.amount
                    , amount_low: parseFloat($scope.sale.amount_low) ? parseFloat($scope.sale.amount_low) : 0
                    // , time_traffic: formatdata($scope.sale.time_traffic)
                    , location_storage: $scope.sale.location_storage
                    // ,anonymity 			: $scope.sale.anonymity 	//匿名
                    // ,join 				: $scope.sale.join 			//可凑单
                    // 20160229 新增结算方式，支付方式，提货和到货时间
                    ,payment_choice:$scope.sale.payment_choice.eng
                    ,payment_method:$scope.sale.payment_method.eng
                    ,time_depart:formatdata($scope.sale.time_depart)
                    ,time_arrival:formatdata($scope.sale.time_arrival)
                }

                // 依据支付方式的不同,添加不同的数据

                if($scope.sale.payment_method.eng=='partition'){
                    _data.percent_advance=parseInt($scope.sale.percent_advance)
                    _data.exist_payment_middle=$scope.sale.exist_payment_middle ? $scope.sale.exist_payment_middle : false
                    _data.percent_middle=$scope.sale.exist_payment_middle ? parseInt($scope.sale.percent_middle) : 0
                    //_data.percent_remain=$scope.sale.exist_payment_middle ? (100-parseInt($scope.sale.percent_advance)-parseInt($scope.sale.percent_middle)) : (100-parseInt($scope.sale.percent_advance))
                  console.log(_data)
                  _data.count_day_extension=parseInt($scope.sale.count_day_extension)
                  _data.percent_remain= 100-parseInt($scope.sale.percent_advance)

                    $scope.demand_offer_new(_data)
                }else if($scope.sale.payment_method.eng=='credit'){
                    _data.ref_day_extension=$scope.sale.ref_day_extension.eng
                    _data.count_day_extension=parseInt($scope.sale.count_day_extension)
                    console.log(_data)
                    $scope.demand_offer_new(_data)
                }else if($scope.sale.payment_method.eng=='all_goods'){
                    _data.count_day_extension=parseInt($scope.sale.count_day_extension)
                    $scope.demand_offer_new(_data)
                }else{
                    console.log(_data)
                    $scope.demand_offer_new(_data)
                }
                // $scope.demand_offer_new(_url, _data)
            }
        }
        $scope.demand_offer_new = function (_data) {
            trade158.demandOfferNew(_data,$scope.demand_detail._id).success(function (data) {
                console.log(data)
                if (data.status == 'success') {
                    showAlert($ionicPopup, $location, {template: '恭喜你已抢单成功', title: '提示'}).then(function (res) {
                         $location.path('/tab/rushDetail/'+$scope.id)
                        //$location.path('/tab/rush')
                    })
                } else {
                    showAlert($ionicPopup, $location, {template: data.status})
                }
                // $location.path('/tab/rush')
            })
        }
        // 选择仓库地点弹窗
        $scope.popLstorage = function () {
            trade158.getCompanyTradeStore().success(function (data) {
                $scope.location_storages = data.data
                console.log($scope.location_storages)
            })
            $scope.data = {}
            var object = {templateUrl: 'rushImmediately/popLstorage.html', title: '选择仓库地址'}
            var objmsg = {}
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                // 如果有数据返回
                if (res) {
                    $scope.sale.location_storage = res.storage[0]
                    if (res.storage[4] == res.storage[3]) {
                        $scope.sale.location_storage_num = res.storage[4] + res.storage[2] + res.storage[1]
                    } else {
                        $scope.sale.location_storage_num = res.storage[4] + res.storage[3] + res.storage[2] + res.storage[1]
                    }

                }
            })
        }
        // 获取挂单数据
        $scope.getdemandoffer = function () {
            trade158.getDemandOfferDetail($stateParams.offerid).success(function (data) {
                console.log('getdemandoffer', data)
                if (data.status == 'success') {
                    $scope.sale = data.data.entry

                    StoreManage.getInfoById(data.data.entry.location_storage).then(function (result) {
                        $scope.sale.location_storage_num = $filter('rsc.address')(result);

                    });
                }
            })

        }
        // 修改
        $scope.modifyImmediate = function () {if (!$scope.sale.price) {
                showAlert($ionicPopup, $location, {template: '请选择合理价格', title: '提示'})
            } else if ($scope.demand_detail.payment_method=='partition' && (!$scope.sale.payment_advance)) {
                showAlert($ionicPopup, $location, {template: '请选择合理付款比例', title: '提示'})
            } else if (!$scope.sale.time_depart || (new Date($scope.sale.time_depart) < new Date() )) {
                showAlert($ionicPopup, $location, {template: '请选择合理时间', title: '提示'})
            } else if(!$scope.sale.time_arrival || (new Date($scope.sale.time_arrival) < new Date($scope.sale.time_depart) )){
                showAlert($ionicPopup, $location, {template: '到货时间需大于提货时间', title: '提示'})
            }else if (!$scope.sale.location_storage) {
                showAlert($ionicPopup, $location, {template: '请选择仓库', title: '提示'})
            } else {
                var _data = {
                    price: $scope.sale.price
                    , amount: $scope.sale.amount ? parseFloat($scope.sale.amount) : $scope.demand_detail.amount
                    , amount_low: parseFloat($scope.sale.amount_low)
                    , location_storage: $scope.sale.location_storage
                    ,payment_choice:$scope.sale.payment_choice.eng
                    ,payment_method:$scope.sale.payment_method.eng
                    ,time_depart:formatdata(new Date($scope.sale.time_depart) )
                    ,time_arrival:formatdata(new Date($scope.sale.time_arrival) )
                }
                if($scope.sale.payment_method.eng=='partition'){
                    _data.percent_advance=parseInt($scope.sale.percent_advance)
                    _data.exist_payment_middle=$scope.sale.exist_payment_middle
                    _data.percent_middle=$scope.sale.exist_payment_middle ? parseInt($scope.sale.percent_middle) : 0
                    //_data.percent_remain=$scope.sale.exist_payment_middle ? (100-parseInt($scope.sale.percent_advance)-parseInt($scope.sale.percent_middle)) : (100-parseInt($scope.sale.percent_advance))
                  _data.percent_remain= 100-parseInt($scope.demand.percent_advance)
                    $scope.sendModify(_data)
                }else if($scope.sale.payment_method.eng=='credit'){
                    _data.ref_day_extension=$scope.sale.ref_day_extension.eng
                    _data.count_day_extension=parseInt($scope.sale.count_day_extension)
                    $scope.sendModify(_data)
                }else if($scope.sale.payment_method.eng=='all_goods'){
                    _data.count_day_extension=parseInt($scope.sale.count_day_extension)
                    $scope.sendModify(_data)
                }else{
                    $scope.sendModify(_data)
                }


            }
        }
        // 修改
        $scope.sendModify = function(_data){
            trade158.getDemandOfferEdit($scope.offerid,_data).success(function (data) {
                if (data.status == 'success') {
                    showAlert($ionicPopup, $location, {template: '修改成功', title: '提示'}).then(function (res) {
                        $location.path('/tab/rushDetail/' + $scope.id)
                    })
                } else {
                    showAlert($ionicPopup, $location, {template: '修改失败', title: '提示'})
                }
            })
        }
        $scope.start = function () {
            // 获取需求信息
            $scope.getdemand()
            $scope.offerid = $stateParams.offerid
            if ($scope.offerid!='null') {
                $scope.getdemandoffer()
            }
        }
        $scope.start()
        // 日历
        $scope.changeDate = function (e) {
            var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
            if($scope.sale.time_depart){
                var _minDate = moment($scope.sale.time_depart).format()
            }else{
                var _minDate = moment().add('day',1).format()
            }
            var objmsg = {type: 'changeDate',minDate:_minDate}
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                if (res) {
                    console.log(res)
                    if(e=='depart'){
                        $scope.sale.time_depart = res.dt
                    }else{
                        $scope.sale.time_arrival = res.dt
                    }

                }
            })
        }
        // 分享页面
        // $ionicModal.fromTemplateUrl('./template/common/publish_store.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up',
        //     backdropClickToClose: true,
        //     hardwareBackButtonClose: true
        // })
        _ionicModal($ionicModal,$scope,'./template/common/publish_store.html').then(function (modal) {
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
        //
        // 调整结算方式，支付方式，质检等
            $scope.selPaymentChoice=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '结算方式'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'cash', chn: '现金结算'}, {eng: 'bill_bank', chn: '银行兑票'}
                , {eng: 'bill_com', chn: '商业兑票'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    console.log(res)
                    $scope.sale.payment_choice=res.subtype
                })
            }
            $scope.selPaymentMethod=function(){
                var obj = {templateUrl: './template/common/popup_radio.html', title: '付款方式'}
                var data = {type: 'radio'}
                $scope.popup_lists = [{eng: 'all_cash', chn: '款到发货'}, {eng: 'all_goods', chn: '货到付款'}
                , {eng: 'partition', chn: '分期付款'},{eng: 'credit', chn: '信用付款'}]
                _popup($scope, obj, $ionicPopup, data).then(function (res) {
                    $scope.sale.payment_method=res.subtype
                })
            }
        $scope.selRefDayExtension=function(){
            var obj = {templateUrl: './template/common/popup_radio.html', title: '延期计算标准'}
            var data = {type: 'radio'}
            $scope.popup_lists = [{eng: 'order', chn: '订单日'}, {eng: 'goods', chn: '货到日'}]
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                $scope.sale.ref_day_extension=res.subtype
            })
        }

    })
    // 再次进入挂单详情中
    //
// ---------发布现货-------------//
    .controller('supplyPublishCtrl', ['$scope', '$http', 'Storage', 'ENV', '$ionicPopup', '$location', 'trade158',
        function ($scope, $http, Storage, ENV, $ionicPopup, $location, trade158) {

            // 初始化表单数据
            $scope.demand = {'can_join': false}
            $scope.param = {}
            $scope.show_desc_num = 5
            // 新增
            $scope.show_desc = function () {
                $scope.show_desc_num = $scope.show_desc_num == 5 ? 15 : 5
            }
            // 之前 发布订单数据
            // 未登录退出
            if (!Storage.get('userInfo')) {
                showAlert($ionicPopup, $location).then(function (res) {
                    $location.path('/tab/login')
                });
            }
            console.log('supplyPublishCtrl')
            // 弹窗 category $scope.demand.category
            $scope.showCategory = function () {
                // 获取产品分类
                console.log($scope.msg.category)
                $scope.getCategory()
                var _object = {templateUrl: './template/common/popup_radio.html', title: '请选择产品种类'}
                var _objmsg = {type: 'radio'}
                _popup($scope, _object, $ionicPopup, _objmsg).then(function (res) {
                    console.log(res)
                    if (res) {
                        var result = res.subtype
                        $scope.demand.category = result
                        $scope.getGoodsDescs()
                    }
                })
            }
            // 付款方式选择 $scope.demand.payment_advance $scope.demand.payment_style
            $scope.show_payment = function () {
                console.log('showPayment')
                var object = {templateUrl: './template/common/popup_radio.html', title: '请选择付款方式'}
                var objmsg = {type: 'advanced_payment'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.demand.choice_advanced_payment = res.advanced_payment
                        $scope.demand.choice_final_payment = res.final_payment
                    }
                })
            }
            // 报价方式
            $scope.showPayment_style = function () {
                $scope.popup_lists = [{eng: ['CIF', '到岸价'], chn: '到岸价'}]
                var object = {templateUrl: './template/common/popup_radio.html', title: '请选择'}
                var objmsg = {type: 'select', subhead: '报价类型'}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        $scope.demand.payment_style = res.subtype
                    }
                })
            }
            // 获取产品分类
            $scope.getCategory = function () {
                trade158.getCategory().success(function (data) {
                    console.log('getCategory', data)
                    if (data.status == 'success') {
                        $scope.popup_lists = data.data
                    } else {
                        $scope.msg = {error: '获取产品分类失败'}
                    }
                })
            }
            // 依据产品类型获取对应属性值集合 $scope.demand._desc
            $scope.getGoodsDescs = function () {
                console.log($scope.demand.category)
                if ($scope.demand.category) {
                    var goods_name = $scope.demand.category.eng
                    trade158.getGoodsDescs(goods_name).success(function (data) {
                        console.log('商品属性', data)
                        $scope.demand._desc = data.data
                    })
                }
            }
            // 获取自定义产品属性
            $scope.getDesc = function () {
                var _desc = $scope.demand._desc.desc
                var desc = document.getElementsByClassName('desc')
                for (var i = 0; i < desc.length; i++) {
                    // 如果属性值value=0 跳出
                    // if((0+desc[i].value) == 0 ) continue;
                    console.log(desc[i], parseFloat(desc[i].value))
                    if (isNaN(parseFloat(desc[i].value)) || desc[i].value == 0) continue;
                    var name = desc[i].name
                    var value = desc[i].value
                    // 如果属性值不为零，则修改属性值集合
                    _desc[name][2] = value
                    _desc[name][3] = name
                }
                // 仅保留用户修改过的属性值，新构建一个属性集合
                var newObj = {}
                for (var i in _desc) {
                    if (_desc[i].length == 4) {
                        newObj[i] = _desc[i]
                    }
                }
                // 返回一个属性数组[name,value,limit,step,cost,qualified]
                var re_Array = []
                for (var i in newObj) {
                    var temp = []
                    temp[0] = newObj[i][3]
                    temp[1] = newObj[i][2]
                    re_Array.push(temp)
                }
                return re_Array
            }
            // 存储常见错误
            $scope.msg = {}
            // 表单判断
            $scope.submit2 = function () {
                // 获取产品类型
                // 获取产品属性
                // 获取采购、地点、支付方式、质检等
                console.log(!(new Date($scope.demand.time_traffic) < new Date() ))
                var _url = ENV.api.trade + 'demand/demand_new';
                if (!$scope.demand.category) {
                    $scope.msg = {category: '请选择品种'}
                    showAlert($ionicPopup, $location, {template: '请选择品种'})
                } else if (!$scope.demand.amount) {
                    $scope.msg = {amount: '请输入货物量'}
                    showAlert($ionicPopup, $location, {template: '请输入货物量'})
                } else if (!$scope.demand.location_storage) {
                    $scope.msg = {location_storage: '请选择交货地点'}
                    showAlert($ionicPopup, $location, {template: '请选择交货地点'})
                } else if (!$scope.demand.time_traffic || (new Date($scope.demand.time_traffic) < new Date() )) {
                    $scope.msg = {time_traffic: '请选择正确交货时间'}
                    showAlert($ionicPopup, $location, {template: '请选择正确交货时间'})
                } else if (!$scope.demand.payment_advance) {
                    $scope.msg = {payment_advance: '请选择预付款'}
                    showAlert($ionicPopup, $location, {template: '请选择预付款'})
                } else if (!$scope.demand.payment_style) {
                    $scope.msg = {payment_style: '请选择报价方式'}
                    showAlert($ionicPopup, $location, {template: '请选择报价方式'})
                } else if (!$scope.demand.choice_advanced_payment || !$scope.demand.choice_final_payment) {
                    $scope.msg = {choice_advanced_payment: '请选择付款方式'}
                    showAlert($ionicPopup, $location, {template: '请选择付款方式'})
                } else if (!$scope.demand.maxprice) {
                    $scope.msg = {maxprice: '请选择可接受最高报价'}
                    showAlert($ionicPopup, $location, {template: '请选择可接受最高报价'})
                } else if (!$scope.demand.time_validity || (new Date($scope.demand.time_validity) < new Date() )) {
                    $scope.msg = {time_validity: '请选择有效期'}
                    showAlert($ionicPopup, $location, {template: '请选择有效期'})
                }else if (!$scope.demand.quality_origin) {
                  $scope.msg = {quality_origin: '质检结果'}
                  showAlert($ionicPopup, $location, {template: '质检结果'})
                } else if ($scope.demand.desc =='') {
                    $scope.msg = {desc: '产品结算细则描述不完整'}
                    showAlert($ionicPopup, $location, {template: '产品结算细则描述不完整'})
                } else if ($scope.demand.att_traffic === undefined) {
                    $scope.msg = {att_traffic: '物流结算细则描述不完整'}
                    showAlert($ionicPopup, $location, {template: '物流结算细则描述不完整'})
                }
                // else if($scope.demand.att_liability===undefined){

                // 	$scope.msg = {att_liability:'违约责任不能为空'}
                // }
                else if ($scope.demand.time_traffic < $scope.demand.time_validity) {
                    $scope.msg = {time_validity: '请选择正确有效期'}
                    showAlert($ionicPopup, $location, {template: '请选择正确有效期'})
                } else {
                    var rushPushlish_bold = {
                        category: $scope.demand.category.eng 				//产品类型
                        // ,category_chn: 									//产品类型中文名
                        , price: $scope.demand.maxprice 					//价格
                        , amount: $scope.demand.amount 				//数量
                        , amount_remain: $scope.demand.amount 			//货物总吨数剩余
                        // ,desc				: $scope.demand.desc 					//产品参数
                        , time_traffic: formatdata($scope.demand.time_traffic) 			//提货/到货时间
                        , location_storage: $scope.demand.location_storage 		//交货地点
                        , payment_advance: parseInt($scope.demand.payment_advance) 		//预付款
                        , payment_style: $scope.demand.payment_style[0] 			//报价方式
                        , time_validity: formatdata($scope.demand.time_validity) 			//有效期
                        ,appendix:$scope.demand.message  //货物备注
                        ,quality_origin:$scope.demand.quality_origin//有效的质检结果
                        , can_join: $scope.demand.can_join 				//凑单
                        , att_product: $scope.demand.desc 			//货品结算细则
                        , att_traffic: $scope.demand.att_traffic 			//物流结算细则
                        // ,att_liability		: $scope.demand.att_liability 			//违约责任
                        // 20151216 新增2个属性
                        , choice_advanced_payment: $scope.demand.choice_advanced_payment[0]  	//预付款支付方式
                        , choice_final_payment: $scope.demand.choice_final_payment[0]  	//尾款支付方式
                        // 20160105增加4个属性
                        , location_longitude: $scope.demand.location_longitude 	//仓库经度值
                        , location_latitude: $scope.demand.location_latitude 		//仓库纬度值
                        , prov_storage: $scope.demand.prov_storage 				//仓库所在省代号
                        , city_storage: $scope.demand.city_storage 				//仓库所在市代号
                    }
                    console.log(rushPushlish_bold)

                    $scope.publish2(_url, rushPushlish_bold)


                }
            }
            // 发布数据
            $scope.publish2 = function (_url, rushPushlish_bold) {
                $http({
                    method: 'POST'
                    , url: _url
                    , data: rushPushlish_bold

                })
                    .success(function (data) {
                        // 将新token覆盖到userInfo中
                        console.log(data)
                        if (data.status == 'invalid_format') {
                            $scope.error = data.data ? {msg: data.data.msg} : {msg: "请填写完整"}
                            showAlert($ionicPopup, $location, {template: '产品细则和物流细则必须填写完整'})
                        }
                        if (data.status == 'success') {
                            var obj = {template: "发布成功", title: '提示'}
                            showAlert($ionicPopup, $location, obj).then(function (res) {
                                $location.path('/tab/rush')
                            })
                        }
                    })

            }
            //修改产品细则 $scope.demand.desc $scope.demand.att_product
            $scope.modifAttproduct = function () {
                // 获取自定义属性
                console.log($scope.demand.desc)

                if (!$scope.demand._desc) {
                    //
                    var obj = {template: '<span>请选择产品类型</span>', title: '提示'}
                    $scope.msg = {category: '请选择产品属性'};
                    _showConfirm($ionicPopup, $location, obj)
                    return false
                }
                $scope.demand.desc = $scope.getDesc()
                console.log('获取自定义属性', $scope.getDesc())
                var object = {templateUrl: 'supplyPublish/attproduct.html', title: '产品结算细则'}
                var objmsg = {}

                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res) {
                        var _att = document.getElementsByClassName('attproduct')
                        for (var i = 0; i < _att.length; i++) {
                            if (_att[i].children[0].value) {
                                $scope.demand.desc[i][2] = _att[i].children[0].value
                            } else {
                                $scope.demand.desc[i][2] = ''
                            }
                            if (_att[i].children[1].value) {
                                $scope.demand.desc[i][3] = _att[i].children[1].value
                            } else {
                                $scope.demand.desc[i][3] = ''
                            }
                            if (_att[i].children[2].value) {
                                $scope.demand.desc[i][4] = _att[i].children[2].value
                            } else {
                                $scope.demand.desc[i][4] = ''
                            }

                        }
                        console.log($scope.demand.desc)
                        $scope.attproduct = true;
                    }

                })

            }
            // 修改物流细则 $scope.demand.att_traffic
            $scope.modifAtttraffic = function () {
                // 获取弹窗
                var object = {templateUrl: 'rushPublish/atttraffic.html', title: '物流结算细则'}
                var objmsg = {}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    var _att = document.getElementsByClassName('atttraffic')
                    var _arr = []
                    for (var i = 0; i < _att.length; i++) {
                        if (_att[i].value) {
                            _arr[i] = _att[i].value
                        } else {
                            _arr[i] = ''
                        }
                    }
                    $scope.demand.att_traffic = _arr;
                    $scope.atttraffic = true;
                })
            }
            // 违约责任
            // $scope.modifAttliability=function(){
            // 	var object = {templateUrl:'rushPublish/attliability.html',title:'违约责任细则'}
            //     var objmsg = {}
            // 	_popup($scope, object, $ionicPopup, objmsg).then(function(res){
            // 		if(res)	$scope.demand.att_liability = res.text
            // 	})
            // }
            // 选择仓库弹窗
            $scope.getstorage = function () {
                // 获取仓库列表
                $http({
                    method: 'POST'
                    , url: ENV.api.account + 'company_trade_store/get'
                }).success(function (data) {
                    console.log(data)
                    if (data.status == 'success') {
                        console.log(data.data)
                        $scope.location_storages = data.data
                    } else {
                        // 获取仓库失败
                    }
                })
                // 配置弹窗
                var object = {templateUrl: 'rushPublish/locationstorage.html', title: '选择仓库地址'}
                var objmsg = {}
                _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                    if (res && res.storage) {
                        $scope.demand._location_storage = res.storage[4] + res.storage[3] + res.storage[2] + res.storage[1]
                        $scope.demand.location_storage = res.storage[0]
                        $scope.demand.location_longitude = res.storage[6]
                        $scope.demand.location_latitude = res.storage[5]
                        $scope.demand.prov_storage = res.storage[4]
                        $scope.demand.city_storage = res.storage[3]

                    }
                })
            }

        }])
// ----展示车队
    .controller('tradeCarListCtrl',function($scope,$location,AccountInformation,Storage){
        // 物流公司名单
        // $scope.carList = [{real_name:'阿里',verify_phase:'SUCCESS',url_logo:'./img/general/face/6.jpg'}
        //     ,{real_name:'百度',verify_phase:'SUCCESS',url_logo:'./img/general/face/5.jpg'}]
        $scope.start = function(){
              var _param = {page: 0,name: '', type: 'TRAFFIC',getType: 1}
              AccountInformation.getCompanyCertification(_param).then(function (result) {
                console.log(result)
                if(result.status=="success"){
                    $scope.carList = result.data.company
                }
              })
        }
        $scope.start()
        $scope.addCarTeam = function(){
            $location.path('/tab/tradeAddCarTeamList')
        }
        $scope.del=function(id){
            AccountInformation.del(id).then(function (result) {
                console.log(result)
                if(result.status=='success'){
                    $scope.start()
                }
           })
        }
        $scope.addPlan=function(){
            $location.path('/tab/tradeCarListPlan')
            // trade158.passPlandAllow().success(function(res){
            //     if(res.status=='success'){
            //         if(res.data){
            //             $location.path('/tab/tradeCarListPlan')
            //         }else{
            //             showAlert($ionicPopup, $location, {template: '只能发布3个物流计划'})
            //         }
            //     }
            // })
        }
        // 获取公司id
        if(Storage.get('userInfo')){
            $scope.companyId = Storage.get('userInfo').user.company_id
            console.log(Storage.get('userInfo'))
        }

    })
// ---添加车队
    .controller('tradeAddCarTeamListCtrl',function($scope,$ionicPopup,$location,AccountInformation){
        // 物流公司名单
        // $scope.carList = [{real_name:'添加阿里鱼',verify_phase:'SUCCESS',url_logo:'./img/general/face/6.jpg'}
        //     ,{real_name:'添加百度图库',verify_phase:'SUCCESS',url_logo:'./img/general/face/5.jpg'}]
        $scope.start=function(){
            var _param = {page: 0,name: '', type: 'TRAFFIC',getType: 1}
            AccountInformation.getNotCompanyCertification(_param).then(function (result) {
                console.log(result)
                if(result.status=="success"){
                    $scope.carList = result.data.company
                }
            })
        }
        $scope.start()
        $scope.addCarTeam = function(){
            _showConfirm($ionicPopup, $location, {template:"请再次确认",title:"提示"}).then(function(res){
                $location.path('/tab/carList')
            })
        }
        $scope.apply=function(id){
           AccountInformation.join(id).then(function (result) {
                console.log(result)
                if(result.status=='success'){
                    $scope.start()
                }
           })

        }
    })
// ---发布物流计划
    .controller('tradeCarListPlanCtrl',function($scope,$ionicPopup,trade158,$filter,$location,tradePass,$ionicModal,$state,Storage){
        $scope.passPlan = []
        $scope.demand={}
        $scope.changeDate = function () {
            var object = {templateUrl: './template/common/popup_radio.html', title: '选择日期'}
            var objmsg = {type: 'changeDate',minDate: moment().format()
                ,maxDate:moment().add('months',3).format()
            }
            _popup($scope, object, $ionicPopup, objmsg).then(function (res) {
                if(res.dt){
                    $scope.demand.month = res.dt
                }
                console.log(res.dt)
            })
        }
        $scope.changeArr = function (type) {
            var data = {};
            var obj = {templateUrl: './template/common/pro_city.html', title: '请选择地区'};
            _popup($scope, obj, $ionicPopup, data).then(function (res) {
                if(res){
                    if(type=='start'){
                        $scope.demand.startChn = $filter('addressText')(res);
                        $scope.demand.start_pro = res.currentProvince.ProID
                        $scope.demand.start_city = typeof(res.currentCity) != 'undefined' ? res.currentCity.CityID : ''
                        $scope.demand.start_dis = typeof(res.currentArea) != 'undefined' ? res.currentArea.DisID : ''
                    }else{
                        $scope.demand.endChn = $filter('addressText')(res);
                        $scope.demand.end_pro = res.currentProvince.ProID
                        $scope.demand.end_city = typeof(res.currentCity) != 'undefined' ? res.currentCity.CityID : ''
                        $scope.demand.end_dis = typeof(res.currentArea) != 'undefined' ? res.currentArea.DisID : ''
                    }
                }
            })
        }
        $scope.goback=function(){
             window.history.go(-1)
        }


        $scope.planAdd=function(){
            console.log($scope.demand)
            $scope.demand.amount = parseInt($scope.demand.amount)
            $scope.demand.month = formatdata($scope.demand.month)
            $scope.demand.price = parseInt($scope.demand.price)
            trade158.passPlandAdd($scope.demand).success(function(res){
                if(res.status=='success'){
                    showAlert($ionicPopup, $location, {template: '提交成功'}).then(function(res){
                        window.history.go(0)
                    })
                }
            })
        }
        if(Storage.get('userInfo')){
            $scope.companyId = Storage.get('userInfo').user.company_id
        }
        // $scope.planDec=function(id){
        //     trade158.passPlandDec(id).success(function(res){
        //         console.log(res)
        //     })
        // }
        // $scope.showCategory = function () {
        //     // 获取产品分类
        //     $scope.msg = null
        //     $scope.getCategory()
        //     var _object = {templateUrl: './template/common/popup_radio.html', title: '请选择产品种类'}
        //     var _objmsg = {type: 'radio'}
        //     _popup($scope, _object, $ionicPopup, _objmsg).then(function (res) {
        //         console.log(res)
        //         if (res) {
        //             var result = res.subtype
        //             $scope.demand.type = result.chn
        //         }
        //     })
        // }
        // $scope.getCategory = function () {
        //     trade158.getCategory().success(function (data) {
        //         if (data.status == 'success') {
        //             $scope.popup_lists = data.data
        //         } else {
        //             $scope.msg = {error: '获取产品分类失败'}
        //         }
        //     })
        // }

    })
//---发布物流计划列表
    .controller('tradeCarListPlan1Ctrl',function($scope,$ionicPopup,trade158,$filter,$location,tradePass,$ionicModal,$state,$stateParams,Storage){
        // 获取参数
        $scope.company_id = $stateParams.companyid
        if(Storage.get('userInfo')){
            $scope.companyId = Storage.get('userInfo').user.company_id
        }
        console.log($stateParams.companyid)
        $scope.goback=function(){
            // 预防回退死循环
            if($scope.companyId == $scope.company_id){
                $location.path('/tab/tradeCarList')
            }else{
                window.history.go(-1)
            }
        }
        $scope.planGet=function(){
            var _type = 'user_trade'
            var _id = {company_id:$scope.company_id}
            trade158.passPlandGet(_id).success(function(res){
                console.log(res)
                if(res.status=='success'){
                    $scope.planCollection = res.data
                    for(var i = 0;i < $scope.planCollection.length ; i++){
                        $scope.getUserinfo($scope.planCollection[i].user_id,$scope.planCollection[i],_type)
                    }
                }
            })
        }
        // 获取用户信息
        $scope.getUserinfo=function(_id,i,_type){
            var _data = {user_id: _id}
            tradePass.getUserInfo(_type,_data).success(function (data) {
                i.user_info = data.data
            })
        }
        $scope.planGet()

        //物流计划页面跳转
        $scope.logistics_plan_jump=function(e){
            console.log(e)
            if($scope.company_id == $scope.companyId){
                $location.path('/tab/publishPass/'+e)
            }
        }
        // 分享页面
        // $ionicModal.fromTemplateUrl('./template/common/share.html', {
        //     scope: $scope,
        //     animation: 'slide-in-up',
        //     backdropClickToClose: true,
        //     hardwareBackButtonClose: true
        // }).
        _ionicModal($ionicModal,$scope,'./template/common/share.html').then(function (modal) {
            $scope.modal = modal;
        });

        $scope.share = function () {
            $scope.modal.show();
        }
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
                $state.go('tab.shareSMS', {type: 'tradePlan', id: $scope.company_id});
                break;
            }
        }
    })


// ------------ 常用函数--------------
// 转换日期格式
var formdata = function (data) {

    return data.substr(0, 10).replace(/-/g, '/')
}
var formpayment = function (pay) {
    if (pay == 'FOB') {
        return '出厂价'
    } else {
        return '到岸价'
    }
}
// 输出凑单的中文
var formcanjoin = function (canjoin) {
    if (canjoin) {
        return '可凑单'
    }
    return '不可凑单'
}
// 判断一段日期的间距
var formvalidity = function (time) {
    var now = new Date()
    var oldtime = new Date(time)
    // var temp = Math.floor((oldtime-now)/1000/24/60/60)
    var temp = Math.ceil((oldtime - now) / 1000 / 24 / 60 / 60)
    if (now > oldtime) {
        return '0'
    } else {
        return temp
    }
}
// 转换日期
var formatdata = function (e) {
    if (e) {
        var now = e;
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString();
        var day = (now.getDate()).toString();
        if (month.length == 1) {
            month = "0" + month;
        }
        if (day.length == 1) {
            day = "0" + day;
        }
        var dateTime = year + '/' + month + '/' + day;
        return dateTime
    }
}
// 转换数组,删除空位
var formatArray = function (arr) {
    var newArray = []
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != undefined) {
            newArray.push(arr[i])
        }
    }
}
// 发货地址查询函数
var getlocation = function (id, param, $http, ENV) {
    $http({
        method: 'POST'
        , url: ENV.api.account + 'company_trade_store/get_one'
        , data: {store_id: id}
    }).success(function (data) {
        var _s = data.data
        if (_s.province == _s.city) {
            param.location_storage_name = _s.province + _s.district + _s.addr
        } else {
            param.location_storage_name = _s.province + _s.city + _s.district + _s.addr
        }

    })
}

// 角色判断
var role_judge = function (e) {
    if (e == 'SALE') {
        return false
    } else if (e == 'PURCHASE') {
        return true
    } else if (e == 'ADMIN') {
        // 如果判断采购型管理员 和 销售型管理员
        return true
    }
}
// 获取抢单数量
var getImmedia = function (id, i, $http, ENV) {
    // 抢单总数
    $http({
        method: 'GET'
        , url: ENV.api.trade + 'demand/offer_count/' + id
    }).success(function (data) {
        // console.log(data)
        i.count = data.data.entry_count
    })
}
// -----------未登录弹出框
var showAlert = function ($ionicPopup, $location, obj) {
    return alertPopup = $ionicPopup.alert({
        title: obj ? obj.title : '提示',
        template: obj ? obj.template : '欢迎使用,请先登录'
        , buttons: [{
            text: '确定', onTap: function () {
                // console.log(e)
                return true;
            }
        }]
    })
};
// ------------弹窗
var _popup = function ($scope, object, $ionicPopup, objmsg) {
    $scope.data = objmsg
    console.log('弹窗', object)
    var myPopup = $ionicPopup.show({
        templateUrl: object.templateUrl
        , scope: $scope
        , title: object.title
        , cssClass: object.css
        , buttons: [
            {text: '取消'}
            , {
                text: '<b>确定</b>'
                , type: 'button-positive'
                , onTap: function (e) {
                    if (!$scope.data) {
                        e.preventDefault();
                    } else {
                        return $scope.data;
                    }
                }
            }
        ]
    })
    return myPopup
}
// ----------获取产品属性
var _getcategory = function ($http, ENV, category, i) {
    $http({
        method: 'GET'
        , url: ENV.api.trade + 'demand/standard_for_goods/' + category
    }).success(function (data) {
        // console.log(data)
        if (data.status = "success") {
            i.desc = data.data.desc
        }
    })
}
// 上传图片
var _upimg = function (file, _url, $http) {
    var c = new FormData();
    c.append('file', file);
    // 上传图片
    return $http({
        method: 'POST'
        , url: _url
        , data: c
        , headers: {
            "Content-Type": undefined
        }
        , transformRequest: angular.identity
    })
}
//
// 获取位置
var _getLocation = function (x, y, StoreManage, $filter, z) {
    StoreManage.getInfoById(x).then(function (result) {
        if (z == 'storage') {
            y.location_storage_n = $filter('rsc.address')(result);
        } else {
            y.location_arrival_n = $filter('rsc.address')(result);
        }
    })
}
var _showConfirm = function ($ionicPopup, $location, obj) {
    return alertPopup = $ionicPopup.confirm({
        title: obj ? obj.title : '未登录',
        template: obj ? obj.template : '欢迎使用,请先登录'
        , buttons: [{
            text: '取消', onTap: function () {
                return false;
            }
        }
            , {
                text: '确定', onTap: function () {
                    return true;
                }
            }]
    })
};
// 获取公司信息
var getcompany = function (company_id, i, $http, ENV) {
    // 公司名称
    $http({
        method: 'POST'
        , url: ENV.api.account + 'company_trade/get_one/'
        , data: {company_id: company_id}
        // ,headers:{
        //            'x-access-token':JSON.parse(window.sessionStorage.getItem('userInfo')).token
        //          }
    }).success(function (data) {
        i.company_fullname = data.data.full_name
        i.company_verify_phase = data.data.verify_phase
    })
}
// 获取物流公司信息
var getcompany2 = function (company_id, i, $http, ENV) {
    // 公司名称
    $http({
        method: 'POST'
        , url: ENV.api.account + 'company_traffic/get_one/'
        , data: {company_id: company_id}
        // ,headers:{
        //            'x-access-token':JSON.parse(window.sessionStorage.getItem('userInfo')).token
        //          }
    }).success(function (data) {
        i.company_verify_phase = data.data.verify_phase
    })
}
// 根据距离获取时间
var distanceDate = function (e) {
    var nowTime = (new Date()).getTime()
    var futurnTime = nowTime + parseInt(e) * 24 * 3600 * 1000
    return new Date(futurnTime)
}
// 模态框
var _ionicModal = function($ionicModal,$scope,template){
    return $ionicModal.fromTemplateUrl(template, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: true,
            hardwareBackButtonClose: true
        })
}
