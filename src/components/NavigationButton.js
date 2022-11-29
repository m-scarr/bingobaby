import React, { Component } from "react";

class NavigationButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        border: "1px solid black",
        borderRadius: "16px",
        padding: "2px",
        margin: "2px",
        width: "25%",
        paddingBottom: "8px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={this.state.style}
        onClick={() => {
          this.props.setView();
        }}
      >
        <div
          style={{
            display: "table",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "table-cell", verticalAlign: "middle" }}>
            <div style={{ textAlign: "center" }}>{this.props.text}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavigationButton;
