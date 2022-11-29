import React, { Component } from "react";
import EditIcon from "../assets/edit.png";
import CheckIcon from "../assets/check.png";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:
        typeof this.props.user.username === "undefined"
          ? ""
          : this.props.user.username,
      aboutMe:
        typeof this.props.user.aboutMe === "undefined"
          ? ""
          : this.props.user.aboutMe,
      editUsername: false,
      editAboutMe: false,
      profilePicHeight: 0,
      analysisInput: "",
    };
  }

  componentDidMount() {
    this.setPicHeight();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.props.user) {
      this.setPicHeight();
      this.setState({
        username: this.props.user.username,
        aboutMe: this.props.user.aboutMe,
      });
    }
  }

  componentWillUnmount() {}

  setPicHeight() {
    const scopeThis = this;
    const img = new Image();
    img.addEventListener("load", function () {
      scopeThis.setState(
        {
          profilePicHeight:
            document.getElementById("image-cell").clientWidth *
            (this.naturalHeight / this.naturalWidth),
        },
        () => {
          console.log(scopeThis.state.profilePicHeight);
        }
      );
    });
    img.src = this.props.user.profilePic;
  }

  updateProfilePic() {
    let url = prompt(
      "Please enter the URL of the picture you want to represent this subject!",
      ""
    );
    if (url != null && url !== "") {
      this.props.updateProfilePic(url);
    }
  }

  render() {
    return (
      <div>
        <table
          style={{ tableLayout: "fixed", maxWidth: "800px", minWidth: "60%" }}
        >
          <tbody>
            <tr>
              <td style={{ width: "20%" }}>Username</td>
              <td style={{ width: "calc(80% - 34px)", textAlign: "center" }}>
                <input
                  style={{
                    textAlign: "center",
                    width: "calc(100% - 8px)",
                    fontSize: "20px",
                  }}
                  disabled={!this.state.editUsername}
                  value={this.state.username}
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </td>
              <td style={{ width: "34px" }}>
                <img
                  style={{ marginTop: "12px" }}
                  alt="edit"
                  src={this.state.editUsername ? CheckIcon : EditIcon}
                  onClick={() => {
                    this.setState(
                      { editUsername: !this.state.editUsername },
                      () => {
                        if (
                          !this.state.editUsername &&
                          this.state.username !== this.props.user.username
                        ) {
                          this.props.updateUsername(this.state.username);
                        }
                      }
                    );
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>Profile Picture</td>
              <td
                id="image-cell"
                style={{
                  backgroundImage: "url(" + this.props.user.profilePic + ")",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100%",
                  paddingTop: this.state.profilePicHeight + "px",
                  borderRadius: "32px",
                }}
              ></td>
              <td>
                <img
                  alt="edit"
                  style={{ marginTop: "12px" }}
                  src={EditIcon}
                  onClick={this.updateProfilePic.bind(this)}
                />
              </td>
            </tr>
            <tr style={{ paddingTop: "8px" }}>
              <td>About Me</td>
              <td style={{ textAlign: "center", paddingTop: "12px" }}>
                <textarea
                  style={{
                    textAlign: "center",
                    width: "calc(100% - 8px)",
                    height: "96px",
                    resize: "none",
                    fontSize: "20px",
                  }}
                  disabled={!this.state.editAboutMe}
                  value={this.state.aboutMe}
                  onChange={(e) => {
                    this.setState({ aboutMe: e.target.value });
                  }}
                />
              </td>
              <td>
                <img
                  alt="edit"
                  style={{ marginTop: "12px" }}
                  src={this.state.editAboutMe ? CheckIcon : EditIcon}
                  onClick={() => {
                    this.setState({ editAboutMe: !this.state.editAboutMe });
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center" }}>
          <br />
          <div>User Analysis</div>
          <input
            type="text"
            placeholder={"Username"}
            value={this.state.analysisInput}
            onChange={(e) => {
              this.setState({ analysisInput: e.target.value });
            }}
          />
          <button
            onClick={() => {
              this.props.getUserAnalysis(this.state.analysisInput);
            }}
          >
            Get Analysis
          </button>
          <br />
          <br />
          <table style={{ fontSize: 13 }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>Number of published Card Subjects:</strong>
                </td>
                <td style={{ textAlign: "left" }}>
                  {" " + this.props.analysis.numCardSubjects}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>
                    Average rating of all published Card Subjects:
                  </strong>
                </td>
                <td style={{ textAlign: "left" }}>
                  {" " + this.props.analysis.cardSubjectAvgRating}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>
                    Number of reviews of all published Card Subjects:
                  </strong>
                </td>
                <td style={{ textAlign: "left" }}>
                  {" " + this.props.analysis.numReviews}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>
                    Number of generated Cards from all created <br />
                    published Card Subjects:
                  </strong>
                </td>
                <td style={{ textAlign: "left" }}>
                  {" " + this.props.analysis.numCards}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserProfile;
