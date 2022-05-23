// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol';

contract MyDAO {
    
    enum VotingOptions { Yes, No }
    enum Status { Accepted, Rejected, Pending }
    struct Proposal {
        uint256 id;
        address author;
        string name;
        uint256 createdAt;
        uint256 votesForYes;
        uint256 votesForNo;
        Status status;
    }

    // store all proposals
    mapping(uint => Proposal) public proposals;
    // who already votes for who and to avoid vote twice
    mapping(address => mapping(uint => bool)) public votes;
    // one share for governance tokens
    mapping(address => uint256) public shares;
    uint public totalShares;
    // the IERC20 allow us to use avax like our governance token.
    IERC20 public token;
    // the user need minimum 25 AVAX to create a proposal.
    uint constant CREATE_PROPOSAL_MIN_SHARE = 25 * 10 ** 18;
    uint constant VOTING_PERIOD = 7 days;
    uint public nextProposalId;
    
    constructor() {
        token = IERC20(0xA048B6a5c1be4b81d99C3Fd993c98783adC2eF70); //AVAX address
    }
    
    function deposit(uint _amount) external {
        shares[msg.sender] += _amount;
        totalShares += _amount;
        token.transferFrom(msg.sender, address(this), _amount);
    }
    
    function withdraw(uint _amount) external {
        require(shares[msg.sender] >= _amount, 'Not enough shares');
        shares[msg.sender] -= _amount;
        totalShares -= _amount;
        token.transfer(msg.sender, _amount);
    }
    
    function createProposal(string memory name) external {
        // validate the user has enough shares to create a proposal
        require(shares[msg.sender] >= CREATE_PROPOSAL_MIN_SHARE, 'Not enough shares to create a proposal');
        
        proposals[nextProposalId] = Proposal(
            nextProposalId,
            msg.sender,
            name,
            block.timestamp,
            0,
            0,
            Status.Pending
        );
        nextProposalId++;
    }
    
    function vote(uint _proposalId, VotingOptions _vote) external {
        Proposal storage proposal = proposals[_proposalId];
        require(votes[msg.sender][_proposalId] == false, 'already voted');
        require(block.timestamp <= proposal.createdAt + VOTING_PERIOD, 'Voting period is over');
        votes[msg.sender][_proposalId] = true;
        if(_vote == VotingOptions.Yes) {
            proposal.votesForYes += shares[msg.sender];
            if(proposal.votesForYes * 100 / totalShares > 50) {
                proposal.status = Status.Accepted;
            }
        } else {
            proposal.votesForNo += shares[msg.sender];
            if(proposal.votesForNo * 100 / totalShares > 50) {
                proposal.status = Status.Rejected;
            }
        }
    }
}
