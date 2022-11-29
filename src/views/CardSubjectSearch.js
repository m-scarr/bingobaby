import React, { Component } from "react";
import SearchIcon from "../assets/search.png";
import SearchCardSubject from "../components/SearchCardSubject";

class CardSubjectSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      searchBarStyle: {
        width: "calc(100% - 40px)",
        height: "28px",
        fontSize: "20px",
        marginTop: "8px",
        borderRadius: "16px",
        paddingLeft: "8px",
        paddingRight: "8px",
        textAlign: "center",
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleSearchChange(e) {
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", paddingBottom: "8px" }}>
          <input
            value={this.state.search}
            style={this.state.searchBarStyle}
            onChange={this.handleSearchChange.bind(this)}
          />
          <img
            src={SearchIcon}
            style={{ height: "32px", width: "32px", marginTop: "10px" }}
            onClick={() => {
              this.props.search(this.state.search);
            }}
          />
        </div>
        {this.props.cardSubjectSearch.map((subject) => {
          return (
            <SearchCardSubject
              key={"subjectsearch" + subject.id}
              subject={subject}
              createCard={() => {
                this.props.createCard(subject.id);
              }}
              openReviews={() => {
                this.props.openReviews(subject);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default CardSubjectSearch;
