import React, { useState } from "react";
import socket from "./../config/socketConfig";

function Lobby(props) {
	socket.on("update-list", (data) => {
		console.log(data);
	});
	return (
		<div className="container">
			<button type="submit" className="btn btn-primary">
				Start
			</button>
			Player list:
			<hr></hr>
		</div>
	);
}

export default Lobby;
