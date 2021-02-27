import React from "react";
import io from "socket.io-client";

var socket = io.connect("http://localhost:5000");

function Lobby(props) {
	return <div className="container"></div>;
}

export default Lobby;
