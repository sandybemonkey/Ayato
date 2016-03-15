class Auth

  constructor: ($log, $sessionStorage, $rootScope, FIREBASE_BDD_URL, $firebaseAuth, Users) ->
    ref = new Firebase FIREBASE_BDD_URL
    authObj = $firebaseAuth ref
    
    setUserAuthInfo = (data)->
      if data
        userData = Users.getUser data.uid
        
        if userData
          userData.provider = data.provider
          userData.password = data.password
          $rootScope.authUser = userData
          $sessionStorage.userSession = userData
        else
          console.log 'your are logout'
    
    authObj.$onAuth (data)->
      if $sessionStorage.userSession
        $rootScope.authUser = $sessionStorage.userSession
      else
        setUserAuthInfo data
    
    
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
        Users.createUser
          timestamp: Firebase.ServerValue.TIMESTAMP
          uid: authData.uid
          email: user.email
          name: user.name
        @login user
      )
      .catch((err)->
        err
      )
    @requireAuth = ->
      authObj.$requireAuth()
    

    @logout = ->
      delete $rootScope.authUser
      delete $sessionStorage.userSession
      authObj.$unauth()
      


angular
  .module 'authModule'
  .service 'Auth', Auth
