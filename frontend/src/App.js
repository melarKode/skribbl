import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./components/Landing";
import { Route, Switch } from "react-router-dom";
import Lobby from "./components/Lobby";
import Container from "./components/container/Container";

function App() {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/lobby/:room" component={Lobby} />
				<Route path="/board/:room" component={Container} />
			</Switch>
		</div>
	);
}

export default App;
