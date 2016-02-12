### @ngInject ###

class Board
  constructor: ($log, FIREBASE_BDD_URL, $firebaseArray) ->
    boardRef = new Firebase FIREBASE_BDD_URL + "/boards"
    boardArray = $firebaseArray boardRef

    return {      
      getAll: ()->
        boardArray

      getBoard: (id)->
        boardArray.$getRecord id

      createBoard: (board)->
        ###getting the Dates from the form###
        stgDate = board.startingDate
        enddate = board.endingdate

        ###Formating the Dates to string for firebase push###
        board.startingDate = new Date(stgDate).getTime()
        board.endingDate = new Date(enddate).getTime()
        boardArray
          .$add(board)
          .then (ref)->
            id = ref.key()
            $log.info "added record with id " + id

      updateBoard: (board) ->
        boardInBdd = boardArray.$getRecord board.$id
        if boardInBdd != ''
          boardInBdd.title = board.title
          
          boardArray
            .$save(boardInBdd)
            .then (ref)->
              console.log ref.key() == boardInBdd.$id
        else
          console.log "Can't find this data"
        
      deleteBoard: (board) ->
        boardArray.$remove board 

    }

angular
  .module 'boardModule'
  .factory 'Board', Board
