// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

contract AuctionManager {
  uint public uId = 0;
  uint public aId = 0;

  // Structure to store user information
  struct User {
    uint userId;
    string name;
    address publicAddress;
  }

  // Structure to store bid information
  struct Bid {
    uint userId;
    uint bidPrice;
  }

  // Structure to store auction information
  struct Auction {
    uint auctionId;
    uint userId;
    string name;
    string description;
    uint msp;
    uint auctionBidId;
  }

  // Structure to store real time analytics of each auction
  struct AuctionAnalytics {
    uint auctionId;
    uint auctionBidId;
    uint latestBid;
    uint lowestBid;
    uint highestBid;
  }

  // List of all auctions
  Auction[] public auctions;

  // Mapping for storing user info, bids and auction analytics
  mapping (uint => User) public users;
  mapping (uint => Bid[]) public bids;
  mapping (uint => AuctionAnalytics) public auctionAnalytics;

  // Public function to check the registration of users (public address)
  function isRegistered(address _publicAddress) public view returns (uint256[2] memory) {
    uint256[2] memory result = [uint256(0), uint256(0)];
    for(uint i = 0; i < uId; i++) {
      if(_publicAddress == users[i].publicAddress) {
        result[0] = 1;
        result[1] = i;
        return result;
      }
    }
    return result;
  }

  // Creating new users
  function createUser(string memory _name) public {
    require((isRegistered(msg.sender))[0] == 0, "User already registered!");
    users[uId] = User(uId, _name, msg.sender);
    uId++;
  }

  // Creating new auctions
  function createAuction(string memory _name, string memory _description, uint _msp) public {
    require((isRegistered(msg.sender))[0] == 1, "User not registered!");
    uint MAX_UINT = 2 ** 256 - 1;
    auctions.push(Auction(aId, isRegistered(msg.sender)[1], _name, _description, _msp, 0));
    auctionAnalytics[aId] = AuctionAnalytics(aId, 0, 0, MAX_UINT, 0);
    aId++;
  }

  // Private function to update auction analytics after the new bids
  function updateAucionAnalytics(uint _aId, uint _latestBid) private {
    auctionAnalytics[_aId].latestBid = _latestBid;
    auctionAnalytics[_aId].auctionBidId = auctions[_aId].auctionBidId;
    if(_latestBid < auctionAnalytics[_aId].lowestBid) {
      auctionAnalytics[_aId].lowestBid = _latestBid;
    }
    if(_latestBid > auctionAnalytics[_aId].highestBid) {
      auctionAnalytics[_aId].highestBid = _latestBid;
    }
  }

  // Creating new bids
  function createBid(uint _aId, uint _bidPrice) public {
    require((isRegistered(msg.sender))[0] == 1, "User not registered!");
    bids[_aId].push(Bid((isRegistered(msg.sender))[1], _bidPrice));
    auctions[_aId].auctionBidId++;
    updateAucionAnalytics(_aId, _bidPrice);
  }

  // Return list of all auctions
  function showAuctions() public view returns (Auction[] memory) {
    return auctions;
  }
}