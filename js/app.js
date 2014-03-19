'use strict';

/* App Module */
var mediaApp = angular.module('mediaApp', ['ngResource','ngRoute']);

mediaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/media-list.html',   controller: 'MediaListCtrl'});
}]);
