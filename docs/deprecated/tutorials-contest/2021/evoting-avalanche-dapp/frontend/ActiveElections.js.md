# ActiveElections.js

``` jsx 
import React, { Component } from "react";
import { Loader } from "rimble-ui";
import { Link } from "react-router-dom";

import App from "./App";
import ElectionJSON from "./build/contracts/Election.json";
import VoteModal from "./VoteModal";

// Election component for organising election details
let Election = (props) => (
  <tr>
    <td>{props.election.electionId}</td>

    <td>
      {props.election.electionName} <br />
      <font className="text-muted" size="2">
        <b>{props.election.electionDescription}</b>
      </font>
      <br />
      <font className="text-muted" size="2">
        {props.election.electionAddress}
      </font>
    </td>

    <td style={{ textAlign: "center" }}>{props.candidateComponent}</td>

    <td style={{ textAlign: "center" }}>
      {!props.election.hasVoted ? (
        // Vote Modal would be mounted if the user has not voted
        <VoteModal election={props.election} candidates={props.candidates} />
      ) : (
        <font size="2" color="green">
          You have voted!
        </font>
      )}
    </td>
  </tr>
);

// Candidate component for organising candidate details of each candidate
let Candidates = (props) => (
  <font size="2">
    <b>{props.name}</b> ({props.voteCount}) <br />
  </font>
);

// ActiveElections component would fetch and display all the the elections deployed by the MainContract.sol
class ActiveElections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  // To store App.js instance
  app = null;

  // Connect application with Metamask and create smart-contract's instance
  async init() {
    this.app = new App();
    await this.app.init();
    await this.loadData();
  }

  loader = false;

  componentDidMount() {
    this.init();
  }

  loadData = async () => {
    this.setState({ loading: true });

    // electionId maps to total elections created
    let eCount = await this.app.mainInstance.electionId();
    let elections = [], electionDetails = [], electionComponents = [];

    // Election details of every election created by MainContract
    for (let i = 0; i < eCount; i++) {
      elections[i] = await this.app.mainInstance.Elections(i);
      let election = await new this.app.web3.eth.Contract(ElectionJSON.abi, elections[i]);

      electionDetails[i] = [];

      // Account address of the voter
      electionDetails[i].account = this.app.account[0];

      // Each contract's instance
      electionDetails[i].contractInstance = election;

      // Address of each election contract
      electionDetails[i].electionAddress = elections[i];

      // Boolean indicating whether the contract address has voted or not
      electionDetails[i].hasVoted = await election.methods.voters(this.app.account[0]).call();

      // Name of the election
      electionDetails[i].electionName = await election.methods.name().call();

      // Description of the election
      electionDetails[i].electionDescription = await election.methods.description().call();

      // Election id
      electionDetails[i].electionId = i;

      // Organising candidates into components
      let candidatesCount = await election.methods.candidatesCount().call();
      let candidates = [], candidateComponents = [];
      candidates[i] = [];
      candidateComponents[i] = [];

      for (let j = 0; j < candidatesCount; j++) {
        candidates[i].push(await election.methods.candidates(j).call());
        candidateComponents[i].push(
          <Candidates
            name={candidates[i][j][1]}
            voteCount={candidates[i][j][2]}
          />
        );
      }

      // Saving the electionDetails in the form of a component
      electionComponents[i] = (
        <Election
          election={electionDetails[i]}
          candidates={candidates[i]}
          candidateComponent={candidateComponents[i]}
        />
      );
    }

    this.setState({
      data: electionComponents,
      loading: false,
    });
  };

  render() {
    return (
      // Simple container to store table with election data
      <div className="container">
        <div style={{ float: "right", marginBottom: "10px" }}>
          <img
            style={{ width: "25px", marginRight: "20px", cursor: "pointer" }}
            onClick={this.loadData}
            src="https://img.icons8.com/color/50/000000/synchronize.png"
          />
          <Link to="/createElection">
            <img
              style={{ width: "25px", cursor: "pointer" }}
              src="https://img.icons8.com/color/48/000000/plus-math.png"
            />
          </Link>
        </div>

        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th style={{ width: "120px" }}>Election ID</th>
              <th>Election Name</th>
              <th style={{ textAlign: "center" }}>Candiates</th>
              <th style={{ textAlign: "center" }}>Vote</th>
            </tr>
          </thead>

          <tbody>{this.state.data}</tbody>
        </table>

        <center>{this.state.loading ? <Loader size="40px" /> : <></>}</center>
      </div>
    );
  }
}

export default ActiveElections;
```
