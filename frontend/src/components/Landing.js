import React from "react";
import { withFormik, Form, Field } from "formik";
import { Redirect } from "react-router-dom";
import io from "socket.io-client";

var socket = io.connect("http://localhost:5000");

function Landing(props) {
	const landingPageStyle = {
		margin: "32px auto 37px",
		maxWidth: "530px",
		background: "#fff",
		padding: "30px",
		borderRadius: "10px",
		boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.15)",
	};
	return (
		<React.Fragment>
			<div className="container">
				<div className="login-wrapper" style={landingPageStyle}>
					<h2>Join room</h2>
					<Form className="form-container">
						<div className="form-group">
							<label htmlFor="username">Username</label>
							<Field
								type="text"
								name="username"
								className={"form-control"}
								placeholder="Username"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="code">Room code</label>
							<Field
								type="text"
								name="code"
								className={"form-control"}
								placeholder="Room code"
							/>
						</div>
						<button type="submit" className="btn btn-primary">
							Join
						</button>
					</Form>
				</div>
			</div>
		</React.Fragment>
	);
}

const LandingFormik = withFormik({
	mapPropsToValues: (props) => {
		return {
			username: props.username || "",
			code: props.code || "",
		};
	},
	handleSubmit: (values) => {
		console.log(values);
		socket.emit("join-room", {
			name: values.username,
			roomName: values.code,
		});
		<Redirect push to={"/lobby/" + values.code} />;
	},
})(Landing);

export default LandingFormik;
