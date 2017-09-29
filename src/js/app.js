var app = angular.module('myApp', ["ngRoute", "ngAnimate", "ngMessages"]);

app.config(function($routeProvider, $httpProvider){
  $routeProvider
    .when('/', {templateUrl: 'views/home.html', controller : 'mainCtrl'})
    .when('/register', {templateUrl: 'views/register.html', controller : 'mainCtrl'})
    .when('/login', {templateUrl: 'views/login.html', controller : 'mainCtrl'})
    .when('/profile', {templateUrl: 'views/profile.html', controller : 'securedViewCtrl'})
});
