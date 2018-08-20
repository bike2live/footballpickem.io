<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<head>
    <meta charset="utf-8">
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1' /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <base href="/">
    <link rel="shortcut icon" href="api/images/favicon.ico" type="image/x-icon"/>
    <title>Byu Football Guess 'Em 2015</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
<!--    <link href="css/bootstrap-theme.min.css" rel="stylesheet">-->
    <link href="css/font-awesome.css" rel="stylesheet">
<!--    <link href="css/custom.css" rel="stylesheet">-->
    <link href="css/toaster.css" rel="stylesheet">
    <style>
        a {
            color: darkblue;
        }
    </style>
</head>

<body data-twttr-rendered="true">
    <div data-ng-view="" id="ng-view"></div>
</body>
<toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
<!-- Libs -->
<script src="js/jquery-2.1.4.min.js"></script>
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-animate.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/ui-bootstrap-tpls-0.13.3.min.js"></script>
<script src="js/toaster.js"></script>
<script src="js/moment.min.js"></script>
<script src="app/app.js"></script>
<script src="app/shared/data.js"></script>
<script src="app/shared/directives.js"></script>
<script src="app/shared/filters.js"></script>
<script src="app/components/navBar/navCtrl.js"></script>
<script src="app/components/dashboard/dashboardCtrl.js"></script>
<script src="app/components/login/authCtrl.js"></script>
<script src="app/components/schedule/scheduleCtrl.js"></script>
<script src="app/components/addGame/addGameCtrl.js"></script>
<script src="app/components/editGameScore/editGameScoreCtrl.js"></script>
<script src="app/components/addScore/addScoreCtrl.js"></script>
<script src="app/components/game/gameCtrl.js"></script>
<script src="app/components/rules/rulesCtrl.js"></script>
<script src="app/components/leaderBoard/leaderBoardCtrl.js"></script>
</html>

