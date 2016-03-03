class AppCtrl
	constructor: ($state, Auth, $rootScope)->
		@logout =->
			Auth.logout()
			$state.go 'login'

angular
	.module 'App'
	.controller 'AppCtrl', AppCtrl