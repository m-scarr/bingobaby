import React, { Component } from "react";
import NavigationBar from "./components/NavigationBar";
import LogInModal from "./components/LogInModal";
import UserProfile from "./views/UserProfile";
import CardSubjectList from "./views/CardSubjectList";
import CardSubjectCreator from "./views/CardSubjectCreator";
import RegisterModal from "./components/RegisterModal";
import CardList from "./views/CardList";
import CardView from "./views/CardView";
import CardSubjectSearch from "./views/CardSubjectSearch";
import ReviewList from "./views/ReviewList";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleStyle: {
        width: "calc(100% - 10px)",
        textAlign: "center",
        padding: "4px",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <div style={{ maxWidth: "800px", minWidth: "60%" }}>
          {Object.keys(this.props.user).length === 0 &&
          this.props.modalView === "login" ? (
            <LogInModal
              setUser={(user) => {
                this.props.setUser(user);
              }}
              setModalView={(view) => {
                this.props.setModalView(view);
              }}
            />
          ) : null}
          {Object.keys(this.props.user).length === 0 &&
          this.props.modalView === "register" ? (
            <RegisterModal
              setUser={(user) => {
                this.props.setUser(user);
              }}
              setModalView={(view) => {
                this.props.setModalView(view);
              }}
            />
          ) : null}
          <div>
            <div style={this.state.titleStyle}>Bingo Baby!</div>
            <NavigationBar
              setView={(view) => {
                this.props.setView(view);
              }}
            />
            <div>
              {this.props.view === "reviews" ? (
                <ReviewList
                  reviews={this.props.reviewList}
                  createReview={(review, rating) => {
                    this.props.createReview(review, rating);
                  }}
                  subjectReview={this.props.subjectReview}
                />
              ) : null}
              {this.props.view === "profile" ? (
                <UserProfile
                  analysis={this.props.analysis}
                  getUserAnalysis={this.props.getUserAnalysis}
                  user={this.props.user}
                  updateUsername={(username) => {
                    this.props.updateUsername(username);
                  }}
                  updateProfilePic={(url) => {
                    this.props.updateProfilePic(url);
                  }}
                />
              ) : null}
              {this.props.view === "cardlist" ? (
                <CardList
                  cardList={this.props.cardList}
                  setView={(view) => {
                    this.props.setView(view);
                  }}
                  setCard={(id, cb) => {
                    this.props.setCard(id, cb);
                  }}
                />
              ) : null}
              {this.props.view === "card" ? (
                <CardView
                  card={this.props.card}
                  updatePanel={(cardId, nativePanelId, ticked) => {
                    this.props.updatePanel(cardId, nativePanelId, ticked);
                  }}
                  deleteCard={(id) => {
                    this.props.deleteCard(id);
                  }}
                />
              ) : null}
              {this.props.view === "cardsubjects" ? (
                <CardSubjectList
                  createCardSubject={(subject) => {
                    this.props.createCardSubject(subject);
                  }}
                  cardSubjectList={this.props.cardSubjectList}
                  setView={(view) => {
                    this.props.setView(view);
                  }}
                  setCardSubject={(subject) => {
                    this.props.setCardSubject(subject);
                  }}
                  updateCardSubject={(id, subject) => {
                    this.props.updateCardSubject(id, subject);
                  }}
                  createCard={(id) => {
                    this.props.createCard(id);
                  }}
                  deleteCardSubject={(id) => {
                    this.props.deleteCardSubject(id);
                  }}
                  openReviews={(subject) => {
                    this.props.openReviews(subject);
                  }}
                />
              ) : null}
              {this.props.view === "search" ? (
                <CardSubjectSearch
                  search={(search) => {
                    this.props.search(search);
                  }}
                  createCard={(id) => {
                    this.props.createCard(id);
                  }}
                  cardSubjectSearch={this.props.cardSubjectSearch}
                  openReviews={(subject) => {
                    this.props.openReviews(subject);
                  }}
                />
              ) : null}
              {this.props.view === "subjectcreator" ? (
                <CardSubjectCreator
                  setView={(view) => {
                    this.props.setView(view);
                  }}
                  createNativePanel={(panel) => {
                    this.props.createNativePanel(panel);
                  }}
                  cardSubject={this.props.cardSubject}
                  nativePanelList={this.props.nativePanelList}
                  updateNativePanel={(id, panel) => {
                    this.props.updateNativePanel(id, panel);
                  }}
                  updateSubjectPic={(id, url) => {
                    this.props.updateSubjectPic(id, url);
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
