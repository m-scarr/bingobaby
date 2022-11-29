import React, { Component } from "react";

class CardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellStyle: {
        width: "calc(20% - 2px)",
        height: "calc(20vh - 47px)",
        border: "1px solid black",
        textAlign: "center",
        overflowY: "auto",
        userSelect: "none",
      },
      deleteButtonStyle: {
        width: "calc(100% - 24px)",
        border: "1px solid black",
        margin: "8px",
        padding: "4px",
        borderRadius: "16px",
        textAlign: "center",
      },
      crossed: {
        background:
          "linear-gradient(to top left," +
          "rgba(0,0,0,0) 0%," +
          "rgba(0,0,0,0) calc(50% - 2px)," +
          "rgba(0,0,0,1) 50%," +
          "rgba(0,0,0,0) calc(50% + 2px)," +
          "rgba(0,0,0,0) 100%)," +
          "linear-gradient(to top right," +
          "rgba(0,0,0,0) 0%," +
          "rgba(0,0,0,0) calc(50% - 2px)," +
          "rgba(0,0,0,1) 50%," +
          "rgba(0,0,0,0) calc(50% + 2px)," +
          "rgba(0,0,0,0) 100%)",
      },
    };
  }

  componentDidMount() {
    console.log(this.props.card);
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={{ width: "calc(100% - 16px)", left:"8px", position:"fixed" }}>
        <div style={{ width: "100%", textAlign: "center" }}>
          {this.props.card.subject}
        </div>
        <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
          {this.props.card.panels.map((panel, i) => {
            return i < 12 ? (
              <div
                key={"panel" + panel.cardId + panel.nativePanelId}
                style={
                  panel.ticked
                    ? { ...this.state.cellStyle, ...this.state.crossed }
                    : { ...this.state.cellStyle }
                }
                onClick={() => {
                  this.props.updatePanel(
                    panel.cardId,
                    panel.nativePanelId,
                    !panel.ticked
                  );
                }}
              >
                {panel.panel}
              </div>
            ) : null;
          })}
          <div style={{ ...this.state.cellStyle, ...this.state.crossed }}>
            FREE
          </div>
          {this.props.card.panels.map((panel, i) => {
            return i >= 12 ? (
              <div
                key={"panel" + panel.cardId + panel.nativePanelId}
                style={
                  panel.ticked
                    ? { ...this.state.cellStyle, ...this.state.crossed }
                    : { ...this.state.cellStyle }
                }
                onClick={() => {
                  this.props.updatePanel(
                    panel.cardId,
                    panel.nativePanelId,
                    !panel.ticked
                  );
                }}
              >
                {panel.panel}
              </div>
            ) : null;
          })}
        </div>
        <div
          style={this.state.deleteButtonStyle}
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this card?")
            ) {
              this.props.deleteCard(this.props.card.id);
            }
          }}
        >
          Delete
        </div>
      </div>
    );
  }
}

export default CardView;
