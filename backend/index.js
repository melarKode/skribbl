const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
	}
})

// index of player whose turn it is (per room)
const turn = new Map()
// host who created the room
const host = new Map()
// stores id and name of players per room
const players = new Map()

// use index.html for debug
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {

	socket.on('join-room', ({ name, roomName }) => {
		socket.join(roomName)
		//set properties for user
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
		players.set(roomName, players.get(roomName).concat({ id: socket.id, name: name }))
		//debug stuff
		console.log(`${ name } joined ${ roomName }`)
		//update lobby
		io.to(roomName).emit('update-lobby', players.get(roomName))
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
	var nxtTurn = turn.get(roomName) + 1
	const players = [...io.sockets.adapter.rooms.get(roomName)]
	// out of bound index
	if (nxtTurn >= players.length) {
		io.to(roomName).emit('game-over')
		return
	}
	var turnId = players[nxtTurn]
	turn.set(roomName, nxtTurn)
	// send id of next player
	io.to(roomName).emit('change-turn', turnId)
}

http.listen(5000, () => {
	console.log('listening on port 5000')
})