import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAddressName } from 'nas-name-service'

class App extends Component {
  state = {
    addressData: {}
  }
  componentDidMount() {
    getAddressName('n1LcVhbyCp6eHAAYda4g3Z84HCTBbRCVHdm')
      .then(({ result: { result } }) => {
        this.setState({
          addressData: JSON.parse(result)
        })
      })
  }
  render() {
    const {
      addressData,
    } = this.state
    console.log('addressData', addressData)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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
