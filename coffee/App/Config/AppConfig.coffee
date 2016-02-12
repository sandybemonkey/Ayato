class AyatoRoute
	constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
		#For any unmatched url, redirect to /
		$urlRouterProvider.otherwise "/"

		$stateProvider
			.state 'home',
				url: "/"
				views:
					'main':
						#coment to use Template Cache
						templateUrl: "views/App/welcome.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "AppCtrl"
						controllerAs: "App"
					
			.state 'boards',
				url: "/boards"
				views:
					'main':
						#coment to use Template Cache
						templateUrl: "views/App/home.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "AppCtrl"
						controllerAs: "App"
					'boards':
						#coment to use Template Cache
						templateUrl: "views/Board/boards.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "BoardsCtrl"
						controllerAs: "Boards"
						resolve:
							"isAuth": (Auth)->
								Auth.requireAuth()
angular
	.module 'Ayato'
	.config AyatoRoute