'use strict';



/* App Module */
var assetApp = angular.module('assetApp', ['ngResource', 'ngRoute', 'ui.bootstrap']);
 
 
assetApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/', {templateUrl: 'views/asset-list.html',   controller: 'AssetListCtrl'});
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
}]);


