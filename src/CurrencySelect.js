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
    currencies: [],
  };

  componentDidMount() {
    const url = "https://free.currencyconverterapi.com/api/v5/currencies";

    fetch(url, {
      method : 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState({
      currencies: Object.values(json.results)
    }))
    .catch(error => console.error('Error:', error))
  }

  handleChange = event => {
    this.props.onUpdate(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

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
            {this.state.currencies.map(({currencyName, currencySymbol, id}) =>
              <MenuItem key={id} value={id}>{currencyName} - {id}</MenuItem>
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
