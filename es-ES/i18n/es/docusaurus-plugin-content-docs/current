import { JSONRPCClient } from 'json-rpc-2.0';
import fetch from 'node-fetch';
import conf from 'nconf';
const config = conf.file({ file: 'config.json' });
const client = new JSONRPCClient((jsonRPCRequest, chain) => fetch(`${ config.get('avax_server') }:${ config.get('avax_port') }/ext/${ chain }`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(jsonRPCRequest)
}).then(response => {
    if (response.status === 200) {
        return response.json().then(jsonRPCResponse => {
            client.receive(jsonRPCResponse);
        });
    } else if (jsonRPCRequest.id !== undefined) {
        return Promise.reject(new Error(response.statusText));
    }
}));
const api = () => {
    return {
        post: (method, params, chain) => {
            console.log(`Request for chain ${ chain }`);
            switch (chain) {
            case 'P':
                return client.request(method, params, 'P');
            case 'C':
                return client.request(method, params, 'bc/C/rpc');
            case 'X':
                return client.request(method, params, 'bc/X');
            default:
                return Promise.reject(new Error('Unknown chain link'));
            }
        }
    };
};
module.exports = api();