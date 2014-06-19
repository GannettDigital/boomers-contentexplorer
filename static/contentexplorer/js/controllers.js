'use strict';

/* Controllers */

assetApp.controller('AssetListCtrl', function ($scope, assetService) {
    $scope.searchTerm = "";
    $scope.assetType = "text";
    $scope.assetReturn = "10";
    $scope.filterTerm = "";
    $scope.sortProp = "";
    $scope.showFlag = false;
    $scope.searchType = "1";
    $scope.propertyType = "6";
    $scope.siteType = "6";
    $scope.agType = "6";
    $scope.section = "";
    $scope.status = "Unpublished";

    $scope.btnSearchDisabled = true;

    

    $scope.doSearch = function () {
        var type = $scope.assetType;
        var statusname = $scope.statusname;
        var numrows = $scope.assetReturn;
        if ($scope.assetType === "all") type = "";
        assetService.get({
            keyword: $scope.searchTerm, assettypename: type, propertyid: 1, rows: numrows, statusname: statusname, sc: 229, apiKey: 'special-key', api_key: 'eywmgxp93u4cm6b85aa6s4td'
        }, function (response) {
            $scope.assetResults = response.results;
        });
    };

    /*Deploy change the route here*/
    $scope.UpLoad = function () {

        var ct = document.getElementById('list').value;
        location.href = "http://54.84.143.40/Handler.ashx?source=Search" + "&vertical=" + $scope.section + "&status=" + $scope.status + "&list=" + ct;

    };
    
    $scope.remaining = function () {
        var count = 0;
        angular.forEach($scope.assetResults, function (item) {
            count += item.chkbx ? 1 : 0;

        });
        return count;
    };

    $scope.listtogaia = function () {
        var count = "";
        angular.forEach($scope.assetResults, function (item) {
            if(item.chkbx ? 1 : 0)
                count += item.assetId +',';
        });
        var trim = count.replace(/(^\s*,)|(,\s*$)/g, '');
        document.getElementById('list').value = trim;
        return trim;
    };

    $scope.allNeedsClicked = function () {
        var newValue = !$scope.allNeedsMet();

        _.each($scope.assetResults, function (item) {
            item.chkbx = newValue;
        });
    };

    // Returns true if and only if all items are checked.
    $scope.allNeedsMet = function () {
        var needsMet = _.reduce($scope.assetResults, function (memo, item) {
            return memo + (item.chkbx ? 1 : 0);
        }, 0);

        return (needsMet === $scope.assetResults.length);
    };

   
});


