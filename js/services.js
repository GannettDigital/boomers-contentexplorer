'use strict';

/* Services */
//mediaApp.factory('MediaService', function($resource){
//    return $resource('https://itunes.apple.com/:action',
//        {action: "search", callback: 'JSON_CALLBACK'},
//        {get:  {method: 'JSONP'}
//    });
//});

/* Services */
mediaApp.factory('MediaService', function($resource) {
    
    return $resource('http://relaunch-web-dev.usatoday.com:2093/Search/v4/assets', {});
});



