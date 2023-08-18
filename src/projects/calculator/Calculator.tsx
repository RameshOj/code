import { MouseEventHandler, useState } from "react";
import "./Calculator.css";
const Calculator = () => {
  const [string, setString] = useState<string>("");
  const [lastOperation, setOperation] = useState<number>(0);
  const stringEquator = (str) => {
    const strArr = str.split("");
    for(let i = 0; i<strArr.length; i++) {
      return;
    }
  }
  const clickHandler = (butn: string, oprtn: string) => {
    if(oprtn!=="equal") {
      setString(string+butn);
    } else {
      stringEquator(string)
    }
  };
  return (
    <div id="calculator-container">
      <div id="calculator">
        <div id="display">
          <div></div>
          <div></div>
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
            onClick={() => props.buttonClickHandler(elem.id, elem.variant)}
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
