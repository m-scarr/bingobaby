import React, { Component } from "react";
import AddNativePanel from "../components/AddNativePanel";
import NativePanel from "../components/NativePanel";
import EditIcon from "../assets/edit.png";
import NoImageIcon from "../assets/noimage.png";

class CardSubjectCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjectPicStyle: {
        height: "96px",
        width: "96px",
        objectFit: "cover",
        borderRadius: "48px",
        marginTop: "8px"
      },
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  updateSubjectPic() {
    let url = prompt(
      "Please enter the URL of the picture you want to represent this subject!",
      ""
    );
    if (url != null && url !== "") {
      this.props.updateSubjectPic(this.props.cardSubject.id, url);
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent:"center" }}>
          <strong style={{ marginTop: "38px", marginRight:"32px" }}>
            {this.props.cardSubject.subject}
          </strong>
          <br />
          <img
            src={
              this.props.cardSubject.subjectPic === ""
                ? NoImageIcon
                : this.props.cardSubject.subjectPic
            }
            style={this.state.subjectPicStyle}
          />
          <img
            src={EditIcon}
            style={{ marginTop: "38px", height: "32px", width: "32px" }}
            onClick={this.updateSubjectPic.bind(this)}
          />
        </div>
        {this.props.nativePanelList.map((panel) => {
          return (
            <NativePanel
              key={"native-panel-" + panel.id}
              panel={panel}
              updateNativePanel={(newPanel) => {
                this.props.updateNativePanel(panel.id, newPanel);
              }}
            />
          );
        })}
        <AddNativePanel
          createNativePanel={(panel) => {
            this.props.createNativePanel(panel);
          }}
        />
      </div>
    );
  }
}

export default CardSubjectCreator;
