class AppCtrl
	constructor: (Auth, Board, $rootScope, $state)->
		angular.element(document).ready ->
			$('.collapsible').collapsible
			    accordion : false
		if $rootScope.user
			$state.go 'boards'
		

angular
	.module 'App'
	.controller 'AppCtrl', AppCtrl