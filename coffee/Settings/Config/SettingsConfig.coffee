class settingsRoute
	constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
		$stateProvider
			.state 'settings',
				url: "/settings"
				views:
					'main':
						#coment to use Template Cache
						templateUrl: "views/Settings/settings.html"
						#templateProvider: ($templateCache)->
						  #return $templateCache.get "template path"
						controller: "SettingsCtrl"
						controllerAs: "Settings"
					
			
angular
	.module 'settingsModule'
	.config settingsRoute