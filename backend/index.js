const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	}
})

turn = new Map()

io.on('connection', (socket) => {

	socket.on('join-room', ({ name, roomName }) => {
		socket.join(roomName)
		socket.roomName = roomName
		socket.playerName = name
		socket.playerScore = 0
		if (!turn.has(roomName))
			turn.set(roomName, -1)
		console.log(`${ name } joined ${ roomName }`)
	})

	socket.on('incr-score', (score) => {
		socket.playerScore += score
		io.to(socket.roomName).emit('update-score',
			{ id: socket.id, score: socket.score })
	})

	socket.on('start-game', () => {
		io.to(socket.roomName).emit('started')
		changeRound(socket.roomName)
	})

	socket.on('change-round', () => { changeRound(socket.roomName) })
})

function changeRound(roomName) {
	console.log(roomName)
	var nxtTurn = turn.get(roomName) + 1
	const players = [...io.sockets.adapter.rooms.get(roomName)]
	if (nxtTurn >= players.length) {
		io.to(roomName).emit('game-over')
		return
	}
	var turnId = players[nxtTurn]
	turn.set(roomName, nxtTurn)
	io.to(roomName).emit('change-turn', turnId)
	console.log(turnId)
}

http.listen(5000, () => {
	console.log('listening on port 5000')
})