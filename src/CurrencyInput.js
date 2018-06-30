import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputAdornment }  from '@material-ui/core';

const styles = theme => ({
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
    width: 240,
  },
  textField: {
    fontSize: 64,
  }
});

class CurrencyInput extends Component {

  state = {
    amount: '',
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.withoutLabel}>
        <Input
          id="adornment-weight"
          value={this.state.amount}
          className={classes.textField}
          disableUnderline="true"
          placeholder="USD"
          onChange={this.handleChange('amount')}
          startAdornment={<InputAdornment className={classes.textField} position="start">$</InputAdornment>}
          inputProps={{
            'aria-label': 'Weight',
          }}
        />
      </FormControl>
    );
  }

}

CurrencyInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencyInput);
