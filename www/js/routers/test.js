/** * Created by ID on 15/12/8. * Author:zhoudd * email:zhoudd@stark.tm */angular.module('rsc.routers.test', ['ui.router'])    .config(['$stateProvider', function ($stateProvider) {        $stateProvider            .state('tab.test', {                url: '/test',                views: {                    'center-content': {                        templateUrl: 'template/test/test.html',                        //controller: 'testCtrl'                    }                }            })    }])