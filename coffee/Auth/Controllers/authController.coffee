class AuthCtrl
  constructor: ($rootScope, $log, $state, Auth) ->
    if $rootScope.user
      $state.go 'home'
    
    @login = (user)->
      Auth
      .login user
      .then (userData)->
        $state.go 'home'
    
    @signup = (user)->
      Auth
        .signup(user)
        .then (data)->
            $state.go 'home'

angular
  .module 'authModule'
  .controller 'AuthCtrl', AuthCtrl
