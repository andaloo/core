/**
 * @fileoverview Generated by Jackbone.gap
 * DO NOT MODIFY
 */
requirejs.config({
    baseUrl: 'js',

    paths: {
        // Libraries
        jquery:       'libs/jquery/jquery',
        underscore:   'libs/underscore/underscore',
        backbone:     'libs/backbone/backbone',
        jquerymobile: 'libs/jquery.mobile/jquery.mobile',
        handlebars:   'libs/handlebars/dist/handlebars',
        qunit:        'libs/qunitjs/qunit/qunit',
        testflight:   'libs/testflight',
        sqlite:       'libs/sqlite',
        kinetic:      'libs/kinetic',
        stacktrace:   'libs/stacktrace-js/stacktrace',
        jackbone:     'libs/jackbone/jackbone'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        jquerymobile: {
            deps: ["jquery"]
        },
        jackbone: {
            deps: ["backbone", "jquerymobile"],
            exports: "Jackbone"
        },
        handlebars: {
            exports: 'Handlebars'
        },
        qunit: {
            exports: 'QUnit'
        },
        kinetic: {
            exports: 'Kinetic'
        },
        stacktrace: {
            exports: 'printStackTrace'
        },
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'jackbone',
    'cdv',
    'testing',
    'logger',
    'appdelegate'
],
function($, _, Backbone, Jackbone, Cordova, Testing, Logger, AppDelegate) {

    function onDeviceReady() {

        var testingEnabled = window.TESTING || false;
        
        Logger.initialize();
        Cordova.initialize();

        var onResume = function () {
            Jackbone.ViewManager.reSetupCurrent();
            if (AppDelegate.resume)
                AppDelegate.resume();
        };
        var onPause = function () {
            if (AppDelegate.pause)
                AppDelegate.pause();
        };
        document.addEventListener("pause", onPause, false);
        document.addEventListener("resume", onResume, false);

        if (AppDelegate.start) {
            AppDelegate.start(testingEnabled);
        }

        if (testingEnabled) {
            Testing.run();
        }
    }
    
    if (window.cordova) // PhoneGap / Cordova
        document.addEventListener("deviceready", onDeviceReady, false);
    else
        onDeviceReady();
});
