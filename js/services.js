'use strict';


/* dev Services must be in gannett cloud to use
assetApp.factory('assetService', function($resource) {
    
    return $resource('http://10.189.4.124/Search/v4/site/229/assets', {});
});*/

/* Prod Services internal NOTE: this is thru our mashery endpoint*/
assetApp.factory('assetService', function ($resource) {

    return $resource('http://api.gannett-cdn.com/prod/Search/v4/site/229/assets', {});

});


