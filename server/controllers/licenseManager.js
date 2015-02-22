/**
 * Created by velmkris on 2/15/2015.
 */
'use strict';

var mongoose = require('mongoose'),
    License = mongoose.model('License'),
    User = mongoose.model('User'),
    CryptoJS = require('crypto-js');


/**
 * Create License
 */
exports.create = function(req, res, next) {
    console.log(req.body);
    //var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    console.log('VEL Encryption');
    var json_string = JSON.stringify(req.body);
    console.log('JSON String',json_string);
    //*** encrypt *//*
    //var json = CryptoJS.AES.encrypt(json_string, 'MILI', options);
    var encrypted = CryptoJS.AES.encrypt(json_string, 'MILI');
    //var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
    //var ciphertext = json.ciphertext.toString(CryptoJS.enc.Base64);
    //console.log(ciphertext.toString());
    //req.assert('req.body.email', 'You must enter a valid email address').isEmail();
    console.log(encrypted.toString());
    var licesenDetails = {
        username : req.body.username,
        mobileNo : req.body.mobileNo,
        email : req.body.email,
        licenseType : req.body.licenseType,
        authenticattionType : 'EMAIL',
        licenseStatus : 'ACTIVE',
        userrole : req.body.userRole,
        noOfLicense : req.body.noOfLicense,
        parentLicense : req.body.parentLicense,
        licenseKey:encrypted.toString()
    };
    /** decrypt */
    var license = new License(licesenDetails);

    license.save(function(err){
        if(err){
            console.log(err);
            console.log('Error while updating the license');
        }else{
            console.log('Successfully created the License');
        }
    });
};

exports.getAllLicenses = function (reg,res){
    //console.log(req.user);
};

exports.getManagerLicenseId = function(req,res){

    var manager = req.body.manager;
    console.log('manager in getManagerLicenseId ',manager);
    License
        .findOne({
            username: manager
        })
        .exec(function(err,license) {
            console.log(license);
            if (err) {
                console.log('Error while getting the User', err);
                res.status(400).json({
                    msg : 'Failed'
                });
            }else if(!license) {
                console.log('User name is not available');
                res.status(400).json({
                    msg : 'Failed'
                });
            }else{
                if(license.username === manager) {
                    console.log('User name matches');
                    console.log('Manager ID = ',license._id);
                    res.status(200).json({
                        manager_id : license._id
                    });
                }else{
                    console.log('Error while getting the manager');
                    res.status(400).json({
                        msg : 'Failed'
                    });
                }
            }
        });
};

exports.updateManagerLicense = function (req,res){
    console.log('UpdateManager License',req.body.username);
    var username = req.body.username;
    License
        .findOne({
            username: username
        })
        .exec(function(err,license) {
            console.log('Manager License ',license);
            if (err) {
                console.log('Error while getting the User', err);
                res.status(400).json({
                    msg : 'Failed'
                });
            }else if(!license) {
                console.log('User name is not available');
                res.status(400).json({
                    msg : 'Failed'
                });
            }else{
                if(license.username === username) {
                    console.log('User name matches in Updating Manager License');
                    var licenseCount = license.noOfLicense;
                    console.log('Existing License count',licenseCount);
                    licenseCount = licenseCount-1;
                    license.noOfLicense = licenseCount;
                    console.log('New License count',licenseCount);
                    license.save();
                    res.status(200);
                }else{
                    res.status(400).json({
                        msg : 'Failed'
                    });
                }
            }
        });
};
exports.isUserExist = function (req,res){
  //console.log('Server : isUserExits',req);
  console.log(req.body.username);
    var username = req.body.username;
    User
        .findOne({
            username: username
        })
        .exec(function(err,user) {
            console.log(user);
            console.log('Err ',err);
            if (err) {
                console.log('Error while getting the User', err);
                res.status(400);
            }else if(!user) {
                console.log('User name is not available');
                res.status(200).json({
                    Error: 'User name is not available'
                });
            }else{
                if(user.username === username) {
                    console.log('User name matches');
                    res.status(200).json({
                        Success: 'User name is available'
                    });
                }else{
                        res.status(200).json({
                            Error: 'User name is not available'
                        });
                    }
                }
        });
};

/**
 * validate license by licenseKey
 */
exports.validateLicense = function(req, res) {
    console.log(req.body);
    var username = req.body.username;
   // var options = { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };

    /*var userDetails = {
     username : req.body.username,
     mobileNo : req.body.mobileNo,
     email : req.body.email,
     licenseType : req.body.licenseType,
     startDate : req.body.startDate,
     endDate : req.body.endDate
     };*/
    License
        .findOne({
            username: username
        })
        .exec(function(err, license) {
            console.log(err);
            console.log('VEL License',license);
            var licenseKey = license.licenseKey;
             var decrypted = CryptoJS.AES.decrypt(licenseKey, 'MILI');
             var plaintext = decrypted.toString(CryptoJS.enc.Utf8);
             console.log('VEL DECRYPTED',plaintext);
             var org_json = JSON.parse(plaintext);
             console.log(org_json);
        });
};