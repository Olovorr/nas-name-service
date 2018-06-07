const getAddressName = function(walletAddress) {
   fetch("https://testnet.nebulas.io/v1/user/call", {
      credentials: 'omit',
      headers: {},
      referrerPolicy: 'no-referrer-when-downgrade',
      body: JSON.stringify(
          from: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
          to: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
          value: '0',
          nonce: 301,
          gasPrice: 1000000,
          gasLimit: 200000,
          contract: {
              function: getAddressName,
              args: JSON.stringify(
                  [
                      walletAddress
                  ]
              )
          },
          method: 'POST',
          mode: 'cors'
      )
  });
}

module.export = {
  getAddressName: getAddressName,
}
