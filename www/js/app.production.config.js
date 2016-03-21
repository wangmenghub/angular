angular.module('rsc.production.config', [])
    .constant("ENV", {
        api: {
            account: 'http://101.200.0.53:18080/api/',
            pass: 'http://101.200.0.53:18081/api/',
            credit: 'http://101.200.0.53:18084/api/',
            trade: 'http://101.200.0.53:18082/api/',       //交易
            msg: 'http://101.200.0.53:18083/msg/'       //消息
        },
        debug: false,
        version:'0.5.1',
        storage:window.localStorage,
        scroll:false
    });