import { useEffect, useState } from "react";
import styles from "./DrumMachine.module.css";
// mp3 files for the drum sounds from s3 bucket
const list = [
  { Q: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
  { W: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" },
  { E: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" },
  { A: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" },
  { S: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
  { D: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" },
  { Z: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" },
  { X: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
  { C: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" },
];
// DrumMachine component that renders a drum machine interface
// It allows users to play sounds by clicking buttons or pressing keys.
const DrumMachine = () => {
  // State variables to manage the on/off state, key pressed, URL of the sound, and name of the sound
  // The name is derived from the URL to display the currently playing sound
  const [on, setOn] = useState(false);
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");

  // Effect hook to set the name based on the URL when it changes
  // It splits the URL to extract the last part, which is used as the name of the sound
  // This is done to display the name of the sound currently being played
  useEffect(() => {
    if (url) {
      const splittedURL = url.split("/");
      const lastElem = splittedURL[splittedURL.length - 1];
      const name = lastElem.split(".")[0];
      setName(name);
    }
  }, [url]);

  // Function to fetch the URL of the sound based on the button pressed or key pressed
  // It iterates through the list of sounds and sets the URL state with the corresponding sound
  const fetchURL = (elem) => {
    list.map((obj) => {
      let object;
      Object.keys(obj).map((key) => {
        if (key === elem && obj[key]) {
          object = obj[key];
        }
      });
      if (object && Object.values(object)) {
        setUrl(Object.values(object).join(""));
      }
    });
  };
  // Function to handle the switch toggle for turning the drum machine on or off
  // It toggles the on state and resets the name to an empty string
  const switchHandler = () => {
    setOn(!on);
    setName("");
  };

  const home = `< Home`;
  // Render method to display the drum machine interface
  // It includes a title, buttons for each drum sound, a toggle switch for power,
  return (
    <div className={styles.outerCont}>
      <a id={styles.a} href="/">
        {home}
      </a>
      <div
        id={styles.drumMachine}
        onKeyDown={(e) => setKey(e.key)}
        onKeyUp={() => setKey("")}
      >
        <Title head="RO \../" />
        <div id={styles.buttonsContainer}>
          <RenderButtons
            on={on}
            keyPressed={key}
            list={list}
            element={fetchURL}
          />
        </div>
        <label id={styles.label}>POWER</label>
        <button
          id={on ? styles.toggleOn : styles.toogleOff}
          onClick={() => switchHandler()}
        >
          <div id={styles.switch}></div>
        </button>
        <div id={styles.display}>{name}</div>
      </div>
    </div>
  );
};

// Title component to display the title of the drum machine
// It takes a prop 'head' to display the title text
const Title = ({ head }) => {
  return <div id={styles.headRight}>{head}</div>;
};

// RenderButtons component to render the drum sound buttons
// It maps through the list of sounds and creates a button for each sound
const RenderButtons = ({ list, on, keyPressed, element }) => {
  useEffect(() => {
    if (on && keyPressed) {
      playAudio(keyPressed.toUpperCase());
    }
  }, [on, keyPressed]);
  const playAudio = (el) => {
    const elem = document.getElementById(el);
    // If the audio element exists and is not paused, play the sound
    // It also calls the element function to fetch the URL of the sound
    if (elem?.play) {
      elem.play();
      element(el);
    }
  };

  // Map through the list of sounds and create buttons for each sound
  // Each button has an onClick handler to play the sound when clicked
  return list.map((elem) => {
    return Object.keys(elem).map((key) => {
      return (
        <button
          disabled={!on}
          key={key}
          onClick={() => playAudio(key)}
          className={styles.drumPad}
        >
          <audio id={key} className={styles.clip}>
            <source src={elem[key]} />
          </audio>
          {key}
        </button>
      );
    });
  });
};

export default DrumMachine;
