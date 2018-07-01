import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputAdornment, Typography }  from '@material-ui/core';

const styles = theme => ({
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
    width: 360,
  },
  textField: {
    fontSize: 72,
  },
  typography: {
    fontSize: 72,
    color: theme.palette.text.primary,
  },
});

class CurrencyInput extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   amount: '',
    // }
  }

  handleChange = prop => event => {
    this.props.onUpdate(event.target.value);
    this.setState({ [prop]: event.target.value});
  };

  render() {
    const { classes } = this.props;

    let symbol = this.props.currency.currencySymbol;
    if (!symbol) {
      symbol = this.props.currency.id;
    }

    return (
      <FormControl className={classes.withoutLabel}>
        <Input
          id="adornment-weight"
          value={this.props.amount}
          type="number"
          className={classes.textField}
          disableUnderline={true}
          placeholder={this.props.currency.id}
          onChange={this.handleChange('amount')}
          startAdornment={
            <InputAdornment position="start">
              <Typography className={classes.typography}>{symbol}</Typography>
          </InputAdornment>}
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
