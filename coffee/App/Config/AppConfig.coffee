class AyatoRoute
	constructor: ( $stateProvider, $urlRouterProvider, $locationProvider) ->
		#For any unmatched url, redirect to /
		$urlRouterProvider.otherwise "/"
		#$locationProvider.html5Mode true

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
					
angular
	.module 'Ayato'
	.config AyatoRoute
	