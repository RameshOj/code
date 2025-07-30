import { MouseEventHandler, useEffect, useState } from "react";
import styles from "./Calculator.module.css";

// file for the Calculator component
const Calculator = () => {
  // State variables to manage the calculator's input, display, and result
  // 'arr' holds the numbers and operators entered by the user
  const [arr, setArr] = useState<string[]>([]);
  const [num, setNum] = useState<string>("");
  const [display, setDisplay] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);

  // Effect hook to trigger the calculation when the 'arr' changes
  // It checks if the 'flag' is true, indicating that an equal operation was requested
  useEffect(() => {
    if (flag) equaliserFunc();
  }, [arr.length, flag]);

  // Function to perform the calculation based on the operator passed
  // It finds the index of the operator in the 'arr', calculates the result based on the previous and next numbers,
  // and updates the 'arr' with the new result
  const calculator = (oprtn: string) => {
    // Find the index of the operator in the array
    const indx = arr.indexOf(oprtn);
    const prevIndx = indx - 1;
    const nextIndx = indx + 1;
    let res = "";

    if (oprtn === "/") {
      res = (Number(arr[prevIndx]) / Number(arr[nextIndx])).toString();
    } else if (oprtn === "x") {
      res = (Number(arr[prevIndx]) * Number(arr[nextIndx])).toString();
    } else if (oprtn === "+") {
      res = (Number(arr[prevIndx]) + Number(arr[nextIndx])).toString();
    } else if (oprtn === "-") {
      res = (Number(arr[prevIndx]) - Number(arr[nextIndx])).toString();
    }
    const prevArr = arr.slice(0, prevIndx);
    const nextArr = arr.slice(nextIndx + 1, arr.length);
    setArr([...prevArr, res, ...nextArr]);
    return;
  };

  // Function to handle the equal operation
  // It checks if the 'arr' has only one element or if it contains an operator
  const equaliserFunc = (): void => {
    if (arr.length === 1 && arr.length % 2 !== 0) {
      setResult(JSON.parse(arr[0]));
      return;
    }
    if (arr.includes("/")) {
      calculator("/");
    } else if (arr.includes("x")) {
      calculator("x");
    } else if (arr.includes("+")) {
      calculator("+");
    } else if (arr.includes("-")) {
      calculator("-");
    }
  };

  // Function to handle button clicks
  // It updates the display and arr based on the button clicked
  const clickHandler = (butn: string, variant: string) => {
    setDisplay(display + butn);
    if (butn === "=") {
      setArr([...arr, num]);
      setFlag(true);
      setNum("");
      return;
    } else if (variant === "num" || variant === "num-big") {
      setNum(num + butn);
    } else if (num.length && variant === "calc") {
      setArr([...arr, num, butn]);
      setNum("");
    } else if (variant === "red") {
      setDisplay("");
      setArr([]);
      setFlag(false);
      setNum("");
      setResult(0);
    }
  };

  const home = `< Home`;
  // Render method to display the Calculator component
  // It includes a link to go back home, the display for the current input and result
  return (
    <>
      <a id={styles.a} href="/">
        {home}
      </a>
      <div id={styles.calculatorContainer}>
        <center>
          <h2 className={styles.headText}>
            This is basic calculator, here after equating one calculation we
            need to All Clear- AC. Then only we can do next calculation. This
            calculator follows Formula/Expression Logic.
          </h2>
        </center>
        <div id={styles.calculator}>
          <div id={styles.displayCont}>
            <div id={styles.display} className={styles.que}>
              {display}
            </div>
            <div id={styles.display} className={styles.result}>
              {result}
            </div>
          </div>
          <Buttons buttonClickHandler={clickHandler} />
        </div>
      </div>
    </>
  );
};

// Buttons component props type definition
// It takes a function to handle button clicks as a prop
type ButtonsProp = {
  buttonClickHandler: CallableFunction;
};

// Buttons component to render the calculator buttons
const Buttons = (props: ButtonsProp) => {
  // List of buttons with their ids, variants, and text
  // Each button has a unique id, a variant for styling, and the text to display
  const list = [
    { id: "clear", variant: "red", text: "AC" },
    { id: "divide", variant: "calc", text: "/" },
    { id: "multiply", variant: "calc", text: "x" },
    { id: "seven", variant: "num", text: "7" },
    { id: "eight", variant: "num", text: "8" },
    { id: "nine", variant: "num", text: "9" },
    { id: "subtract", variant: "calc", text: "-" },
    { id: "four", variant: "num", text: "4" },
    { id: "five", variant: "num", text: "5" },
    { id: "six", variant: "num", text: "6" },
    { id: "add", variant: "calc", text: "+" },
    { id: "one", variant: "num", text: "1" },
    { id: "two", variant: "num", text: "2" },
    { id: "three", variant: "num", text: "3" },
    { id: "equal", variant: "equal", text: "=" },
    { id: "zero", variant: "num-big", text: "0" },
    { id: "decimal", variant: "num", text: "." },
  ];

  // Render method to display the buttons
  // It maps through the list of buttons and creates a Button component for each
  return (
    <div id={styles.buttons}>
      {list.map((elem) => {
        return (
          <Button
            id={elem.id}
            variant={elem.variant}
            onClick={() => props.buttonClickHandler(elem.text, elem.variant)}
            text={elem.text}
          />
        );
      })}
    </div>
  );
};

// Button component props type definition
// It takes an id, variant, text, and a click handler function as props
type ButtonProps = {
  id: string;
  variant: string;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

// Button component to render a single button
const Button = (props: ButtonProps) => {
  return (
    <button
      id={styles[props.id]}
      className={styles[props.variant]}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Calculator;
