import React, { Component } from "react";
import EditIcon from "../assets/edit.png";
import XIcon from "../assets/x.png";
import ReviewsIcon from "../assets/reviews.png";
import OpenIcon from "../assets/open.png";
import CheckIcon from "../assets/check.png";
import AddBingoCardIcon from "../assets/addbingocard.png";

class CardSubject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableInput: true,
      subjectInput: this.props.subject.subject,
      style: {
        textAlign: "center",
        border: "1px solid black",
        width: "calc(100% - 18px)",
        margin: "8px",
        borderRadius: "16px",
        display: "flex",
      },
      inputStyle: {
        width: "calc(100% - 40px)",
        height: "23px",
        fontSize: "20px",
        marginTop: "2px",
        textAlign: "center",
        whiteWpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
      iconStyle: {
        height: "32px",
        width: "32px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  deleteCardSubject() {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      this.props.deleteCardSubject();
    }
  }

  updateCardSubject() {
    this.setState({ disableInput: !this.state.disableInput }, () => {
      if (
        this.state.disableInput &&
        this.state.subjectInput !== this.props.subject.subject
      ) {
        this.props.updateCardSubject(this.state.subjectInput);
      }
    });
  }

  handleSubjectChange(e) {
    this.setState({ subjectInput: e.target.value });
  }

  openCreator() {
    this.props.setCardSubject(this.props.subject);
    this.props.setView("subjectcreator");
  }

  createCard() {
    this.props.createCard();
  }

  render() {
    return (
      <div style={this.state.style}>
        <img
          src={XIcon}
          style={this.state.iconStyle}
          onClick={this.deleteCardSubject.bind(this)}
        />
        <div style={{ width: "100%" }}>
          <input
            disabled={this.state.disableInput}
            style={this.state.inputStyle}
            value={this.state.subjectInput}
            onChange={this.handleSubjectChange.bind(this)}
          />
        </div>
        <img
          src={this.state.disableInput ? EditIcon : CheckIcon}
          style={this.state.iconStyle}
          onClick={this.updateCardSubject.bind(this)}
        />
        <img
          src={AddBingoCardIcon}
          style={
            this.props.subject.published
              ? { ...this.state.iconStyle }
              : { ...this.state.iconStyle, opacity: 0.25 }
          }
          onClick={() => {
            if (this.props.subject.published) {
              this.createCard();
            }
          }}
        />
        <img
          src={ReviewsIcon}
          style={this.state.iconStyle}
          onClick={() => {
            this.props.openReviews();
          }}
        />
        <img
          src={OpenIcon}
          style={this.state.iconStyle}
          onClick={this.openCreator.bind(this)}
        />
      </div>
    );
    //edit subject, open panels, open reviews, delete
  }
}

export default CardSubject;
