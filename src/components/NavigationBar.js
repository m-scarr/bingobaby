import React, { Component } from "react";
import NavigationButton from "./NavigationButton";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: "flex",
        width: "calc(100%)",
        borderBottom: "1px solid black",
        justifyContent: "space-around",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={this.state.style}>
        <NavigationButton
          text="My Profile"
          setView={() => {
            this.props.setView("profile");
          }}
        />
        <NavigationButton
          text="My Cards"
          setView={() => {
            this.props.setView("cardlist");
          }}
        />
        <NavigationButton
          text="My Card Subjects"
          setView={() => {
            this.props.setView("cardsubjects");
          }}
        />
        <NavigationButton
          text="Search Card Subjects"
          setView={() => {
            this.props.setView("search");
          }}
        />
      </div>
    );
  }
}

export default NavigationBar;
