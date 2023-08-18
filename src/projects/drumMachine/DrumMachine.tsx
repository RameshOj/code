import { useEffect, useState } from "react";
import "./DrumMachine.css";

const list: Array<OBJ> = [
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

const DrumMachine = () => {
  const [on, setOn] = useState(false);
  const [key, setKey] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (url) {
      const splittedURL = url.split("/");
      const lastElem = splittedURL[splittedURL.length - 1];
      const name = lastElem.split(".")[0];
      setName(name);
    }
  }, [url]);

  const fetchURL = (elem: string) => {
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

  return (
    <div
      id="drum-machine"
      onKeyDown={(e) => setKey(e.key)}
      onKeyUp={() => setKey("")}
    >
      <Title head="RO \../" />
      <div id="buttons-container">
        <RenderButtons
          on={on}
          keyPressed={key}
          list={list}
          element={fetchURL}
        />
      </div>
      <label id="label">POWER</label>
      <button onClick={() => setOn(!on)} id={on ? "toggle-on" : "toogle-off"}>
        <div id="switch"></div>
      </button>
      <div id="display">{name}</div>
    </div>
  );
};

type TitleProps = {
  head: string;
};

const Title = ({ head }: TitleProps) => {
  return <div id="head-right">{head}</div>;
};

type OBJ = {
  [key: string]: string;
};

type RenderButtonProps = {
  list: Array<OBJ>;
  on: boolean;
  keyPressed: string;
  element: CallableFunction;
};

const RenderButtons = ({
  list,
  on,
  keyPressed,
  element,
}: RenderButtonProps) => {
  useEffect(() => {
    if (on && keyPressed) {
      playAudio(keyPressed.toUpperCase());
    }
  }, [on, keyPressed]);
  const playAudio = (el: string) => {
    const elem: HTMLMediaElement = document.getElementById(el);
    if (elem?.play) {
      elem.play();
      element(el);
    }
  };
  return list.map((elem: OBJ) => {
    return Object.keys(elem).map((key) => {
      return (
        <button
          disabled={!on}
          key={key}
          onClick={() => playAudio(key)}
          className="drum-pad"
        >
          <audio id={key} className="clip">
            <source src={elem[key]} />
          </audio>
          {key}
        </button>
      );
    });
  });
};

export default DrumMachine;
