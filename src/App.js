import {
  BrowserRouter as Router,
  Route,
  Routes as Switch,
} from "react-router-dom";
import "./App.css";
import PersonalSite from "./PersonalSite";
import "./PS_Styles/WelcomePage.css";
import SearchVisual from "./SV_Components/SearchVisual";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" element={<PersonalSite />}></Route>
          <Route exact path="/search_visualizer" element={<SearchVisual />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
