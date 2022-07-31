export const convertTokensToWei = n => {
  return web3.utils.toWei(n, 'ether');
};
module.exports = {
  convertTokensToWei
};