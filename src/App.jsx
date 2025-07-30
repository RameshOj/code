import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Markdown from "./projects/markdown/Markdown";
import DrumMachine from "./projects/drumMachine/DrumMachine";
import Calculator from "./projects/calculator/Calculator";
import QuoteMachine from "./projects/quoteMachine/QuoteMachine";
import TwentyFivePlusFive from "./projects/twentyFivePlusFive/TwentyFivePlusFive";

import styles from "./App.module.css";
import { MESSAGE_CONSTANTS } from "./utils/messageConstants";

// Home component to display the navigation links rendering at "/" route
// and a message about the educational purpose of the project.
const Home = () => {
  return (
    <nav id={styles.nav}>
      <center>
        <div className={styles.test}>
          <h2 id={styles.headText}>{MESSAGE_CONSTANTS.EDUCATIONAL_PURPOSE}</h2>
          <h2 id={styles.headText}>{MESSAGE_CONSTANTS.LINK_CLICK_MSG}</h2>
        </div>
      </center>
      <ul id={styles.ul}>
        <li>
          <Link to="/quoteMachine">{MESSAGE_CONSTANTS.QUOTE_MACHINE}</Link>
        </li>
        <li>
          <Link to="/drumMachine">{MESSAGE_CONSTANTS.DRUM_MACHINE}</Link>
        </li>
        <li>
          <Link to="/markdown">{MESSAGE_CONSTANTS.MARKDOWN}</Link>
        </li>
        <li>
          <Link to="/calculator">{MESSAGE_CONSTANTS.CALCULATOR}</Link>
        </li>
        <li>
          <Link to="/timeClock">{MESSAGE_CONSTANTS.TIME_CLOCK}</Link>
        </li>
      </ul>
    </nav>
  );
};

// Main App component that sets up the router and routes for the application.
// It includes the Home component and routes to other project components.
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/quoteMachine" Component={QuoteMachine} />
          <Route path="/drumMachine" Component={DrumMachine} />
          <Route path="/markdown" Component={Markdown} />
          <Route path="/calculator" Component={Calculator} />
          <Route path="/timeClock" Component={TwentyFivePlusFive} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
