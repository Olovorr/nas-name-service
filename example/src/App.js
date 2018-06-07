import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAddressInfo, registerAddress, getAllAddresses } from 'nas-name-service'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import SelectWrapped from './autocomplete/SelectWrapped'
import NebPay from 'nebpay'
import styles from './StylesHelper'

class App extends Component {
  state = {
    addressData: {},
    displayName: '',
    suggestions: [],
    selectedName: null,
  }

  handleSuggestionChange = value => {
    this.setState({
      selectedName: value,
    });
  };
  componentDidMount() {
    getAddressInfo('n1addCChytGh672VgXRqVSzVCyXRmJUT7X7')
      .then(({ result: { result } }) => {
        this.setState({
          addressData: JSON.parse(result)
        })
      })
    getAllAddresses()
      .then(({ result: { result } }) => {
        const suggestions = JSON.parse(result).map(addressInfo => ({
          ...addressInfo,
          value: addressInfo.id,
          label: addressInfo.displayName,
        }))
        this.setState({
          suggestions,
        })
      })
  }
  updateDisplayName = (event) => {
    this.setState({
      displayName: event.target.value,
    })
  }
  saveDisplayName = () => {
    registerAddress({ displayName: this.state.displayName })
  }
  sendNAS = () => {
    const address = this.state.suggestions.filter(({id}) => id === this.state.selectedName)[0].address
    const nebPay = new NebPay()
    nebPay.pay(
      address, // contract address
      1, // amount of NAS to be send
    )
  }
  render() {
    const {
      addressData,
    } = this.state
    const {
      classes,
    } = this.props
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to the NAS Name-Service </h1>
        </header>
        <div>
          <h4>You can use this service to save any attribute into the contract: </h4>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="displayName">Enter your name</InputLabel>
            <Input
              id="displayName"
              value={this.state.displayName}
              onChange={this.updateDisplayName}
            />
          </FormControl>
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={this.saveDisplayName}
            disabled={!this.state.displayName.length}
          >
            Save your name
          </Button>
        </div>
        <div className={classes.root}>
          <h4>You can then retrieve contracts and use it for whatever usecase, i.e. get users for suggestion & pay them: </h4>
          <Input
            inputComponent={SelectWrapped}
            value={this.state.selectedName}
            onChange={this.handleSuggestionChange}
            placeholder="Start typing to filter through addresses ..."
            id="react-select-single"
            inputProps={{
              style: { width: '300px' },
              classes,
              name: 'react-select-single',
              instanceId: 'react-select-single',
              simpleValue: true,
              options: this.state.suggestions,
            }}
          />
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={this.sendNAS}
            disabled={!this.state.selectedName}
          >
            Send 1 NAS
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
