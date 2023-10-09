# CreateElection.js

``` jsx
import React, { Component } from "react";
import App from "./App";

class CreateElection extends Component {
  constructor(props) {
    super(props);

    this.onChangeElectionName = this.onChangeElectionName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // These state variables would maintain inputs of the form
    this.state = {
      electionname: "",
      description: "",
      candidates: [],
    };
  }

  // To store App.js instance
  app = null;

  // Connect application with Metamask and create smart-contract's instance
  async init() {
    this.app = new App();
    await this.app.init();
  }

  componentDidMount() {
    this.init();
  }

  onChangeElectionName(e) {
    this.setState({
      electionname: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  // Function to be called when the form is submitted
  async onSubmit(e) {
    e.preventDefault();

    // Structuring Election details from the form before submitting transaction to the smart-contract
    const electionDetails = {
      electionname: this.state.electionname,
      description: this.state.description,
      candidateObjects: document.getElementsByName("candidate").values(),
      candidates: [],
    };

    let i = 0;

    for (let value of electionDetails.candidateObjects) {
      electionDetails.candidates[i] = value.value;
      i++;
    }

    // Making transaction to the MainContract instance, for creating a new election
    await this.app.mainInstance.createElection(
      [electionDetails.electionname, electionDetails.description],
      electionDetails.candidates,
      { from: this.app.account[0] }
    );

    window.location = "/active";
  }

  render() {
    return (
      <div className="container card">
        <h3>Create New Election</h3>

        {/* New Election Form */}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              required
              className="form-control"
              placeholder="Enter election name"
              onChange={this.onChangeElectionName}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              required
              className="form-control"
              placeholder="Describe your Election here"
              onChange={this.onChangeDescription}
            ></textarea>
          </div>

          <table>
            <tr>
              <td id="1" className="form-group">
                <label>Candidate 1</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Candidate Name"
                    name="candidate"
                  />
                </td>

                <br />
                <label>Candidate 2</label>
                <td>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Candidate Name"
                    name="candidate"
                  />
                </td>
              </td>
            </tr>
          </table>

          <br />

          <div>
            <button
              className="btn btn-success grid-item"
              style={{ width: 100 }}
              type="submit"
            >
              Submit
            </button>
          </div>

          <br />
        </form>
      </div>
    );
  }
}

export default CreateElection;
```
