import { useEffect, useRef, useState } from "react";
import "./TwentyFivePlusFive.css";

const TwetnyFivePlusFive = () => {
  const [sessionLength, setSessionlength] = useState(25);
  const [breakSessionLength, setBreakSessionlength] = useState(5);
  const [hoursTimer, setHoursTimer] = useState(sessionLength * 60);
  const [minsTimer, setMinsTimer] = useState(sessionLength * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isSessionEnded, setSessionEnded] = useState(false);
  // let timer: ReturnType<typeof setInterval>;
  const myInterval = useRef();
  useEffect(() => {
    if (isStarted) {
      if (hoursTimer === 0 && minsTimer % 60 === 0) {
        setHoursTimer(
          isSessionEnded ? sessionLength * 60 : breakSessionLength * 60
        );
        setMinsTimer(
          isSessionEnded ? sessionLength * 60 : breakSessionLength * 60
        );
        setSessionEnded((val) => !val);
        const elem: HTMLMediaElement = document.getElementById("beep");
        if (elem?.play) {
          elem.play();
        }
      } else if (hoursTimer > 0 && minsTimer > 0) {
        myInterval.current = setInterval(() => {
          setHoursTimer((hrTim) => hrTim - 1);
          setMinsTimer((minTm) => minTm - 1);
        }, 1000);
      }
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
      const elem: HTMLMediaElement = document.getElementById("beep");
      if (elem?.pause) {
        elem.pause();
      }
    }
    return () => {
      clearInterval(myInterval.current);
      myInterval.current = null;
    };
  }, [isStarted, hoursTimer, minsTimer]);

  const formatTime = (number: number) => {
    if (!(number % 60)) return "00";
    if ((number % 60).toString().length === 1) {
      return "0" + (number % 60);
    }
    return number % 60;
  };

  const incDecHandler = (type: string, oprtn: string) => {
    if (type === "break") {
      if (oprtn === "dec") {
        if (breakSessionLength === 0) return;
        setBreakSessionlength(breakSessionLength - 1);
      } else {
        setBreakSessionlength(breakSessionLength + 1);
      }
    } else if (oprtn === "dec") {
      if (sessionLength === 0) return;
      setSessionlength(sessionLength - 1);
      setHoursTimer(hoursTimer - 60);
      setMinsTimer(hoursTimer - 60);
    } else {
      setSessionlength(sessionLength + 1);
      setHoursTimer(hoursTimer + 60);
      setMinsTimer(hoursTimer + 60);
    }
  };

  const startStopTimer = () => {
    setIsStarted(!isStarted);
  };

  const resetHandler = () => {
    setSessionlength(25);
    setBreakSessionlength(5);
    setHoursTimer(25 * 60);
    setMinsTimer(25 * 60);
    setIsStarted(false);
  };

  return (
    <div id="container">
      <div id="inner-container">
        <div id="heading">25 + 5 Clock</div>
        <div id="length-container">
          <span>
            <div id="break-label">Break Length</div>
            <button
              id="break-decrement"
              onClick={() => incDecHandler("break", "dec")}
            >
              -
            </button>
            <span id="break-length">{breakSessionLength}</span>
            <button
              id="break-increment"
              onClick={() => incDecHandler("break", "inc")}
            >
              +
            </button>
          </span>
          <span>
            <div id="session-label">Session Length</div>
            <button
              id="session-decrement"
              onClick={() => incDecHandler("session", "dec")}
            >
              -
            </button>
            <span id="session-length">{sessionLength}</span>
            <button
              id="session-increment"
              onClick={() => incDecHandler("session", "inc")}
            >
              +
            </button>
          </span>
        </div>
        <div id="session-box">
          <div id="timer-label">{isSessionEnded ? "Break" : "Session"}</div>
          <div id="time-left">
            {formatTime(Math.floor(hoursTimer / 60))}:{formatTime(minsTimer)}
          </div>
        </div>
        <button id="start_stop" onClick={() => startStopTimer()}>
          {isStarted ? "Pause" : "Play"}
        </button>
        <button id="reset" onClick={() => resetHandler()}>
          Reset
        </button>
        <audio id="beep">
          <source src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3" />
        </audio>
      </div>
    </div>
  );
};

export default TwetnyFivePlusFive;
