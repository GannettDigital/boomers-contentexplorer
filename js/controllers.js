'use strict';

/* Controllers */

mediaApp.controller('MediaListCtrl',function($scope,MediaService){
    $scope.searchTerm = "Obama";
    $scope.mediaType = "all";
    $scope.filterTerm = "";
    $scope.sortProp = "artistName";
    $scope.showFlag = false;


    $scope.doSearch = function() {
        var type = $scope.mediaType;
        if ($scope.mediaType == "all") type = "";
        MediaService.get({ keyword: $scope.searchTerm,propertyid: 1, rows: 50 }, function(response) {
            $scope.mediaResults = response.results;
        });
    };

    $scope.playVideo = function(item) {
        $scope.showFlag = true;
        $scope.url = item.previewUrl;
        if (item.trackName != null)
            $scope.title = item.trackName;
        else
            $scope.title = item.collectionName;

        $scope.artist = item.artistName;
    };

    $scope.closeVideo = function() {
        $scope.showFlag = false;
    };

    $scope.selected = [];
    var updateSelected = function(action, id) {
        if (action == 'add' & $scope.selected.indexOf(id) == -1) $scope.selected.push(id);
        if (action == 'remove' && $scope.selected.indexOf(id) != -1) $scope.selected.splice($scope.selected.indexOf(id), 1);
    };

    $scope.updateSelection = function ($event, id) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        updateSelected(action, id);
    };

    $scope.selectAll = function ($event) {
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        for (var i = 0; i < $scope.entities.length; i++) {
            var entity = $scope.entities[i];
            updateSelected(action, entity.id);
        }
    };

    $scope.getSelectedClass = function (entity) {
        return $scope.isSelected(entity.id) ? 'selected' : '';
    };

    $scope.isSelected = function (id) {
        return $scope.selected.indexOf(id) >= 0;
    };

    //something extra I couldn't resist adding :)
    $scope.isSelectedAll = function () {
        return $scope.selected.length === $scope.entities.length;
    };
});
