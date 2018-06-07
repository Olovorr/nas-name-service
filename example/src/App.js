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
const ITEM_HEIGHT = 48

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
  chip: {
    margin: theme.spacing.unit / 4,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});


class App extends Component {
  state = {
    addressData: {},
    displayName: '',
    suggestions: [],
    single: null,
  }

  handleSingleChange = value => {
    this.setState({
      single: value,
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
          >
            Save your name
          </Button>
        </div>
        <div>
          <h4>You can then retrieve contracts and use it for whatever usecase, i.e. autosuggestions: </h4>
          <Input
            inputComponent={SelectWrapped}
            value={this.state.single}
            onChange={this.handleSingleChange}
            placeholder="Search a country (start with a)"
            id="react-select-single"
            inputProps={{
              style: { width: '300px' },
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
