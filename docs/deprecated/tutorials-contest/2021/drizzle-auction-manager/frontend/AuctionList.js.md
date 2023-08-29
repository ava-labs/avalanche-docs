# AuctionList.js

```js
import React, { useState } from "react";
import { useDrizzleContext } from './drizzleContext';

function FetchAuctions({cacheCalls, userInfo}) {
    const { drizzleVariables } = useDrizzleContext();
    const { AuctionManager, accounts } = drizzleVariables;

    const [bidPrices, setBidPrices] = useState(new Map([]))

    const createBid = async (id, bidPrice) => {
        await AuctionManager?.createBid(id, bidPrice).send({from: accounts[0]});
        clearBidPriceInput(id);
    }

    const submitNewBid = (event, id) => {
        event.preventDefault();
        createBid(id, bidPrices.get(id));
    }

    const handleBidPriceChange = (event, id) => {
        let _bidPrices = bidPrices;
        _bidPrices.set(id, event.target.value);
        setBidPrices(_bidPrices)
    }

    const clearBidPriceInput = (id) => {
        let _bidPrices = bidPrices;
        _bidPrices[id] = "";
        setBidPrices(_bidPrices)
    }

    const getAuctionAnalytics = () => {
        let auctionAnalytics = [];
        for(let i = 0; i < cacheCalls.aId; i++) {
            auctionAnalytics.push(cacheCalls.auctionAnalytics[i]);
        }
        return auctionAnalytics;
    }

    const allAuctions = cacheCalls.showAuctions;
    const auctionAnalytics = getAuctionAnalytics();
    return (
        <table border="1" style={{maxWidth: "800px", width: "90%"}}>
            <tr>
                <td>Auction ID</td>
                <td>Auction Details</td>
                <td>Minimum Price</td>
                <td>Bid</td>
            </tr>
            {
                allAuctions !== undefined && allAuctions.map((auction, index) => (
                    <tr>
                        <td>
                            {auction.auctionId}
                        </td>
                        <td>
                            <b>{auction.name} <font size="2" color="green">{auction.userId == userInfo.id && "(created by you)"}</font></b><br/>
                            <font size="2">{auction.description}</font><br/>
                            <tr>
                                <td>Total Bids</td>
                                <td>Latest Bid</td>
                                <td>Highest Bid</td>
                                <td>Lowest Bid</td>
                            </tr>
                            <tr>
                                <td>{auctionAnalytics[index]?.auctionBidId}</td>
                                <td>₹{auctionAnalytics[index]?.latestBid}</td>
                                <td>₹{auctionAnalytics[index]?.highestBid}</td>
                                <td>₹{auctionAnalytics[index]?.auctionBidId == 0 ? 0 : auctionAnalytics[index]?.lowestBid}</td>
                            </tr>
                        </td>
                        <td>
                            ₹{auction.msp}
                        </td>
                        <td>
                            <form onSubmit={(event) => submitNewBid(event, auction.auctionId)} style={{margin: "10px"}}>
                                <input required type="number" min={auction.msp} onChange={(event) => handleBidPriceChange(event, auction.auctionId)} placeholder="Enter your bid price"/><br/><br/>
                                <input type="submit" value="Make Bid"/><br/><br/>
                            </form>
                        </td>
                    </tr>
                ))
            }
        </table>
    )
}

export default FetchAuctions;
```
