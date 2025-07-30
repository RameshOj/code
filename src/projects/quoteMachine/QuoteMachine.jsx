import React from "react";
import styles from "./QuoteMachine.module.css";

// Class based react component for QuoteMachine for learning purposes
// It fetches quotes from an API and displays them with a button to fetch the next quote
class QuoteMachine extends React.Component {
  // Initializing state variables for quotes, color, and counters in constructor
  // Binding methods to the class instance
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
  // Array of colors to be used for the background of the quote box
  // These colors will change with each new quote displayed
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

  // Lifecycle method to fetch quotes when the component mounts
  // It sets the initial state of quotes and colors
  async componentDidMount() {
    await this.fetchQuotes();
  }
  // Lifecycle method to update the background color of the container
  async componentDidUpdate() {
    const container = document.querySelector("#container");
    container.style.backgroundColor = this.colors[this.state.colorCount];
  }
  // Method to fetch quotes from the API
  // It updates the state with the fetched quotes
  fetchQuotes = async () => {
    const response = await fetch("https://dummyjson.com/quotes", {
      method: "GET",
      mode: "cors",
      cache: "default",
    });

    const data = await response.json();

    this.setState({
      ...this.state,
      quotes: [...data.quotes],
    });
  };
  // Method to handle the next button click
  // It increments the quote and color counters, resetting them if they exceed their limits
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
  // Method to render the quotes and buttons
  // It displays the quote, author, and buttons for tweeting and fetching the next quote
  renderQuotes = () => {
    const allQuotes =
      this.state.quotes.length > 0 ? [...this.state.quotes] : [];
    const quotesCount = this.state.quoteCount;
    const colorCount = this.state.colorCount;
    const data = { ...allQuotes[quotesCount] };
    const result = (
      <>
        <div id={styles.text}>"{data.quote}"</div>
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
  // Render method to display the component
  // It checks if quotes are available and renders the quote box with the fetched quote
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
