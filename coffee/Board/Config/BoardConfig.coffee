class BoardRoute
	constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
		
		$stateProvider
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
					boardData: (Board)->
						Board.getAll()



angular
	.module 'boardModule'
	.config BoardRoute