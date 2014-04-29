'use strict';

/* App Module */
var assetApp = angular.module('assetApp', ['ngResource', 'ngRoute']);

assetApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/asset-list.html', controller: 'AssetListCtrl' });
}]);
