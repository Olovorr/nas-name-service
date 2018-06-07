import MenuItem from '@material-ui/core/MenuItem';
import React, { Component } from 'react';

export default class Option extends Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 700 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}