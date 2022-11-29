import React, { Component } from "react";
import Review from "../components/Review";
import ReviewCreator from "../components/ReviewCreator";

class ReviewList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div style={{ width: "100%", textAlign: "center", paddingTop:"8px" }}>
        <strong>{this.props.subjectReview.subject}</strong>
        {this.props.reviews.map((review, i) => {
          return <Review key={"review" + i} review={review} />;
        })}
        <ReviewCreator
          createReview={(review, rating) => {
            this.props.createReview(review, rating);
          }}
        />
      </div>
    );
  }
}

export default ReviewList;
