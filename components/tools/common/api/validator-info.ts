import { Validator, SubnetInfo, L1ValidatorManagerDetails } from './types';

export async function fetchSubnetId(rpcUrl: string, validationID: string): Promise<string> {
    try {
        const platformEndpoint = rpcUrl.replace(/\/ext\/bc\/[^/]+\/rpc/, '/ext/bc/P');
        const response = await fetch(platformEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "platform.getL1Validator",
                params: {
                    validationID: validationID
                },
                id: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data?.result?.subnetID || '';
    } catch (error) {
        console.error('Error fetching subnetID:', error);
        throw error;
    }
}

export async function fetchValidators(rpcUrl: string): Promise<Validator[]> {
    try {
        const rpcUrlValidators = rpcUrl.replace('/rpc', '/validators');
        const response = await fetch(rpcUrlValidators, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                method: "validators.getCurrentValidators",
                params: {
                    nodeIDs: []
                },
                id: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        if (!data?.result?.validators) {
            return [];
        }

        return data.result.validators.map((validator: any) => ({
            id: validator.validationID || validator.nodeID,
            nodeID: validator.nodeID,
            blsPublicKey: validator.blsPublicKey || '',
            blsProofOfPossession: validator.blsProofOfPossession || '',
            pChainAddress: validator.pChainAddress || '',
            weight: validator.weight.toString(),
            uptime: `${validator.uptimePercentage || '0'}%`,
            validationID: validator.validationID,
            startTimestamp: validator.startTimestamp,
            isActive: validator.isActive,
            isL1Validator: validator.isL1Validator,
            isConnected: validator.isConnected,
            uptimeSeconds: validator.uptimeSeconds,
            uptimePercentage: validator.uptimePercentage
        }));
    } catch (error) {
        console.error('Error fetching validators:', error);
        throw error;
    }
}

export async function checkEndpoint(url: string) {
    try {
        console.log('Checking endpoint:', url);
        
        // Different request body based on endpoint type
        let requestBody;
        if (url.includes('/ext/bc/P')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "platform.getHeight",
                params: {},
                id: 1
            };
        } else if (url.includes('/ext/info')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "info.getNetworkName",
                params: {},
                id: 1
            };
        } else if (url.includes('/validators')) {
            requestBody = {
                jsonrpc: "2.0",
                method: "validators.getCurrentValidators",
                params: {
                    nodeIDs: []
                },
                id: 1
            };
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status, 'for', url);
        const data = await response.json();
        
        if (data.error) {
            console.error('API Error:', data.error);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking endpoint:', url, error);
        return false;
    }
}

export async function fetchSubnetInfo(networkID: string, subnetID: string): Promise<SubnetInfo> {
    try {
        const response = await fetch(
            `https://glacier-api.avax.network/v1/networks/${networkID}/subnets/${subnetID}`,
            {
                method: 'GET',
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return {
            isL1: data.isL1 || false,
            l1ValidatorManagerDetails: data.l1ValidatorManagerDetails,
        };
    } catch (error) {
        console.error('Error fetching subnet info:', error);
        throw error;
    }
}

export function getEndpoints(rpcUrl: string) {
    const url = new URL(rpcUrl);
    const baseUrl = url.origin + url.pathname.split('/ext/bc/')[0];
    const queryParams = url.search;
    
    console.log('Base URL:', baseUrl);
    
    return {
        platform: `${baseUrl}/ext/bc/P${queryParams}`,
        info: `${baseUrl}/ext/info${queryParams}`,
        validators: rpcUrl.replace('/rpc', '/validators')
    };
}


