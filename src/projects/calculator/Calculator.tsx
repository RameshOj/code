import { MouseEventHandler, useEffect, useState } from "react";
import "./Calculator.css";
const Calculator = () => {
  const [arr, setArr] = useState<string[]>([]);
  const [num, setNum] = useState<string>("");
  const [display, setDisplay] = useState<string>("");
  const [result, setResult] = useState<number>(0);
  const [flag, setFlag] = useState<boolean>(false);

  useEffect(() => {
    if (flag) equaliserFunc();
  }, [arr.length, flag]);

  const calculator = (oprtn: string) => {
    const indx = arr.indexOf(oprtn);
    const prevIndx = indx - 1;
    const nextIndx = indx + 1;
    let res = "";
    if (oprtn === "/") {
      res = (Number(arr[prevIndx]) / Number(arr[nextIndx])).toString();
      console.log(res, " res");
    } else if (oprtn === "X") {
      res = (Number(arr[prevIndx]) * Number(arr[nextIndx])).toString();
      console.log(res, " res");
    } else if (oprtn === "+") {
      res = (Number(arr[prevIndx]) + Number(arr[nextIndx])).toString();
      console.log(res, " res");
    } else if (oprtn === "-") {
      res = (Number(arr[prevIndx]) - Number(arr[nextIndx])).toString();
      console.log(res, " res");
    }
    const prevArr = arr.slice(0, prevIndx);
    const nextArr = arr.slice(nextIndx + 1, arr.length);
    setArr([...prevArr, res, ...nextArr]);
    return;
  };

  const equaliserFunc = (): void => {
    if (arr.length === 1 && arr.length % 2 !== 0) {
      setResult(JSON.parse(arr[0]));
      return;
    }
    if (arr.includes("/")) {
      calculator("/");
    } else if (arr.includes("X")) {
      calculator("X");
    } else if (arr.includes("+")) {
      calculator("+");
    } else if (arr.includes("-")) {
      calculator("-");
    }
  };

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

  return (
    <div id="calculator-container">
      <div id="calculator">
        <div id="displayCont">
          <div id="display" className="que">
            {display}
          </div>
          <div id="display" className="result">
            {result}
          </div>
        </div>
        <Buttons buttonClickHandler={clickHandler} />
      </div>
    </div>
  );
};

type ButtonsProp = {
  buttonClickHandler: CallableFunction;
};

const Buttons = (props: ButtonsProp) => {
  const list = [
    { id: "clear", variant: "red", text: "AC" },
    { id: "divide", variant: "calc", text: "/" },
    { id: "multiply", variant: "calc", text: "X" },
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
  return (
    <div id="buttons">
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

type ButtonProps = {
  id: string;
  variant: string;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const Button = (props: ButtonProps) => {
  return (
    <button id={props.id} className={props.variant} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Calculator;
