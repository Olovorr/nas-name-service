const SMART_CONTRACT_ADDRESS = 'n1thKSZDtpsBSJKE87v1C8GKCSRyggqew8a';
// const SMART_CONTRACT_TESTNET = 'n1fpCRtMFHYUH7Y9wKsWmr4N9EPi7b7WLbp';

const getAddressInfo = function(walletAddress) {
  const body = { 
    from: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
    to: SMART_CONTRACT_ADDRESS,
    value: '0',
    nonce: 301,
    gasPrice: '1000000',
    gasLimit: '200000',
    contract: {
      function: 'getAddressInfo',
      args: JSON.stringify(
        [
          walletAddress
        ]
      )
    },
  }
  return fetch("https://mainnet.nebulas.io/v1/user/call", {
    headers: {},
    referrerPolicy: 'no-referrer-when-downgrade',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  }).then(function(response) {
    return response.json()
  });
}

const NebPay = require('nebpay')
const registerAddress = function(data) {
  const nebPay = new NebPay()
  return nebPay.call(
    SMART_CONTRACT_ADDRESS, // contract address
    0, // amount of NAS to be send
    'registerAddress', // function to be called
    JSON.stringify([
      JSON.stringify(data)
    ]) // args
  )
}

const deleteAddress = function(data) {
  const nebPay = new NebPay()
  return nebPay.call(
    SMART_CONTRACT_ADDRESS, // contract address
    0, // amount of NAS to be send
    'deleteAddress', // function to be called
    JSON.stringify([
      JSON.stringify(data)
    ]) // args
  )
}

const getAllAddresses = function() {
  const body = {
    from: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
    to: SMART_CONTRACT_ADDRESS,
    value: '0',
    nonce: 301,
    gasPrice: '1000000',
    gasLimit: '200000',
    contract: {
      function: 'getAllAddresses',
      args: "[]"
    },
  }
  return fetch("https://mainnet.nebulas.io/v1/user/call", {
    headers: {},
    referrerPolicy: 'no-referrer-when-downgrade',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  }).then(function(response) {
    return response.json()
  });
}

const filterAddressesByProperty = function(filterProperty, searchTerm) {
  const body = {
    from: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
    to: SMART_CONTRACT_ADDRESS,
    value: '0',
    nonce: 301,
    gasPrice: '1000000',
    gasLimit: '200000',
    contract: {
      function: 'filterAddressesByProperty',
      args: JSON.stringify(
        [
          filterProperty,
          searchTerm
        ]
      )
    },
  }
  return fetch("https://mainnet.nebulas.io/v1/user/call", {
    headers: {},
    referrerPolicy: 'no-referrer-when-downgrade',
    body: JSON.stringify(body),
    method: 'POST',
    mode: 'cors'
  }).then(function(response) {
    return response.json()
  });
}

module.exports = {
  getAddressInfo: getAddressInfo,
  getAllAddresses: getAllAddresses,
  registerAddress: registerAddress,
  filterAddressesByProperty: filterAddressesByProperty,
}
