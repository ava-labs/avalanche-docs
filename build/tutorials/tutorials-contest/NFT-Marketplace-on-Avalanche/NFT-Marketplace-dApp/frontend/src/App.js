import React from "react";
import { ethers } from "ethers";

import AuctionArtifact from "./artifacts/Auction.json";
import AuctionManagerArtifact from "./artifacts/AuctionManager.json";
import NFTArtifact from "./artifacts/NFT.json";

const NFT_ADDRESS = "0xeb2283672cf716fF6A1d880436D3a9074Ba94375"; // NFT contract address
const AUCTIONMANAGER_ADDRESS = "0xea4b168866E439Db4A5183Dbcb4951DCb5437f1E"; // AuctionManager contract address
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeAuction: null,
      auctions: [], // Auctions to display
      bidAmount: 0, // The amount of AVAX to bid
      newAuction: {
        // newAuction is a state variable for the form
        startPrice: null,
        endTime: null,
        tokenId: null,
        minIncrement: null,
        directBuyPrice: null,
      },
      myItems: [], // Items owned by the user
    };

    this.mint = this.mint.bind(this);

    this.renderAuctionElement = this.renderAuctionElement.bind(this);
  }

  async getItems() {
    let items = await this._nft.myItems(); // Get the tokens owned by the user
    items = items.map((x) => x.toNumber()); // Converts BigNumber to number
    this.setState({ myItems: items });
  }

  async init() {
    if (window.ethereum) {
      // if window.ethereum is defined
      await window.ethereum.enable(); // Enable the Ethereum client
      this.provider = new ethers.providers.Web3Provider(window.ethereum); // A connection to the Ethereum network
      this.signer = this.provider.getSigner(); // Holds your private key and can sign things
      this.setState({ currentAddress: await this.signer.getAddress() }); // Set the current address
      this._auctionManager = new ethers.Contract( // We will use this to interact with the AuctionManager
        AUCTIONMANAGER_ADDRESS,
        AuctionManagerArtifact.abi,
        this.signer
      );

      this._nft = new ethers.Contract(
        NFT_ADDRESS,
        NFTArtifact.abi,
        this.signer
      ); // We will use this to interact with the NFT
      this.getItems();
      this.getAuctions();
    } else {
      alert("No wallet detected"); // No wallet detected
    }
  }
  componentDidMount() {
    this.init();
  }

  async getAuctions() {
    let auctionsAddresses = await this._auctionManager.getAuctions(); // get a list of auction addresses
    let auctions = await this._auctionManager.getAuctionInfo(auctionsAddresses); // I'll just pass all the addresses here, you can build a pagination system if you want
    console.log(auctions);
    let new_auctions = [];

    for (let i = 0; i < auctions.endTime.length; i++) {
      let endTime = auctions.endTime[i].toNumber();
      let tokenId = auctions.tokenIds[i].toNumber();
      let auctionState = auctions.auctionState[i].toNumber();

      let startPrice = ethers.utils.formatEther(auctions.startPrice[i]);
      let directBuyPrice = ethers.utils.formatEther(auctions.directBuy[i]);
      let highestBid = ethers.utils.formatEther(auctions.highestBid[i]);

      let owner = auctions.owner[i];

      let newAuction = {
        endTime: endTime,
        startPrice: startPrice,
        owner: owner,
        directBuyPrice: directBuyPrice,
        tokenId: tokenId,
        highestBid: highestBid,
        auctionState: auctionState,
        auctionAddress: auctionsAddresses[i],
      };
      new_auctions.push(newAuction);
    }

    this.setState({ auctions: new_auctions }); // Update the state
  }

  async createAuction() {
    if (
      !this.state.newAuction.minIncrement ||
      !this.state.newAuction.directBuyPrice ||
      !this.state.newAuction.startPrice ||
      !this.state.newAuction.endTime ||
      !this.state.newAuction.tokenId
    )
      return alert("Fill all the fields");

    let { hash: allowance_hash } = await this._nft.approve(
      AUCTIONMANAGER_ADDRESS,
      this.state.newAuction.tokenId
    ); // Approve the AUCTIONMANAGER to transfer the token
    console.log("Approve Transaction sent! Hash:", allowance_hash);
    await this.provider.waitForTransaction(allowance_hash); // Wait till the transaction is mined
    console.log("Transaction mined!");

    let { hash } = await this._auctionManager.createAuction(
      // Create an auction
      this.state.newAuction.endTime * 60, // Converting minutes to seconds
      ethers.utils.parseEther(this.state.newAuction.minIncrement.toString()), // Minimum increment in AVAX
      ethers.utils.parseEther(this.state.newAuction.directBuyPrice.toString()), // Direct buy price in AVAX
      ethers.utils.parseEther(this.state.newAuction.startPrice.toString()), // Start price in AVAX
      NFT_ADDRESS, // The address of the NFT token
      this.state.newAuction.tokenId // The id of the token
    );
    console.log("Transaction sent! Hash:", hash);
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    console.log("Transaction mined!");
    alert(`Transaction Mined! Hash: ${hash}`);
  }

  async mint() {
    // hash is the hash of the transaction
    let { hash } = await this._nft.getItem({
      // Calling the getItem function of the contract
      value: ethers.utils.parseEther("0.5"), // 0.5 AVAX
    });
    console.log("Transaction sent! Hash:", hash);
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    console.log("Transaction mined!");
    alert(`Transaction sent! Hash: ${hash}`);
  }

  renderAuctionElement(auction) {
    let state = "";
    if (auction.auctionState === 0) {
      state = "Open";
    }
    if (auction.auctionState === 1) {
      state = "Cancelled";
    }
    if (auction.auctionState === 2) {
      state = "Ended";
    }
    if (auction.auctionState === 3) {
      state = "Direct Buy";
    }
    return (
      <div style={{ background: "yellow" }} class="col">
        <p>ID: {auction.tokenId}</p> {/* ID of the token */}
        <p>Highest Bid: {auction.highestBid || 0}</p>
        {/* Highest bid */}
        <p>Direct Buy: {auction.directBuyPrice}</p> {/* Direct buy price */}
        <p>Starting Price: {auction.startPrice}</p> {/* Starting price */}
        <p>Owner: {auction.owner}</p> {/* Owner of the token */}
        <p>
          {/* Convert timestamp to minutes */}
          End Time:{" "}
          {Math.round((auction.endTime * 1000 - Date.now()) / 1000 / 60)}{" "}
          {/* Time left in minutes */}
          minutes
        </p>
        <p>Auction State: {state}</p>
        <button
          class="btn-primary"
          onClick={() => this.setActiveAuction(auction)}
        >
          See More
        </button>
      </div>
    );
  }

  async placeBid(amount) {
    if (!amount) return;
    amount = ethers.utils.parseEther(amount.toString()); // Amount in AVAX
    let { hash } = await this._auction.placeBid({ value: amount }); // Place a bid
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    alert(`Transaction sent! Hash: ${hash}`); // Show the transaction hash
    this.setActiveAuction(this.state.activeAuction); // Update the active auction
  }

  async cancelAuction() {
    let { hash } = await this._auction.cancelAuction(); // Cancel the auction
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    alert(`Auction Canceled! Hash: ${hash}`); // Show the transaction hash
    window.location.reload(); // Reload the page
  }

  async withdrawFunds() {
    let { hash } = await this._auction.withdrawFunds(); // Withdraw the funds
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    alert(`Withdrawal Successful! Hash: ${hash}`); // Show the transaction hash
    window.location.reload(); // Reload the page
  }

  async withdrawToken() {
    let { hash } = await this._auction.withdrawToken(); // Withdraw the NFT token
    await this.provider.waitForTransaction(hash); // Wait till the transaction is mined
    alert(`Withdrawal Successful! Hash: ${hash}`); // Show the transaction hash
    window.location.reload(); // Reload the page
  }

  async setActiveAuction(auction) {
    this._auction = new ethers.Contract( // Create a new instance of the contract
      auction.auctionAddress,
      AuctionArtifact.abi,
      this.signer
    );

    let previousBids = await this._auction.allBids(); // Get the bids
    let bids = []; // A list of bids
    for (let i = 0; i < previousBids[0].length; i++) {
      // Loop through the bids
      bids.push({
        // Add the bid to the list
        bidder: previousBids[0][i], // The bidder
        bid: ethers.utils.formatEther(previousBids[1][i]), // The bid
      });
    }

    auction.bids = bids; // Add the bids array to the auction object

    let auctionTokenValue = await this._nft.itemValue(auction.tokenId); // Get the value of the token
    auctionTokenValue = auctionTokenValue.toNumber(); // Convert BigNumber to number
    auction.auctionTokenValue = auctionTokenValue; // Add the value of the token to the auction object

    let highestBidder = await this._auction.maxBidder(); // Get the highest bidder
    auction.highestBidder = highestBidder; // Add the highest bidder to the auction object

    let minIncrement = await this._auction.minIncrement(); // Get the minimum increment
    auction.minIncrement = ethers.utils.formatEther(minIncrement); // Add the minimum increment to the auction object

    this.setState({ activeAuction: auction }); // Update the state
  }

  renderActiveAuction() {
    let activeAuction = this.state.activeAuction;
    let state = "";
    if (activeAuction.auctionState === 0) {
      // If the auction is open
      state = "Open";
    }
    if (activeAuction.auctionState === 1) {
      // If the auction is cancelled
      state = "Cancelled";
    }
    if (activeAuction.auctionState === 2) {
      // If the auction is ended
      state = "Ended";
    }
    if (activeAuction.auctionState === 3) {
      // If the auction is ended by a direct buy
      state = "Direct Buy";
    }
    let isOwner =
      this.state.currentAddress.toString().toLowerCase() ===
      activeAuction.owner.toString().toLowerCase(); // Check if the current address is the owner
    let isAuctionOpen = state === "Open"; // Check if the auction is open
    let isAuctionCancelled = state === "Cancelled"; // Check if the auction is cancelled
    let isAuctionEnded = state === "Ended" || state === "Direct Buy"; // Check if the auction is ended
    let isHighestBidder =
      this.state.currentAddress === activeAuction.highestBidder; // Check if the current address is the highest bidder

    return (
      <div>
        <div class="col">
          <button
            class="btn-secondary"
            onClick={() => this.setState({ activeAuction: null })}
          >
            Go Back
          </button>
          <p>ID: {activeAuction.tokenId}</p> {/* ID of the token */}
          <p>Highest Bid: {activeAuction.highestBid || 0} AVAX</p>
          {/* Highest bid */}
          <p>Direct Buy: {activeAuction.directBuyPrice} AVAX</p>{" "}
          {/* Direct buy price */}
          <p>Minimum Increment: {activeAuction.minIncrement} AVAX</p>{" "}
          {/* Minimum increment in AVAX */}
          <p>Starting Price: {activeAuction.startPrice} AVAX</p>{" "}
          {/* Starting price */}
          <p>Owner: {activeAuction.owner}</p> {/* Owner of the token */}
          <p>
            End Time:{" "}
            {Math.round(
              (activeAuction.endTime * 1000 - Date.now()) / 1000 / 60
            )}{" "}
            {/* Time left in minutes */}
            minutes
          </p>
          <p>Auction State: {state}</p>
          <p>Token Value: {activeAuction.auctionTokenValue}</p>
        </div>
        <div class="col">
          <h3>Bids</h3>
          <table class="table">
            <thead>
              <tr>
                <th>Bidder</th>
                <th>Bid</th>
              </tr>
            </thead>
            <tbody>
              {activeAuction.bids.map((bid) => {
                return (
                  <tr key={bid.bidder}>
                    <td>{bid.bidder}</td>
                    <td>{bid.bid} AVAX</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="col">
          {isAuctionOpen && !isOwner ? (
            <div>
              <input
                type="number"
                placeholder="0.5"
                onChange={(e) => this.setState({ bidAmount: e.target.value })}
              />
              <button
                class="btn-primary btn"
                onClick={() => this.placeBid(this.state.bidAmount)}
              >
                Place Pid
              </button>
            </div>
          ) : null}
          {isOwner && isAuctionOpen && activeAuction.bids.length == 0 ? (
            <button onClick={() => this.cancelAuction()} class="btn-danger btn">
              Cancel Auction
            </button>
          ) : null}

          {isOwner && isAuctionEnded && activeAuction.bids.length > 0 ? (
            <button
              onClick={() => this.withdrawFunds()}
              class="btn-secondary btn"
            >
              Withdraw Funds
            </button>
          ) : null}
          {((activeAuction.bids.length == 0 && isOwner) || isHighestBidder) &&
          isAuctionEnded ? (
            <button
              onClick={() => this.withdrawToken()}
              class="btn-secondary btn"
            >
              Withdraw Token
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div class="jumbotron d-flex align-items-center">
          <div class="container">
            {this.state.activeAuction != null ? (
              this.renderActiveAuction()
            ) : (
              <div class="auctions row">
                {this.state.auctions.map(this.renderAuctionElement)}
              </div>
            )}
          </div>
        </div>
        <div class="container">
          <form>
            <div class="mb-3">
              <label for="startprice" class="form-label">
                Start Price
              </label>
              <input
                value={this.state.newAuction.startPrice}
                onChange={(e) =>
                  this.setState({
                    newAuction: {
                      ...this.state.newAuction,
                      startPrice: e.target.value,
                    },
                  })
                }
                type="number"
                class="form-control"
                id="startprice"
              />
              <label for="startprice" class="form-label">
                Token Id
              </label>
              <input
                value={this.state.newAuction.tokenId}
                onChange={(e) =>
                  this.setState({
                    newAuction: {
                      ...this.state.newAuction,
                      tokenId: e.target.value,
                    },
                  })
                }
                type="number"
                class="form-control"
                id="startprice"
              />
              <label class="form-label">Minimum Increment</label>
              <input
                value={this.state.newAuction.minIncrement}
                onChange={(e) =>
                  this.setState({
                    newAuction: {
                      ...this.state.newAuction,
                      minIncrement: e.target.value,
                    },
                  })
                }
                type="number"
                class="form-control"
              />
              <label class="form-label">Direct Buy Price</label>
              <input
                value={this.state.newAuction.directBuyPrice}
                onChange={(e) =>
                  this.setState({
                    newAuction: {
                      ...this.state.newAuction,
                      directBuyPrice: e.target.value,
                    },
                  })
                }
                type="number"
                class="form-control"
              />

              <label class="form-label">Duration In Minutes</label>
              <input
                value={this.state.newAuction.endTime}
                onChange={(e) =>
                  this.setState({
                    newAuction: {
                      ...this.state.newAuction,
                      endTime: e.target.value,
                    },
                  })
                }
                type="number"
                class="form-control"
              />
            </div>

            <button
              type="button"
              onClick={() => this.createAuction()}
              class="btn btn-primary"
            >
              Create Auction
            </button>
            <button
              type="button"
              onClick={() => this.mint()}
              class="btn btn-danger"
            >
              Mint NFT
            </button>
            <p>
              Your items
              <br />
              {(this.state.myItems || [""]).map((x) => `id: ${x} `) || ""}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
