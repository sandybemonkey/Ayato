class Users
  constructor: ($log, $rootScope, FIREBASE_BDD_URL, $firebaseArray) ->
    usersRef = new Firebase FIREBASE_BDD_URL + "/users"
    usersArray = $firebaseArray usersRef
    
   
    @getAll = ()->
      usersArray

    @getUser = (id)->
      usersArray.$getRecord id

    @createUser = (user)->
      newUser = $firebaseArray usersRef.child user.uid
      usersRef.child user.uid
        .set(user)

    @updateUser = (user) ->
      userInBdd = usersArray.$getRecord user.$id
      if userInBdd != ''
        userInBdd = user
        usersArray
          .$save(userInBdd)
          .then (ref)->
            console.log ref.key() == userInBdd.$id
      else
        console.log "Can't find this data"
      
    @deleteUser = (user) ->
      usersArray.$remove user 


angular
  .module 'authModule'
  .service 'Users', Users
