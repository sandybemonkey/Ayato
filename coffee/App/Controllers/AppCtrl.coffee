class AppCtrl
	constructor: (Auth, $rootScope, $state)->
		@logout =->
			Auth.logout()
			$state.go 'login'

angular
	.module 'App'
	.controller 'AppCtrl', AppCtrl