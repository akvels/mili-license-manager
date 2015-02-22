'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var LicenseManager = new Module('license-manager');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
LicenseManager.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  LicenseManager.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  LicenseManager.menus.add({
    title: 'License Management',
    link: 'licenseManager example page',
    roles: ['authorized'],
    menu: 'main'
  }).add({
        title: 'License Details',
        link: 'License Details',
        roles: ['authenticated'],
        menu: 'main'
    });

  LicenseManager.aggregateAsset('css', 'licenseManager.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    LicenseManager.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    LicenseManager.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    LicenseManager.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return LicenseManager;
});
