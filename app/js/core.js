(function() {
  angular.module('App', []);

}).call(this);
;(function() {
  angular.module('userModule', []);

}).call(this);
;(function() {
  angular.module('authModule', ['ngStorage']);

}).call(this);
;(function() {
  angular.module('authModule').constant('FIREBASE_BDD_URL', 'https://ayatoapp.firebaseio.com/');

}).call(this);
;(function() {
  var Users;

  Users = (function() {
    function Users($log, $rootScope, FIREBASE_BDD_URL, $firebaseArray) {
      var usersArray, usersRef;
      usersRef = new Firebase(FIREBASE_BDD_URL + "/users");
      usersArray = $firebaseArray(usersRef);
      this.getAll = function() {
        return usersArray;
      };
      this.getUser = function(id) {
        return usersArray.$getRecord(id);
      };
      this.createUser = function(user) {
        var newUser;
        newUser = $firebaseArray(usersRef.child(user.uid));
        return usersRef.child(user.uid).set(user);
      };
      this.updateUser = function(user) {
        var userInBdd;
        userInBdd = usersArray.$getRecord(user.$id);
        if (userInBdd !== '') {
          userInBdd = user;
          return usersArray.$save(userInBdd).then(function(ref) {
            return console.log(ref.key() === userInBdd.$id);
          });
        } else {
          return console.log("Can't find this data");
        }
      };
      this.deleteUser = function(user) {
        return usersArray.$remove(user);
      };
    }

    return Users;

  })();

  angular.module('authModule').service('Users', Users);

}).call(this);
;(function() {
  var Auth;

  Auth = (function() {
    function Auth($log, $sessionStorage, $rootScope, FIREBASE_BDD_URL, $firebaseAuth, Users) {
      var authObj, ref, setUserAuthInfo;
      ref = new Firebase(FIREBASE_BDD_URL);
      authObj = $firebaseAuth(ref);
      setUserAuthInfo = function(data) {
        var userData;
        if (data) {
          userData = Users.getUser(data.uid);
          if (userData) {
            userData.provider = data.provider;
            userData.password = data.password;
            $rootScope.user = userData;
            return $sessionStorage.userSession = userData;
          } else {
            return console.log('your are logout');
          }
        }
      };
      authObj.$onAuth(function(data) {
        if ($sessionStorage.userSession) {
          return $rootScope.user = $sessionStorage.userSession;
        } else {
          return setUserAuthInfo(data);
        }
      });
      this.login = function(user) {
        return authObj.$authWithPassword({
          email: user.email,
          password: user.password
        }).then(function(authData) {
          return authData;
        })["catch"](function(err) {
          return err;
        });
      };
      this.signup = function(user) {
        return authObj.$createUser({
          email: user.email,
          password: user.password
        }).then((function(_this) {
          return function(authData) {
            Users.createUser({
              timestamp: Firebase.ServerValue.TIMESTAMP,
              uid: authData.uid,
              email: user.email,
              name: user.name
            });
            return _this.login(user);
          };
        })(this))["catch"](function(err) {
          return err;
        });
      };
      this.requireAuth = function() {
        return authObj.$requireAuth();
      };
      this.logout = function() {
        delete $rootScope.user;
        delete $sessionStorage.userSession;
        return authObj.$unauth();
      };
    }

    return Auth;

  })();

  angular.module('authModule').service('Auth', Auth);

}).call(this);
;(function() {
  angular.module('Ayato', ['ui.router', 'firebase', 'App', 'authModule', 'userModule']);

}).call(this);
;(function() {
  var AyatoRoute;

  AyatoRoute = (function() {
    function AyatoRoute($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider.state('home', {
        url: "/",
        views: {
          'main': {
            templateUrl: "views/App/welcome.html",
            controller: "AppCtrl",
            controllerAs: "App"
          }
        }
      });
    }

    return AyatoRoute;

  })();

  angular.module('Ayato').config(AyatoRoute);

}).call(this);
;(function() {
  var AppCtrl;

  AppCtrl = (function() {
    function AppCtrl($state, Auth, $rootScope) {
      this.logout = function() {
        Auth.logout();
        return $state.go('login');
      };
    }

    return AppCtrl;

  })();

  angular.module('App').controller('AppCtrl', AppCtrl);

}).call(this);
;(function() {
  var Authroute;

  Authroute = (function() {
    function Authroute($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider.state('login', {
        url: "/login",
        views: {
          'main': {
            templateUrl: "views/App/welcome.html",
            controller: "AppCtrl",
            controllerAs: "App"
          },
          'content': {
            templateUrl: "views/Auth/login.html",
            controller: "AuthCtrl",
            controllerAs: "Auth"
          }
        }
      }).state('signup', {
        url: "/signup",
        views: {
          'main': {
            templateUrl: "views/App/welcome.html",
            controller: "AppCtrl",
            controllerAs: "App"
          },
          'content': {
            templateUrl: "views/Auth/signup.html",
            controller: "AuthCtrl",
            controllerAs: "Auth"
          }
        }
      });
    }

    return Authroute;

  })();

  angular.module('authModule').config(Authroute);

}).call(this);
;(function() {
  var AuthCtrl;

  AuthCtrl = (function() {
    function AuthCtrl($rootScope, $log, $state, Auth) {
      if ($rootScope.user) {
        $state.go('home');
      }
      this.login = function(user) {
        return Auth.login(user).then(function(userData) {
          return $state.go('home');
        });
      };
      this.signup = function(user) {
        return Auth.signup(user).then(function(data) {
          return $state.go('home');
        });
      };
    }

    return AuthCtrl;

  })();

  angular.module('authModule').controller('AuthCtrl', AuthCtrl);

}).call(this);
