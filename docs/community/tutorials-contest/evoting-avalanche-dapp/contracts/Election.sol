// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract Election {
  // Election details will be stored in these variables
  string public name;
  string public description;

  // Structure of candidate standing in the election
  struct Candidate {
    uint256 id;
    string name;
    uint256 voteCount;
  }

  // Storing candidates in a map
  mapping(uint256 => Candidate) public candidates;

  // Storing address of those voters who already voted
  mapping(address => bool) public voters;

  // Number of candidates in standing in the election
  uint256 public candidatesCount = 0;

  // Setting of variables and data, during the creation of election contract
  constructor(string[] memory _nda, string[] memory _candidates) public {
    require(_candidates.length > 0, "There should be atleast 1 candidate.");
    name = _nda[0];
    description = _nda[1];
    for (uint256 i = 0; i < _candidates.length; i++) {
      addCandidate(_candidates[i]);
    }
  }

  // Private function to add a candidate
  function addCandidate(string memory _name) private {
    candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    candidatesCount++;
  }

  // Public vote function for voting a candidate
  function vote(uint256 _candidate) public {
    require(!voters[msg.sender], "Voter has already Voted!");
    require(
      _candidate < candidatesCount && _candidate >= 0,
      "Invalid candidate to Vote!"
    );
    voters[msg.sender] = true;
    candidates[_candidate].voteCount++;
  }
}