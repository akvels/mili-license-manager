'use strict';

angular.module('mean.license-manager').factory('LicenseService', [ '$http','$scope',function(){
   return function getManagerLicenseId($http,$scope){
        $http.post('/licenseManager/getManagerLicense',{
            manager : $scope.user.manager
        }).success( function (data){
            console.log('VEL ',data);
            return data.manager_id;
        }).error( function(error){
            $scope.licenseError = 'License Creation failed.';
            return '0';
        });
    };
}]);

