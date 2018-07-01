import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography }  from '@material-ui/core';
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
    paddingBottom: theme.spacing.unit * 5,
    // textAlign: 'center',
    color: theme.palette.text.primary,
  },
  select: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fromCurrency: {},
      toCurrency: {},
      fromInputAmount: "",
      toInputAmount: "",
      exchangeRate: 0,
    }
  }

  onUpdateFromInput = (amount) => {
    const convertedMoneyAmount = this.convertMoneyAmount(amount);
    console.log(convertedMoneyAmount);

    this.setState({
      fromInputAmount: amount,
      toInputAmount: convertedMoneyAmount
    })
  };

  onUpdateToInput = (amount) => {
    this.setState({
      toInputAmount: amount
    })
  };

  convertMoneyAmount = (amount) => {
    console.log(`Exhange rate: ${this.state.exchangeRate}, Amount: ${amount}`)
    return amount * this.state.exchangeRate;
  };

  getExchangeRate = (query) => {
    fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`, {
      method : 'GET'
    })
    .then(response => response.json())
    .then(json => this.setState({
      exchangeRate: json[query]
    }))
    .catch(error => console.error('Error:', error));
  }

  onUpdateFromCurrency = (currency) => {
    console.log(currency);
    this.setState({
      fromCurrency: currency,
    });

    if (this.state.toCurrency.id) {
      console.log(`Updating exchangeRate: ${currency.id}_${this.state.toCurrency.id}`);
      this.getExchangeRate(`${currency.id}_${this.state.toCurrency.id}`);
    }
  };

  onUpdateToCurrency = (currency) => {
    console.log(currency);
    this.setState({
      toCurrency: currency,
    });

    if (this.state.fromCurrency.id) {
      console.log(`Updating exchangeRate: ${this.state.fromCurrency.id}_${currency.id}`);
      this.getExchangeRate(`${this.state.fromCurrency.id}_${currency.id}`);
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <Typography
              className={classes.typography}
              variant="headline"
              gutterBottom>
              Exchange Money
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <CurrencySelect
              className={classes.select}
              title="From"
              onUpdate={this.onUpdateFromCurrency}/>
          </Grid>
          <Grid item>
            <CurrencySelect
              className={classes.select}
              title="To"
              onUpdate={this.onUpdateToCurrency}/>
          </Grid>
        </Grid>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <CurrencyInput
              onUpdate={this.onUpdateFromInput}
              amount={this.state.fromInputAmount}
              currency={this.state.fromCurrency}/>
          </Grid>
          <Grid item>
            <CurrencyInput
              onUpdate={this.onUpdateToInput}
              amount={this.state.toInputAmount}
              currency={this.state.toCurrency}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
