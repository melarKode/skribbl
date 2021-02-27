const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	}
})

const turn = new Map()
const host = new Map()
const players = new Map()

io.on('connection', (socket) => {

	socket.on('join-room', ({ name, roomName }) => {
		socket.join(roomName)
		socket.roomName = roomName
		socket.playerName = name
		socket.playerScore = 0
		// if new room is created
		if (!turn.has(roomName)) {
			turn.set(roomName, -1)
			host.set(roomName, socket.id)
			players.set(roomName, [])
		}
		//update player list of room
		players.set(roomName, players.get(roomName).concat(socket.id))
		//debug stuff
		console.log(`${ name } joined ${ roomName }`)
		//update lobby
		io.to(roomName).emit('update-lobby', { players: players.get(roomName) })
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

	console.log(socket.id);
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