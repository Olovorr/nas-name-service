class NameService {
  constructor() {
    LocalContractStorage.defineProperties(this, {
      addressCount: null,
    });
    LocalContractStorage.defineMapProperties(this, {
      addressInfoById: null,
      addressInfoByAddress: null,
    });
  }

  init() {
    this.addressCount = new BigNumber(0);
  }

  registerAddress(walletInfo) {
    const transactionFrom = Blockchain.transaction.from;
    const parsedWalletInfo = JSON.parse(walletInfo);
    // Practically only restriction in the entire SC - if present, displayName must be unique
    if (parsedWalletInfo.displayName && !this.checkIfUnique(parsedWalletInfo.displayName)) {
      throw new Error("Display name must be unique!");
    }
    // In case some data were already stored for this address
    const previousData = this.addressInfoByAddress.get(transactionFrom) || {}
    // If there is entry for previous data, update data for this id, don't create new entry
    if (previousData.id) {
      this.addressInfoById.set(
        previousData.id,
        Object.assign(
          {},
          parsedWalletInfo,
          previousData
        )
      );
    } else {
      this.addressCount = new BigNumber(this.addressCount).plus(1);
      this.addressInfoById.set(
        this.addressCount,
        Object.assign(
          {},
          parsedWalletInfo,
          { address: transactionFrom, id: this.addressCount }
        )
      );
    }

    this.addressInfoByAddress.set(
      transactionFrom,
      Object.assign(
        {},
        parsedWalletInfo,
        { address: transactionFrom, id: previousData.id || this.addressCount },
        previousData
      )
    );

    return true;
  }

  getAddressInfo(walletAddress) {
    return this.addressInfoByAddress.get(walletAddress);
  }

  // For autosuggesting purposes, returns all registered addresses
  getAllAddresses() {
    var addressInfoArray = []
    for(var i=0; i < this.addressCount; i++){
      const addressInfo = this.addressInfoById.get(i + 1);
      if (addressInfo) {
        addressInfoArray.push(addressInfo);
      }
    }
    return addressInfoArray;
  }

  // For backend filtering
  // filterProperty is string property of addressInfo object that
  // should be used for filtering - i.e. name, displayName, whatever...
  // searchTerm is string that is used for searching
  filterAddressesByProperty(filterProperty, searchTerm) {
    const searchTermRegexp = new RegExp(searchTerm.toLowerCase());
    var filteredAddresses = []
    for(var i=0; i < this.addressCount; i++){
      const addressInfo = this.addressInfoById.get(i + 1);
      const checkedString = addressInfo[filterProperty] && addressInfo[filterProperty].toLowerCase();

      if (checkedString && searchTermRegexp.test(checkedString)) {
        filteredAddresses.push(addressInfo);
      }
    }
    return filteredAddresses;
  }
  checkIfUnique(displayName) {
    for(var i=0; i < this.addressCount; i++){
      if (this.addressInfoById.get(i + 1).displayName == displayName) {
        return false;
      }
    }
    return true;
  }

  deleteAddress() {
    const walletAddress = Blockchain.transaction.from;
    const addressInfo = this.addressInfoByAddress.get(walletAddress);
    if (addressInfo) {
      this.addressInfoById.set(addressInfo.id, null);
      this.addressInfoByAddress.set(walletAddress, null);
      return true;
    }
    return false;
  }

}

module.exports = NameService;
