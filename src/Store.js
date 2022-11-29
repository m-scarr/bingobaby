import React, { Component } from "react";
import App from "./App";
import axios from "axios";

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://localhost:3001/",
      user: {},
      view: "profile",
      modalView: "login",
      cardSubjectList: [],
      cardSubject: {},
      nativePanelList: [],
      cardSubjectSearch: [],
      cardList: [],
      card: {},
      reviewList: [],
      subjectReview: {},
      analysis: {
        numCardSubjects: "",
        numCards: "",
        numReviews: "",
        cardSubjectAvgRating: "",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      this.getUserAnalysis(this.state.user.username);
    }
  }

  componentWillUnmount() {}

  getUserAnalysis(username) {
    axios
      .get(this.state.url + "User/analyze?username=" + username)
      .then((res) => {
        var data = res.data[0];
        data.cardSubjectAvgRating = Number(data.cardSubjectAvgRating).toFixed(
          2
        );
        this.setState({ analysis: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  search(search) {
    axios
      .get(this.state.url + "CardSubject/search?subject=" + search)
      .then((res) => {
        this.setState({ cardSubjectSearch: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUsername(username) {
    axios
      .post(this.state.url + "User/updateusername", {
        id: this.state.user.id,
        username: username,
      })
      .then((res) => {
        if (res.data !== "") {
          var user = this.state.user;
          user.username = res.data[1][0].username;
          this.setState({ user });
        } else {
          alert("This username is already taken!");
          this.setState({ view: "" }, () => {
            //weird temporary fix, by updating the view variable it remounts the UserProfile component and corrects the username
            this.setState({ view: "profile" });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCardSubject(subject) {
    axios
      .post(this.state.url + "CardSubject/create", {
        creatorId: this.state.user.id,
        subject,
      })
      .then((res) => {
        var cardSubjectList = this.state.cardSubjectList;
        cardSubjectList[cardSubjectList.length] = res.data[1][0];
        this.setState({ cardSubjectList }, () => {
          console.log(this.state.cardSubjectList);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCards() {
    axios
      .get(this.state.url + "Card/list?userId=" + this.state.user.id)
      .then((res) => {
        this.setState({ cardList: [...res.data] }, () => {
          console.log(this.state.cardList);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCardSubjects() {
    axios
      .get(
        this.state.url +
          "CardSubject/readUserCardSubjects?creatorId=" +
          this.state.user.id
      )
      .then((res) => {
        this.setState({ cardSubjectList: res.data }, () => {
          console.log(this.state.cardSubjectList);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCardSubject(id, subject) {
    axios
      .post(this.state.url + "CardSubject", {
        userId: this.state.user.id,
        id,
        subject,
      })
      .then((res) => {
        var cardSubjectList = [...this.state.cardSubjectList];
        for (var i = 0; i < cardSubjectList.length; i++) {
          if (cardSubjectList[i].id === id) {
            cardSubjectList[i].subject = subject;
            break;
          }
        }
        this.setState({ cardSubjectList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCardSubject(id) {
    axios
      .delete(this.state.url + "CardSubject?id=" + id)
      .then((res) => {
        var cardSubjectList = [...this.state.cardSubjectList];
        for (var i = 0; i < cardSubjectList.length; i++) {
          if (cardSubjectList[i].id === id) {
            cardSubjectList.splice(i, 1);
            break;
          }
        }
        this.setState({ cardSubjectList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createNativePanel(panel) {
    axios
      .post(this.state.url + "NativePanel/create", {
        cardSubjectId: this.state.cardSubject.id,
        panel: panel,
      })
      .then((res) => {
        var nativePanelList = this.state.nativePanelList;
        nativePanelList[nativePanelList.length] = res.data[1][0];
        this.setState({ nativePanelList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getNativePanels() {
    axios
      .get(this.state.url + "CardSubject/read?id=" + this.state.cardSubject.id)
      .then((res) => {
        this.setState({ nativePanelList: res.data }, () => {
          console.log(this.state.nativePanelList);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateNativePanel(id, panel) {
    axios
      .post(this.state.url + "NativePanel", { id, panel })
      .then((res) => {
        var nativePanelList = [...this.state.nativePanelList];
        for (var i = 0; i < nativePanelList.length; i++) {
          if (nativePanelList[i].id === id) {
            nativePanelList[i].panel = panel;
            break;
          }
        }
        this.setState({ nativePanelList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createCard(id) {
    axios
      .post(this.state.url + "Card/create", {
        userId: this.state.user.id,
        cardSubjectId: id,
      })
      .then((res) => {
        console.log(res.data[30]);
        this.setState({
          card: {
            id: res.data[29][0]["@cardId"],
            subject: res.data[29][0].subject,
            panels: res.data[30],
          },
          view: "card",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setModalView(modalView) {
    this.setState({ modalView });
  }

  getCard(id, cb) {
    axios
      .get(this.state.url + "Card?id=" + id)
      .then((res) => {
        console.log(res.data[1]);
        this.setState(
          {
            card: {
              id: id,
              subject: res.data[0][0].subject,
              panels: res.data[1],
            },
          },
          cb
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updatePanel(cardId, nativePanelId, ticked) {
    axios
      .post(this.state.url + "Panel", {
        cardId,
        nativePanelId,
        ticked,
      })
      .then((res) => {
        var card = this.state.card;
        for (var i = 0; i < card.panels.length; i++) {
          if (
            card.panels[i].cardId === cardId &&
            card.panels[i].nativePanelId === nativePanelId
          ) {
            card.panels[i].ticked = ticked;
            break;
          }
        }
        this.setState({ card });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateSubjectPic(id, url) {
    axios
      .post(this.state.url + "CardSubject/pic", {
        id: id,
        userId: this.state.user.id,
        subjectPic: url,
      })
      .then((res) => {
        var cardSubjectList = [...this.state.cardSubjectList];
        for (var i = 0; i < cardSubjectList.length; i++) {
          if (cardSubjectList[i].id === id) {
            cardSubjectList[i].subjectPic = url;
            break;
          }
        }
        var cardSubject = { ...this.state.cardSubject };
        cardSubject.subjectPic = url;
        this.setState({ cardSubjectList, cardSubject });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfilePic(url) {
    axios
      .post(this.state.url + "User/pic", {
        id: this.state.user.id,
        profilePic: url,
      })
      .then((res) => {
        var user = { ...this.state.user };
        user.profilePic = url;
        this.setState({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(id) {
    this.setState({ view: "cardlist" }, () => {
      axios
        .delete(this.state.url + "Card?id=" + id)
        .then((res) => {
          var cardList = [...this.state.cardList];
          for (var i = 0; i < cardList.length; i++) {
            if (cardList[i].id === id) {
              cardList.splice(i, 1);
              break;
            }
          }
          this.setState({ cardList });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  openReviews(subject) {
    axios
      .get(this.state.url + "Review?id=" + subject.id)
      .then((res) => {
        console.log(res.data);
        this.setState({
          subjectReview: subject,
          reviewList: res.data,
          view: "reviews",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createReview(review, rating) {
    axios
      .post(this.state.url + "Review/create", {
        cardSubjectId: this.state.subjectReview.id,
        review,
        rating,
        reviewerId: this.state.user.id,
      })
      .then((res) => {
        console.log(res.data);
        var reviewList = [...this.state.reviewList];
        reviewList[reviewList.length] = {
          review,
          rating,
          username: this.state.user.username,
          profilePic: this.state.user.profilePic,
        };
        this.setState({ reviewList });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <App
          user={this.state.user}
          getUserAnalysis={this.getUserAnalysis.bind(this)}
          analysis={this.state.analysis}
          setUser={(user) => {
            this.setState({ user });
          }}
          view={this.state.view}
          setView={(view) => {
            if (view === "cardsubjects") {
              this.getCardSubjects();
            } else if (view === "cardlist") {
              this.getCards();
            }
            this.setState({ view });
          }}
          updateUsername={(username) => {
            this.updateUsername(username);
          }}
          createCardSubject={(subject) => {
            this.createCardSubject(subject);
          }}
          cardSubjectList={this.state.cardSubjectList}
          setCardSubject={(cardSubject) => {
            this.setState({ cardSubject }, this.getNativePanels);
          }}
          updateCardSubject={(id, subject) => {
            this.updateCardSubject(id, subject);
          }}
          deleteCardSubject={(id) => {
            this.deleteCardSubject(id);
          }}
          cardSubject={this.state.cardSubject}
          nativePanelList={this.state.nativePanelList}
          createNativePanel={(panel) => {
            this.createNativePanel(panel);
          }}
          updateNativePanel={(id, panel) => {
            this.updateNativePanel(id, panel);
          }}
          deleteNativePanel={(id) => {
            this.deleteNativePanel(id);
          }}
          createCard={(id) => {
            this.createCard(id);
          }}
          cardList={this.state.cardList}
          setCard={(id, cb) => {
            this.getCard(id, cb);
          }}
          card={this.state.card}
          setModalView={(view) => {
            this.setModalView(view);
          }}
          updatePanel={(cardId, nativePanelId, ticked) => {
            this.updatePanel(cardId, nativePanelId, ticked);
          }}
          modalView={this.state.modalView}
          search={(search) => {
            this.search(search);
          }}
          cardSubjectSearch={this.state.cardSubjectSearch}
          updateSubjectPic={(id, url) => {
            this.updateSubjectPic(id, url);
          }}
          updateProfilePic={(url) => {
            this.updateProfilePic(url);
          }}
          deleteCard={(id) => {
            this.deleteCard(id);
          }}
          openReviews={(subject) => {
            this.openReviews(subject);
          }}
          createReview={(review, rating) => {
            this.createReview(review, rating);
          }}
          reviewList={this.state.reviewList}
          subjectReview={this.state.subjectReview}
        />
      </div>
    );
  }
}

export default Store;
