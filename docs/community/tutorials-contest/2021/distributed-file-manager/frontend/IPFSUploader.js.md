# IPFSUploader.js

```js
import React from "react";
import Compressor from "compressorjs";
import { Loader } from "rimble-ui";

const { create } = require("ipfs-http-client");
const ipfs = create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

class IPFSUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      fileName: null,
      fileType: null,
      cid: null,
      account: this.props.state.account,
      loading: false,
      loadingReason: "",
    };
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    let type = file.type.split("/");

    if (type[0] === "image") {
      new Compressor(file, {
        quality: 0.2,
        success: (compressedResult) => {
          const reader = new window.FileReader();
          reader.readAsArrayBuffer(compressedResult);
          reader.onloadend = () => {
            this.setState({
              buffer: Buffer(reader.result),
              fileName: file.name,
              fileType: file.type,
            });
          };
        },
      });
    } else {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.setState({
          buffer: Buffer(reader.result),
          fileName: file.name,
          fileType: file.type,
        });
      };
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, loadingReason: "Uploading to IPFS" });
    const { cid } = await ipfs.add(this.state.buffer);
    this.setState({ cid: cid.string, loadingReason: "Waiting for approval" });

    try {
      await this.props.state.contract.addFile(
        [this.state.fileName, this.state.fileType],
        this.state.cid,
        { from: this.props.state.account, gas: 20000000 }
      );
    } catch (e) {
      console.log("Transaction failed");
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <center style={{ margin: "50px auto" }}>
          <form onSubmit={this.onSubmit}>
            <input
              className="text-light bg-dark"
              type="file"
              onChange={this.captureFile}
            />
            <br />
            <br />

            {this.state.loading ? (
              <center>
                <Loader size="40px" color="white" />
                <br />
                <font size="2" color="white" style={{ marginTop: "-10px" }}>
                  {this.state.loadingReason}
                </font>
              </center>
            ) : (
              <input className="btn btn-dark" type="submit" />
            )}
          </form>
        </center>
      </div>
    );
  }
}

export default IPFSUploader;
```
