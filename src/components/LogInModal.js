import React, { Component } from "react";
import axios from "axios";

class LogInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      url: "http://localhost:3001/",
      style: {
        padding: "16px",
        position: "fixed",
        width: "300px",
        left: "calc(50vw - 168px)",
        top: "48px",
        border: "1px solid black",
        borderRadius: "16px",
        backgroundColor: "white",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  logIn() {
    console.log(this.state.url + "User/login");
    const scopeThis = this;
    axios
      .get(
        this.state.url +
          "User/login?username=" +
          this.state.username +
          "&password=" +
          this.state.password
      )
      .then(function (res) {
        if (res.data[0]) {
          scopeThis.props.setUser(res.data[0]);
        } else {
          alert("Wrong Username or Password!");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div style={this.state.style}>
        <input
          value={this.state.username}
          onChange={this.handleUsernameChange.bind(this)}
        />
        <input
          value={this.state.password}
          onChange={this.handlePasswordChange.bind(this)}
        />
        <br />
        <button onClick={this.logIn.bind(this)}>Log In</button>
        <br />
        <button
          onClick={() => {
            this.props.setModalView("register");
          }}
        >
          Create an Account
        </button>
      </div>
    );
  }
}

export default LogInModal;
