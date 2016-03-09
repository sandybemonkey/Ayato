(function() {
  angular.module('App', []);

}).call(this);
;(function() {
  angular.module('authModule', ['ngStorage']);

}).call(this);
;(function() {
  angular.module('boardsModule', []);

}).call(this);
;(function() {
  angular.module('userModule', []);

}).call(this);
;(function() {
  angular.module('authModule').constant('FIREBASE_BDD_URL', 'https://ayatoapp.firebaseio.com/');

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
  var Boards;

  Boards = (function() {
    function Boards($log, $rootScope, FIREBASE_BDD_URL, $firebaseArray) {
      var boardsArray, boardsRef;
      boardsRef = new Firebase(FIREBASE_BDD_URL + "/boards");
      boardsArray = $firebaseArray(boardsRef);
      this.getAll = function() {
        return boardsArray;
      };
      this.getBoard = function(id) {
        return boardsArray.$getRecord(id);
      };
      this.createBoard = function(board) {
        return boardsArray.$add(board).then(function(ref) {
          var id;
          id = ref.key();
          return console.log(id);
        });
      };
      this.updateBoard = function(board) {
        var boardInBdd;
        boardInBdd = boardsArray.$getRecord(board.$id);
        if (boardInBdd !== '') {
          boardInBdd = board;
          return boardsArray.$save(boardInBdd).then(function(ref) {
            return console.log(ref.key() === boardInBdd.$id);
          });
        } else {
          return console.log("Can't find this data");
        }
      };
      this.deleteBoard = function(board) {
        return boardsArray.$remove(board);
      };
    }

    return Boards;

  })();

  angular.module('boardsModule').service('Boards', Boards);

}).call(this);
;(function() {
  var Cards;

  Cards = (function() {
    function Cards($log, $rootScope, $stateParams, FIREBASE_BDD_URL, $firebaseArray, Boards) {
      this.boardId = $stateParams.boardId;
      this.createCard = function(card, listId) {
        var board, i, l, len, ref;
        console.log(card);
        console.log(listId);
        board = Boards.getBoard($stateParams.boardId);
        if (board.list) {
          ref = board.list;
          for (i = 0, len = ref.length; i < len; i++) {
            l = ref[i];
            if (l.name === listId) {
              if (l.cards) {
                l.cards.push(card);
              } else {
                l.cards = [];
                l.cards.push(card);
              }
              console.log(l);
            }
          }
        }
        return Boards.updateBoard(board);
      };
      this.deleteCard = function(card) {
        var board, i, l, len, ref;
        board = Boards.getBoard($stateParams.boardId);
        ref = board.list;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          if (l.name === list.name) {
            board.list.splice(board.list.indexOf(l), 1);
          }
        }
        return Boards.updateBoard(board);
      };
    }

    return Cards;

  })();

  angular.module('boardsModule').service('Cards', Cards);

}).call(this);
;(function() {
  var Lists;

  Lists = (function() {
    function Lists($log, $rootScope, $stateParams, FIREBASE_BDD_URL, $firebaseArray, Boards) {
      this.boardId = $stateParams.boardId;
      this.createList = function(list) {
        var board;
        board = Boards.getBoard($stateParams.boardId);
        if (board.list) {
          board.list.push(list);
        } else {
          board.list = [];
          board.list.push(list);
        }
        return Boards.updateBoard(board);
      };
      this.deleteList = function(list) {
        var board, i, l, len, ref;
        board = Boards.getBoard($stateParams.boardId);
        ref = board.list;
        for (i = 0, len = ref.length; i < len; i++) {
          l = ref[i];
          if (l.name === list.name) {
            board.list.splice(board.list.indexOf(l), 1);
          }
        }
        return Boards.updateBoard(board);
      };
    }

    return Lists;

  })();

  angular.module('boardsModule').service('Lists', Lists);

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
  angular.module('Ayato', ['ui.router', 'firebase', 'angular-sortable-view', 'App', 'authModule', 'userModule', 'boardsModule']);

}).call(this);
;(function() {
  var BoardsRoute;

  BoardsRoute = (function() {
    function BoardsRoute($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider.state('boards', {
        url: "/boards",
        views: {
          'nav': {
            templateUrl: "views/App/welcome.html",
            controller: "AppCtrl",
            controllerAs: "App"
          },
          'boards': {
            templateUrl: "views/Boards/BoardsHome.html",
            controller: "BoardsCtrl",
            controllerAs: "Boards"
          }
        }
      }).state('boardsDetails', {
        url: "/boards/:boardId",
        views: {
          'nav': {
            templateUrl: "views/App/welcome.html",
            controller: "AppCtrl",
            controllerAs: "App"
          },
          'boards': {
            templateUrl: "views/Boards/board.html",
            controller: "BoardCtrl",
            controllerAs: "Board"
          }
        }
      });
    }

    return BoardsRoute;

  })();

  angular.module('boardsModule').config(BoardsRoute);

}).call(this);
;(function() {
  var AyatoRoute;

  AyatoRoute = (function() {
    function AyatoRoute($stateProvider, $urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise("/");
      $stateProvider.state('home', {
        url: "/",
        views: {
          'nav': {
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
          'nav': {
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
          'nav': {
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
          return $state.go('boards');
        });
      };
      this.signup = function(user) {
        return Auth.signup(user).then(function(data) {
          return $state.go('boards');
        });
      };
    }

    return AuthCtrl;

  })();

  angular.module('authModule').controller('AuthCtrl', AuthCtrl);

}).call(this);
;(function() {
  var BoardCtrl;

  BoardCtrl = (function() {
    function BoardCtrl($log, $scope, $stateParams, Lists, Boards, Cards) {
      this.board = Boards.getBoard($stateParams.boardId);
      if (this.board) {
        this.list = this.board.list;
      }
      this.createList = function(newList) {
        return Lists.createList(newList);
      };
      this.deleteList = function(list) {
        return Lists.deleteList(list);
      };
      this.getListId = function(id) {
        console.log(id);
        return this.listId = id;
      };
      this.createCard = function(newCard, listId) {
        return Cards.createCard(newCard, listId);
      };
      this.info = function(info) {
        return console.log(info);
      };
      this.foo = function(data) {
        return Boards.updateBoard(data);
      };
    }

    return BoardCtrl;

  })();

  angular.module('boardsModule').controller('BoardCtrl', BoardCtrl);

}).call(this);
;(function() {
  var BoardsCtrl;

  BoardsCtrl = (function() {
    function BoardsCtrl($log, Boards) {
      this.boardsList = Boards.getAll();
      this.menu = function(d) {
        UIkit.offcanvas.show('#rightBar');
        return console.log(d.listName);
      };
      this.newList = function() {
        UIkit.offcanvas.show('#newListForm');
        return console.log(newList);
      };
      this.createBoard = function(newBoard) {
        return Boards.createBoard(newBoard);
      };
      this.stories = [
        [
          {
            'assignee': '1',
            'criteria': 'It tests!',
            'description': 'This is a test',
            'id': '1',
            'reporter': '2',
            'status': 'To Do',
            'title': 'First Story_a',
            'type': 'Spike'
          }, {
            'assignee': '2',
            'criteria': 'It works!',
            'description': 'testing something',
            'id': '2',
            'reporter': '1',
            'status': 'In Progress',
            'title': 'Second Story_a',
            'type': 'Enhancement'
          }
        ], [
          {
            'assignee': '1',
            'criteria': 'It tests!',
            'description': 'This is a test',
            'id': '1',
            'reporter': '2',
            'status': 'To Do',
            'title': 'First Story_b',
            'type': 'Spike'
          }, {
            'assignee': '2',
            'criteria': 'It works!',
            'description': 'testing something',
            'id': '2',
            'reporter': '1',
            'status': 'In Progress',
            'title': 'Second Story_b',
            'type': 'Enhancement'
          }
        ]
      ];
      this.statuses = [
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
      this.rawScreens = [
        [
          {
            icon: './img/icons/facebook.jpg',
            title: 'Facebook (a)',
            link: 'http://www.facebook.com'
          }, {
            icon: './img/icons/youtube.jpg',
            title: 'Youtube (a)',
            link: 'http://www.youtube.com'
          }, {
            icon: './img/icons/gmail.jpg',
            title: 'Gmail (a)',
            link: 'http://www.gmail.com'
          }, {
            icon: './img/icons/google+.jpg',
            title: 'Google+ (a)',
            link: 'http://plus.google.com'
          }, {
            icon: './img/icons/twitter.jpg',
            title: 'Twitter (a)',
            link: 'http://www.twitter.com'
          }, {
            icon: './img/icons/yahoomail.jpg',
            title: 'Yahoo Mail (a)',
            link: 'http://mail.yahoo.com'
          }, {
            icon: './img/icons/pinterest.jpg',
            title: 'Pinterest (a)',
            link: 'http://www.pinterest.com'
          }
        ], [
          {
            icon: './img/icons/facebook.jpg',
            title: 'Facebook (b)',
            link: 'http://www.facebook.com'
          }, {
            icon: './img/icons/youtube.jpg',
            title: 'Youtube (b)',
            link: 'http://www.youtube.com'
          }, {
            icon: './img/icons/gmail.jpg',
            title: 'Gmail (b)',
            link: 'http://www.gmail.com'
          }, {
            icon: './img/icons/google+.jpg',
            title: 'Google+ (b)',
            link: 'http://plus.google.com'
          }, {
            icon: './img/icons/twitter.jpg',
            title: 'Twitter (b)',
            link: 'http://www.twitter.com'
          }, {
            icon: './img/icons/yahoomail.jpg',
            title: 'Yahoo Mail (b)',
            link: 'http://mail.yahoo.com'
          }, {
            icon: './img/icons/pinterest.jpg',
            title: 'Pinterest (b)',
            link: 'http://www.pinterest.com'
          }
        ]
      ];
      this.list1 = this.rawScreens[0];
      this.list2 = this.rawScreens[1];
    }

    return BoardsCtrl;

  })();

  angular.module('boardsModule').controller('BoardsCtrl', BoardsCtrl);

}).call(this);
