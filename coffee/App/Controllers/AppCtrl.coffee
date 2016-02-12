class AppCtrl
	constructor: (Auth, Board)->
		angular.element(document).ready ->
			$('.mogger').leanModal()
			$('.modal-trigger').leanModal()
			$('.tooltipped').tooltip()
		
		@createBoard = (newBoard)->			
			###Pushing To Firebase###
			Board.createBoard(newBoard)
			
			###Reseting Form###
			@newBoard = {}

angular
	.module 'App'
	.controller 'AppCtrl', AppCtrl