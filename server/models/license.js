/**
 * Created by velmkris on 2/15/2015.
*
 * Created by velmkris on 2/11/2015.*/
'use strict';

/* *
 * Module dependencies.*/


 var mongoose  = require('mongoose'),
 Schema    = mongoose.Schema;

 var LicenseSchema = new Schema({
 licenseType: {
 type: String,
 required: true
 },
 email: {
 type: String,
 required: true,
 unique: true
 },
 mobileNo: {
 type: Number,
 required: true,
 unique: true
 },
 username: {
 type: String,
 unique: true,
 required: true
 },
     userrole: {
         type: String,
         required: true
     },
 startDate:{
 type: String
 },
 endDate:{
 type: String
 },
     authenticationType:{
       type : String,
       default : 'Login',
       optional : true
     },
     modules : {
       type : Array,
       optional : true
     },
     licenseStatus : {
       type: String,
        required : true
     },
     noOfLicense: {
         type: Number,
         required :true
     },
    licenseAccess : {
         type : Object,
         optional : true
     },
     parentLicense:{
       type : mongoose.Schema.ObjectId,
       optional : true
     },
 licenseKey: {
 type: String,
 unique: true,
 required: true
 }
 });
 mongoose.model('License', LicenseSchema);