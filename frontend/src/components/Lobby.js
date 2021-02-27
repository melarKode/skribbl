import React, { useState } from "react";
import io from "socket.io-client";

var socket = io.connect("http://localhost:5000");

function Lobby(props) {
	const [players, setPlayers] = useState([]);
	return (
		<div className="container">
			<button type="submit" className="btn btn-primary">
				Start
			</button>
			Player list:
			<hr>{console.log(socket.on("update-lobby"))}</hr>
		</div>
	);
}

export default Lobby;
