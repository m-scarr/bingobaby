import React, { Component } from "react";
import axios from "axios";

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      verifyPassword: "",
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

  register() {
    if (this.state.password !== this.state.verifyPassword) { // add more password restrictions.
      alert("Your passwords do not match!");
    } else {
      const scopeThis = this;
      axios
        .post(this.state.url + "User/create", {
          username: this.state.username,
          password: this.state.password,
        })
        .then(function (res) {
          if (res.data === "") {
            alert("This username is already in use!");
          } else {
            scopeThis.props.setUser(res.data[1][0]);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleVerifyPasswordChange(e) {
    this.setState({ verifyPassword: e.target.value });
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
        <input
          value={this.state.verifyPassword}
          onChange={this.handleVerifyPasswordChange.bind(this)}
        />
        <br />
        <button onClick={this.register.bind(this)}>Register</button>
        <br />
        <button
          onClick={() => {
            this.props.setModalView("login");
          }}
        >
          Back to Log In
        </button>
      </div>
    );
  }
}

export default RegisterModal;
