class BoardRoute
	constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
		
		$stateProvider
			.state 'boards',
				url: "/boards"
				views:
					'boards':
						#coment to use Template Cache
						templateUrl: "views/Board/boards.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "BoardsCtrl"
						controllerAs: "Boards"
						resolve:
							isAuth: (Auth)->
								Auth.requireAuth()
						
			.state 'Oneboard',
				url: "/board/:boardId"
				views:
					'boards':
						#coment to use Template Cache
						templateUrl: "views/Board/oneBoard.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "BoardCtrl"
						controllerAs: "Board"
						resolve:
							isAuth: (Auth)->
								Auth.requireAuth

							boardData: (Board, $stateParams)->
								Board.getBoard($stateParams.boardId)



angular
	.module 'boardModule'
	.config BoardRoute
	.run ($rootScope, $location) ->
	    $rootScope.$on '$routeChangeError', (event, next, previous, error) ->
	      # We can catch the error thrown when the $requireAuth promise is rejected
	      # and redirect the user back to the home page
	      if error == 'AUTH_REQUIRED'
	        $location.path '/'