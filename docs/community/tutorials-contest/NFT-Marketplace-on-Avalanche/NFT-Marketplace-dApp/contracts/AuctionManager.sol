pragma solidity ^0.7.0;

import "./Auction.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract AuctionManager {
    uint _auctionIdCounter; // auction Id counter
    mapping(uint => Auction) public auctions; // auctions
    
    // create an auction
    function createAuction(uint _endTime, uint _minIncrement, uint _directBuyPrice,uint _startPrice,address _nftAddress,uint _tokenId) external returns (bool){
        require(_directBuyPrice > 0); // direct buy price must be greater than 0
        require(_startPrice < _directBuyPrice); // start price is smaller than direct buy price
        require(_endTime > 5 minutes); // end time must be greater than 5 minutes (setting it to 5 minutes for testing you can set it to 1 days or anything you would like)

        uint auctionId = _auctionIdCounter; // get the current value of the counter
        _auctionIdCounter++; // increment the counter
        Auction auction = new Auction(msg.sender, _endTime, _minIncrement, _directBuyPrice, _startPrice, _nftAddress, _tokenId); // create the auction
        IERC721 _nftToken = IERC721(_nftAddress); // get the nft token
        _nftToken.transferFrom(msg.sender, address(auction), _tokenId); // transfer the token to the auction
        auctions[auctionId] = auction; // add the auction to the map
        return true;
    }

    // Return a list of all auctions
    function getAuctions() external view returns(address[] memory _auctions) {
        _auctions = new address[](_auctionIdCounter); // create an array of size equal to the current value of the counter
        for(uint i = 0; i < _auctionIdCounter; i++) { // for each auction
            _auctions[i] = address(auctions[i]); // add the address of the auction to the array
        }
        return _auctions; // return the array
    }

    // Return the information of each auction address
    function getAuctionInfo(address[] calldata _auctionsList)
        external
        view
        returns (
            uint256[] memory directBuy,
            address[] memory owner,
            uint256[] memory highestBid,
            uint256[] memory tokenIds,
            uint256[] memory endTime,
            uint256[] memory startPrice,
            uint256[] memory auctionState
        )
    {
        directBuy = new uint256[](_auctionsList.length); // create an array of size equal to the length of the passed array
        owner = new address[](_auctionsList.length); // create an array of size equal to the length of the passed array
        highestBid = new uint256[](_auctionsList.length);
        tokenIds = new uint256[](_auctionsList.length);
        endTime = new uint256[](_auctionsList.length);
        startPrice = new uint256[](_auctionsList.length);
        auctionState = new uint256[](_auctionsList.length);


        for (uint256 i = 0; i < _auctionsList.length; i++) { // for each auction
            directBuy[i] = Auction(auctions[i]).directBuyPrice(); // get the direct buy price
            owner[i] = Auction(auctions[i]).creator(); // get the owner of the auction
            highestBid[i] = Auction(auctions[i]).maxBid(); // get the highest bid
            tokenIds[i] = Auction(auctions[i]).tokenId(); // get the token id
            endTime[i] = Auction(auctions[i]).endTime(); // get the end time
            startPrice[i] = Auction(auctions[i]).startPrice(); // get the start price
            auctionState[i] = uint(Auction(auctions[i]).getAuctionState()); // get the auction state
        }
        
        return ( // return the arrays
            directBuy,
            owner,
            highestBid,
            tokenIds,
            endTime,
            startPrice,
            auctionState
        );
    }

}