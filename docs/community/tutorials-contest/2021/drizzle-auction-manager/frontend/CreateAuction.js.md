# CreateAuction.js

```js
import React, { useState } from "react";
import { useDrizzleContext } from './drizzleContext';

function CreateAuction() {
    // Importing drizzle variables from drizzle context
    const { drizzleVariables } = useDrizzleContext();
    const { AuctionManager, accounts } = drizzleVariables;

    const createAuction = async ({title, description, msp}) => {
        await AuctionManager?.createAuction(title, description, msp)?.send({from: accounts[0]});
        setAuctionDetails({
            title: "",
            description: "",
            msp: ""
        })
    }

    const [auctionDetails, setAuctionDetails] = useState({
        title: "",
        description: "",
        msp: ""
    });

    const handleAuctionTitleChange = (event) => {
        setAuctionDetails({
            ...auctionDetails,
            title: event.target.value
        });
    }

    const handleAuctionDescriptionChange = (event) => {
        setAuctionDetails({
            ...auctionDetails,
            description: event.target.value
        });
    }

    const handleAuctionMspChange = (event) => {
        setAuctionDetails({
            ...auctionDetails,
            msp: event.target.value
        });
    }

    const submitNewAuction = (event) => {
        event.preventDefault();
        createAuction(auctionDetails);
    }

    return (
        <form onSubmit={submitNewAuction} style={{border: "1px black solid", maxWidth: "400px", padding: "10px"}}>
            <label>Title: </label><br/><input value={auctionDetails.title} onChange={handleAuctionTitleChange}/><br/><br/>
            <label>Description: </label><br/><textarea rows="4" value={auctionDetails.description} onChange={handleAuctionDescriptionChange}/><br/><br/>
            <label>MSP: </label><br/><input value={auctionDetails.msp} onChange={handleAuctionMspChange}/><br/><br/>
            <input type="submit" value="Create Auction" />
        </form>
    )
}

export default CreateAuction;
```
