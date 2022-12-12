# App.js

```js
import React from 'react';
import {GetWeb3, GetContract, GetAccount} from './BlockchainUtil';
import IPFSUploader from './IPFSUploader';
import IPFSViewer from './IPFSViewer';

import contractJson from './build/contracts/FileManager.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      account: null,
      contract: null
    }
  }

  componentDidMount() {
    this.init();
  }

  async init() {
    //1. Load web3
    const Web3 = new GetWeb3();
    this.web3 = await Web3.getWeb3();
    this.setState({web3: this.web3});

    //2. Load Account
    const Account = new GetAccount();
    this.account = await Account.getAccount(this.web3);
    this.setState({account: this.account[0]});

    //3. Load Contract
    const Contract = new GetContract();
    this.contract = await Contract.getContract(this.web3, contractJson);
    this.setState({contract: this.contract});

    console.log("App contract: ", this.contract);
  }

  render() {
    return (
      <div>
        {/* 5. Navbar */}
        <nav className="navbar navbar-dark shadow" style={{backgroundColor: "#1b2021", height: "60px", color: "white"}}>
            <b>Distributed File Manager</b>
            <span style={{float: "right"}}>{this.state.account}</span>
        </nav>

        {/* 6. IPFS Viewer com  ponent */}
        <IPFSViewer state = {this.state} />

        {/* 7. IPFS Uploader component */}
        <IPFSUploader state = {this.state} />
      </div>
    )
  }
}

export default App;
```
