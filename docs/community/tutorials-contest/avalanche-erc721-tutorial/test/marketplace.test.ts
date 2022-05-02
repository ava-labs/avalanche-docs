const Marketplace = artifacts.require('./Marketplace')
const { toBN } = web3.utils
import { expectRevert, BN } from '@openzeppelin/test-helpers'
import { convertTokensToWei } from '../utils/tokens'

contract('Marketplace', ([contractDeployer, creator, buyer, secondBuyer]) => {
    let marketplace

    before(async () => {
        marketplace = await Marketplace.new({ from: contractDeployer })
        await marketplace.createCollectible('metadata', 20, { from: creator })
    })

    describe('marketplace deployment', async () => {
        it('Deploys the Marketplace SC successfully.', async () => {
            console.log('Address is ', marketplace.address)
            assert.notEqual(marketplace.address, '', 'Should not be empty')
            assert.notEqual(marketplace.address, 0x0, 'Should not be the 0x0 address')
            assert.notEqual(marketplace.address, null, 'Should not be null')
            assert.notEqual(marketplace.address, undefined, 'Should not be undefined')
        })
    })

    describe('List a NFT.', async () => {
        it('The token id 0 has not been listed.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 has not been listed yet.')
        })

        it('The NFT with token id 1 cannot be listed by anyone who doesn\'t own it.', async () => {
            await expectRevert(marketplace.listItem(1, convertTokensToWei('5'), { from: contractDeployer }), 'Only the owner of the token id can call this function.')
            await expectRevert(marketplace.listItem(1, convertTokensToWei('5'), { from: buyer }), 'Only the owner of the token id can call this function.')
        })

        it('Transfer the NFT to the Marketplace SC.', async () => {
            const result = await marketplace.listItem(1, convertTokensToWei('5'), { from: creator })
            assert.equal(result.logs.length, 3, 'Should trigger three events.')

            //event Approval
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.')
            assert.equal(result.logs[0].args.owner, creator, 'Should be the creator address.')
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.')
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.')

            //event Transfer
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.')
            assert.equal(result.logs[1].args.from, creator, 'Should be the creator address.')
            assert.equal(result.logs[1].args.to, marketplace.address, 'Should log the recipient which is the marketplace.')
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.')

            //event ItemListed
            assert.equal(result.logs[2].event, 'ItemListed', 'Should be the \'ItemListed\' event.')
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.')
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.')
            assert.equal(result.logs[2].args.seller, creator, 'Should log the creator as the seller.')
        })

        it('The listing has the correct data.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], convertTokensToWei('5'), 'The price is 5 AVAX.')
            assert.equal(listing['1'], creator, 'The one who listed it is the creator.')
        })

        it('The Marketplace SC is now the owner of the NFT and not the seller.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, marketplace.address, 'The owner should be the marketplace.')
            assert.notEqual(ownerOfNFT, creator, 'The owner should not be the creator.')
        })

        //Actually this can be skipped, as the owner is technically the smart contract at this point
        it('The NFT with token id 1 cannot be listed again.', async () => {
            await expectRevert.unspecified(marketplace.listItem(1, convertTokensToWei('5'), { from: creator }))
        })

        it('The token id 1 can be claimed back by the creator if not sold.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, creator, 'The NFT with token id 1 can be claimed by the creator if not sold.')
        })

        it('The token id 1 has been listed.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, true, 'The NFT with token id 1 has been listed.')
        })

    })

    describe('Cancel the listing.', async () => {
        it('The listing cannot be cancelled by an address that does not have the right to claim it.', async () => {
            await expectRevert(marketplace.cancelListing(1, { from: contractDeployer }), 'Only the address that has listed the token can cancel the listing.')
            await expectRevert(marketplace.cancelListing(1, { from: buyer }), 'Only the address that has listed the token can cancel the listing.')
        })

        it('Transfer the NFT back to the owner.', async () => {
            const result = await marketplace.cancelListing(1, { from: creator })
            assert.equal(result.logs.length, 3, 'Should trigger three events.')

            //event Approval
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.')
            assert.equal(result.logs[0].args.owner, marketplace.address, 'Should be the marketplace address.')
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.')
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.')

            //event Transfer
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.')
            assert.equal(result.logs[1].args.from, marketplace.address, 'Should be the marketplace address.')
            assert.equal(result.logs[1].args.to, creator, 'Should log the recipient that is the creator.')
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.')

            //event ListingCancelled
            assert.equal(result.logs[2].event, 'ListingCancelled', 'Should be the \'ListingCancelled\' event.')
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.')
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.')
            assert.equal(result.logs[2].args.seller, creator, 'Should log the creator as the one who cancels the listing.')
        })

        it('The seller is now the owner of the NFT and not the Marketplace SC.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, creator, 'The owner should be the creator.')
            assert.notEqual(ownerOfNFT, marketplace.address, 'The owner should not be the marketplace.')
        })

        it('The claimableByAccount mapping should be cleared.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, 0x0, 'The NFT with token id 1 cannot be claimed by anyone after its no longer listed.')
        })

        it('The listing should not exist anymore.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], 0, 'The price is reset to 0.')
            assert.equal(listing['1'], 0x0, 'The address(0) should be the one which owns the listing.')
        })

        it('The token id 1 is not listed anymore.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 is not listed anymore.')
        })

    })

    describe('Buy a NFT.', async () => {
        //Make sure to list the item again
        before(async () => {
            await marketplace.listItem(1, convertTokensToWei('5'), { from: creator })
        })

        it('You cannot buy an item that is not listed or does not exist.', async () => {
            await expectRevert(marketplace.buyItem(2, { from: buyer }), 'The token needs to be listed in order to be bought.')
        })

        it('You need to pay the correct price of 5 AVAX.', async () => {
            await expectRevert(marketplace.buyItem(1, { from: buyer, value: convertTokensToWei('4') }), 'You need to pay the correct price.')
        })

        //Define the balances to check later whether they've increased or decreased by the correct amount
        let balanceOfCreatorBeforePurchase

        it('Buy the NFT.', async () => {
            balanceOfCreatorBeforePurchase = await web3.eth.getBalance(creator)
            const result = await marketplace.buyItem(1, { from: buyer, value: convertTokensToWei('5') })
            assert.equal(result.logs.length, 3, 'Should trigger three events.')

            //event Approval
            assert.equal(result.logs[0].event, 'Approval', 'Should be the \'Approval\' event.')
            assert.equal(result.logs[0].args.owner, marketplace.address, 'Should be the marketplace address.')
            assert.equal(result.logs[0].args.approved, 0x0, 'Should log the address(0) to approve in order to clear previous approvals.')
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.')

            //event Transfer
            assert.equal(result.logs[1].event, 'Transfer', 'Should be the \'Transfer\' event.')
            assert.equal(result.logs[1].args.from, marketplace.address, 'Should be the marketplace address.')
            assert.equal(result.logs[1].args.to, buyer, 'Should log the recipient that is the buyer.')
            assert.equal(result.logs[1].args.tokenId, 1, 'Should log the token id which is 1.')

            //event ItemBought
            assert.equal(result.logs[2].event, 'ItemBought', 'Should be the \'ItemBought\' event.')
            assert.equal(result.logs[2].args.tokenId, 1, 'Should be the token id 1.')
            assert.equal(result.logs[2].args.price, convertTokensToWei('5'), 'Should log the price which is 5 AVAX.')
            assert.equal(result.logs[2].args.buyer, buyer, 'Should log the buyer address as the buyer.')
        })

        it('The buyer is now the owner of the NFT and not the Marketplace SC.', async () => {
            const ownerOfNFT = await marketplace.ownerOf(1)
            assert.equal(ownerOfNFT, buyer, 'The owner should be the buyer.')
            assert.notEqual(ownerOfNFT, marketplace.address, 'The owner should not be the marketplace.')
        })

        it('The claimableByAccount mapping should be cleared.', async () => {
            const claimableBySeller = await marketplace.claimableByAccount(1)
            assert.equal(claimableBySeller, 0x0, 'The NFT with token id 1 cannot be claimed by anyone after its no longer listed.')
        })

        it('The listing should not exist anymore.', async () => {
            const listing = await marketplace.getListing(1)
            assert.equal(listing['0'], 0, 'The price is reset to 0.')
            assert.equal(listing['1'], 0x0, 'The address(0) should be the one which owns the listing.')
        })

        it('The token id 1 is not listed anymore.', async () => {
            const hasBeenListed = await marketplace.hasBeenListed(1)
            assert.equal(hasBeenListed, false, 'The NFT with token id 1 should not be listed anymore.')
        })

        it('The item has the correct data.', async () => {
            const item = await marketplace.getItem(1)
            assert.notEqual(item['0'], creator, 'The owner should not be the creator.')
            assert.equal(item['0'], buyer, 'The buyer is the owner now.')
            assert.equal(item['1'], creator, 'The creator remains the creator address.')
            assert.equal(item['2'], 20, 'The royalty is set to 20.')
        })

        it('The balances of creator and first buyer are correct.', async () => {
            const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
            assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('5'))), 'The balance of the creator should be increased by 5 AVAX after the purchase.')
        })

        it('The balances of creator, first buyer who is now the seller and second buyer are correct.', async () => {
            //List the item again, only this time by the new owner
            await marketplace.listItem(1, convertTokensToWei('10'), { from: buyer })
            const balanceOfBuyerBeforePurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorBeforePurchase = await web3.eth.getBalance(creator)
            const balanceOfSecondBuyerBeforePurchase = await web3.eth.getBalance(secondBuyer)
            await marketplace.buyItem(1, { from: secondBuyer, value: convertTokensToWei('10') })
            const balanceOfSecondBuyerAfterPurchase = await web3.eth.getBalance(secondBuyer)
            const isCorrectSecondBuyerBalanceDifference = toBN(balanceOfSecondBuyerAfterPurchase).add(toBN(convertTokensToWei('10'))).lt(toBN(balanceOfSecondBuyerBeforePurchase))
            assert.equal(isCorrectSecondBuyerBalanceDifference, true, 'The balance of the second buyer should decrease by 10 AVAX plus gas paid.')
            const balanceOfBuyerAfterPurchase = await web3.eth.getBalance(buyer)
            const balanceOfCreatorAfterPurchase = await web3.eth.getBalance(creator)
            assert.equal(balanceOfBuyerAfterPurchase, toBN(balanceOfBuyerBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('80')).div(new BN('100'))), 'The balance of the seller should increase by 80% of the sold amount.')
            assert.equal(balanceOfCreatorAfterPurchase, toBN(balanceOfCreatorBeforePurchase).add(toBN(convertTokensToWei('10')).mul(new BN('20')).div(new BN('100'))), 'The balance of the creator should increase by 20% of the sold amount.')
        })
    })
})