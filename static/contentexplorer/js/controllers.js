'use strict';

/* Controllers */

assetApp.controller('AssetListCtrl', function ($scope, assetService) {
    $scope.searchTerm = "";
    $scope.assetType = "text";
    $scope.pageSize = "10";
    $scope.filterTerm = "";
    $scope.sortProp = "";
    $scope.showFlag = false;
    $scope.searchTarget = "1";
    $scope.propertyType = "6";
    $scope.siteType = "6";
    $scope.agType = "6";
    $scope.section = "";
    $scope.status = "Unpublished";
    $scope.curPage = 0;
    $scope.startpage = 1;

    $scope.btnSearchDisabled = true;

    $scope.numberOfItems = function () {
        return (0);
    };

    $scope.doSearch = function () {
        var type = $scope.assetType;
        var statusname = $scope.statusname;
        var numrows = $scope.pageSize;
        var starg = $scope.searchTarget;
       
       // $scope.pageSize = $scope.assetReturn;

        if ($scope.assetType === "all") type = "";
        assetService.get({
            keyword: $scope.searchTerm, assettypename: type, propertyid: starg, rows: numrows, statusid: 1, sc: 229, apiKey: 'special-key', api_key: 'eywmgxp93u4cm6b85aa6s4td'
        }, function (response) {
            $scope.assettotResults = response.totalNumResults;
            $scope.assetResults = response.results;
        });

        $scope.numberOfItems = function () {
            return ($scope.assettotResults);
        };
        $scope.numberOfPages = function () {
           return Math.ceil($scope.assettotResults / $scope.pageSize);
        };
    };

    $scope.searchUp = function () {
        var sterm = $scope.searchTerm;
        var type = $scope.assetType;
        var numrows = $scope.pageSize;
        var starg = $scope.searchTarget;
        var cpage = $scope.startpage;

        
        var spage = (Number(cpage) * Number(numrows)) + 1;

        if ($scope.assetType === "all") type = "";

        //alert("search term: " + sterm + ", search asset type: " + type + ", start row: " + spage + ", numrows: " + numrows + ", target: " + starg);
       
        assetService.get({
            keyword: $scope.searchTerm, assettypename: type, start: spage, propertyid: starg, rows: numrows, statusid: 1, sc: 229, apiKey: 'special-key', api_key: 'eywmgxp93u4cm6b85aa6s4td'
        }, function (response) {
            $scope.assettotResults = response.totalNumResults;
            $scope.assetResults = response.results;
        });
      
        $scope.curPage++;
        $scope.startpage++;

        
    };

    $scope.searchDwn = function () {
        var sterm = $scope.searchTerm;
        var type = $scope.assetType;
        var numrows = $scope.pageSize;
        var starg = $scope.searchTarget;
        var cpage = $scope.curPage--;



        var spage = (Number(cpage) * Number(numrows)) + 1;

        if ($scope.assetType === "all") type = "";

        //alert("search term: " + sterm + ", search asset type: " + type + ", start row: " + spage + ", numrows: " + numrows + ", target: " + starg);

        assetService.get({
            keyword: $scope.searchTerm, assettypename: type, start: spage, propertyid: starg, rows: numrows, statusid: 1, sc: 229, apiKey: 'special-key', api_key: 'eywmgxp93u4cm6b85aa6s4td'
        }, function (response) {
            $scope.assettotResults = response.totalNumResults;
            $scope.assetResults = response.results;
        });

        //$scope.curPage--;
        $scope.startpage--;


    };

    /*prod*/
    $scope.UpLoad = function () {

        var ct = document.getElementById('list').value;
        location.href = "http://54.84.77.221/ingest_prod/Handler.ashx?source=Search" + "&vertical=" + $scope.section + "&status=" + $scope.status + "&list=" + ct;

    };
    
    /*dev*/
    //$scope.UpLoad = function () {

    //    var ct = document.getElementById('list').value;
    //    location.href = "http://localhost:53198/Handler.ashx?source=Search" + "&vertical=" + $scope.section + "&status=" + $scope.status + "&list=" + ct;

    //};

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


