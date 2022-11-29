import React, { Component } from "react";
import EditIcon from "../assets/edit.png";
import XIcon from "../assets/x.png";
import CheckIcon from "../assets/check.png";

class NativePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableInput: true,
      panelInput: this.props.panel.panel,
      style: {
        border: "1px solid black",
        borderRadius: "16px",
        margin: "8px",
        padding: 0,
        display: "flex",
        panelInput: this.props.panel.panel,
      },
      iconStyle: {
        width: "32px",
        height: "32px",
      },
      textAreaStyle: {
        resize: "none",
        width: "calc(100% - 12px)",
        textAlign: "center",
        fontSize: "19px",
        borderTopLeftRadius: "12px",
        borderBottomLeftRadius: "12px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  updateNativePanel() {
    this.setState({ disableInput: !this.state.disableInput }, () => {
      if (this.state.panelInput !== this.props.panel.panel) {
        this.props.updateNativePanel(this.state.panelInput);
      }
    });
  }

  handlePanelChange(e) {
    this.setState({ panelInput: e.target.value });
  }

  render() {
    return (
      <div
        style={{
          ...this.state.style,
          height: this.state.disableInput ? "32px" : "104px",
        }}
      >
        <div style={{ width: "calc(100% - 32px)", marginTop: "2px" }}>
          <textarea
            style={{
              ...this.state.textAreaStyle,
              height: this.state.disableInput ? "22px" : "94px",
            }}
            disabled={this.state.disableInput}
            value={this.state.panelInput}
            onChange={this.handlePanelChange.bind(this)}
          />
        </div>
        <img
          src={this.state.disableInput ? EditIcon : CheckIcon}
          style={{
            ...this.state.iconStyle,
            marginTop: this.state.disableInput ? "0" : "34px",
          }}
          alt="Edit Panel"
          title="Edit Panel"
          onClick={this.updateNativePanel.bind(this)}
        />
      </div>
    );
  }
}

export default NativePanel;
