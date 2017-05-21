

(function() {

    // get reference to app module
    var appVar = angular.module("app");

    // define function as variable to be used as controller
    var jeananneController = function ($scope, $http, myFactory) {
        myFactory.setName("Saksham Chauhan");
        $scope.factoryName = myFactory.name;

        $scope.hi = 'hello baby';


        var urlAPI = "/api/DemoPage_wgDropDowns/";

        //////////////////////////////////////////////////////////////////////////////
        //SideMenu Navigation
        //////////////////////////////////////////////////////////////////////////////
        //set the default
        $scope.SideMenu = 0;

        //sets the current side menu 
        $scope.SelectMenu = function (intNo) {
            $scope.SideMenu = intNo;
        }


        //Create a list object (could be from a data call)
        $scope.MyList = [
            { Type: 'primary', itemCss: 'bg-primary', btnCss: 'btn-primary', Text: 'This is a primary alert with a lot more text than usual to test in different scenarios. This can quite a bit of information.' },
            { Type: 'danger', itemCss: 'bg-danger', btnCss: 'btn-danger', Text: 'This is a danger alert' },
            { Type: 'success', itemCss: 'bg-success', btnCss: 'btn-success', Text: 'This is a success alert. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.' },
            { Type: 'warning', itemCss: 'bg-warning', btnCss: 'btn-warning', Text: 'This is a warning alert' },
            { Type: 'info', itemCss: 'bg-info', btnCss: 'btn-info', Text: 'This is a info alert' }
        ];
        //Get the first one
        $scope.MyListSelected = $scope.MyList[1];

        //$scope.Site.Country = $scope.MyListSelected.Type;

        //Create a list of objects (could be a straight json data call)
        $scope.DemoList = [
            { Label: 'primary', itemCss: 'bg-primary', btnCss: 'btn-primary', Desc: 'This is a primary alert with a lot more text than usual to test in different scenarios. This can quite a bit of information.' },
            { Label: 'danger', itemCss: 'bg-danger', btnCss: 'btn-danger', Desc: 'This is a danger alert' },
            { Label: 'success', itemCss: 'bg-success', btnCss: 'btn-success', Desc: 'This is a success alert. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.' },
            { Label: 'warning', itemCss: 'bg-warning', btnCss: 'btn-warning', Desc: 'This is a warning alert' },
            { Label: 'info', itemCss: 'bg-info', btnCss: 'btn-info', Desc: 'This is a info alert' }
        ];

        //Get the first one
        $scope.DropDownCurrent = $scope.DemoList[3];
        $scope.FormSelectCurrent = $scope.DemoList[0];
        $scope.MenuDropDownCurrent = $scope.DemoList[0];



        //sets the current row 
        $scope.ddlDropDownCurrentChange = function (row) {
            $scope.DropDownCurrent = row;
        }

        //sets the current row 
        $scope.ddlMenuDropDownCurrentChange = function (row) {
            $scope.MenuDropDownCurrent = row;
        }

        //makes an object pretty to list in the <pre></pre> tags og html
        $scope.MakeObjectPretty = function (obj) {
            return JSON.stringify(obj, null, 4);
        }

        //////////////////////////////////////////////////////////////////////////////
        //Table in drop menu
        //////////////////////////////////////////////////////////////////////////////
        $scope.GetDropTableData = function (TotalRows) {
            //Exit if $scope.DropTableData exists....only need to run once to get data
            if (angular.isDefined($scope.DropTableData)) return;
            var data = { V1: TotalRows }
            baseFactory.serverService(urlAPI + 'GetDropTableData', "POST", data).success(function (data) {
                $scope.DropTableData = data.DropTableData;
            }).error(function (error) { SetAlert(error, 'danger'); });
        }

        //sets the current row 
        $scope.ddlSelectRow = function (row) {
            $scope.CurrentRow = row;
        }

        //////////////////////////////////////////////////////////////////////////////
        //Dropdown checkbox filters
        //////////////////////////////////////////////////////////////////////////////
        $scope.FilterList = [
            { Label: 'Active Targets', Filter: { STATUS: 'Active' }, IsSelected: true },
            { Label: 'Inactive Targets', Filter: { STATUS: 'Inactive' }, IsSelected: false },
            { Label: 'Open Targets', Filter: { STATUS: 'Open' }, IsSelected: true }
        ];



    }

    // add controller variable to app module reference
    appVar.controller("jeananneController", ["$scope", "$http", "myFactory", jeananneController]);

}());