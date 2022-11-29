import React, { Component } from "react";
import ReviewsIcon from "../assets/reviews.png";
import OpenIcon from "../assets/open.png";
import AddBingoCardIcon from "../assets/addbingocard.png";
import NoImageIcon from "../assets/noimage.png";

class SearchCardSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        textAlign: "center",
        border: "1px solid black",
        width: "100%",
        marginTop: "8px",
        borderRadius: "24px",
        display: "flex",
      },
      iconStyle: {
        height: "32px",
        width: "32px",
        paddingTop: "8px",
      },
      subjectPicStyle: {
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

  openViewer() {
    this.props.setView("subjectview");
  }

  createCard() {
    this.props.createCard();
  }

  openReviews() {
    this.props.openReviews();
  }

  render() {
    return (
      <div style={this.state.style}>
        <img
          src={
            this.props.subject.subjectPic === ""
              ? NoImageIcon
              : this.props.subject.subjectPic
          }
          style={this.state.subjectPicStyle}
        />
        <div style={{ width: "100%", paddingTop: "10px" }}>
          {this.props.subject.subject}
        </div>
        <img
          src={AddBingoCardIcon}
          style={this.state.iconStyle}
          onClick={this.createCard.bind(this)}
        />
        <img
          src={ReviewsIcon}
          style={this.state.iconStyle}
          onClick={this.openReviews.bind(this)}
        />
        <img
          src={OpenIcon}
          style={this.state.iconStyle}
          onClick={this.openViewer.bind(this)}
        />
      </div>
    );
    //edit subject, open panels, open reviews, delete
  }
}

export default SearchCardSubject;
