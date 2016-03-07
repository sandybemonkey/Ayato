class AuthCtrl
  constructor: ($rootScope, $log, $state, Auth) ->
    if $rootScope.user
      $state.go 'home'
    
    @login = (user)->
      Auth
      .login user
      .then (userData)->
        $state.go 'boards'
    
    @signup = (user)->
      Auth
        .signup(user)
        .then (data)->
            $state.go 'boards'

angular
  .module 'authModule'
  .controller 'AuthCtrl', AuthCtrl
