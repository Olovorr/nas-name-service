# Universal Name Service for NAS 
Name service for addresses on Nebulas blockchain platform. Unopinionated and easy to use in _any_ scenario.

## Idea

This package contains helper functions that can be used universally for _**each**_ smart contract developer:
- Enables you to store / retrieve any custom data about user that you want (displayName, rating...)
- Share knowledge about users (by their wallet addresses) amongst all the smart contracts
- Get all the users in the smart-contract, i.e. for autosuggestions 
- Search through wallet addresses by any property you want on smart-contract side (if you want to optimize front-end)

#### Motivation

I needed something like this for my dApp (fair-contracts) and I think we should have this universal, easily accessible for everyone, but still with high enough abstraction so it doesn't limit developers. 

## Installation

This module is distributed via [npm][npm] and should be installed as one of your project's `dependencies`:

```
npm install --save nas-name-service
```
or

```
yarn add nas-name-service
```

Alternatively if you are using plain JS, you should download index.js file and include it as a script.

## Usage

It's super easy to use. Examples will be written in React, but you can just handle it in any framework / or vanilla in same way that you would handle any other promise.

After installing it, just include function you need via require or import, i.e.:
```import { getAddressInfo } from 'nas-name-service'```
and then use it in your code.

***
### getAddressInfo

```
getAddressInfo(walletAddress)
```

###### parameters：

- `walletAddress` - string - wallet address of user you want to retrieve data from

###### return

- `Promise`, which will have Nebulas classic return call data structure:
```
    {
        result: {
            result: StringifiedJsonAddressObject,
            estimate_gas: string,
            execute_err: string
        }
    }
```

##### React example

```
getAddressInfo('n1addCChytGh672VgXRqVSzVCyXRmJUT7X7')
    .then(({ result: { result } }) => {
        this.setState({
            addressData: JSON.parse(result)
        })
    })
```



***

### getAllAddresses

```
getAllAddresses()
```

###### parameters：
none

###### return

- `Promise`, which will have Nebulas classic return call data structure:
```
    {
        result: {
            result: StringifiedArray<AddressObject>,
            estimate_gas: string,
            execute_err: string
        }
    }
```

##### React example

```
getAllAddresses()
    .then(({ result: { result } }) => {
        this.setState({
            suggestions: JSON.parse(result)
        })
    })
```



***
### registerAddress

```
registerAddress(customAddressDataObject)
```

###### parameters：

- `customAddressDataObject` - custom address data object. This should always contain unique displayName, so everyone can recognize this address, but other than that you can literally store everything you want in here, and then just retrieve it from getAddressInfo or getAllAddresses. Or you can get just addresses containing your special property by calling filterAddressesByProperty.

###### return

- `string` - txhash of transaction

##### Example

```
    registerAddress(
        {
            displayName: this.state.displayName, // This should always be present
            customParam1: "Hakuna matata",
            customRating: "97.6%",
            email: "myemail@letsgo.com"
        }
    )

```

***

### filterAddressesByProperty

```
filterAddressesByProperty(filterProperty, searchTerm)
```

###### parameters：

- `filterProperty` - string - Specifies property which should be used for searching in. I.e. 'displayName'.
- `searchTerm` - string - returns just entries that contain this string in the property specified in `filterProperty`.

###### return

- `Promise`, which will have Nebulas classic return call data structure:
```
    {
        result: {
            result: StringifiedArray<AddressObject>, // Addresses that satisfy search query and contain specified property
            estimate_gas: string,
            execute_err: string
        }
    }
```

##### Example

```
filterAddressesByProperty("displayName", "Ol")
    .then(({ result: { result } }) => {
        this.setState({
            suggestions: JSON.parse(result) // returns just suggestion containing "Ol".
        })
    })
```