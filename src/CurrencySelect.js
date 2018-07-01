import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem }  from '@material-ui/core';

const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 360,
  },
});

class CurrencySelect extends Component {
  state = {
    code: '',
    currencies: {},
  };

  componentDidMount() {
    if (Object.keys(this.state.currencies).length === 0) {
      console.log(`Fetching currency data`);
      const url = "https://free.currencyconverterapi.com/api/v5/currencies";

      fetch(url, {
        method : 'GET'
      })
      .then(response => response.json())
      .then(json => this.setState({
        currencies: json.results
      }))
      .catch(error => console.error('Error:', error))
    }
  }

  handleChange = event => {
    const code = event.target.value;
    console.log(code);
    console.log(this.state.currencies[code]);
    this.props.onUpdate(this.state.currencies[code]);
    this.setState({ code: code });
  };

  render() {
    const { classes } = this.props;
    const currenciesSorted = Object.values(this.state.currencies).sort((a, b) => {
      if (a.currencyName < b.currencyName)
        return -1;
      if (a.currencyName > b.currencyName)
        return 1;
      return 0;
    });

    return (
      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">{this.props.title}</InputLabel>
          <Select
            value={this.state.code}
            onChange={this.handleChange}
            inputProps={{
              name: 'code',
              id: 'age-simple',
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {currenciesSorted.map((currency) =>
              <MenuItem
                key={currency.currencyName}
                value={currency.id}>
                {currency.currencyName} - {currency.id}
              </MenuItem>
            )}
          </Select>
      </FormControl>
    );
  }
}

CurrencySelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencySelect);
