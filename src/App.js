import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography }  from '@material-ui/core';
import PropTypes from 'prop-types';
import 'typeface-roboto'
import './App.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 10,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  typography: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.typography} variant="display1" gutterBottom>
          Exchange Money
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs>
            <Paper className={classes.paper}>xs</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
