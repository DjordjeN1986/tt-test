import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import { LocalProvider } from "./providers/LocalContext";
import CurrDetails from "./components/CurrDetails";

function App() {
  return (
    <Router>
      <LocalProvider>
        <Navbar />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/details/:currency" component={CurrDetails} />
          </Switch>
        </div>
      </LocalProvider>
    </Router>
  );
}

export default App;
