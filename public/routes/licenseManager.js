'use strict';

angular.module('mean.license-manager').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('licenseManager example page', {
      url: '/licenseManager/example',
      templateUrl: 'license-manager/views/index.html'
    }).state('License Creation Form',
        {
            url: '/licenseManager/licenseForm',
            templateUrl: 'license-manager/views/LicenseCreationForm.html'
        }
    ).state('License Details',
        {
            url: '/licenseManager/licenseDetails',
            templateUrl: 'license-manager/views/LicenseDetails.html'
        }
    );
  }
]);
