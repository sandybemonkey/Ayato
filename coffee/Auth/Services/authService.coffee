### @ngInject ###
class Auth

  constructor: ($log, $rootScope, FIREBASE_BDD_URL, $firebaseAuth) ->
    ref = new Firebase FIREBASE_BDD_URL
    authObj = $firebaseAuth ref
    
    authObj.$onAuth (data)->
      $rootScope.user = data
    
    @login = (user)->
      authObj.$authWithPassword (
        email: user.email
        password: user.password
      )
      .then((authData)->
        authData
      )
      .catch((err)->
        err
      )

    @signup = (user)->
      authObj.$createUser (
        email: user.email
        password: user.password
      )
      .then((authData)=>
        @login user
      )
      .catch((err)->
        err
      )

    ###*
     * [logout description]
     * @return {[type]} [description]
    ###
    @logout = ->
      $rootScope.user = {}
      authObj.$unauth()
      $log.debug authObj

    ###*
     * [requireAuth description]
     * @return {[type]} [description]
    ###
    @requireAuth = ->
      authObj.$requireAuth()

angular
  .module 'authModule'
  .service 'Auth', Auth
