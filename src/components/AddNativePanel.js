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
      textAreaStyle: {
        resize: "none",
        marginTop: "6px",
        width: "calc(100% - 64px)",
        height: "96px",
        marginBottom: "6px",
      },
      iconStyle: {
        marginTop: "40px",
        height: "32px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleNativePanelChange(e) {
    this.setState({ nativePanelInput: e.target.value });
  }

  handleClick() {
    if (!this.state.showInput) {
      this.setState({ showInput: true });
    }
  }

  handleBackClick() {
    this.setState({ nativePanelInput: "", showInput: false });
  }

  createNativePanel() {
    if (this.state.nativePanelInput === "") {
      alert("You can't leave the panel line blank!");
    } else {
      this.props.createNativePanel(this.state.nativePanelInput);
      this.setState({
        nativePanelInput: "",
        showInput: false,
      });
    }
  }

  render() {
    return (
      <div style={this.state.style} onClick={this.handleClick.bind(this)}>
        {this.state.showInput ? (
          <div
            style={{
              display: "flex",
            }}
          >
            <img
              src={XIcon}
              onClick={this.handleBackClick.bind(this)}
              style={this.state.iconStyle}
            />
            <textarea
              style={this.state.textAreaStyle}
              value={this.state.nativePanelInput}
              onChange={this.handleNativePanelChange.bind(this)}
            />
            <img
              src={CheckIcon}
              onClick={this.createNativePanel.bind(this)}
              style={this.state.iconStyle}
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
