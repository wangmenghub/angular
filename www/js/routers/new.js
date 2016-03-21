
/**
 * Created by ID on 15/12/15.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 *
 *
 * 给新加路由文件给梦林添加，避免冲突
 * */
angular.module('rsc.routers.new', ['ui.router'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('tab.new', {
                url: '/test',
                views: {
                    'center-content': {
                        templateUrl: 'template/test/test.html',
                        //controller: 'testCtrl'
                    }
                }
            })
    /*//////////////////////*/

            .state('tab.companyPass', {
                url: '/companyPass',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/companyPass.html',
                        //controller: 'companyPassCtrl'
                    }
                }
            }) //物流企业主页
/*////////////////////////////////////////采购仓库管理员///////////////////////////////////////*/
            .state('tab.applyStore', {
                url: '/applyStore',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore.html',
                        //controller: 'applyStoreCtrl'
                    }
                }
            }) //申请入库
            .state('tab.applyStore1', {
                url: '/applyStore1',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore1.html',
                        //controller: 'applyStore1Ctrl'
                    }
                }
            }) //入库完成
            .state('tab.storeOrder', {
                url: '/storeOrder',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder.html',
                        //controller: 'storeOrderCtrl'
                    }
                }
            }) //申请入库详情 下订单
            .state('tab.storeOrder1', {
                url: '/storeOrder1',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder1.html',
                        //controller: 'storeOrder1Ctrl'
                    }
                }
            }) //申请入库详情 申请入库
            .state('tab.applyStore2', {
                url: '/applyStore2',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore2.html',
                        //controller: 'applyStore2Ctrl'
                    }
                }
            }) //申请入库详情 申请入库车列表
            .state('tab.applyStore3', {
                url: '/applyStore3',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore3.html',
                        //controller: 'applyStore3Ctrl'
                    }
                }
            }) //申请入库详情 申请入库车辆过磅
            .state('tab.storeOrder2', {
                url: '/storeOrder2',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder2.html',
                        //controller: 'storeOrder2Ctrl'
                    }
                }
            }) //申请入库详情 申请入库完成

/*////////////////////////////////////////销售仓库管理员///////////////////////////////////////*/
            .state('tab.applyStore-sell', {
                url: '/applyStore-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore-sell.html',
                        //controller: 'applyStore-sellCtrl'
                    }
                }
            }) //申请提货
            .state('tab.applyStore1-sell', {
                url: '/applyStore1-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/applyStore1-sell.html',
                        //controller: 'applyStore1-sellCtrl'
                    }
                }
            }) //提货完成
            .state('tab.storeOrder-sell', {
                url: '/storeOrder-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder-sell.html',
                        //controller: 'storeOrder-sellCtrl'
                    }
                }
            }) //申请详情 下订单
            .state('tab.storeOrder1-sell', {
                url: '/storeOrder1-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder1-sell.html',
                        //controller: 'storeOrder1-sellCtrl'
                    }
                }
            }) //申请详情 申请提货 司机列表
            .state('tab.storeOrder2-sell', {
                url: '/storeOrder2-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder2-sell.html',
                        //controller: 'storeOrder2-sellCtrl'
                    }
                }
            }) //申请详情 申请提货
            .state('tab.storeOrder3-sell', {
                url: '/storeOrder3-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder3-sell.html',
                        //controller: 'storeOrder3-sellCtrl'
                    }
                }
            }) //订单详情 提货完成2司机提货详情
            .state('tab.storeOrder4-sell', {
                url: '/storeOrder4-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder4-sell.html',
                        //controller: 'storeOrder4-sellCtrl'
                    }
                }
            }) //订单详情 提货完成
            .state('tab.storeOrder5-sell', {
                url: '/storeOrder5-sell',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/storeOrder5-sell.html',
                        //controller: 'storeOrder5-sellCtrl'
                    }
                }
            }) //编辑过磅吨数
/*////////////////////////////////////////我（仓库管理）///////////////////////////////////////*/
            .state('tab.store-me', {
                url: '/store-me',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/store-me.html',
                        //controller: 'store-meCtrl'
                    }
                }
            }) //我
            .state('tab.store1-me', {
                url: '/store1-me',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/store1-me.html',
                        //controller: 'store1-meCtrl'
                    }
                }
            }) //仓库管理2(空白状态)
            .state('tab.store2-me', {
                url: '/store2-me',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/store2-me.html',
                        //controller: 'store2-meCtrl'
                    }
                }
            }) //仓库管理
            .state('tab.addStore', {
                url: '/addStore',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/addStore.html',
                        //controller: 'addStoreCtrl'
                    }
                }
            }) //添加仓库2
            .state('tab.store3-me', {
                url: '/store3-me',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/store3-me.html',
                        //controller: 'store3-meCtrl'
                    }
                }
            }) //我的同事
            .state('tab.store-mySet', {
                url: '/store-mySet',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/store-mySet.html',
                        //controller: 'store-mySetCtrl'
                    }
                }
            }) //账户设置
/*////////////////////////////////////////交易采购相关弹窗///////////////////////////////////////*/
            .state('tab.addKPI', {
                url: '/addKPI',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/addKPI.html',
                        //controller: 'addKPICtrl'
                    }
                }
            }) //发布抢单 添加更多指标
/*////////////////////////////////////////司机（订单）///////////////////////////////////////*/
            .state('tab.driverOrder', {
                url: '/driverOrder',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/driverOrder.html',
                        //controller: 'driverOrderCtrl'
                    }
                }
            }) //物流状态 接单
            .state('tab.wait-pass', {
                url: '/wait-pass',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/wait-pass.html',
                        //controller: 'wait-passCtrl'
                    }
                }
            }) //物流订单2 等待过磅
            .state('tab.driveInfor', {
                url: '/driveInfor',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/driveInfor.html',
                        //controller: 'driveInforCtrl'
                    }
                }
            }) //物流订单 吐槽消息
/*////////////////////////////////////////司机（我）///////////////////////////////////////*/
            .state('tab.addCar1', {
                url: '/addCar1',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/addCar1.html',
                        //controller: 'addCar1Ctrl'
                    }
                }
            }) //添加车辆（空白状态）
            .state('tab.driverHome', {
                url: '/driverHome',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/driverHome.html',
                        //controller: 'driverHomeCtrl'
                    }
                }
            }) //司机进入页
            .state('tab.myCar', {
                url: '/myCar',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/myCar.html',
                        //controller: 'myCarCtrl'
                    }
                }
            }) //我的车辆(空白状态)
            .state('tab.myCar1', {
                url: '/myCar1',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/myCar1.html',
                        //controller: 'myCar1Ctrl'
                    }
                }
            }) //我的车辆
/*//////////////////////////////////////// 金融 ///////////////////////////////////////*/
            .state('tab.eBankIncome', {
                url: '/eBankIncome',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome.html',
                        controller: 'ebankCtrl'
                    }
                }
            }) //信用
// ------------------------ 金融 sj 额外增加  20151225 17:25 start------------------------
//金融中间     信用
            .state('tab.eBankIncome.center', {
                url: '/eBankIncomecenter',
                views: {
                    'child-view': {
                        templateUrl: 'template/ebank/eBankIncome_c.html',
                        //controller: 'eBankIncomeCtrl'
                    }
                }
            })
             //金融左侧     订单
            .state('tab.eBankIncome.left', {
                url: '/eBankIncomeL',
                views: {
                    'child-view': {
                        templateUrl: 'template/ebank/eBankIncome_l.html',
                        //controller: 'eBankIncome_lCtrl'
                    }
                }
            })
            /******* 左侧订单start *****/
            .state('tab.eBankIncome.left.tdemand', {
                url: '/eBankIncomeLtd',
                views: {
                    'grandson-view': {
                        templateUrl: 'template/me/company/tradedemand.html',
                        //controller: 'eBankIncomeCtrl'
                    }
                }
            })
            .state('tab.eBankIncome.left.tsupply', {
                url: '/eBankIncomeLts',
                views: {
                    'grandson-view': {
                        templateUrl: 'template/ebank/tradeOrder.html',
                        //controller: 'eBankIncomeCtrl'
                    }
                }
            })
            .state('tab.eBankIncome.left.pdemand', {
                url: '/eBankIncomeLpd',
                views: {
                    'grandson-view': {
                        templateUrl: 'template/ebank/eBankIncome_lpd.html',
                        //controller: 'eBankIncomeCtrl'
                    }
                }
            })
            .state('tab.eBankIncome.left.psupply', {
                url: '/eBankIncomeLps',
                views: {
                    'grandson-view': {
                        templateUrl: 'template/ebank/trafficOrder.html',
                        controller: 'trafficOrderCtrl'
                    }
                }
            })
            /******* 左侧订单end *****/
            //金融    右侧
            .state('tab.eBankIncome.right', {
                url: '/eBankIncomeright',
                views: {
                    'child-view': {
                        templateUrl: 'template/ebank/eBankGeneral.html',
                        //controller: 'eBankIncomeCtrl'
                    }
                }
            })
            /************ 金融 审批********************/
            .state('tab.eBankIncomeApprove', {
                url: '/eBankIncome_approve',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome_approve.html'
                    }
                }
            })
// ------------------------ 金融 sj 额外增加 end------------------------
            .state('tab.eBankIncome-1', {
                url: '/eBankIncome-1/:companyid/:type',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome-1.html',
                        //controller: 'eBankIncome-1Ctrl'
                    }
                }
            }) //获得的信用额度
            .state('tab.eBankIncome-2', {
                url: '/eBankIncome-2',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome-2.html',
                        //controller: 'eBankIncome-2Ctrl'
                    }
                }
            }) //授出的信用额度1
            .state('tab.eBankIncome-3', {
                url: '/eBankIncome-3',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome-3.html',
                        //controller: 'eBankIncome-3Ctrl'
                    }
                }
            }) //授出的信用额度
            .state('tab.eBankIncome-4', {
                url: '/eBankIncome-4',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankIncome-4.html',
                        //controller: 'eBankIncome-4Ctrl'
                    }
                }
            }) //审批
            .state('tab.eBankGeneral', {
                url: '/eBankGeneral',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/eBankGeneral.html',
                        //controller: 'eBankGeneralCtrl'
                    }
                }
            }) //概况
            .state('tab.backOrderDetail', {
                url: '/backOrderDetail/:companyid/:type/:orderindex/:creditid',
                views: {
                    'center-content': {
                        templateUrl: 'template/ebank/backOrderDetail.html',
                        //controller: 'backOrderDetailCtrl'
                    }
                }
            }) //还款订单详情
/*//////////////////////////////////////// 采购 ///////////////////////////////////////*/
    /*（抢单）*/
           .state('tab.tradeRules', {
                url: '/tradeRules',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeRules.html',
                        //controller: 'tradeRulesCtrl'
                    }
                }
            }) //产品结算细则
           .state('tab.passRules', {
                url: '/passRules',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/passRules.html',
                        //controller: 'passRulesCtrl'
                    }
                }
            }) //物流结算细则
    /*（订单流程）*/
            .state('tab.creditApply', {
                url: '/creditApply',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/creditApply.html',
                        //controller: 'creditApplyCtrl'
                    }
                }
            }) //支持预付款-申请信用3
    /*（我）*/
            .state('tab.companyIntroduce', {
                url: '/companyIntroduce',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/companyIntroduce.html',
                        //controller: 'companyIntroduceCtrl'
                    }
                }
            }) //填写企业介绍
            .state('tab.person', {
                url: '/person',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/person.html',
                        //controller: 'personCtrl'
                    }
                }
            }) //人员管理1(空白状态)
            .state('tab.person-1', {
                url: '/person-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/person-1.html',
                        //controller: 'person-1Ctrl'
                    }
                }
            }) //人员管理1(有内容)
            .state('tab.changeRole', {
                url: '/changeRole',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/changeRole.html',
                        //controller: 'changeRoleCtrl'
                    }
                }
            }) //修改角色
            .state('tab.nameCard_trade', {
                url: '/nameCard_trade/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/nameCard_trade.html',
                        //controller: 'nameCard_tradeCtrl'
                        controller: 'MyRscCtrl',
                        controllerAs: 'MyRsc'
                    }
                }
            }) //同事详情（可修改角色）
/*//////////////////////////////////////// 销售 ///////////////////////////////////////*/
        /*我*/
            .state('tab.credit', {
                url: '/credit',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/credit.html',
                        //controller: 'creditCtrl'
                    }
                }
            }) //审批信用额度

            .state('tab.example-1', {
                url: '/example-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/example/example-1.html',
                        controller: 'rushPublishController'
                    }
                }
            }) //测试

            .state('tab.example-list-check', {
                url: '/example-list-check',
                views: {
                    'center-content': {
                        templateUrl: 'template/example/example-list-check.html',
                        //controller: 'example-list-checkController'
                    }
                }
            }) //测试

            .state('tab.example', {
                url: '/example',
                views: {
                    'center-content': {
                        templateUrl: 'template/example/example.html',
                        //controller: 'rushPublishController'
                    }
                }
            }) //测试

/*//////////////////////////////////////// 找回密码 设置新密码 ///////////////////////////////////////*/
            .state('tab.findPass', {
                url: '/findPass',
                views: {
                    'center-content': {
                        templateUrl: 'template/general/findPass.html',
                        //controller: 'findPassCtrl'
                    }
                }
            }) //找回密码
            .state('tab.setNewpass', {
                url: '/setNewpass',
                views: {
                    'center-content': {
                        templateUrl: 'template/general/setNewpass.html',
                        //controller: 'setNewpassController'
                    }
                }
            }) //设置新密码

/*//////////////////////////////////////// 搜索货源 ///////////////////////////////////////*/


/*//////////////////////////////////////// 注册协议 ///////////////////////////////////////*/


/*//////////////////////////////////////// 短信 ///////////////////////////////////////*/
            .state('tab.sendMessage', {
                url: '/sendMessage',
                views: {
                    'center-content': {
                        templateUrl: 'template/common/sendMessage.html',
                        //controller: 'TranspSearchAdvController'
                    }
                }
            }) //短信


            .state('tab.link-man', {
                url: '/link-man',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/link-man.html',
                        //controller: 'link-manController'
                    }
                }
            }) //联系人

            .state('tab.newMessage', {
                url: '/newMessage',
                views: {
                    'center-content': {
                        templateUrl: 'template/common/newMessage.html',
                        //resolve: {
                        //  userToken: ['$q', '$log', 'authenticationService', function ($q, $log, authenticationService) {
                        //    var userToken = authenticationService.getUserInfo();
                        //    if (userToken) {
                        //      $log.debug(userToken);
                        //      return $q.resolve(userToken);
                        //    }
                        //    else {
                        //      return $q.reject({islogin: false});
                        //    }
                        //  }]
                        //},
                        //controller: 'MynewMessage2Ctrl'
                    }
                }
            }) //邀请分配

            .state('tab.regSuccess', {
                url: '/regSuccess',
                views: {
                    'center-content': {
                        templateUrl: 'template/general/regSuccess.html',
                        controller: 'regSuccessCtrl'
                    }
                }
            }) //注册成功



            .state('tab.attention', {
                url: '/attention',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/attention.html',
                        // controller: 'attentionCtrl'
                    }
                }
            })
            // 认证企业--已认证
            .state('tab.attention-1', {
                url: '/attention-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/attention-1.html',
                        // controller: 'attention-1Ctrl'
                    }
                }
            })
            // 我的物流公司
            .state('tab.my_logistics', {
              url: '/my_logistics',
              views: {
                'center-content': {
                  templateUrl: 'template/me/my_logistics.html',
                  // controller: 'attention-1Ctrl'
                }
              }
            })

            // 认证企业--未认证

            .state('tab.tradeOrder3-3', {
                url: '/tradeOrder3-3',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeOrder3-3.html',
                        // controller: 'tradeOrder3-3Ctrl'
                    }
                }
            })
            // 上传质检报告

            .state('tab.inforSysterm-1', {
                url: '/inforSysterm-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/me/inforSysterm-1.html',
                        // controller: 'inforSysterm-1Ctrl'
                    }
                }
            })
            // 消息详情

            .state('tab.driverManage-1', {
                url: '/driverManage-1',
                views: {
                    'center-content': {
                        templateUrl: 'template/new/driverManage-1.html',
                        // controller: 'driverManage-1Ctrl'
                    }
                }
            })
            // 车辆管理

            .state('tab.tradeCarList', {
                url: '/tradeCarList',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeCarList.html', //'template/new/carList.html',
                        // controller: 'tradecarListCtrl'
                    }
                }
            })
            // 车队列表（创建新车队）

            .state('tab.tradeCarListPlan', {
                url: '/tradeCarListPlan',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeCarListPlan.html', //'template/new/carListPlan.html',
                        // controller: 'tradeCarListPlanCtrl'
                    }
                }
            })
            // 车队列表（物流计划）

            .state('tab.tradeCarListPlan-1', {
                url: '/tradeCarListPlan-1/:companyid',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/tradeCarListPlan-1.html', //'template/new/carListPlan-1.html'
                        // controller: 'carListPlan-1Ctrl'
                    }
                }
            })
            // 物流计划详情

            .state('tab.publishPass', {
                url: '/publishPass/:id',
                views: {
                    'center-content': {
                        templateUrl: 'template/158/publishPass.html', //'template/new/publishpass.html'
                        // controller: 'publishPassCtrl'
                    }
                }
            })
            // 发布货源

            .state('tab.carTeam', {
                url: '/carTeam',
                views: {
                    'center-content': {
                        templateUrl: 'template/pass/carTeam.html', //'template/new/carListPlan-1.html'
                        // controller: 'setCarCtrl'
                    }
                }
            })
            // 组建车队



            .state('tab.driverOrder1', {
                url: '/driverOrder1',
                views: {
                    'center-content': {
                        templateUrl: 'template/new/driverOrder1.html', //'template/new/carListPlan-1.html'
                        // controller: 'driverOrder1Ctrl'
                    }
                }
            })
            // 私有司机订单（完成）

    }])








