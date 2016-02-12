### @ngInject ###
class Authroute

  constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $stateProvider
      .state 'login',
        url: "/login"
        views:
          'main':
            templateUrl: "views/Auth/login.html"
            controller: "AuthCtrl"
            controllerAs: "Auth"

      .state 'signup',
        url: "/signup"
        views:
          'main':
            templateUrl: "views/Auth/signup.html"
            controller: "AuthCtrl"
            controllerAs: "Auth"

angular
  .module 'authModule'
  .config Authroute
