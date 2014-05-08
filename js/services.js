'use strict';


/* Services */
assetApp.factory('assetService', function($resource) {
    
    return $resource('http://relaunch-web-dev.usatoday.com:2093/Search/v4/assets', {});
});



assetApp.factory('GAIAService', function ($resource) {

    return $resource('http://localhost:53198/Handler.ashx?source=Search-', {});
});

assetApp.factory('AMDPService', function ($resource) {

    return $resource('http://relaunch-web-dev.usatoday.com:2088/assetmetadata/v4/Properties', {});
});
