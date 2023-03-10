import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./Components/Header";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL}>
			<Header />
			<Switch>
				<Route path="/tv">
					<Route path={["/", "/tv/:showId"]}>
						<Tv />
					</Route>
				</Route>
				<Route
					path={["/search", "/search/tv/:showId", "/search/movies/:movieId"]}
				>
					<Search />
				</Route>
				<Route path={["/", "/movies/:movieId"]}>
					<Home />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
