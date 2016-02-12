### @ngInject ###
class AuthCtrl
  constructor: ($log, $state, Auth) ->
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

    @logOut =->
      Auth.logout()
      $state.go 'login'

angular
  .module 'authModule'
  .controller 'AuthCtrl', AuthCtrl
