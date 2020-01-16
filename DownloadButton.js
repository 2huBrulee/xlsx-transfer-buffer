"use strict";

const e = React.createElement;

class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  getXLSX() {
    fetch("http://localhost:7266")
      .then(res => {
        console.log(res);
        return res.arrayBuffer();
      })
      .then(ab => {
        const blob = new Blob([ab], { type: "application/octet-stream" });
        saveAs(blob, "111.xlsx");
      });
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e("button", { onClick: () => this.getXLSX() }, "Like");
  }
}

const domContainer = document.querySelector("#DownloadButton_container");
ReactDOM.render(e(DownloadButton), domContainer);
