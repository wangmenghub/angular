/**
 * Created by ID on 15/12/21.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.service.driver', ['restangular', 'rsc.service.rest'])
    .factory('DriverService', function ($q, ENV, PassRestAngular) {
        return {
            /**
             * 获取司机订单
             * @returns {*}
             */
            getOrderList: function () {
                var pass = PassRestAngular.allUrl('route/get_driver_log');
                return pass.post();
            },
            getOrderById: function (id) {
                //http://192.168.3.147:18081/api/order/get_one
                var all = PassRestAngular.allUrl('/order/driver_get');
                return all.post({order_id: id});
            },
            getRouteById: function (id) {
                var all = PassRestAngular.allUrl('/route/get_one');
                return all.post({route_id: id});
            },
            driverAgreeOrder: function (order_id, isArgee) {
                var all = PassRestAngular.allUrl('/route/agree');
                return all.post({order_id: order_id, agree: isArgee});
            },

            getCanGrab: function (type) {
              var all = PassRestAngular.allUrl('driver_offer/driver_get');
              return all.post({already:type});
            },
            gain: function (id) {
              var all = PassRestAngular.allUrl('driver_offer/add');
              return all.post({order_id:id});
            },
            /**
             * 申请提货
             * @param order_id
             */
            pickUp: function (order_id) {
                var all = PassRestAngular.allUrl('/order/3_application_get');
                return all.post({order_id: order_id});
                //
            },
            /**
             * 添加备注
             * @param order_id
             * @param text
             * @returns {*}
             */
            addNote: function (order_id, text) {
                var all = PassRestAngular.allUrl('/order/3_add_note');
                return all.post({order_id: order_id, text: text});
            },
            /**
             *司机申请交货
             * @param order_id
             * @returns {*}
             */
            giveGoods: function (order_id) {
                var all = PassRestAngular.allUrl('/order/3_application_give');
                return all.post({order_id: order_id});
            },
            /**
             * 获取司机订单总数
             * @param user_id
             * @returns {*}
             */
            getDriverOrderCount: function (user_id) {
                //route/get_driver_log_count
                var all = PassRestAngular.allUrl('route/get_driver_log_count');
                return all.post({user_id: user_id});

            },
            /**
             * 获取司机总吨数
             * @param user_id
             * get :{type:Number, default: 0},      //提货总吨数
             * give :{type:Number, default: 0},      //交货总吨数
             * @returns {*}
             */
            getDriverAmountCount: function (user_id) {
                ///
                var all = PassRestAngular.allUrl('stat/get_by_user_id');
                return all.post({user_id: user_id});

            },
            /**
             * 两方物流司机提货
             * @param order_id
             * @param number
             * @returns {*}
             */
            driveTwoPackage: function (order_id, number) {
                var all = PassRestAngular.allUrl('order/3_both_get');
                return all.post({order_id: order_id, number: number});
            },
            /**
             * 两方物流司机交货
             * @param order_id
             * @param number
             * @returns {*}
             */
            driverTWoGive: function (order_id, number) {
                var all = PassRestAngular.allUrl('order/3_both_give');
                return all.post({order_id: order_id, number: number});
            }


        }
    })
