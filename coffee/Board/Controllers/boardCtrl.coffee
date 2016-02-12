class BoardCtrl
	constructor: (Auth, Board, boardData)->
		angular.element(document).ready ->
		    $('.toolti').tooltip()
		    $('.modal-trigger').leanModal()
		@board = boardData[0]
		console.log boardData[0]

		@createSteps = (steps)->
			console.log steps

		@tasks = [
		  {
		    'assignee': '1'
		    'criteria': 'It tests!'
		    'description': 'This is a test'
		    'id': '1'
		    'reporter': '2'
		    'status': 'To Do'
		    'title': 'First Story'
		    'type': 'Spike'
		  }
		  {
		    'assignee': '2'
		    'criteria': 'It works!'
		    'description': 'testing something'
		    'id': '2'
		    'reporter': '1'
		    'status': 'Verified'
		    'title': 'Second Story'
		    'type': 'Enhancement'
		  }
		  {
		    'assignee': '2'
		    'criteria': 'It works!'
		    'description': 'testing something'
		    'id': '3'
		    'reporter': '1'
		    'status': 'Code Review'
		    'title': 'Third Story'
		    'type': 'Enhancement'
		  }
		  {
		    'assignee': '1'
		    'criteria': 'It works!'
		    'description': 'testing something'
		    'id': '4'
		    'reporter': '2'
		    'status': 'QA Review'
		    'title': 'Third Story'
		    'type': 'Enhancement'
		  }
		  {
		    'assignee': '1'
		    'criteria': 'It works!'
		    'description': 'testing something'
		    'id': '5'
		    'reporter': '2'
		    'status': 'In Progress'
		    'title': 'Third Story'
		    'type': 'Enhancement'
		  }
		  {
		    'assignee': '1'
		    'criteria': 'It works!'
		    'description': 'testing something'
		    'id': '7'
		    'reporter': '2'
		    'status': 'To Do'
		    'title': 'Third Story'
		    'type': 'Enhancement'
		  }

		]
		@steps = [
		  { name: 'To Do' }
		  { name: 'In Progress' }
		  { name: 'Code Review' }
		  { name: 'QA Review' }
		  { name: 'Verified' }
		]
angular
	.module 'boardModule'
	.controller 'BoardCtrl', BoardCtrl