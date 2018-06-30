import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem }  from '@material-ui/core';

const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 240,
  },
});

class CurrencySelect extends Component {
  state = {
    age: '',
  };

  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">{this.props.title}</InputLabel>
          <Select
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'age-simple',
            }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
      </FormControl>
    );
  }
}

CurrencySelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CurrencySelect);
