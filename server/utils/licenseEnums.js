/**
 * Created by velmkris on 2/19/2015.
 */
'use strict';
var Enum = require('enum');

var licenseTypes = new Enum(['User','Module','Volume','Free','Evaluation','API','OpenSource']);

var authenticationTypes = new Enum(['EMAIL','MOBILE','MODULE']);


var licenseStatus = new Enum(['ACTIVE','AVAILABLE','EXPIRED']);

var userRoles  = new Enum(['User','Team Manager','SalesMan','SalesManager']);

exports.printLicenses =  function(){
  for(var i=0;i<licenseTypes.size();i+1){
      console.log(licenseTypes.get(i));
  }
};
exports.printAuthenticationTypes =  function(){
    for(var i=0;i<authenticationTypes.size();i+1){
        console.log(authenticationTypes.get(i));
    }
};
exports.printLicenseStatus =  function(){
    for(var i=0;i<licenseStatus.size();i+1){
        console.log(licenseStatus.get(i));
    }
};
exports.printUserRoles =  function(){
    for(var i=0;i<userRoles.size();i+1){
        console.log(userRoles.get(i));
    }
};

