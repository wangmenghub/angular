angular.module('rsc.development.config', [])
    .constant("ENV", {
        api: {

             //account: 'http://192.168.3.28:18080/api/',
             //pass: 'http://192.168.3.28:18081/api/',
             //trade: 'http://192.168.3.28:18082/api/'       //sj


           //  account: 'http://192.168.3.147:18080/api/',
            // pass: 'http://192.168.3.147:18081/api/',
            // trade: 'http://192.168.3.147:18082/api/',       //交易
           //  msg: 'http://192.168.3.147:18083/msg/'       //消息

            account: 'http://192.168.3.147:18080/api/',
            pass: 'http://192.168.3.147:18081/api/',
            credit: 'http://192.168.3.147:18084/api/',
            trade: 'http://192.168.3.147:18082/api/',       //交易
            msg: 'http://192.168.3.147:18083/msg/'       //消息




            // account: 'http://192.168.3.28:18080/api/',
            // pass: 'http://192.168.3.28:18081/api/',
            // credit: 'http://192.168.3.28:18084/api/',
            // trade: 'http://192.168.3.28:18082/api/',       //交易
            // msg: 'http://192.168.3.28:18083/msg/'       //消息

            //account: 'http://192.168.3.105:18080/api/',
            //pass: 'http://192.168.3.105:18081/api/',
            //trade: 'http://192.168.3.105:18082/api/'       //sj
        },
        debug: false,
        version:'0.5.1',
        // storage:window.localStorage,
        storage:window.sessionStorage,
        scroll:false
    });
