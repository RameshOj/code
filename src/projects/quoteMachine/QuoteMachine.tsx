import React from "react";
import styles from "./QuoteMachine.module.css";
import { Link } from "react-router-dom";

class QuoteMachine extends React.Component {
  constructor() {
    super();
    this.state = {
      quotes: [],
      color: "",
      colorCount: 1,
      quoteCount: 1,
    };
    this.fetchQuotes = this.fetchQuotes.bind(this);
    this.renderQuotes = this.renderQuotes.bind(this);
    this.nextClickHandler = this.nextClickHandler.bind(this);
  }
  colors = [
    "#f0f8ff",
    "#efc5b5",
    "#e1d590",
    "#d2cbaf",
    "#e3d3bf",
    "#e5ccbd",
    "#bfafb2",
    "#fdee73",
    "#a58d7f",
    "#e3e7c4",
    "#dfbb7e",
    "#aaffaa",
    "#e0ded8",
  ];

  async componentDidMount() {
    console.log(" testong");
    await this.fetchQuotes();
  }

  async componentDidUpdate() {
    const container = document.querySelector("#container");
    container.style.backgroundColor = this.colors[this.state.colorCount];
  }

  fetchQuotes = async () => {
    const response = await fetch("https://type.fit/api/quotes", {
      method: "GET",
      mode: "cors",
      cache: "default",
    });

    const data = await response.json();
    const smallData = data.slice(0, 99);

    this.setState({
      ...this.state,
      quotes: [...smallData],
    });
  };

  nextClickHandler = () => {
    if (this.state.colorCount === 11) {
      this.setState({
        ...this.state,
        colorCount: 1,
      });
    } else if (this.state.quoteCount === 15) {
      this.setState({
        ...this.state,
        quoteCount: 1,
      });
    } else {
      this.setState({
        ...this.state,
        colorCount: this.state.colorCount + 1,
        quoteCount: this.state.quoteCount + 1,
      });
    }
  };

  renderQuotes = () => {
    const allQuotes =
      this.state.quotes.length > 0 ? [...this.state.quotes] : [];
    const quotesCount = this.state.quoteCount;
    const colorCount = this.state.colorCount;
    const data = { ...allQuotes[quotesCount] };
    const result = (
      <>
        <div id={styles.text}>"{data.text}"</div>
        <div id={styles.footer}>
          <button
            style={{ backgroundColor: `${this.colors[colorCount]}` }}
            id={styles.author}
          >
            {" "}
            By - {data.author}
          </button>
          <div id={styles.linkButtons}>
            <a
              href={`https://twitter.com/intent/tweet?text=${data.text}`}
              target="_blank"
              rel="noreferrer"
            >
              <button
                style={{ backgroundColor: `${this.colors[colorCount]}` }}
                id={styles.tweetButton}
              >
                Tweet
              </button>
            </a>
          </div>
          <button
            style={{ backgroundColor: `${this.colors[colorCount]}` }}
            id={styles.newQuote}
            onClick={this.nextClickHandler}
          >
            Next
          </button>
        </div>
      </>
    );
    return result;
  };

  home = `< Home`;

  render() {
    if (!this.state.quotes.length) return <></>;

    return (
      <>
        <a id={styles.a} href="/">
          {this.home}
        </a>
        <div id="container" className={styles.container}>
          <div id={styles.quoteBox}>{this.renderQuotes()}</div>
        </div>
      </>
    );
  }
}
export default QuoteMachine;
