/** * Created by ID on 15/12/7. * Author:zhoudd * email:zhoudd@stark.tm */describe('service Test', function () {        beforeEach(angular.mock.module('rac.test.controller'));        it('counterService Test', function () {            angular.mock.inject(function (counterService) {                expect(counterService.getCounter()).toEqual(0);                counterService.incrementCounter();                expect(counterService.getCounter()).toEqual(1);            })        })    })