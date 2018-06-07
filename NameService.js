class NameService {
  constructor() {
    LocalContractStorage.defineProperties(this, {
      addressCount: null,
    });
    LocalContractStorage.defineMapProperties(this, {
      namesMapById: null,
      namesMapByAddress: null,
    });
  }

  init() {
    this.addressCount = new BigNumber(0);
  }

  registerName(walletInfo) {
    this.addressCount = new BigNumber(this.addressCount).plus(1);
    const transactionFrom = Blockchain.transaction.from;
    const parsedWalletInfo = JSON.parse(walletInfo);

    this.namesMapById.set(this.addressCount, parsedWalletInfo);
    this.namesMapByAddress.set(transactionFrom, Object.assign({}, parsedWalletInfo, { address: transactionFrom }));

    return true;
  }

  getAddressName(walletAddress) {
    return this.namesMapByAddress.get(walletAddress);
  }
  _getAddressNameById(id) {
    return this.namesMapById.get(id);
  }
}

module.exports = NameService;
