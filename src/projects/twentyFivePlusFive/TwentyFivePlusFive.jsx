import { useEffect, useRef, useState } from "react";
import styles from "./TwentyFivePlusFive.module.css";
import mp3 from "./Doraemon.mp3";

// TwentyFivePlusFive component that implements a productivity timer
// It allows users to set a 25-minute work session followed by a 5-minute break
const TwentyFivePlusFive = () => {
  // State variables to manage session length, break session length, timer values, and flags for start/stop and session end
  // It uses useState to manage the state of the timer and session lengths
  const [sessionLength, setSessionlength] = useState(25);
  const [breakSessionLength, setBreakSessionlength] = useState(5);
  const [hoursTimer, setHoursTimer] = useState(sessionLength * 60);
  const [minsTimer, setMinsTimer] = useState(sessionLength * 60);
  const [isStarted, setIsStarted] = useState(false);
  const [isSessionEnded, setSessionEnded] = useState(false);

  // useRef to hold the interval ID for the timer
  // This allows us to clear the interval when the component unmounts or when the timer is stopped
  const myInterval = useRef();

  // useEffect hook to manage the timer logic
  // It starts the timer when isStarted is true and updates the timer values every second
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
        const elem = document.getElementById("dora");
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
      const elem = document.getElementById("dora");
      if (elem?.pause) {
        elem.pause();
      }
    }
    return () => {
      clearInterval(myInterval.current);
      myInterval.current = null;
    };
  }, [isStarted, hoursTimer, minsTimer]);

  // Function to format the time in MM:SS format
  // It ensures that the minutes and seconds are always two digits
  const formatTime = (number) => {
    if (!(number % 60)) return "00";
    if ((number % 60).toString().length === 1) {
      return "0" + (number % 60);
    }
    return number % 60;
  };

  // Function to handle incrementing or decrementing the session or break length
  // It updates the state based on the type (break or session) and the operation (inc or dec)
  // It ensures that the session length and break length do not go below zero
  const incDecHandler = (type, oprtn) => {
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

  // Function to start or stop the timer
  // It toggles the isStarted state to start or stop the timer
  const startStopTimer = () => {
    setIsStarted(!isStarted);
  };

  // Function to reset the timer and session lengths to their initial values
  // It sets the session length to 25 minutes and break length to 5 minutes
  const resetHandler = () => {
    setSessionlength(25);
    setBreakSessionlength(5);
    setHoursTimer(25 * 60);
    setMinsTimer(25 * 60);
    setIsStarted(false);
  };

  const home = `< Home`;

  // Render method to display the TwentyFivePlusFive component
  return (
    <>
      <a id={styles.a} href="/">
        {home}
      </a>
      <div id={styles.container}>
        <h2 className={styles.headText}>
          This is a time clock where you can increase your productivity. Like 25
          minutes prductive work session and 5 minutes of break. The perk is you
          can change duration of session and break.
        </h2>
        <div id={styles.innerContainer}>
          <div id={styles.heading}>25 + 5 Clock</div>
          <div id={styles.lengthContainer}>
            <span>
              <div id={styles.breakLabel}>Break Length</div>
              <button
                id={styles.breakDecrement}
                onClick={() => incDecHandler("break", "dec")}
              >
                -
              </button>
              <span id={styles.breakLength}>{breakSessionLength}</span>
              <button
                id={styles.breakIncrement}
                onClick={() => incDecHandler("break", "inc")}
              >
                +
              </button>
            </span>
            <span>
              <div id={styles.sessionLabel}>Session Length</div>
              <button
                id={styles.sessionDecrement}
                onClick={() => incDecHandler("session", "dec")}
              >
                -
              </button>
              <span id={styles.sessionLength}>{sessionLength}</span>
              <button
                id={styles.sessionIncrement}
                onClick={() => incDecHandler("session", "inc")}
              >
                +
              </button>
            </span>
          </div>
          <div id={styles.sessionBox}>
            <div id={styles.timerLabel}>
              {isSessionEnded ? "Break" : "Session"}
            </div>
            <div id={styles.timeLeft}>
              {formatTime(Math.floor(hoursTimer / 60))}:{formatTime(minsTimer)}
            </div>
          </div>
          <button id={styles.startStop} onClick={() => startStopTimer()}>
            {isStarted ? "Pause" : "Play"}
          </button>
          <button id={styles.reset} onClick={() => resetHandler()}>
            Reset
          </button>
          <audio id="dora">
            <source src={mp3} />
          </audio>
        </div>
      </div>
    </>
  );
};

export default TwentyFivePlusFive;
