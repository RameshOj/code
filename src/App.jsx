import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Markdown from "./projects/markdown/Markdown";
import DrumMachine from "./projects/drumMachine/DrumMachine";
import Calculator from "./projects/calculator/Calculator";
import QuoteMachine from "./projects/quoteMachine/QuoteMachine";
import TwentyFivePlusFive from "./projects/twentyFivePlusFive/TwentyFivePlusFive";
import Form from "./projects/form/Form";

import styles from "./App.module.css";

const Home = () => {
  return (
    <nav id={styles.nav}>
      <h2 id={styles.headText}>
        This project is made only for educational purpose.
      </h2>
      <h2 id={styles.headText}>
        Click on the below links to have a peek into it.
      </h2>
      <ul id={styles.ul}>
        <li>
          <Link to="/quoteMachine">Quote Machine</Link>
        </li>
        <li>
          <Link to="/drumMachine">Drum Machine</Link>
        </li>
        <li>
          <Link to="/markdown">Markdown</Link>
        </li>
        <li>
          <Link to="/calculator">Calculator</Link>
        </li>
        <li>
          <Link to="/timeClock">Time Clock</Link>
        </li>
        <li>
          <Link to="/form">Form</Link>
        </li>
      </ul>
    </nav>
  );
};

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
          <Route path="/form" Component={Form} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
