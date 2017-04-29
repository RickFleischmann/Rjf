﻿

(function() {

    var appVar = angular.module("app");
 
    appVar.controller("TracksBrowseController", ["$scope", "$http", function ($scope, $http) {

        $scope.GetIndexFromObjectElement = function (obj, keyName, keyValue) {
            var newIndex = null;
            angular.forEach(obj, function (key, index) {
                if (key[keyName] === keyValue) newIndex = index;
            });
            return newIndex;
        };

        $scope.SORT_BY = 'TITLE'; // set the default sort type
        $scope.SearchBox = '';
        $scope.row_start = 1;
        $scope.row_display_end = 0;
        $scope.total_rows = 0;
        $scope.FilterSet = false;

        $scope.sortFields = ['TITLE', 'MEDIA_TITLE', 'MEDIACAT', 'MEDIUM'];

        $scope.filterValues = {
            MEDIA_TITLE: '',
            MEDIUM: '',
            MEDIACAT: '',
            COMPANY: '',
            REC_MONTH: '',
            REC_DAY: '',
            REC_YEAR: '',
            TITLE: '',
            COMP_LYR: '',
            ARRANGER: '',
            PERFORMER: '',
            PUBLISHER: '',
            TITLEYEAR: '',
            ARRANGYEAR: '',
            ARRANGTYPE: '',
            PRODTYPE: '',
            PRODTITLE: '',
            NOTES: '',
            PICTURE: '',
            SEARCHBOX: ''

        };

        $scope.SORT_BY = 'TITLE'; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
 
        $scope.ClearFilter = function () {
           angular.forEach($scope.filterValues, function (value, key) {
                $scope.filterValues[key] = '';
           });
           $scope.FilterSet = false;
           $scope.row_start = 0;
          };

        $scope.ClearFilterAndRequery = function () {
            $scope.ClearFilter();
            $scope.GetTitleBySubstring();
        }

        $scope.ClearFilter();

        $scope.PrepForAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {
                 if ($scope.filterValues[key] === '') {
                    $scope.filterValues[key] = '{}';
                }
            });

            if ($scope.row_start == 0) {
                $scope.row_start = 1;
            }
         };

        $scope.PrepAfterAPI = function () {
            angular.forEach($scope.filterValues, function (value, key) {
 
                if ($scope.filterValues[key] === '{}') {
                    $scope.filterValues[key] = '';
                }
            });
         };

        $scope.GetTitleBySubstring = function () {

             if ($scope.SearchBox == '') {
                $scope.filterValues.SEARCHBOX = ''
            } else {
                $scope.filterValues.SEARCHBOX = $scope.SearchBox
            }

            // sets empty filter values to {}
            $scope.PrepForAPI();

            //onsole.log($scope.filterValues);

            if (angular.isUndefined($scope.row_start)) {
                $scope.row_start = 1;
            }
            //onsole.log($scope.row_start);

            var uri = '?';

            // prepare uri for GET
            angular.forEach($scope.filterValues, function (value, key) {
                uri += key + '=' + value + '&';
             });

            // add ROW_START and SORT_TYPE
            uri += 'ROW_START=' + $scope.row_start + '&SORT_BY=' + $scope.SORT_BY;

            console.log(uri);

            $http({
                method: 'GET',
                url: 'http://99.248.19.5/webAPI/api/Tracks' + uri
            })
            .success(function (data) {
                $scope.Tracks = data;
                
                if ($scope.isEmpty($scope.Tracks)) {
                    //onsole.log('empty');
                    $scope.row_start = 0;
                    $scope.row_display_end = 0;
                    $scope.total_rows = 0;
                    return;
                }


                 $scope.total_rows = $scope.Tracks[0].TOTAL_ROWS;
                 $scope.row_start = $scope.Tracks[0].ROW_NUM

 
                if ($scope.row_start+19<$scope.total_rows) {
                    $scope.row_display_end = $scope.row_start + 19;
                }
                else if ($scope.row_start + 19>=$scope.total_rows) {
                    $scope.row_display_end = $scope.total_rows;
                }
                
                //onsole.log($scope.Tracks);
            })
            .error(function (data, status) {
                window.alert('error');
            });

            // sets {} filter values to empty
            $scope.PrepAfterAPI();

        };
 

        $scope.GetTitleBySubstring();

        $scope.SortChange = function () {
            $scope.SearchBox = '';
            $scope.row_start = 1;
            $scope.GetTitleBySubstring();
         };

        $scope.NextPage = function () {

            $scope.row_start += 20;
            $scope.GetTitleBySubstring();
        };

        $scope.PreviousPage = function () {

            $scope.row_start -= 20;
            $scope.GetTitleBySubstring();
        };

        $scope.isEmpty = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        };
   
        $scope.FilterChange = function () {
            $scope.FilterSet = false;
            angular.forEach($scope.filterValues, function (value, key) {
                if (value != '') {
                    $scope.FilterSet = true;
                }
            });
            console.log($scope.FilterSet);

            $scope.SearchBox = '';
            $scope.row_start = 1;
        }

        $scope.ChangedSearchBoxSearch = function () {
            $scope.row_start = 1;
            $scope.GetTitleBySubstring();
        };

        $scope.FilterModal = function () {
            $('#FilterModal').modal();
        };

        $scope.DetailModal = function (id) {
            $scope.detailData = $scope.Tracks[$scope.GetIndexFromObjectElement($scope.Tracks, 'ID_TRACKS', id)];
            $('#DetailModal').modal();
        };

 
    }]);

}());