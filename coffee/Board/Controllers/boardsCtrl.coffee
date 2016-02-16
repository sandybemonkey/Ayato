class BoardsCtrl
	constructor: (Auth, Board)-> 
		angular.element(document).ready ->
			$('.collapsible').collapsible({
		      accordion : false 
		    })

		@createBoard = (newBoard)->			
			###Pushing To Firebase###
			Board.createBoard(newBoard)
			###Reseting Form###
			@newBoard = {}
			
		@boards = Board.getAll()
		@idOrder = '$id'
		@nameOrder = ''
		
		@reorderByBddOrder = ()->
			if @idOrder == '$id'
				@idOrder = '-$id'
				@order = @idOrder
			else
				@idOrder = '$id'
				@order = @idOrder
		
		@reorderByName = ()->
			if @nameOrder == 'name' or ''
				@nameOrder = '-name'
				@order = @nameOrder			
			else
				@nameOrder = 'name'
				@order = @nameOrder
			
		@deleteBoard = (board)->
			Board.deleteBoard board

angular
	.module 'boardModule'
	.controller 'BoardsCtrl', BoardsCtrl