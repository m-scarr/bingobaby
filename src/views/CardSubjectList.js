import React, { Component } from "react";
import CardSubject from "../components/CardSubject";
import AddCardSubject from "../components/AddCardSubject";

class CardSubjectList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        {this.props.cardSubjectList.map((subject) => {
          return (
            <CardSubject
              key={subject.id}
              subject={subject}
              setView={(view) => {
                this.props.setView(view);
              }}
              setCardSubject={(subject) => {
                this.props.setCardSubject(subject);
              }}
              updateCardSubject={(newSubject) => {
                this.props.updateCardSubject(subject.id, newSubject);
              }}
              deleteCardSubject={() => {
                this.props.deleteCardSubject(subject.id);
              }}
              createCard={() => {
                this.props.createCard(subject.id);
              }}
              openReviews={() => {
                this.props.openReviews(subject);
              }}
            />
          );
        })}
        <AddCardSubject
          createCardSubject={(subject) => {
            this.props.createCardSubject(subject);
          }}
        />
      </div>
    );
  }
}

export default CardSubjectList;
