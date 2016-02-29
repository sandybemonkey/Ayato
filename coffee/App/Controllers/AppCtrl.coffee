class AppCtrl
	constructor: (Auth, Board, $rootScope, $state)->
		angular.element(document).ready ->
			$('.collapsible').collapsible
			    accordion : false		

angular
	.module 'App'
	.controller 'AppCtrl', AppCtrl