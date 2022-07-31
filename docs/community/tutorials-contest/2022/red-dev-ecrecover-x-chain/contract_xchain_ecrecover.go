// (c) 2019-2020, Ava Labs, Inc. All rights reserved.
// See the file LICENSE for licensing terms.

package precompile

import (
	"crypto/sha256"
	"math/big"

	"github.com/btcsuite/btcutil/bech32"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/log"
	"golang.org/x/crypto/ripemd160"
)

var (
	_ StatefulPrecompileConfig = &ContractXChainECRecoverConfig{}
	// Singleton StatefulPrecompiledContract for XChain ECRecover.
	ContractXChainECRecoverPrecompile StatefulPrecompiledContract = createXChainECRecoverPrecompile(ContractXchainECRecoverAddress)

	xChainECRecoverReadSignature = CalculateFunctionSelector("getXChainECRecover(bytes32,uint8,bytes32,bytes32)")
)

// ContractXChainECRecoverConfig uses it to implement the StatefulPrecompileConfig
type ContractXChainECRecoverConfig struct {
	BlockTimestamp *big.Int `json:"blockTimestamp"`
}

// Address returns the address of the XChain ECRecover contract.
func (c *ContractXChainECRecoverConfig) Address() common.Address {
	return ContractXchainECRecoverAddress
}

// Contract returns the singleton stateful precompiled contract to be used for the XChain ECRecover.
func (c *ContractXChainECRecoverConfig) Contract() StatefulPrecompiledContract {
	return ContractXChainECRecoverPrecompile
}

// Configure configures [state] with the desired admins based on [c].
func (c *ContractXChainECRecoverConfig) Configure(state StateDB) {

}

func (c *ContractXChainECRecoverConfig) Timestamp() *big.Int { return c.BlockTimestamp }

func allZero(b []byte) bool {
	for _, byte := range b {
		if byte != 0 {
			return false
		}
	}
	return true
}

// getXChainECRecover returns an execution function that reads the input and return the input from the given [precompileAddr].
// The execution function parses the input into a string and returns the string
func getXChainECRecover(precompileAddr common.Address) RunStatefulPrecompileFunc {
	log.Info("Reached 2 1")
	return func(evm PrecompileAccessibleState, callerAddr common.Address, addr common.Address, input []byte, suppliedGas uint64, readOnly bool) (ret []byte, remainingGas uint64, err error) {
		if remainingGas, err = deductGas(suppliedGas, XChainECRecoverCost); err != nil {
			return nil, 0, err
		}
		const ecRecoverInputLength = 128

		input = common.RightPadBytes(input, ecRecoverInputLength)

		// "input" is (hash, v, r, s), each 32 bytes
		// but for ecrecover we want (r, s, v)

		r := new(big.Int).SetBytes(input[64:96])
		s := new(big.Int).SetBytes(input[96:128])
		v := input[63]

		// tighter sig s values input homestead only apply to tx sigs
		if !allZero(input[32:63]) || !crypto.ValidateSignatureValues(v, r, s, false) {
			return nil, remainingGas, nil
		}

		// We must make sure not to modify the 'input', so placing the 'v' along with
		// the signature needs to be done on a new allocation

		sig := make([]byte, 65)
		copy(sig, input[64:128])
		sig[64] = v

		// v needs to be at the end for libsecp256k1
		pubk, err := crypto.SigToPub(input[:32], sig)
		publicKey := crypto.CompressPubkey(pubk)

		// make sure the public key is a valid one
		if err != nil {
			return nil, remainingGas, nil
		}

		sha := sha256.Sum256(publicKey)
		ripemd := ripemd160.New()
		ripemd.Write(sha[:])
		ripe := ripemd.Sum(nil)

		conv, err := bech32.ConvertBits(ripe, 8, 5, true)
		if err != nil {
			log.Info("Error:", err)
		}
		encoded, err := bech32.Encode("fuji", conv)
		xchain := "X-" + encoded
		log.Info(xchain)

		if err != nil {
			log.Info("Error:", err)
		}

		// To return the x-chain address as a string to Solidity,
		// the variable must first be padded as follows or it will throw an error.

		xChainLength := len(xchain)
		out := []byte(string(xchain))
		zeroArray := [64]byte{}
		out = append(zeroArray[:], out...)
		out[31] = 32 //32 is the padding
		out[63] = byte(xChainLength)
		out = common.RightPadBytes(out, ecRecoverInputLength)

		return out, remainingGas, nil
	}
}

// createXChainECRecoverPrecompile returns a StatefulPrecompiledContract with R/W control of an allow list at [precompileAddr] and a native coin minter.
func createXChainECRecoverPrecompile(precompileAddr common.Address) StatefulPrecompiledContract {
	log.Info("Reached 1")
	funcGetXChainECRecover := newStatefulPrecompileFunction(xChainECRecoverReadSignature, getXChainECRecover(precompileAddr))

	// Construct the contract with no fallback function.
	contract := newStatefulPrecompileWithFunctionSelectors(nil, []*statefulPrecompileFunction{funcGetXChainECRecover})
	return contract
}
