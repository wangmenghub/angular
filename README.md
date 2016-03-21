/**
*	修订说明
*/
<!-- 20151203 sj -->
1,修改boostrap中的.row .row:after .row:before类名为 .row-bootstrap .row-bootstrap:after .row-bootstrap:before
2,新增 模板 navapp navpc footer

<!-- 20151207 sj-->
1,增加登录验证，需要简化
2,如何取消个人中心的登录验证：
	注释www/js/routers/me.js中 38-50行的代码
3,增加welcome的权限控制，实现不同角色对应不同操作。
	在./js/server.js 文件中新增rolesConfig对象,指定角色权限操作
	遗留：需解决角色权限为全局对象

<!-- 20151208 sj -->
1,增加ionic弹窗
2,代码下载之后修改app.development.config.js中的ip地址

<!-- 20151214 sj -->
1,在welcome.js中将修改公司信息获取方式；
2,rush页面若不能自动刷新页面，则需要多次填写请求的header头信息
3,订单流转页面编写

<!-- 20151215 -->
1,新建账号5个 密码
交易销售  
交易管理员 
仓库管理员： 
2. user服务 中获取仓库地理位置 的权限需要放开
 管理员、交易员、销售员
 
<!-- 20151218 -->
1.发布挂单 增加2个新字段(信用和现金)，扩展2个旧字段(物流、质量扣款)
2.仓库添加增加 经纬度
3,添加物流订单 数据中订单号是大写，验证是用小写
4,修改上传支付凭证的服务端代码

<!-- 20151223 -->
1.弹窗用法
 _popup($scope, object, $ionicPopup, objmsg).then(function(res){console.log(res)})
 	objmsg:对象类型,自定义元素，对应弹窗中的data对象
 	object对象，有2个元素，templateUrl属性指向模板位置,title属性指弹窗的标题
 	$scope,$ionicPopup为ionic中的当前域或弹窗的函数
 	返回值：res是一个对象

2.上传图片用法
 _upimg(file,_url,$http).success(function(data){console.log(data)})
 	ENV.api.account + 'file/upload/'+type
 	file:图片信息 
 	_url:上传服务的请求地址
 	$http:ionic中$http服务
 	返回值:data是上传图片的url地址
 3.地区弹窗
 	<!-- 弹窗中默认选项初始为data -->
 	var data = {currentProvinceId: 0, currentCityId: 0,currentAreaId: 0}
    <!-- 20160107 如果需要隐藏 省市县可以传递prov=true -->
    var obj = {templateUrl:'/template/common/pro_city.html',title:'请选择地区'}
    _popup($scope,obj,$ionicPopup,data).then(function(res){console.log(res)}
 4.单选框弹窗模板
 	<!-- 弹窗中的单选按钮组,模板中读取popup_lists数组,它的键为'eng',值为'chn' -->
 	$scope.popup_lists = [{chn:'炼焦行业',eng:'IRON'},{chn:'煤炭行业',eng:'COAL'}]
 	<!--  弹窗模板 与 标题 -->
    var object = {templateUrl:'/template/common/popup_radio.html',title:'选择行业'}
    var objmsg = {type:''}    //type类型有radio,text,number3种类型
    _popup($scope, object, $ionicPopup, objmsg).then(function(res){
            console.log(res)
        })
 5.多选框弹窗

20151224
1,账号 
18900111222 大同煤矿 admin 18900111223 销售 18900111224 采购 18900111225 财务 18900111226 仓管理
18900111333 轩岗煤电 admin 18900111334 销售 18900111335 采购 18900111336 财务 18900111337 仓管理
18900111444 山西焦煤 admin 18900111445 销售 18900111446 采购 18900111447 财务 18900111448 仓管理
18900111555 汾西矿业 admin 18900111556 销售 18900111557 采购 18900111558 财务 18900111559 仓管理
18900111666 霍州煤电 admin 18900111667 销售 18900111668 采购 18900111669 财务 18900111670 仓管理
13300111222 山西煤炭运销集团有限公司  13300111223 物流负责人 13300111224--228 司机 
  15311331133 15311331122 私有司机
  15311221122 15311221133 公有司机
13300111333 山西煤炭进出口集团有限公司 13300111334 物流负责人 13300111335-7 司机

15311112222 物流企业  测试流程企业

2016/3/10
18800000011 山西甲煤矿  超级管理员

物流企业

15500111221 15500111331


 /**
 *	添加用户测试
 */
 18900000001 小煤厂企业管理员
 
 18900000011 小煤厂仓管
 18515062013 测试司机三 
 
 18000000001 交易型企业
 18000000002 测试销售企业仓库管理
   
 18000000011 物流型企业
 18000000012 物流企业司机
 
    <navbar
               ng-init="navbar.navLeftIco='ion-ios-arrow-back'; navbar.navLeft='返回'; navbar.title='订单详情' ;navbar.navRightHref='tab.';navbar.navRight='';navbar.navLeftHref='tab.eBankIncome';">
    </navbar>
    
    <div class="col-xs-12 gap-20">
                                <div class="col-xs-6 text-center">
                                    <a ui-sref="tab.passOrder({order_id:order_id})">
                                        <button class="col-xs-6 btn btn-block btn-yellow md-trigger md-setperspective"
                                                data-modal="modal-3">
                                            返回
                                        </button>
                                    </a>
                                </div>
                                <div class="col-xs-6 text-center">
    
                                    <button ng-click="complete()" class="col-xs-6 btn btn-block btn-yellow md-trigger md-setperspective"
                                            data-modal="modal-3">
                                        完成
                                    </button>
                                </div>
    
                                <div class="gap-50"></div>
    
    
                            </div>
    
      <ion-content overflow-scroll="true"> 
    
  user_used_repeat  司机重复使用
  user_not_found 司机不存在
  user_not_allow  司机不属于本公司
  user_is_not_driver 被选人不是司机
  truck_used_repeat 车辆重复使用
  truck_not_found 车辆没有找到
  truck_not_allow 车辆不属于本公司或者不属于被分配司机
  
  
  
  src='./img/.....'
  ng-src='img/.....'i
  
  verification_phase: {
          'NO':'NO',
          'PROCESSING':'PROCESSING',
          'SUCCESS':'SUCCESS',
          'FAILED':'FAILED'
      },
20160111
1,增加无数据模板
<div ng-include="'/template/common/nodata_hint.html'"></div>
20160116
1,增加一个模板标签
<no-data-hint no-data="{img:'./img/me/order-blank.png',msg1:'您还没有任何订单哦',msg2:'可以去看看有哪些需要的',url:'#/tab/rush',title:'发布采购'}"></no-data-hint>
2，货物质量细则
<att-product data="order.att_product" desc="desc"></att-product>
物流细则
<att-traffic data="order.att_traffic"></att-traffic>

20160121
1,from give(债主，授出信用,收入) to gain (欠款人 ,获得信用,支出)
20160304之前是欠款方审批，之后是债主方审批

20160122
1,信用逻辑
信用单据状态:   等待审批，审批通过，还款完成，拒绝审批
信用单据总额：  获得：审批通过。。
                授出: 审批通过。。
信用列表:       获得：审批通过　还款完成　
                授出：审批通过，还款完成
cancelled: 'cancelled',
effective: 'effective',
ineffective: 'ineffective',
complete: 'complete'

2,商品属性标签
<my-attr-prod-info attr-product='order.att_product' attr-desc='desc' attr-class="order" attr-show='4'></my-attr-prod-info>

3,公司名称和加v标志
<company-label company-id="i.company_id" type="trade"></company-label>
4,地址
<rsc-address address-id="i.location_storage" address-name="交货地点"
   address-icon="ion-ios-location-outline text-purple2"
   text-class=""></rsc-address>
5,新增 获取未读消息接口
/get_msg_unread_count/:target
获取当前未读消息的条目数


20160126
1，获取统计数据
账号服务器
/api/home/get_company_info
公司总数
total: 48
trade: 32  交易
traffic: 16 物流

/api/home/get_truck_line_info
总线路数
total_line: 30  
total_truck: 34 车辆总
week_line: 0  周新增线路
week_truck: 1  周车辆新

物流服务器
/api/home/get_demand_info

average_price: "0.6"  平均每个需求单的抢单数 抢单比重
demand_total_amount: 30839.280000000002  货运需求量
demand_total_count: 60  货运总单数
demand_wait_amount: 4463 待运总吨数
demand_week_amount: 40  每周新增货运
offer_total_count: 34   抢单总数

金融服务器
/api/home/get_credit_info

credit_company_count: 4  授信公司数量
effective_total: 21856.048681081083    流通中的信用度
give_total: 29149.678981081084  授出总信用度
give_week: 0  每周授出

20160129
trade158.getDemandList2(_order,_startPage),get方式,以某种顺序读取某一个类型货物的挂单数据
trade158.getGoodsDescs(goods_name) ,获取产品详细参数
trade158.getDemandNew() 发布采购
trade158.getCompanyTradeStore(),获取仓库
trade158.getDemandDetail(_id),根据id获取需求单
trade158.getDemandofferCount(_id),获取抢单数
trade158.getDemandOfferList(_id,_page),获取抢单列表
trade158.getDemandOrderNew(_demandid,_offerid,_data) ,发起订单流程
trade158.getDemandOfferDetail(_offerid),获取自己挂单
trade158.getDemandOfferEdit(_offerid,_data),修改自己的挂单
tradePass.getDemandOrderDetail(method,id), 获取订单信息
tradePass.getUserInfo(type,_data) ,获取用户信息
tradePass.getDemandOrder1Confirm(_id),订单步骤由第一步变为第二步
tradePass.getDemandOrder2Confirm(_id) 在第二步时供应方确认预付款。操作后，步骤变为第三步，状态变为已生效（effective）
tradePass.getDemandOrder2Payment(_method,_id) 确认支付
tradePass.getDemandOrderApplyCredit(_type,_id)
tradePass.getDemandOrder23TrafficOrders(_data)
tradePass.getDemandOrder4Confirm(_id)
tradePass.getDemandOrder4Validation(_id,_data)
tradePass.getDemandOrder5ReqForgiven(_id,_data)
tradePass.getDemandOrder5NoForgiven(_id)
tradePass.getDemandOrder5Confirm(_id)
tradePass.getDemandOrder5ConfirmForgiven(_id)
tradePass.getDemandOrder5Payment(_id)




微信分享抢单链接   
物流：http://192.168.3.104:8100/#/tab/reg/traffic_order/56ab07cb6987282e7c8c5cd0 
交易：http://192.168.3.104:8100/#/tab/reg/trade_order/56ab07cb6987282e7c8c5cd0 

20160129
修改 货物结算细则
<att-product data="order.att_product" attr-category="order.category"></att-product>
修改 产品详细
<my-attr-prod-info attr-product='order.att_product' attr-show='4' attr-category="order.category"></my-attr-prod-info>

20160130
1,时分秒标签
<timer end-time="demand_detail.time_validity" language="zh-CN">
<span>{{days}} 天, {{hours}} 时, {{minutes}} 分, {{seconds}} 秒.</span>
</timer>

ldpi：240x320

mdpi：320x480
hdpi：480x800、480x854
xhdpi：至少960*720
xxhdpi：1280×720

20160301
1,新增采购需求单详情标签，显示交货时间，交货地点，结算方式，支付方式，价格
<demand-detail data='demand_detail'></demand-detail>


没锁定 false 可以传图片,不能提交认证.
锁定   true  不能改图,能提交认证.


Order字段含义:

新支付字段
        payment_choice: {type:String},  //现有支付选择(现金，银兑，商兑)
        payment_method: {type:String},  //现有支付方法(货到付款，款到付货，分期，信用)
        percentage_advance: {type:Number},      //预付款百分比
        percentage_remain: {type:Number},      //中款百分比
区分三方两方物流字段

  type: {type:String},                  //两方需求（三方需求）
    TWO: 'TWO',
     THREE: 'THREE'
     
支付渠道
    
 payment_choice: {
        cash: 'cash',                 //现金
        bill_bank: 'bill_bank',     //银兑
        bill_com: 'bill_com'        //商兑
    },

20160303
1,新增支付方式标签
<payment-method order="demand_detail"></payment-method>
2,新增交易订单
##交易物信息
<trade-order-shop order='order' user-info='userInfo'></trade-order-shop>
##交易支付方式
<trade-order-payment order="order"></trade-order-payment>
##交易协议
<trade-order-pact order="order"></trade-order-pact>
##交易步骤
<trade-order-step order="order" is-company="isCompany" demand-step="demandStep" supply-step='supplyStep'></trade-order-step>

20160304
1,在navbar标签中增加select式标题，用法如下：
赋值：
<!-- 循环标题组，chn为显示的文字，eng选项的value -->
navbar.titles=[{eng:'abc',chn:'商业'},{eng:'bcd',chn:'房产'}] 
<!-- 发生变化的事件 -->
navbar.change='testchange()' 
<!-- 设置默认的eng-->
navbar.item='abc'
例：
 <navbar
 ng-init="navbar.titles=[{eng:'abc',chn:'商业'},{eng:'bcd',chn:'房产'}] ;navbar.change='testchange()';navbar.item='abc';" >
 </navbar>
 
 build.gradle
android {
    buildTypes {
        release {
            lintOptions {
                disable 'MissingTranslation'
            }
        }
    }
}
 payment_method: {
        all_cash: 'all_cash',   //款到付货
        all_goods: 'all_goods', //货到付款
        partition: 'partition', //分期
        credit: 'credit'        //信用
    },
    
    
    part_type: {
            TWO: 'TWO',
            THREE: 'THREE'
        },
        
        
        
        0 代表管理员
        1 代表公有司机
        2 代表私有司机
185000000001 
185000000011
185000000012
185000000021
185000000022




采购企业，管理：15911010000 采购 15911011111 库管15911012222 密码a111111
销售管理员 ：18611385752 密码 zhou285618012 仓库：15910668588 密码zs123456
物流：18800000005  a11111    公有司机18800000006   a11111    私有司机18800000012  a11111