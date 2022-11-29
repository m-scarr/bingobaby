import React, { Component } from "react";
import XIcon from "../assets/x.png";
import CheckIcon from "../assets/check.png";

class AddCardSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      cardSubjectInput: "",
      style: {
        border: "1px solid black",
        width: "calc(100% - 18px)",
        margin: "8px",
        textAlign: "center",
        fontSize: "24px",
        borderRadius: "16px",
      },
      inputStyle: {
        position: "relative",
        top: "-13px",
        width: "calc(100% - 96px)",
        height: "20px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleCardSubjectChange(e) {
    this.setState({ cardSubjectInput: e.target.value });
  }

  handleClick() {
    if (!this.state.showInput) {
      this.setState({ showInput: true });
    }
  }

  handleBackClick() {
    this.setState({ cardSubjectInput: "", showInput: false });
  }

  createCardSubject() {
    if (this.state.cardSubjectInput === "") {
      alert("You can't leave the subject line blank!");
    } else {
      this.props.createCardSubject(this.state.cardSubjectInput);
      this.setState({ cardSubjectInput: "", showInput: false });
    }
  }

  render() {
    return (
      <div style={this.state.style} onClick={this.handleClick.bind(this)}>
        {this.state.showInput ? (
          <div>
            <img
              src={XIcon}
              onClick={this.handleBackClick.bind(this)}
              style={{
                marginTop: "8px",
              }}
            />
            <input
              style={this.state.inputStyle}
              value={this.state.cardSubjectInput}
              onChange={this.handleCardSubjectChange.bind(this)}
            />
            <img
              src={CheckIcon}
              onClick={this.createCardSubject.bind(this)}
              style={{
                marginTop: "8px",
              }}
            />
          </div>
        ) : (
          "+"
        )}
      </div>
    );
  }
}

export default AddCardSubject;
