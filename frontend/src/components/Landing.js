import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import socket from "./../config/socketConfig";

function Landing(props) {
	const [state, setState] = useState({
		username: "",
		code: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	const handleSubmit = (values) => {
		socket.emit("join-room", {
			name: values.username,
			roomName: values.code,
		});
		<Redirect push to={"/lobby/" + values.code} />;
	};
	const landingPageStyle = {
		margin: "32px auto 37px",
		maxWidth: "530px",
		background: "#fff",
		padding: "30px",
		borderRadius: "10px",
		boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
	};
	return (
		<div className="container">
			<div className="login-wrapper" style={landingPageStyle}>
				<h2>Join room</h2>
				<form className="form-container">
					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							className={"form-control"}
							placeholder="Username"
							value={state.username}
							onChange={handleChange}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="code">Room code</label>
						<input
							type="text"
							name="code"
							className={"form-control"}
							placeholder="Room code"
							value={state.code}
							onChange={handleChange}
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						onClick={handleSubmit}
					>
						Join
					</button>
				</form>
			</div>
		</div>
	);
}

export default Landing;
