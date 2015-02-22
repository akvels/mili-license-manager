'use strict';


angular.module('mean.license-manager').controller('LicenseManagerController', ['$scope','$http','$location',
  function($scope,$http,$location) {
    $scope.package = {
      name: 'license-manager'
    };
      // list of licenses
      $scope.licenses = {};


      $scope.handleUserMessage =  function(){
          $scope.usernameError = '';

      };
      $scope.isUserExist = function (){
          console.log('User Exist check for User ',$scope.user.userName);
          $http.post('/licenseManager/isUserExist',{
              username : $scope.user.userName
          }).success( function(data){
                console.log('User object in isUserExist',data);
                if(data.Success){
                    console.log('Empty');
                }else{
                    $scope.usernameError = 'User name is not Available';
                }

          }).error(function(error){
                $scope.usernameError = 'This is not valid User';
          });
      };
      $scope.getAllLicenseTypes = function (){
          console.log('get All License Types ');
          $http.get('/licenseManager/getAllLicenseTypes').success( function(user){
              console.log('License Types in getAllLicenseTypes',user);
          }).error(function(error){
              console.log('Error in getAllLicenseTypes',error);
          });
      };
      $scope.roleSelected = null;
      /*$scope.onLicenseTypeChange = function(item){
          if(item === 'Team Manager'){
               console.log('User Role is Team manager');
          }else{
              $scope.noOfLicense = 1;
          }
      };*/
      $scope.status = {
          isopen: false
      };


      $scope.toggled = function(open) {
          //$log.log('Dropdown is now: ', open);
          console.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function($event) {
          $event.preventDefault();
          $event.stopPropagation();
          $scope.userRole.isopen = !$scope.userRole.isopen;
      };
      $scope.onUserRoleChange = function(){

      };
      $scope.getAllLicenses = function(){
          console.log('VEL INIT');
          var username = 'velanvel';
          $http.post('/licenseManager/getAllLicenses',{
              username:username
          }).success(function(licenses){
              $scope.licenses = licenses;
          });
      };

    $scope.getUserRole = function(){

    };

      $scope.manager_id = '';

       $scope.getManagerLicenseId = function(){
          $http.post('/licenseManager/getManagerLicense',{
              manager : $scope.user.manager
          }).success( function (data){
              console.log('VEL ',data);
              $scope.manager_id = data.manager_id;
          }).error( function(error){
              $scope.licenseError = 'License Creation failed.';
              $scope.manager_id =  '0';
          });
      };
    $scope.generateUserLicense = function(){
        //this.getManagerLicenseId($scope);
        console.log('VEL Manager ID ',$scope.manager_id);
        $http.post('/licenseManager/createLicense',{
            username : $scope.user.userName,
            mobileNo : $scope.user.mobileNo,
            noOfLicense : 1,
            email : $scope.user.email,
            userRole : 'User',
            licenseType : 'User',
            authenticattionType : 'EMAIL',
            parentLicense : $scope.manager_id,
            licenseStatus : 'ACTIVE'
        }).success( function (response){
            // User is having valid license
            $scope.loginError = 0;
            if (response.redirect) {
                if (window.location.href === response.redirect) {
                    //This is so an admin user will get full admin page
                    window.location.reload();
                } else {
                    window.location = response.redirect;
                }
            } else {
                $location.url('/');
            }
            this.updateManagerLicense();
        }).error( function(error){
            $scope.licenseError = 'License Creation failed.';
            //window.location = '/LicenseManager/CreateError';
        });
        var manager = $scope.user.manager;
        console.log('Manager Name ',manager);
        $http.post('/licenseManager/updateManagerLicense',
            {
                username:manager
            }
        ).success(function(response){
                console.log('Reduced');
            }).error(function (error){
                console.log('Error while reducing');
            });
    };
    $scope.createLicense =  function(){
        console.log($scope.user);
        console.log('VEL',$scope.user.startDate);
        console.log('VEL  End date ',$scope.user.startDate);
        $scope.user.startDate = '11/11/1111';
        $scope.user.endDate = '11/11/2222';
        $http.post('/licenseManager/createLicense',{
            username : $scope.user.userName,
            mobileNo : $scope.user.mobileNo,
            email : $scope.user.email,
            userRole : $scope.user.userRole,
            licenseType : 'User',
            startDate : $scope.user.startDate,
            endDate : $scope.user.endDate,
            authenticattionType : 'EMAIL',
            licenseStatus : 'ACTIVE',
            noOfLicense : 1
        }).success( function (response){
            // User is having valid license
            $scope.loginError = 0;
            if (response.redirect) {
                if (window.location.href === response.redirect) {
                    //This is so an admin user will get full admin page
                    window.location.reload();
                } else {
                    window.location = response.redirect;
                }
            } else {
                $location.url('/');
            }
        }).error( function(error){
            $scope.licenseError = 'License Creation failed.';
            //window.location = '/LicenseManager/CreateError';
        });
    };
      $scope.clear = function () {
          $scope.dt = null;
      };
      $scope.listOfLicense = ['User','Module','Volume','Free','Evaluation','API','OpenSource'];
      $scope.roleList = ['User','Team Manager','SalesMan','SalesManager'];
      // Disable weekend selection
      $scope.disabled = function(date, mode) {
          return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
          $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
      };

      $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];




      $scope.validateUserLicense = function(){
          console.log($scope.user);
          $http.post('/licenseManager/validateLicense',{
              username : $scope.user.userName,
              mobileNo : $scope.user.mobileNo,
              email : $scope.user.email,
              licenseType : $scope.user.licenseType,
              startDate : $scope.user.startDate,
              endDate : $scope.user.endDate
          }).success( function (response){
              // User is having valid license
              $scope.loginError = 0;
              if (response.redirect) {
                  if (window.location.href === response.redirect) {
                      //This is so an admin user will get full admin page
                      window.location.reload();
                  } else {
                      window.location = response.redirect;
                  }
              } else {
                  $location.url('/');
              }

          }).error( function(error){
              $scope.licenseError = 'License Creation failed.';
              //window.location = '/LicenseManager/CreateError';
          });
      };
  }

]);
