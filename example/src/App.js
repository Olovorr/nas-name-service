import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getAddressInfo, registerAddress, getAllAddresses } from 'nas-name-service'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class App extends Component {
  state = {
    addressData: {},
    displayName: '',
  }
  componentDidMount() {
    getAddressInfo('n1addCChytGh672VgXRqVSzVCyXRmJUT7X7')
      .then(({ result: { result } }) => {
        console.log('whatsup', result)
        this.setState({
          addressData: JSON.parse(result)
        })
      })
    getAllAddresses()
      .then(({ result: { result } }) => {
        console.log('allAddresses', JSON.parse(result))
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
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="displayName">Enter your name</InputLabel>
            <Input
              id="displayName"
              placeholder=""
              value={this.state.displayName}
              onChange={this.updateDisplayName}
            />
          </FormControl>
          <Button
            variant="raised"
            color="primary"
            className={classes.button}
            onClick={this.saveDisplayName}
          >
            Save your name
          </Button>
        </div>
        <p className="App-intro">
          Address Name: { addressData && addressData.name }
        </p>
      </div>
    );
  }
}

export default withStyles(styles)(App);
