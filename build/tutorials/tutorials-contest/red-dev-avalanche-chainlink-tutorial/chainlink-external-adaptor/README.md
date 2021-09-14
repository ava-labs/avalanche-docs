# chainlink-external-adaptor

Adaptor for communicating smart contract with real world data

cd chainlink-external-adaptor/
npm install

# start / stop server

npm run startServer -  To start the server
npm run stopServer - TO stop the server

Usage
*****

curl -X POST -H "content-type:application/json" "http://localhost:8081/" --data '{ "id": 1, "data" :{"chain": "P", "method": "platform.getCurrentSupply","params": {} }}'
