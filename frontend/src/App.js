import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingFormik from "./components/Landing";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Lobby from "./components/Lobby";

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={LandingFormik} />
				<Route path="/lobby/:room" component={Lobby} />
			</Switch>
		</div>
	);
}

export default App;
