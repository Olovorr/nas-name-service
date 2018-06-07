const SMART_CONTRACT_ADDRESS = 'n1j98gJf6PyXuyJ1t5oacsr7V3TTJMuYn8Y';
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
  return fetch("https://testnet.nebulas.io/v1/user/call", {
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
    JSON.stringify([ JSON.stringify(data) ]), // args
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
  return fetch("https://testnet.nebulas.io/v1/user/call", {
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
      function: 'getAllAddresses',
      args: JSON.stringify(
        [
          filterProperty,
          searchTerm
        ]
      )
    },
  }
  return fetch("https://testnet.nebulas.io/v1/user/call", {
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
