/** * Created by ID on 15/12/28. * Author:zhoudd * email:zhoudd@stark.tm */angular.module('rsc.directive')    .directive('userItem', function () {        return {            restrict: 'EAC',            templateUrl: 'js/directives/template/user/userItem.html',            replace: true,            scope: {                user: '=user',                del: '&del',                hasDel: '@hasDel'            },            controller: function () {            }        }    })