import React, { Component } from "react";

class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardStyle: {
        width: "calc(100% - 24px)",
        border: "1px solid black",
        margin: "8px",
        padding: "4px",
        borderRadius: "16px",
        textAlign: "center",
      },
      cardNumberList: [],
    };
  }

  componentDidMount() {
    this.getCardNumbers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cardList !== this.props.cardList) {
      this.getCardNumbers();
    }
  }

  getCardNumbers() {
    var cardNumberList = [];
    var count = {};
    for (var i = 0; i < this.props.cardList.length; i++) {
      if (this.props.cardList[i].subject in count) {
        count[this.props.cardList[i].subject] += 1;
      } else {
        count[this.props.cardList[i].subject] = 1;
      }
      cardNumberList[cardNumberList.length] =
        count[this.props.cardList[i].subject];
    }
    this.setState({ cardNumberList });
  }

  goToCard(id) {
    this.props.setCard(id, () => {
      this.props.setView("card");
    });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div>
        {this.props.cardList.map((card, i) => {
          return (
            <div
              style={this.state.cardStyle}
              key={"card_" + i}
              onClick={() => {
                this.goToCard(card.id);
              }}
            >
              {card.subject}{" "}
              {this.state.cardNumberList[i] > 1
                ? "(" + this.state.cardNumberList[i] + ")"
                : ""}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CardList;
