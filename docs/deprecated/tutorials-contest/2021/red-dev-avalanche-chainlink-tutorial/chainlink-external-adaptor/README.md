# Chainlink External Adaptor

Adaptor for communicating smart contract with real world data

```zsh
cd chainlink-external-adaptor/
npm install
```

## Start / Stop Server

`npm run startServer` -  To start the server
`npm run stopServer` - To stop the server

Usage
*****

```zsh
curl -X POST -H "content-type:application/json" "http://localhost:8081/" --data '{ "id": 1, "data" :{"chain": "P", "method": "platform.getCurrentSupply","params": {} }}'
```
