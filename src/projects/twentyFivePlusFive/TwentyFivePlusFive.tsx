import { useEffect, useRef, useState } from "react";
import styles from "./TwentyFivePlusFive.module.css";

const TwentyFivePlusFive = () => {
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

  const home = `< Home`;

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
          <audio id={styles.beep}>
            <source src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
          </audio>
        </div>
      </div>
    </>
  );
};

export default TwentyFivePlusFive;
