'use strict';


/* dev Services */
assetApp.factory('assetService', function($resource) {
    
    return $resource('http://10.189.4.124/Search/v4/assets', {});
});

/* Prod Services internal---new.../Search/v4/assets?sc=229&apiKey=special-key*/
/*assetApp.factory('assetService', function ($resource) {

    return $resource('http://api.gannett-cdn.com/prod/Search/v4/assets', {});

});*/




assetApp.factory('GAIAService', function ($resource) {

    return $resource('http://54.84.143.40/Handler.ashx?source=Search-', {});
});

assetApp.factory('AMDPService', function ($resource) {

    return $resource('http://relaunch-web-dev.usatoday.com:2088/assetmetadata/v4/Properties', {});
});
