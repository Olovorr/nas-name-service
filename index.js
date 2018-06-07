const getAddressName = function(walletAddress) {
    const body = { 
        from: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
        to: 'n1ytsHPBkJ4Zthjhe12QTEdrKFqLZ9DrbNt',
        value: '0',
        nonce: 301,
        gasPrice: '1000000',
        gasLimit: '200000',
        contract: {
            function: 'getAddressName',
            args: JSON.stringify(
                [
                    walletAddress
                ]
            )
        },
    }
    return fetch("https://testnet.nebulas.io/v1/user/call", {
        credentials: 'omit',
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
  getAddressName: getAddressName,
}
