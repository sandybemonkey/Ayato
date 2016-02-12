(function() {
  angular.module('App', []);

}).call(this);
;(function() {
  angular.module('authModule', []);

}).call(this);
;(function() {
  angular.module('boardModule', []);

}).call(this);
;(function() {
  angular.module('authModule').constant('FIREBASE_BDD_URL', 'https://ayatoapp.firebaseio.com/');

}).call(this);
;
/* @ngInject */

(function() {
  var Auth;

  Auth = (function() {
    function Auth($log, $rootScope, FIREBASE_BDD_URL, $firebaseAuth, Users) {
      var authObj, ref;
      ref = new Firebase(FIREBASE_BDD_URL);
      authObj = $firebaseAuth(ref);
      authObj.$onAuth(function(data) {
        return $rootScope.user = data;
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
              uid: authData.uid,
              email: user.email
            });
            return _this.login(user);
          };
        })(this))["catch"](function(err) {
          return err;
        });
      };

      /**
       * [logout description]
       * @return {[type]} [description]
       */
      this.logout = function() {
        $rootScope.user = {};
        authObj.$unauth();
        return $log.debug(authObj);
      };

      /**
       * [requireAuth description]
       * @return {[type]} [description]
       */
      this.requireAuth = function() {
        return authObj.$requireAuth();
      };
    }

    return Auth;

  })();

  angular.module('authModule').service('Auth', Auth);

}).call(this);
;
/* @ngInject */

(function() {
  var Users;

  Users = (function() {
    function Users($log, FIREBASE_BDD_URL, $firebaseArray) {
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
        return usersArray.$add(user).then(function(ref) {
          var id;
          id = ref.key();
          return $log.info("added record with id " + id);
        });
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
;
/* @ngInject */

(function() {
  var Board;

  Board = (function() {
    function Board($log, FIREBASE_BDD_URL, $firebaseArray) {
      var boardArray, boardRef;
      boardRef = new Firebase(FIREBASE_BDD_URL + "/boards");
      boardArray = $firebaseArray(boardRef);
      return {
        getAll: function() {
          return boardArray;
        },
        getBoard: function(id) {
          return boardArray.$getRecord(id);
        },
        createBoard: function(board) {

          /*getting the Dates from the form */
          var enddate, stgDate;
          stgDate = board.startingDate;
          enddate = board.endingdate;

          /*Formating the Dates to string for firebase push */
          board.startingDate = new Date(stgDate).getTime();
          board.endingDate = new Date(enddate).getTime();
          return boardArray.$add(board).then(function(ref) {
            var id;
            id = ref.key();
            return $log.info("added record with id " + id);
          });
        },
        updateBoard: function(board) {
          var boardInBdd;
          boardInBdd = boardArray.$getRecord(board.$id);
          if (boardInBdd !== '') {
            boardInBdd.title = board.title;
            return boardArray.$save(boardInBdd).then(function(ref) {
              return console.log(ref.key() === boardInBdd.$id);
            });
          } else {
            return console.log("Can't find this data");
          }
        },
        deleteBoard: function(board) {
          return boardArray.$remove(board);
        }
      };
    }

    return Board;

  })();

  angular.module('boardModule').factory('Board', Board);

}).call(this);
;(function() {
  angular.module('Ayato', ['ui.router', 'firebase', 'App', 'authModule', 'boardModule']);

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
      }).state('boards', {
        url: "/boards",
        views: {
          'main': {
            templateUrl: "views/App/home.html",
            controller: "AppCtrl",
            controllerAs: "App"
          },
          'boards': {
            templateUrl: "views/Board/boards.html",
            controller: "BoardsCtrl",
            controllerAs: "Boards",
            resolve: {
              "isAuth": function(Auth) {
                return Auth.requireAuth();
              }
            }
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
    function AppCtrl(Auth, Board) {
      angular.element(document).ready(function() {
        $('.mogger').leanModal();
        $('.modal-trigger').leanModal();
        return $('.tooltipped').tooltip();
      });
      this.createBoard = function(newBoard) {

        /*Pushing To Firebase */
        Board.createBoard(newBoard);

        /*Reseting Form */
        return this.newBoard = {};
      };
    }

    return AppCtrl;

  })();

  angular.module('App').controller('AppCtrl', AppCtrl);

}).call(this);
;
/* @ngInject */

(function() {
  var Authroute;

  Authroute = (function() {
    function Authroute($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider.state('login', {
        url: "/login",
        views: {
          'main': {
            templateUrl: "views/Auth/login.html",
            controller: "AuthCtrl",
            controllerAs: "Auth"
          }
        }
      }).state('signup', {
        url: "/signup",
        views: {
          'main': {
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
;
/* @ngInject */

(function() {
  var AuthCtrl;

  AuthCtrl = (function() {
    function AuthCtrl($log, $state, Auth) {
      this.login = function(user) {
        return Auth.login(user).then(function(userData) {
          return $state.go('boards');
        });
      };
      this.signup = function(user) {
        return Auth.signup(user).then(function(data) {
          return $state.go('boards');
        });
      };
      this.logOut = function() {
        Auth.logout();
        return $state.go('login');
      };
    }

    return AuthCtrl;

  })();

  angular.module('authModule').controller('AuthCtrl', AuthCtrl);

}).call(this);
;(function() {
  var BoardRoute;

  BoardRoute = (function() {
    function BoardRoute($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider.state('Oneboard', {
        url: "/board/:boardId",
        views: {
          'boards': {
            templateUrl: "views/Board/oneBoard.html",
            controller: "BoardCtrl",
            controllerAs: "Board"
          }
        },
        resolve: {
          boardData: function(Board) {
            return Board.getAll();
          }
        }
      });
    }

    return BoardRoute;

  })();

  angular.module('boardModule').config(BoardRoute);

}).call(this);
;(function() {
  var BoardCtrl;

  BoardCtrl = (function() {
    function BoardCtrl(Auth, Board, boardData) {
      angular.element(document).ready(function() {
        $('.toolti').tooltip();
        return $('.modal-trigger').leanModal();
      });
      this.board = boardData[0];
      console.log(boardData[0]);
      this.createSteps = function(steps) {
        return console.log(steps);
      };
      this.tasks = [
        {
          'assignee': '1',
          'criteria': 'It tests!',
          'description': 'This is a test',
          'id': '1',
          'reporter': '2',
          'status': 'To Do',
          'title': 'First Story',
          'type': 'Spike'
        }, {
          'assignee': '2',
          'criteria': 'It works!',
          'description': 'testing something',
          'id': '2',
          'reporter': '1',
          'status': 'Verified',
          'title': 'Second Story',
          'type': 'Enhancement'
        }, {
          'assignee': '2',
          'criteria': 'It works!',
          'description': 'testing something',
          'id': '3',
          'reporter': '1',
          'status': 'Code Review',
          'title': 'Third Story',
          'type': 'Enhancement'
        }, {
          'assignee': '1',
          'criteria': 'It works!',
          'description': 'testing something',
          'id': '4',
          'reporter': '2',
          'status': 'QA Review',
          'title': 'Third Story',
          'type': 'Enhancement'
        }, {
          'assignee': '1',
          'criteria': 'It works!',
          'description': 'testing something',
          'id': '5',
          'reporter': '2',
          'status': 'In Progress',
          'title': 'Third Story',
          'type': 'Enhancement'
        }, {
          'assignee': '1',
          'criteria': 'It works!',
          'description': 'testing something',
          'id': '7',
          'reporter': '2',
          'status': 'To Do',
          'title': 'Third Story',
          'type': 'Enhancement'
        }
      ];
      this.steps = [
        {
          name: 'To Do'
        }, {
          name: 'In Progress'
        }, {
          name: 'Code Review'
        }, {
          name: 'QA Review'
        }, {
          name: 'Verified'
        }
      ];
    }

    return BoardCtrl;

  })();

  angular.module('boardModule').controller('BoardCtrl', BoardCtrl);

}).call(this);
;(function() {
  var BoardsCtrl;

  BoardsCtrl = (function() {
    function BoardsCtrl(Auth, Board) {
      this.isAuth = '';
      console.log(this.isAuth);
      this.boards = Board.getAll();
      this.idOrder = '$id';
      this.nameOrder = '';
      this.reorderByBddOrder = function() {
        if (this.idOrder === '$id') {
          this.idOrder = '-$id';
          return this.order = this.idOrder;
        } else {
          this.idOrder = '$id';
          return this.order = this.idOrder;
        }
      };
      this.reorderByName = function() {
        if (this.nameOrder === '') {
          this.nameOrder = 'name';
          return this.order = this.nameOrder;
        } else if (this.nameOrder === 'name') {
          this.nameOrder = '-name';
          return this.order = this.nameOrder;
        } else {
          this.nameOrder = 'name';
          return this.order = this.nameOrder;
        }
      };
      this.deleteBoard = function(board) {
        return Board.deleteBoard(board);
      };
    }

    return BoardsCtrl;

  })();

  angular.module('boardModule').controller('BoardsCtrl', BoardsCtrl);

}).call(this);
