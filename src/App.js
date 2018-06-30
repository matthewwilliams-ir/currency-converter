import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Input, InputAdornment }  from '@material-ui/core';
import PropTypes from 'prop-types';
import 'typeface-roboto'
import CurrencySelect from './CurrencySelect'
import CurrencyInput from './CurrencyInput'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 10,
    // paddingLeft: theme.spacing.unit * 50,
    // paddingRight: theme.spacing.unit * 50,
  },
  typography: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  select: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.typography} variant="headline" gutterBottom>
          Exchange Money
        </Typography>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <CurrencySelect className={classes.select} title="From"/>
          </Grid>
          <Grid item>
            <CurrencySelect className={classes.select} title="To"/>
          </Grid>
        </Grid>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <CurrencyInput/>
          </Grid>
          <Grid item>
            <CurrencyInput/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
