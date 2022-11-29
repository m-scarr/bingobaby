import React, { Component } from "react";
import HalfStarFilledIcon from "../assets/halfstarfilled.png";
import NoImageIcon from "../assets/noimage.png";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        textAlign: "center",
        border: "1px solid black",
        width: "calc(100% - 16px)",
        marginLeft: "8px",
        marginTop: "8px",
        borderRadius: "24px",
        display: "flex",
        justifyContent: "space-between",
      },
      iconStyle: {
        height: "32px",
        width: "32px",
        paddingTop: "8px",
      },
      profilePicStyle: {
        height: "48px",
        width: "48px",
        objectFit: "cover",
        borderRadius: "48px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={this.state.style}>
        <img
          src={
            this.props.review.profilePic === ""
              ? NoImageIcon
              : this.props.review.profilePic
          }
          style={this.state.profilePicStyle}
        />
        <div
          style={{
            width: "300px",
          }}
        >
          <div>User: {this.props.review.username}</div>
          <hr />
          {this.props.review.review}
        </div>
        <div
          style={{
            width: "96px",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div style={{ paddingTop: "3px" }}>
            {this.props.review.rating / 2}
          </div>
          <div>
            <img src={HalfStarFilledIcon} alt="" style={{ height: "32px" }} />
            <img
              src={HalfStarFilledIcon}
              alt=""
              style={{ height: "32px", transform: "scaleX(-1)" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
