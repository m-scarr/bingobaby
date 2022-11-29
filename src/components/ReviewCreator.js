import React, { Component } from "react";
import XIcon from "../assets/x.png";
import CheckIcon from "../assets/check.png";
import HalfStarIcon from "../assets/halfstar.png";
import HalfStarFilledIcon from "../assets/halfstarfilled.png";

class ReviewCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMode: "add",
      reviewInput: "",
      rating: 5,
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
      starStyle: {
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

  handleReviewChange(e) {
    this.setState({ reviewInput: e.target.value });
  }

  handleClick() {
    if (this.state.showMode === "add") {
      console.log("!");
      this.setState({ showMode: "review" });
    }
  }

  handleBackClick() {
    this.setState({ reviewInput: "", showMode: "add" });
  }

  getRating() {
    this.setState({ showMode: "rating" });
  }
  createReview() {
    this.props.createReview(this.state.reviewInput, this.state.rating);
    this.setState({ showMode: "add" });
  }

  render() {
    return (
      <div style={this.state.style} onClick={this.handleClick.bind(this)}>
        {this.state.showMode === "review" ? (
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
              value={this.reviewInput}
              onChange={this.handleReviewChange.bind(this)}
            />
            <img
              src={CheckIcon}
              onClick={this.getRating.bind(this)}
              style={this.state.iconStyle}
            />
          </div>
        ) : this.state.showMode === "rating" ? (
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
            <div style={this.state.starStyle}>
              <img
                style={{ width: "16px", height: "32px", opacity: 0 }}
                src={HalfStarIcon}
                alt=""
                onClick={() => {
                  this.setState({ rating: 0 });
                }}
              />
              <img
                src={this.state.rating >= 1 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                onClick={() => {
                  this.setState({ rating: 1 });
                }}
              />
              <img
                src={this.state.rating >= 2 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                style={{ transform: "scaleX(-1)" }}
                onClick={() => {
                  this.setState({ rating: 2 });
                }}
              />
              <img
                src={this.state.rating >= 3 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                onClick={() => {
                  this.setState({ rating: 3 });
                }}
              />
              <img
                src={this.state.rating >= 4 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                style={{ transform: "scaleX(-1)" }}
                onClick={() => {
                  this.setState({ rating: 4 });
                }}
              />
              <img
                src={this.state.rating >= 5 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                onClick={() => {
                  this.setState({ rating: 5 });
                }}
              />
              <img
                src={this.state.rating >= 6 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                style={{ transform: "scaleX(-1)" }}
                onClick={() => {
                  this.setState({ rating: 6 });
                }}
              />
              <img
                src={this.state.rating >= 7 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                onClick={() => {
                  this.setState({ rating: 7 });
                }}
              />
              <img
                src={this.state.rating >= 8 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                style={{ transform: "scaleX(-1)" }}
                onClick={() => {
                  this.setState({ rating: 8 });
                }}
              />
              <img
                src={this.state.rating >= 9 ? HalfStarFilledIcon : HalfStarIcon}
                alt="star"
                onClick={() => {
                  this.setState({ rating: 9 });
                }}
              />
              <img
                src={
                  this.state.rating == 10 ? HalfStarFilledIcon : HalfStarIcon
                }
                alt="star"
                style={{ transform: "scaleX(-1)" }}
                onClick={() => {
                  this.setState({ rating: 10 });
                }}
              />
            </div>
            <img
              src={CheckIcon}
              onClick={this.createReview.bind(this)}
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

export default ReviewCreator;
