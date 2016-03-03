class Authroute

  constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $stateProvider
      .state 'login',
        url: "/login"
        views:
          'main':
            #coment to use Template Cache
            templateUrl: "views/App/welcome.html"
            #templateProvider: ($templateCache)->
              #return $templateCache.get "template path"
            controller: "AppCtrl"
            controllerAs: "App"
          
          'content':
            templateUrl: "views/Auth/login.html"
            controller: "AuthCtrl"
            controllerAs: "Auth"

      .state 'signup',
        url: "/signup"
        views:
          'main':
            #coment to use Template Cache
            templateUrl: "views/App/welcome.html"
            #templateProvider: ($templateCache)->
              #return $templateCache.get "template path"
            controller: "AppCtrl"
            controllerAs: "App"
          
          'content':
            templateUrl: "views/Auth/signup.html"
            controller: "AuthCtrl"
            controllerAs: "Auth"

angular
  .module 'authModule'
  .config Authroute
