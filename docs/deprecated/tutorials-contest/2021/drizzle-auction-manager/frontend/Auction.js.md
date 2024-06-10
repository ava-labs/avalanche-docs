# Auction.js

``` jsx
import React, { useState, useEffect } from "react";
import { useDrizzleContext } from './drizzleContext';
import FetchAuctions from './AuctionList';
import CreateAuction from './CreateAuction';

function Auction() {
    // Importing drizzle variables from drizzle context
    const { drizzleVariables } = useDrizzleContext();
    const { AuctionManager, subscriber, accounts } = drizzleVariables;

    // Setting up cache keys corresponding to cache calls
    const [cacheKeys, setCacheKey] = useState({
        uId: null,
        aId: null,
        showAuctions: null,
        isRegistered: null,
        auctionAnalytics: [null]
    });
    const [auctionAnalyticsCacheKey, setAuctionAnalyticsCacheKey] = useState(null);

    // Setting up cache calls for required functions
    const cacheCalls = {
        isRegistered: subscriber?.isRegistered[cacheKeys?.isRegistered]?.value,
        user: subscriber?.users[cacheKeys?.uId]?.value,
        aId: subscriber?.aId[cacheKeys?.aId]?.value,
        showAuctions: subscriber?.showAuctions[cacheKeys?.showAuctions]?.value,
        auctionAnalytics: []
    }

    for(let i = 0; i < cacheCalls.aId; i++) {
        cacheCalls.auctionAnalytics.push(subscriber?.auctionAnalytics[auctionAnalyticsCacheKey[i]]?.value)
    }

    const [isRegistered, setIsRegistered] = useState(false);
    const [userInfo, setUserInfo] = useState({
        id: null,
        name: null
    });

    // Initializing cache keys
    useEffect(() => {
        const _auctionCacheKey = AuctionManager?.showAuctions?.cacheCall()
        const _aIdCacheKey = AuctionManager?.aId?.cacheCall()
        const _isRegistered = AuctionManager?.isRegistered?.cacheCall(accounts[0])
        setCacheKey({
            ...cacheKeys,
            showAuctions: _auctionCacheKey,
            aId: _aIdCacheKey,
            isRegistered: _isRegistered
        })
    }, []);

    useEffect(() => {
        let _auctionAnalyticsCacheKey = [];
        for(let i = 0; i < cacheCalls.aId; i++) {
            _auctionAnalyticsCacheKey.push(AuctionManager?.auctionAnalytics?.cacheCall(i))
        }
        setAuctionAnalyticsCacheKey(_auctionAnalyticsCacheKey)
    }, [cacheCalls.aId])

    useEffect(() => {
        if(cacheCalls.isRegistered !== undefined && cacheCalls.isRegistered[0] == 1) {
            setIsRegistered(true);
            (async () => {
                const userInfo = await AuctionManager.users(cacheCalls.isRegistered[1]).call()
                setUserInfo({
                    id: userInfo.userId,
                    name: userInfo.name
                })
            })();
        } else {
            setIsRegistered(false)
        }
    }, [cacheCalls.isRegistered]);

    const createUser = async (name) => {
        await AuctionManager?.createUser(name)?.send({from: accounts[0]})
    }

    const [userName, setUserName] = useState("");

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const submitLogin = event => {
        event.preventDefault()
        createUser(userName)
    }

    const UserInfo = () => {
        return (
            <div>
                <label style={{color: "red"}}>ID: </label> {userInfo.id}
                <label style={{marginLeft: "50px", color: "green"}}>Name: </label> {userInfo.name} <br/><br/>
            </div>
        )
    }

    return (
        <div>
            <h1>Auctions</h1>
            {
                isRegistered
                ? 
                <>
                    <UserInfo/>
                    <FetchAuctions cacheCalls={cacheCalls} userInfo={userInfo}/> <br/><br/>
                    <CreateAuction/>
                </>
                : 
                <form onSubmit={submitLogin}>
                    <font color="red" font="2">This address is not yet registered!</font><br/><br/>
                    <label>Address: </label><input disabled value={accounts[0]}/><br/><br/>
                    <label>Name: </label><input key="1" value={userName} required onChange={handleUserNameChange} placeholder="Enter your name"/><br/><br/>
                    <input type="submit" value="Register" />
                </form>              
            }
        </div>
    )
}

export default Auction;
```
