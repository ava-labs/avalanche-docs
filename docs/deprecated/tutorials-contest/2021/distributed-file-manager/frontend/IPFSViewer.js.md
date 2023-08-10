# IPFSViewer.js

```js
import React from "react";
import App from "./App";
import IPFSViewerCSS from "./IPFSViewerCSS.css";

class IPFSViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFiles: [],
      videoFiles: [],
      applicationFiles: [],
      audioFiles: [],
      otherFiles: [],
    };
  }

  app = null;

  async componentDidMount() {
    this.app = new App();
    await this.app.init();
    await this.loadFiles();
  }

  loadFiles = async () => {
    const files = await this.app.contract.getFiles(this.app.account[0]);
    let imageFiles = [], videoFiles = [], audioFiles = [], applicationFiles = [], otherFiles = [];

    files.forEach((file) => {
      let type = file[2].split("/");
      if (type[0] === "image") {
        imageFiles.push(file);
      } else if (type[0] === "video") {
        videoFiles.push(file);
      } else if (type[0] === "audio") {
        audioFiles.push(file);
      } else if (type[0] === "application") {
        applicationFiles.push(file);
      } else {
        otherFiles.push(file);
      }
    });

    this.setState({
      imageFiles,
      videoFiles,
      audioFiles,
      applicationFiles,
      otherFiles,
    });
  };

  showImageFiles = () => {
    let fileComponent = [];

    this.state.imageFiles.forEach((file) => {
      let fileName;
      if (file[1].length < 12) {
        fileName = file[1];
      } else {
        fileName = file[1].substring(0, 6) + "..." + file[1].substring(file[1].length - 8, file[1].length);
      }

      fileComponent.push(
        <a href={`https://ipfs.infura.io/ipfs/${file[3]}`}>
          <img
            alt={fileName}
            src={`https://ipfs.infura.io/ipfs/${file[3]}`}
            style={{
              margin: "5px",
              width: "200px",
              height: "150px",
              border: "solid white 2px",
              borderRadius: "5px",
            }}
          />
          <center>{fileName}</center>
        </a>
      );
    });
    return fileComponent;
  };

  showVideoFiles = () => {
    let fileComponent = [];
    this.state.videoFiles.forEach((file) => {
      let fileName;
      if (file[1].length < 12) {
        fileName = file[1];
      } else {
        fileName = file[1].substring(0, 6) + "..." + file[1].substring(file[1].length - 8, file[1].length);
      }
      fileComponent.push(
        <div>
          <video
            src={`https://ipfs.infura.io/ipfs/${file[3]}#t=0.1`}
            controls
            style={{
              margin: "5px",
              width: "290px",
              height: "200px",
              border: "solid white 2px",
              borderRadius: "5px",
            }}
          />
          <center>{fileName}</center>
        </div>
      );
    });
    return fileComponent;
  };

  showAudioFiles = () => {
    let fileComponent = [];
    this.state.audioFiles.forEach((file) => {
      let fileName;
      if (file[1].length < 12) {
        fileName = file[1];
      } else {
        fileName = file[1].substring(0, 6) + "..." + file[1].substring(file[1].length - 8, file[1].length);
      }
      fileComponent.push(
        <div>
          <audio
            src={`https://ipfs.infura.io/ipfs/${file[3]}#t=0.1`}
            controls
            style={{ margin: "10px" }}
          />
          <center>{fileName}</center>
        </div>
      );
    });
    return fileComponent;
  };

  showApplicationFiles = () => {
    let fileComponent = [];
    this.state.applicationFiles.forEach((file) => {
      let fileName;
      if (file[1].length < 12) {
        fileName = file[1];
      } else {
        fileName = file[1].substring(0, 6) + "..." + file[1].substring(file[1].length - 8, file[1].length);
      }
      fileComponent.push(
        <div style={{ width: "120px" }}>
          <center
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.location.href = `https://ipfs.infura.io/ipfs/${file[3]}`;
            }}
          >
            <a href={`https://ipfs.infura.io/ipfs/${file[3]}`}>
              <img
                alt={fileName}
                src={
                  "https://img2.pngio.com/filetype-docs-icon-material-iconset-zhoolego-file-icon-png-256_256.png"
                }
                style={{ width: "50px", height: "50px" }}
              />
              <br />
              {fileName}
            </a>
          </center>
        </div>
      );
    });
    return fileComponent;
  };

  showOtherFiles = () => {
    let fileComponent = [];
    this.state.otherFiles.forEach((file) => {
      let fileName;
      if (file[1].length < 12) {
        fileName = file[1];
      } else {
        fileName =
          file[1].substring(0, 6) +
          "..." +
          file[1].substring(file[1].length - 8, file[1].length);
      }
      fileComponent.push(
        <div style={{ width: "120px" }}>
          <center style={{ cursor: "pointer" }}>
            <a href={`https://ipfs.infura.io/ipfs/${file[3]}`}>
              <img
                alt={fileName}
                src={
                  "https://images.vexels.com/media/users/3/152864/isolated/preview/2e095de08301a57890aad6898ad8ba4c-yellow-circle-question-mark-icon-by-vexels.png"
                }
                style={{ width: "50px", height: "50px" }}
              />
              <br />
              {fileName}
            </a>
          </center>
        </div>
      );
    });
    return fileComponent;
  };

  render() {
    let imageFiles = this.showImageFiles(), videoFiles = this.showVideoFiles(), audioFiles = this.showAudioFiles(), applicationFiles = this.showApplicationFiles(), otherFiles = this.showOtherFiles();

    return (
      <div style={{ margin: "20px" }}>
        <b style={{ color: "white" }}>Images</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "200px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {imageFiles.length === 0 ? "No files to show" : imageFiles}
        </div> <br /><br />

        <b style={{ color: "white" }}>Videos</b> <br /><br />
        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "250px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {videoFiles.length === 0 ? "No files to show" : videoFiles}
        </div> <br /><br />

        <b style={{ color: "white" }}>Audio</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "250px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {audioFiles.length === 0 ? "No files to show" : audioFiles}
        </div> <br /><br />

        <b style={{ color: "white" }}>Applications</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "150px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {applicationFiles.length === 0 ? "No files to show" : applicationFiles}
        </div> <br /><br />

        <b style={{ color: "white" }}>Others</b> <br /><br />

        <div
          className={"imageViewer"}
          style={{
            color: "white",
            height: "150px",
            display: "flex",
            overflowX: "scroll",
          }}
        >
          {otherFiles.length === 0 ? "No files to show" : otherFiles}
        </div>
      </div>
    );
  }
}

export default IPFSViewer;
```
