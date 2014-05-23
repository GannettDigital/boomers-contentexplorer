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
    $scope.statusname = "published";
    

    $scope.doSearch = function () {
        var type = $scope.assetType;
        var statusname = $scope.statusname;
        var numrows = $scope.assetReturn;
        if ($scope.assetType === "all") type = "";
        assetService.get({
            keyword: $scope.searchTerm, assettypename: type, propertyid: 1, rows: numrows, statusname: statusname, apiKey: 'special-key', api_key: 'eywmgxp93u4cm6b85aa6s4td'
        }, function (response) {
            $scope.assetResults = response.results;
        });
    };

    $scope.UpLoad = function () {

        var ct = document.getElementById('list').value;
        location.href = "http://localhost:53198/Handler.ashx?source=Search-" + $scope.section + "-" + ct;

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

    //here is nggrid options
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function (data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('largeLoad.json').success(function (largeLoad) {
                    data = largeLoad.filter(function (item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data, page, pageSize);
                });
            } else {
                $http.get('largeLoad.json').success(function (largeLoad) {
                    $scope.setPagingData(largeLoad, page, pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
    
   
    

});


