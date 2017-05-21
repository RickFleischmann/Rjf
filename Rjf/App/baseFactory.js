//var baseFactory = angular.module('baseFactory', []);

//baseFactory.factory('baseFactory', ['$http', function ($http) {

//    //Standard Json call
//    var dataFactory = {};
//    dataFactory.serverService = function (url, method, data) {
//        return $http({
//            url: url,
//            method: method,
//            transformRequest: angular.identity,
//            data: angular.toJson(data),
//            contentType: 'multipart/form-data'
//        }).success(function (addData) {
//        });
//    };

//    return dataFactory;

//}]);



(function () {

    var appVar = angular.module("app");

    appVar.factory("myFactory", function () {
        var serviceObj = {};
        serviceObj.name = '';
        serviceObj.setName = function (newName) {
            serviceObj.name = newName;
        };
        return serviceObj;
    });

}());

