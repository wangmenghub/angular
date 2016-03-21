// 金融页面
angular.module('rsc.controllers.credit', [])

    .config(['$httpProvider', function ($httpProvider) {
        // 初始所有请求都携带 headers ['x-access-token']头信息
        //if (window.sessionStorage.getItem('userInfo')) {
        //
        //    $httpProvider.defaults.headers.common['x-access-token'] = JSON.parse(window.sessionStorage.getItem('userInfo')).token
        //
        //}
    }])
    // 格式化年月日时分
    .filter('rscsecond', function () {
       return function (time) {
            return moment(new Date(time)).format('LT');
        }
    })

    .filter('canjoin', function () {
      return function(canjoin){
            if(canjoin){ return '可凑单'}
            return '不可凑单'
        }
    })
    // 判断报价方式
    .filter('payment', function () {
       return function(pay){
                if(pay=='FOB'){
                    return '出厂价'
                }else{
                    return '到岸价'
                }
            }
    })
    // 计算时间差
    .filter('dateInterval',function(){
        return function(time,flag){
                var oldtime = new Date(time)
                var now = new Date()
                var tm = oldtime-now
                var dd =parseInt(tm/1000/60/60/24,10)
                var hh =parseInt(tm/1000/60/60%24,10)
                var mm =parseInt(tm/1000/60%60,10)
                var ss =parseInt(tm/1000%60,10)
                var dhms = dd+'天'+hh+'小时'+mm+'分'+ss+'秒'
                if(flag=='hs'){
                    return now>oldtime ? 0 : dhms
                }else{
                    return now>oldtime ? 0 : dd
                }
                
            }
    })
    // 格式化付款方式
    .filter('choicePayment', function () {
       return function(pay){
                if(pay=='url'){
                    return '现金'
                }else{
                    return '信用'
                }
            }
    })
    // 格式化金额
    .filter('fmoney',function(){
        return function(s,type){
            if(s!==undefined){
                // 订单中的金额不进行取舍
                if(s/100000000 >1 && type=='order'){
                    s = (s/100000000).toFixed(2)
                    w = '亿'
                }else if(s/10000 >1 && type=='order'){
                    s = (s/10000).toFixed(2)
                    w = '万'
                }else{
                    s = s
                    w = ''
                }
                var sign = s<0 ? '-':''
                s = s<0 ? Math.abs(s) : s
                s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(2) + "";   
                var l = s.split(".")[0].split("").reverse(),   
                r = s.split(".")[1];   
                t = "";   
                for(i = 0; i < l.length; i ++ )   
                {   
                  t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
                }   
                return sign+t.split("").reverse().join("") + "." + r +w;   
            }
        }
    })
    // 格式化行业
    .filter('subType',function(){
        var sub_type = {
            TRADE: '交易型企业'
            ,TRAFFIC: '物流型企业'
            ,IRON:'炼焦行业'
            ,COAL:'煤炭行业'
        };
        return function (type) {
            console.log(type)
            return sub_type[type];
        }
    })
    .filter('fstrLen',function(){
        return function(e){
            if(e){
                return e.substring(0,10)+'...'
            }
        }
    })
    // 判断是否匿名
    .filter('judgeAnonymity',function(){
        return function(arr){
            // session中的公司id，抢单公司id,挂单公司id
            if(arr[0]==arr[1] || arr[0]==arr[2]){
                return arr[3]
            }else{
                return '******'
            }
        }
    })
    // 返回向上取整的数字
    .filter('numCeil',function(){
        return function(e){
            if(e){
                return Math.ceil(e/10)
            }else{
                return 0
            }
        }
    })
    // 数字转大写
    .filter('upDigit',function(){
        return function(n){
            if(n){
            var fraction = ['角','分'];  
            var digit = ['零','壹','贰','叁','肆','伍','陆','柒','捌','玖']
            var unit = [['元','万','亿'], ['','拾','佰','仟']]
            var head = n < 0? '欠': '' 
            n = Math.abs(n)
            var s = ''
            for (var i = 0; i < fraction.length; i++){  
                s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');  
            }  
            s = s || '整';  
            n = Math.floor(n);  

            for (var i = 0; i < unit[0].length && n > 0; i++){  
                var p = '';  
                for (var j = 0; j < unit[1].length && n > 0; j++){  
                    p = digit[n % 10] + unit[1][j] + p;  
                    n = Math.floor(n / 10);  
                }  
                s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s;  
            }  
            return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
            }
        }
    })
    // 返回距今时长
    .filter('formvalidity',function(){
        return function(time){
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
    })
    // 设置4种订单状态，
     .filter('tradestep', function (Storage) {
        return function (_step) {
            var step = _step[0]
            var side = _step[1]=='demand' ?'demand':'supply'
            var text;
            console.log(step,side)
            if(step==1){ text ='下订单'}else if((step>1 && step <3)){ text='预付款'}else if(step==3){ text='物流'}else if(step==4){
                        text='检验'}else{text='交割'}
            switch (side) {
                case "demand":
                    if(step==1){ text ='下订单'}else if((step>1 && step <3)){ text='预付款'}else if(step==3){ text='物流'}else if(step==4){text='检验'}else{text='交割'}
                break;
                default :
                    if(step<=2){ text ='下订单'}else if((step>2 && step <3)){ text='预付款'}else if(step==3){ text='物流'}else if(step==4){text='检验'}else{text='交割'}
                }
            return text
        }
    })
    // 20160229新增结算方式，支付方式，延期标准
    .filter('paymentChoice',function(){
        var sub_type = {
            cash: '现金'
            ,bill_bank: '银行兑票'
            ,bill_com:'商业兑票'
            ,all_cash:'款到发货'
            ,all_goods:'货到付款'
            ,partition:'分期'
            ,credit:'信用'
            ,order:'订单日'
            ,goods:'货到日'
            ,demand:'需求方'
            ,other:'第三方'
            ,minus:'减少'
            ,range:'增减'
            ,plus:'增加'
        };
        return function (type) {
            return sub_type[type];
        }
    })
    
// -----------金融 首页
    .controller('ebankCtrl', function ($scope,Storage,$location,$ionicPopup,$state) {
        // 控制开始
        // $scope.navbar = {
        //     'navLeftHref': 'tab.'
        //     , 'title': '订单'
        //     , 'navRightHref': 'tab.'
        //     , 'navRight': ''
        // }
        // $scope.$on('$stateChangeSuccess', function (event, toState, roParams, fromState, fromParams) {
            
        $scope.start = function(){
            var _goto=function(){
                if ($scope.role[1] == 'ADMIN') {
                        // $location.path('/tab/eBankIncome/eBankIncomecenter')
                        $scope.z_left_active = 'active'
                        // $location.path('/tab/eBankIncome/eBankIncomeL/eBankIncomeLts')
                    } else if($scope.role[1] == 'FINANCE'){
                        $scope.center_active = 'active'
                        // $location.path('/tab/eBankIncome/eBankIncomecenter')

                    }else{
                        if ($scope.role[0] == 'TRADE') {
                            $scope.z_left_active = 'active'
                            // $location.path('/tab/eBankIncome/eBankIncomeL/eBankIncomeLts')
                        } else {
                            $scope.z_right_active = 'active'
                            // $location.path('/tab/eBankIncome/eBankIncomeL/eBankIncomeLps')
                        }
                    }
            }
            if(Storage.get('userInfo')){
                console.log('存在吗')
                $scope.role = Storage.get('userInfo').user.role.split('_')
                _goto()
                $scope.user=Storage.get('userInfo').user.role.split('_')
                $scope.left_active = 'active'
                $scope.center_active = ''
                $scope.right_active = ''
            }else{
                showAlert($ionicPopup,$location).then(function(res) {
                    $location.path('/tab/login')
                });
            }
        }
        // })
        
        
        $scope.gotoOrder = function(e){
            if(e=='left'){
                $scope.left_active = 'active'
                $scope.center_active = ''
                $scope.right_active = ''
                if ($scope.user[0] == 'TRADE') {
                    // $state.go('tab.eBankIncome.left.tsupply')
                    $scope.z_left_active = 'active'
                } else {
                    // $state.go('tab.eBankIncome.left.psupply')
                    $scope.z_right_active = 'active'
                }
                // $state.go('tab.eBankIncome.left.tsupply')
            }else if(e=='center'){
                $scope.left_active = ''
                $scope.center_active = 'active'
                $scope.right_active = ''
                // $state.go('tab.eBankIncome.center')
            }else{
                $scope.left_active = ''
                $scope.center_active = ''
                $scope.right_active = 'active'
                // $state.go('tab.eBankIncome.right')
            }
        }
    })
// --- 金融左中右三按键eBankIncome_lCtr
   .controller('eBankIncome_lCtrl',['$scope','Storage','$location','$ionicPopup','$http','ENV'
    ,function ($scope) {
        $scope.z_gotoOrder=function(e){
            if(e=='trade'){
                $scope.z_left_active = 'active'
                $scope.z_right_active = ''
                console.log()
            }else{
                $scope.z_left_active = ''
                $scope.z_right_active = 'active'
            }
        }
    }]) 
// ---
// --------------------- 信用、概况  ---------------//	
    .controller('eBankIncomeCtrl',['$scope','Storage','$location','$ionicPopup','$http','ENV','tradePass','$ionicLoading'
    ,function ($scope,Storage,$location,$ionicPopup,$http,ENV,tradePass,$ionicLoading) {
        $scope.credit_from_lists=''
        $scope.credit_to_lists=''
        $scope.credit_lists=''
        $scope.show =true
        // $scope.gain_active = 'active'
        // $scope.give_active =''
    	//获取公司账户 /get_account
    	$scope.getaccount=function(){
            $ionicLoading.show()
    		var _url = ENV.api.credit+'credit/get_account'
	    	$http({
	    		method:'POST'
	    		,url: _url
	    	}).success(function(data){
	    		console.log('getaccount',data)
	    		$scope.credit = data.data
	    	})
    	}
    	
    	//授出记录 /get_give_record
        // $scope.give_total_lists = [] ,{status:'effective'}
    	$scope.getgive = function(){
    		var _url = ENV.api.credit+'credit/get_give_record'
    		$http.post(_url).success(function(data){
                console.log('get_giv',data.data)
                if(data.status=='success'){
                    $scope.credit_from_lists = _to_arry(data.data)
                    console.log('credit_from_lists',$scope.credit_from_lists)
                    for(var i =0 ;i< $scope.credit_from_lists.length;i++){
                        console.log( $scope.credit_from_lists[i].arr[0].order_index.split('-') )
                        if( ($scope.credit_from_lists[i].arr[0].order_index.split('-')[0]) == 'wl' ){
                            $scope.credit_from_lists[i].company_type='traffic'
                            // 判断当前用户是交易型还是物流型
                            if($scope.role.role.split('_')[0] == 'TRAFFIC'){
                                $scope.credit_from_lists[i].company_type='trade'
                            }
                            $scope.getcompany($scope.credit_from_lists[i].company_type,$scope.credit_from_lists[i].to,$scope.credit_from_lists[i])
                        }else{
                            $scope.credit_from_lists[i].company_type='trade'

                            $scope.getcompany($scope.credit_from_lists[i].company_type,$scope.credit_from_lists[i].to,$scope.credit_from_lists[i])
                        }
                        
                    }
                }
    		})
    	}
    	//获得记录 /get_gain_record ,{status:'effective'}
    	$scope.getgain = function(){
    		var _url = ENV.api.credit+'credit/get_gain_record'
    		$http.post(_url).success(function(data){
                if(data.status=='success'){
                    console.log('getgain',data.data)
                    // to ,gain 欠款人，获得信用列表，to相同，from不同
                    $scope.credit_to_lists = _from_arry(data.data)
                    console.log('to',$scope.credit_to_lists)
                    for(var i =0 ;i< $scope.credit_to_lists.length;i++){
                        console.log( $scope.credit_to_lists[i].arr[0].order_index.split('-') )
                        if( ($scope.credit_to_lists[i].arr[0].order_index.split('-')[0]) == 'wl' ){
                            $scope.credit_to_lists[i].company_type='traffic'
                            $scope.getcompany($scope.credit_to_lists[i].company_type,$scope.credit_to_lists[i].from,$scope.credit_to_lists[i])
                        }else{
                            $scope.credit_to_lists[i].company_type='trade'
                            $scope.getcompany($scope.credit_to_lists[i].company_type,$scope.credit_to_lists[i].from,$scope.credit_to_lists[i])
                        }
                        // 因 物流公司只有获得信用，没有授出信用，所以在给予信用的公司只能是交易型
                        // var type='trade'
                        // $scope.credit_from_lists[i].company_type='trade'
                        // $scope.getcompany(type,$scope.credit_from_lists[i].from,$scope.credit_from_lists[i])

                    } 
                }
    		})
    	}
        $scope.leftclick = function(){
            console.log('leftclick')
            $scope.show = true
            $scope.gain_active ='active'
            $scope.give_active =''
            $scope.getgain()
        }
        $scope.rightclick = function(){
            console.log('rightclick')
            $scope.show = false
            $scope.gain_active =''
            $scope.give_active ='active'
            $scope.getgive()
        }
    	//管理员确认还款完成 /edit_repay

    	//编辑可使用信用度 /edit_current
    	$scope.popupcurrent = function(){
    		var object = {templateUrl:'./template/common/popup_radio.html',title:'设置信用额度'}
            $scope.popup_lists = [{eng:'price',chn:'请输入金额'}]
    		var objmsg = {type:'number'}
    		_popup($scope,object,$ionicPopup,objmsg).then(function(data){
                if(data){
                    $scope.credit.current_total = data.subtype.price
                    $scope.editcurrent()
                }
    		})
    	}
    	$scope.editcurrent = function(){
    		var _url = ENV.api.credit+'credit/edit_current'
    		var _data = {price:$scope.credit.current_total}
    		$http.post(_url,_data).success(function(data){
    			console.log('editcurrent',data)
    		})
    	}
        // 获取公司信息
        $scope.getcompany = function(type,companyid,list){
            var _url = ENV.api.account + 'company_'+type+'/get_one'
            console.log('gongsi',_url,companyid)
            var _data = {company_id: companyid}
            $http.post(_url,_data).success(function(data){
                console.log('公司信息',data)
                list.company = data.data
                
            })
        }
        // 频繁存信息
        
        // 公司id 和 金额 "567b82c70704e9a8016ff986"

        // 获取公司所有授予与接收的数据 get_record
        $scope.getrecord = function(){
            var _url = ENV.api.credit+'credit/get_record'
            $http.post(_url).success(function(data){
                console.log(data.data)
                if(data.status=='success'){
                    console.log('get_record',data)
                    $scope.record_total= data.data
                    // 获取图表数据
                    
                    for(var i=0;i<$scope.record_total.length;i++){
                        $scope.getUserinfo($scope.record_total[i].user_id,$scope.record_total[i])
                        // console.log($scope.record_total[i].user_id)
                    }
                  
                    
                    $scope.higchartdatas = highchartsData($scope.record_total,$scope.role.company_id)
                    $ionicLoading.hide();
                }
            })
        }
        // 待审批的订单数量
        $scope.approve=function(){
            // var _url = ENV.api.credit+'credit/get_give_record'；20160304 变更get_gain_record
            var _url = ENV.api.credit+'credit/get_give_record'
            $http.post(_url).success(function(data){
                console.log('approve',data)
                var temp = data.data
                var count = 0
                for(var i=0;i<temp.length;i++){
                    if(temp[i].status=="ineffective"){
                        count += 1
                    }
                }
                $scope.approve_count = count
            })
        }
        // 首次执行
    	$scope.start = function(){
    		// 判断角色
            $scope.role = Storage.get('userInfo').user
            console.log($scope.role.role.split('_')[0])
    		// 获取和授出信用总额
    		$scope.getaccount()
    		$scope.leftclick()
            $scope.approve()
            $scope.getrecord()
    	}
    	$scope.start()
        //20160107获取用户名称
        $scope.getUserinfo=function(_id,i){
            var _data = {user_id: _id}
            tradePass.getUserInfo('user_trade',_data).success(function (data) {
                i.user_info = data.data
            })
        }
        // 需要月份、收入支出、授出、获得 
        /*
        *   计算平均值，步长，最小，最大数，获取当前月前5月数据
        *1,获取所有数据，放入一个数组中循环,累计各状态的金额
        * 时间:年月(当前月份与5月前时间),获取最大和最小
        * [如果status:ineffective,to(授出): from:(获得)] [如果status:complete,to(支出): from:(收入)]
        * 
        */
        
        // 图表数据
        // $scope.xData= ['2015年11月','2015年12月','2016年3月','2016年4月','2016年5月','2016年6月','2016年7月']
        // $scope.yData = [
        //         { name:'收入',data: [529.9, 680.5, 1016.4, 1329.2, 1644.0,1521.5,0,0,0] ,color:'red'}
        //         ,{ name:'支出',data: [0,0,0,0,0,400,490,589,600,640,590,700] ,color:'yellow'}
        //         ,{ name:'授出',data: [300,350,400,0,0,0,0,450,500,550,600] ,color:'blue'}
        //         ,{ name:'获得',data: [350,450,500,300,250,530,800,350,450,650,540] ,color:'green'}]

        $scope.$watch('higchartdatas',function(newValue,oldValue){
            angular.forEach(newValue,function(item,key){
                if($scope.higchartdatas.length==5){
                    $scope.xData = $scope.higchartdatas[0]
                    var ta = [$scope.higchartdatas[1],$scope.higchartdatas[2],$scope.higchartdatas[3],$scope.higchartdatas[4]].join(",").split(",")
                    // var ta = [gainArr,giveArr,expenseArr,incomeArr]
                    var min = Math.min.apply(null,ta)
                    var max = Math.max.apply(null,ta)
                    var step = Math.floor( (max-min)/5 )
                    var suffix = '元'
                    var gain = $scope.higchartdatas[1]
                    var give = $scope.higchartdatas[2]
                    var expense = $scope.higchartdatas[3]
                    var income = $scope.higchartdatas[4]
                    // var step = $scope.higchartdatas[5]
                    $scope.yData = [
                            { name:'获得',data: gain ,color:'red'}
                            ,{ name:'授出',data: give ,color:'yellow'}
                            ,{ name:'支出',data: expense ,color:'blue'}
                            ,{ name:'收入',data: income ,color:'green'}]
                   $scope.xyData={'x':$scope.xData,'y':$scope.yData,'interval':step,'suffix':suffix}
                   console.log($scope.xyData)
                }
            })
        })


    }])
// ------------ 金融授出详情页------------//
    .controller('eBankIncome-1Ctrl',['$scope','Storage','$location','$ionicPopup','$http','ENV','$stateParams','tradePass','$ionicLoading'
        ,function($scope,Storage,$location,$ionicPopup,$http,ENV,$stateParams,tradePass,$ionicLoading){
            console.log($stateParams.id)
            $scope.company_id = $stateParams.companyid
            $scope.compan_type = $stateParams.type
            // 依据id查//本公司对某公司给予记录 
            //  /get_give_record_by_company_id'
            // $scope.effective_active='active' //默认待还款
            // $scope.gain_active = 'active'   //默认获得信用
            $scope.get_give=function(){
                $scope.show = true
                $scope.give_active = 'active'
                $scope.gain_active = ''
                var e = $scope.changeStatus
                var _url = ENV.api.credit+'credit/get_give_record_by_company_id'
                if(e){
                    var _data = {company_id:$scope.company_id,status:e}
                }else{
                    var _data = {company_id:$scope.company_id}
                }
                $http.post(_url,_data).success(function(data){
                    console.log(data)
                    $scope.givelist = data.data
                    for(var i=0;i<$scope.givelist.length;i++){
                        $scope.getUserinfo($scope.givelist[i].user_id,$scope.givelist[i],'user_trade')
                        console.log($scope.givelist[i].user_id)
                    }
                    $scope.givelist.total = _person_total($scope.givelist)
                })
            }
            //获取本公司获得 某公司记录
            // /get_gain_record_by_company_id
            $scope.get_gain=function(){
                $scope.show = false
                $scope.give_active = ''
                $scope.gain_active = 'active'
                var e = $scope.changeStatus
                var _url = ENV.api.credit+'credit/get_gain_record_by_company_id'
                if(e){
                    var _data = {company_id:$scope.company_id,status:e }
                }else{
                var _data = {company_id:$scope.company_id}
                }
                
                $http.post(_url,_data).success(function(data){
                    console.log(data)
                    $scope.gainlist=data.data
                    for(var i=0;i<$scope.gainlist.length;i++){
                        $scope.getUserinfo($scope.gainlist[i].user_id,$scope.gainlist[i],'user_trade')
                        console.log($scope.gainlist[i].user_id)
                    }
                    $scope.gainlist.total = _person_total($scope.gainlist)
                    $ionicLoading.hide()
                })
            }
            // 获取公司信息
            $scope.getcompany = function(){
                var _url = ENV.api.account + 'company_'+$stateParams.type+'/get_one'
                console.log(_url)
                var _data = {company_id: $scope.company_id}
                $http.post(_url,_data).success(function(data){
                    console.log(data)
                    $scope.company = data.data
                })
            }
            // 
            $scope.goback=function(){
                window.history.go(-1)
            }
            //20160107获取用户名称
            $scope.getUserinfo=function(_id,i,_type){
                var _data = {user_id: _id}
                tradePass.getUserInfo(_type,_data).success(function (data) {
                    i.user_info = data.data
                })
            }
            // 20160120 增加待还款和已还款
            $scope.credit_leftClick = function(){
                $scope.effective_active='active'
                $scope.complete_active=null
                $scope.changeStatus = 'effective'
                $scope.get_give()
                $scope.get_gain()
            }
            $scope.credit_rightClick=function(){
                $scope.effective_active=null
                $scope.complete_active='active'
                $scope.changeStatus = 'complete'
                $scope.get_give()
                $scope.get_gain()
            }
            $scope.start = function(){
                // ----------
                $ionicLoading.show()
                $scope.getcompany()
                // ----------
                $scope.credit_leftClick()
                // $scope.get_give()
                // $scope.get_gain()
                
            }
            $scope.start()
            
            // 获取交易订单


        }
    ])
// ------------- 金融审批 页-----------//
    .controller('eBankIncomeApproveCtrl',['$scope','Storage','$location','$ionicPopup','$http','ENV','tradePass'
    ,function ($scope,Storage,$location,$ionicPopup,$http,ENV,tradePass) {
        $scope.credit_from_lists=''
        $scope.credit_to_lists=''
        // $scope.credit_lists=''
        
        //获取公司给予记录 /get_give_record (20160121:更改为get_gain_record)
        // $scope.give_total_lists = []
        $scope.getgain = function(){
            // var _url = ENV.api.credit+'credit/get_give_record' (20160304 变更get_gain_record)
            var _url = ENV.api.credit+'credit/get_give_record'
            $http.post(_url).success(function(data){
                if(data.status=='success'){
                    console.log('credit2',data)
                    // $scope.credit_lists = _to_arry(data.data)
                    $scope.credit_lists = data.data
                    for(var i =0 ;i< $scope.credit_lists.length;i++){
                        console.log( $scope.credit_lists[i].order_index.split('-') )
                        if( ($scope.credit_lists[i].order_index.split('-')[0]) == 'wl' ){
                            $scope.credit_lists[i].company_type='traffic'
                            $scope.getcompany($scope.credit_lists[i].company_type,$scope.credit_lists[i].to,$scope.credit_lists[i])
                            $scope.getUserinfo($scope.credit_lists[i].user_id,$scope.credit_lists[i],'user_traffic')
                        }else{
                            $scope.credit_lists[i].company_type='trade'
                            $scope.getcompany($scope.credit_lists[i].company_type,$scope.credit_lists[i].to,$scope.credit_lists[i])
                            $scope.getUserinfo($scope.credit_lists[i].user_id,$scope.credit_lists[i],'user_trade')
                        }
                    }
                    // 清除已经审批的数据
                    var temp = []
                    for(var j=0;j<$scope.credit_lists.length;j++){
                        if($scope.credit_lists[j].status=="ineffective"){
                            temp.push($scope.credit_lists[j])
                        }
                    }
                    $scope.credit_lists = temp

                }
            })
        }
        
        //管理员确认还款完成 /edit_repay

        //编辑可使用信用度 /edit_current
        $scope.approve = function(x,y,z){
            console.log(x,y,z)
            _showConfirm($ionicPopup,$location,{title:'确认授信',template:'授信额度为:'+ y +'元;'})
                .then(function(data){
                    if(data){
                        $scope.editapprove(x,y,z)
                    }
                })
        }
        $scope.editapprove = function(x,y,z){
            var _url = ENV.api.credit+'credit/confirm'
            var _data = {confirm:true , credit_record_id : x}
            $http.post(_url,_data).success(function(data){
                console.log('editapprove',data)
                if(data.status == 'success'){
                    window.history.go(0)
                }
            })
        }
        // 获取公司信息
        $scope.getcompany = function(type,companyid,list){
            var _url = ENV.api.account + 'company_'+type+'/get_one'
            console.log(_url)
            var _data = {company_id: companyid}
            $http.post(_url,_data).success(function(data){
                console.log('公司信息',data)
                list.company = data.data
            })
        }
        //20160107获取用户名称
        $scope.getUserinfo=function(_id,i,_type){
            var _data = {user_id: _id}
            tradePass.getUserInfo(_type,_data).success(function (data) {
                i.user_info = data.data
            })
        }
        //直接使用或审批信用度 /req

        //审核申请是否批准 /confirm
     
        // 首次执行
        $scope.start = function(){
            // 判断角色
            $scope.role = Storage.get('userInfo').user
            console.log($scope.role)
            // 获取和授出信用总额
            $scope.getgain()
            
        }
        $scope.start()
        // 回退
        $scope.goback=function(){
            window.history.go(-1)
        }
    }])
    // 借款还款页
    .controller('backOrderDetailCtrl',['$scope','Storage','$location','$ionicPopup','$http','ENV','$stateParams','tradePass','StoreManage','$filter','$ionicLoading','PassService'
    ,function($scope,Storage,$location,$ionicPopup,$http,ENV,$stateParams,tradePass,StoreManage,$filter,$ionicLoading,PassService){
        // 获取交易或物流订单
        $scope.getTradeInfo = function(){
        tradePass.getDemandOrderDetail($scope.method,$scope.orderindex).success(function (data) {
            if (data.status == "success") {
                $scope.order = data.data
                getctegory($scope.order.category)
                getcompany($scope.order.company_demand_id,$scope.order,$http,ENV)
                $scope.order.time_creation = formdata($scope.order.time_creation)
                $scope.order.payment_style = formpayment($scope.order.payment_style)
                getuseInfo($scope.order.user_supply_id)
                StoreManage.getInfoById($scope.order.location_arrival).then(function (result) {
                    $scope.order.location_arrival_n = $filter('rsc.address')(result);
                });
                StoreManage.getInfoById($scope.order.location_depart).then(function (result) {
                    $scope.order.location_depart_n = $filter('rsc.address')(result);
                });
                $scope.order.att_product.cost_total = attr_cost_total($scope.order.att_product)
                $ionicLoading.hide()
                console.log($scope.order)
            }
        })
        }
        // 商品属性
        var getctegory = function (category) {
            $http({
                method: 'GET'
                , url: ENV.api.trade + 'demand/standard_for_goods/' + category

            }).success(function (data) {
                if (data.status = "success") {
                    $scope.desc = data.data.desc
                }
            })
        }
        // 获取用户信息
        var getuseInfo = function (userid) {
            // 返回用户信息
            $scope.order.user_supply_name = userid
            $http({
                method: 'POST'
                , url: ENV.api.account + 'user_trade/get_by_id'
                , data: {user_id: userid}

            }).success(function (data) {
                if (data.status = "success") {
                    $scope.userInfo = data.data
                }
            })
        }
        // 获取金融订单
        $scope.getCredit = function(){
            var _url=ENV.api.credit+'credit/get_record_by_id_index'
            console.log(_url)
            var _data={record_id:$scope._id}
            console.log(_data)
            $http({
                method:'POST'
                ,url:_url,
                data:_data
            }).success(function(data){
                console.log(data)
                if(data.status=='success'){
                    $scope.creditInfo = data.data
                }
            })
        }
        // 管理员确认还款完成 edit_repay
        // credit_record_id 
        $scope.editRepay = function(){
            var _url=ENV.api.credit+'credit/edit_repay'
            var _data={credit_record_id:$scope._id}
            _showConfirm($ionicPopup,$location,{title:'提示',template:'请确认已收款'}).then(function(res){
                if(res){
                    $http.post(_url,_data).success(function(data){
                        console.log(data)
                        // if(data.data=='success'){
                            window.history.go(0)
                        // }
                    }) 
                }
            })
        }
        //获取物流数据
        $scope.getPassInfo = function(){
            // PassService.getOrderById().then(function(){})
            var _url = ENV.api.pass + 'order/get_one'
            console.log(_url)
            $http({
                method:'POST'
                ,url:_url
                ,data:{order_index:$scope.orderindex}
            }).success(function(data){
                console.log('物流',data)
                $scope.order = data.data
            })
        $ionicLoading.hide() 
        }
        $scope.start = function(){
            $scope.company_id = $stateParams.companyid
            $scope.company_type=$stateParams.type
            $scope.orderindex = $stateParams.orderindex
            $scope._id = $stateParams.creditid
            $scope.method = 'index'
            $scope.user = Storage.get('userInfo').user.role.split('_')[0]
            //
            $ionicLoading.show() 
            // 如果当前用户是物流 则访问物流数据，否则访问交易数据

            if($scope.user =='TRAFFIC' ){
                $scope.getPassInfo()
            }else{
                $scope.getTradeInfo()
            }
            $scope.getCredit()
        }

        $scope.start()

    }])
// -----------------
var _to_arry = function(lists){
    var tmp=[]
    for(var i=0;i<lists.length;i++){
        if(tmp.length == 0){
            tmp.push({ to:lists[i].to,price:lists[i].price,arr:[lists[i]] })
            // continue
        }else{
            // 如果tmp 数组中没有找到对应的
            var flag = false ; //假设不相等
            var xx = 0;//假设tmp数组中第0个位置相等
            for(var j=0;j<tmp.length;j++){
                // 判断lists的第i个元素是否可以在tmp数组中找到，如果找到则相加并合并，否则插入
                // if(lists[i].to == tmp[j].to){
                //     console.log('相同',i,j,tmp, lists[i].to , tmp[j].to )
                //     tmp[j].price += lists[i].price
                //     tmp[j].arr.push(lists[i])
                //     // break
                // }else{
                //     console.log('不相同',i,j,tmp, lists[i].to , tmp[j].to )
                //    tmp.push({ to:lists[i].to,price:lists[i].price,arr:[lists[i]] })
                //    break
                // }
                if(lists[i].to == tmp[j].to){
                    flag=true
                    xx=j
                }
            }
            if(flag){
                tmp[xx].price += lists[i].price
                tmp[xx].arr.push(lists[i])
            }else{
                tmp.push({ to:lists[i].to,price:lists[i].price,arr:[lists[i]] })
            }
        }
        // if(i==5) break;
    }
    console.log('合成',tmp)
    return tmp
}
var _from_arry = function(lists){
    var tmp=[]
    for(var i=0;i<lists.length;i++){
        if(tmp.length == 0){
            tmp.push({ from:lists[i].from,price:lists[i].price,arr:[lists[i]] })
        }else{
            // 如果tmp 数组中没有找到对应的
            var flag = false ; //假设不相等
            var xx = 0;//假设tmp数组中第0个位置相等
            for(var j=0;j<tmp.length;j++){
                // if(lists[i].from == tmp[j].from){
                //     console.log('相同', lists[i].from , tmp[j].from )
                //     tmp[j].price += lists[i].price
                //     tmp[j].arr.push(lists[i])
                //     break
                // }else{
                //     console.log('不相同', lists[i].from , tmp[j].from )
                //    tmp.push({ from:lists[i].from,price:lists[i].price,arr:[lists[i]] })
                //    break
                // }
                if(lists[i].from == tmp[j].from){
                    flag=true
                    xx=j
                }
            }
            if(flag){
                tmp[xx].price += lists[i].price
                tmp[xx].arr.push(lists[i]) 
            }else{
                tmp.push({ from:lists[i].from,price:lists[i].price,arr:[lists[i]] })
            }
        }
    }

    return tmp
}
// var _to_from = function(to,from){
//     var tmp=to
//     for(var i=0;i<from.length;i++){
//         console.log('i循环',i)
        
//             // 如果tmp 数组中没有找到对应的
//             for(var j=0;j<tmp.length;j++){
//                 console.log('j循环',j)
//                 if(from[i].from == tmp[j].to){
//                     console.log('相同', lists[i].to , tmp[j].to )
//                     tmp[j].price_f += from[i].price
//                     // tmp[j].arr_f.push(from[i]) arr_f:[from[i]]
//                     break
//                 }else{
//                     console.log('不相同', from[i].from , tmp[j].to )
//                    tmp.push({ from:from[i].from,price_f:from[i].price})
//                    break
//                 }
//             }
        
//     }

//     return tmp
// }

//----单个公司的金额汇总
var _person_total = function(arr){
    var total = 0
    for(var i=0;i<arr.length;i++){
        total += arr[i].price
    }
    return total
}
// ---图标统计
var highchartsData = function(arr,companid){
    //遗留：若最大值过千、百 、万如何处理
    //年月组
    var timeArr = []
    for(var i=0;i<11;i++){
        var _tmp = moment().subtract(i,'M').format('YYYYMM')
        timeArr.unshift(_tmp)
    }
    //绘制6个月的时间表
    var gainArr=[0,0,0,0,0,0,0,0,0,0,0,0]
    var expenseArr=[0,0,0,0,0,0,0,0,0,0,0,0]
    var giveArr=[0,0,0,0,0,0,0,0,0,0,0,0]
    var incomeArr=[0,0,0,0,0,0,0,0,0,0,0,0]
    var min = 0
    var max = 0 
    for(var i=0;i<arr.length;i++){
     //获取每个月 授出记录，获得记录 支出记录 收入记录 4个循环
        //判断年月是否存在数组中，并返回当前位置
        var _creation= moment(new Date(arr[i].time_creation)).format('YYYYMM')
        var _repay = moment(new Date(arr[i].repay_time)).format('YYYYMM')
        var cNum = timeArr.indexOf(_creation)
        var rNum = timeArr.indexOf(_repay)
        if(cNum > -1 && (arr[i].status=='effective'||arr[i].status=='complete') ){
            console.log('cNum....'+i)
            //to相同，依据位置
            if(companid == arr[i].to){
                //值为ineffective,complete,金额累加为.. 获得 gain
                gainArr[cNum] += parseInt(arr[i].price)
            }
            //from相同，依据位置
            if(companid==arr[i].from){
                console.log('进入from')
                //值为ineffective,complete,金额累加为.. 授出 give
                giveArr[cNum] += parseInt(arr[i].price)
            }
        }
        if(rNum>-1 && arr[i].status=='complete'){
            //to相同，依据位置
            console.log('complete')
            if(companid ==arr[i].to){
                //值为complete时，金额累加..支出 expense
                expenseArr[rNum] += parseInt(arr[i].price)
            }
            //from相同，依据位置
            if(companid==arr[i].from){
                //值为complete时，金额累加..收入 income
                incomeArr[rNum] += parseInt(arr[i].price)
            }
        }
    }
    // 判断极大极小值，计算步长，并返回单位万/元
    
    return [timeArr,gainArr,giveArr,expenseArr,incomeArr]
}