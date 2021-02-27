import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingFormik from "./components/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Lobby from "./components/Lobby";
import Container from "./components/container/Container";

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={LandingFormik} />
				<Route path="/lobby/:room" component={Lobby} />
				<Route path="/board/:room" component={Container} />
			</Switch>
		</div>
	);
}

export default App;
