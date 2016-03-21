/**
 * Created by ID on 15/11/23.
 * Author:zhoudd
 * email:zhoudd@stark.tm
 */
angular.module('rsc.directive', [])
    .directive('appHead', function () {
        return {
            restrict: 'E',
            scope: {
                title: '@'
            },
            templateUrl: 'template/common/navbar.html',
            replace: true
        }
    })
    .directive('cUnique', ['Account', function (Account) {
        return {
            require: 'ngModel',
            link: function (scope, ele, attrs, ctrl) {
                //console.log('ele', ele)
                //console.log('scope', scope)
                //console.log('attrs', attrs)
                //console.log('ctrl', ctrl)
                scope.$watch(attrs.ngModel, function () {
                    //if (!n) {
                    //    console.log('return')
                    //    return;
                    //}

                    ctrl.$setValidity('too_frequent', true);
                    //ctrl.$parsers.push(function (val) {
                    var val = scope.user.phone;
                    //if (!val) {
                    //    ctrl.$setValidity('required', false);
                    //    return val;
                    //} else
                    {
                        if (!ctrl.$valid) {
                            ctrl.$setValidity('valueUnique', true);
                            //return val;
                        } else {
                            Account.checkPhoneExist(val).then(function (result) {
                                if (result.status != "success") {
                                    //ctrl.$setValidity('invalid_format', false);
                                    ctrl.$setValidity('valueUnique', result.data.use);
                                } else {
                                    //ctrl.$setValidity('invalid_format', true);
                                    ctrl.$setValidity('valueUnique', !result.data.use);
                                    //console.log(!result.data.use);
                                }
                            });
                            //return val;
                        }
                    }
                    //})
                })
            }
        }
    }])
    // 模板 与appHead类似
    .directive('navbar',function(){
        return {
            restrict:'E'
            ,templateUrl:'./template/common/navbar.html'
            ,controller:function($scope,Storage){
                if(Storage.get('userInfo')){
                    $scope.navbar_show = true
                    $scope.role_name = Storage.get('userInfo').user.real_name
                }else{
                    $scope.navbar_show = false
                }
                $scope.logout = function(){
                    Storage.remove('userInfo')
                }
            }
        }
    })
    // 模板
    .directive('navapp',function(){
        return {
            restrict:'E'
            ,templateUrl:'./template/common/navapp.html'
        }
    })
    .directive('navpc',function(){
        return {
            restrict:'E'
            ,templateUrl:'./template/common/navpc.html'
        }
    })
    .directive('footer',function(){
        return {
            restrict:'E'
            ,templateUrl:'./template/common/footer.html'
        }
    })
    /*.directive('navbar2Detail',function(){
        return {
            restrict:'E'
            ,templateUrl:'./template/common/navbar2Detail.html'
        }
    })*/
