import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAddressInfo, registerAddress, getAllAddresses } from 'nas-name-service'

class App extends Component {
  state = {
    addressData: {}
  }
  componentDidMount() {
    getAddressInfo('n1addCChytGh672VgXRqVSzVCyXRmJUT7X7')
      .then(({ result: { result } }) => {
        console.log('whatsup', result)
        this.setState({
          addressData: JSON.parse(result)
        })
      })
    // registerAddress({ name: 'Lol', troll: 'name - lol' })
    getAllAddresses()
      .then(({ result: { result } }) => {
        console.log('allAddresses', JSON.parse(result))
      })
  }
  render() {
    const {
      addressData,
    } = this.state

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to NAS Name Service </h1>
        </header>
        <p className="App-intro">
          Address Name: { addressData && addressData.name }
        </p>
      </div>
    );
  }
}

export default App;
