const Collectible = artifacts.require('./Collectible')
import { expectRevert } from '@openzeppelin/test-helpers'

contract('Collectible', ([contractDeployer, creator, buyer]) => {
    let collectible

    before(async () => {
        collectible = await Collectible.new({ from: contractDeployer })
    })

    describe('Collectible deployment', async () => {
        it('Deploys the Collectible SC successfully.', async () => {
            console.log('Address is ', collectible.address)
            assert.notEqual(collectible.address, '', 'should not be empty')
            assert.notEqual(collectible.address, 0x0, 'should not be the 0x0 address')
            assert.notEqual(collectible.address, null, 'should not be null')
            assert.notEqual(collectible.address, undefined, 'should not be undefined')
        })

        it('The collectible SC should have a name and a symbol.', async () => {
            const name = await collectible.name()
            assert.equal(name, 'NFTCollectible', 'The name should be NFTCollectible.')
            const symbol = await collectible.symbol()
            assert.equal(symbol, 'NFTC', 'The symbol should be NFTC.')
        })
    })

    describe('Mint an NFT and set a royalty.', async () => {

        it('The hash \'metadata\' is not minted before the function call.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, false, 'The hash \'metadata\' has not been minted, so it should be false.')
        })

        it('The royalty needs to be a number between 0 and 40.', async () => {
            await expectRevert(collectible.createCollectible('metadata', 41), "Royalties must be between 0% and 40%.")
        })

        it('Give a new id to a newly created token', async () => {
            const newTokenId = await collectible.createCollectible.call('metadata', 20, { from: creator })
            assert.equal(parseInt(newTokenId.toString()), 1, 'The new token id should be 1.')
        })

        it('Mint a NFT and emit events.', async () => {
            const result = await collectible.createCollectible('metadata', 20, { from: creator })
            assert.equal(result.logs.length, 2, 'Should trigger two events.')
            //event Transfer
            assert.equal(result.logs[0].event, 'Transfer', 'Should be the \'Transfer\' event.')
            assert.equal(result.logs[0].args.from, 0x0, 'Should be the 0x0 address.')
            assert.equal(result.logs[0].args.to, creator, 'Should log the recipient which is the creator.')
            assert.equal(result.logs[0].args.tokenId, 1, 'Should log the token id which is 1.')

            //event ItemMinted
            assert.equal(result.logs[1].event, 'ItemMinted', 'Should be the \'ItemMinted\' event.')
            assert.equal(result.logs[1].args.tokenId, 1, 'Should be the token id 1.')
            assert.equal(result.logs[1].args.creator, creator, 'Should log the creator.')
            assert.equal(result.logs[1].args.metadata, 'metadata', 'Should log the metadata correctly.')
            assert.equal(result.logs[1].args.royalty, 20, 'Should log the royalty as 20.')
        })

        it('The items array has a length of 1.', async () => {
            const itemsLength = await collectible.getItemsLength()
            assert.equal(itemsLength, 1, 'The items array should have 1 entry in it.')
        })

        it('The new item has the correct data.', async () => {
            const item = await collectible.getItem(1)
            assert.notEqual(item['0'], buyer, 'The buyer should not be the creator.')
            assert.equal(item['0'], creator, 'The creator is the owner.')
            assert.equal(item['1'], creator, 'The creator is the creator.')
            assert.equal(item['2'], 20, 'The royalty is set to 20.')
        })

        it('Check if hash has been minted and that you cannot mint the same hash again.', async () => {
            const hasBeenMinted = await collectible.hasBeenMinted('metadata')
            assert.equal(hasBeenMinted, true, 'The hash \'metadata\' has been minted.')
            await expectRevert(collectible.createCollectible('metadata', 30, { from: creator }), 'This metadata has already been used to mint an NFT.')
        })

    })
})
