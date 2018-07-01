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
    let convertedMoneyAmount = this.state.toInputAmount;

    if (Object.keys(this.state.fromCurrency).length !== 0 && Object.keys(this.state.fromCurrency).length !== 0) {
      convertedMoneyAmount = this.convertMoneyAmount(amount, false);
    }
    console.log(convertedMoneyAmount);

    this.setState({
      fromInputAmount: amount,
      toInputAmount: convertedMoneyAmount
    })

  };

  onUpdateToInput = (amount) => {
    let convertedMoneyAmount = this.state.fromInputAmount;

    if (Object.keys(this.state.fromCurrency).length !== 0 && Object.keys(this.state.fromCurrency).length !== 0) {
      convertedMoneyAmount = this.convertMoneyAmount(amount, true);
    }
    console.log(convertedMoneyAmount);

    this.setState({
      fromInputAmount: convertedMoneyAmount,
      toInputAmount: amount
    })
  };

  convertMoneyAmount = (amount, reverse) => {
    console.log(`Exhange rate: ${this.state.exchangeRate}, Amount: ${amount}`)
    let convertedAmount;
    if (reverse) {
        convertedAmount = amount / this.state.exchangeRate;
    } else {
      convertedAmount = amount * this.state.exchangeRate;
    }

    return Math.round(convertedAmount * 100) / 100;
  };

  getExchangeRate = (query) => {
    console.log(`Fetching exchangeRate data`);
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
      this.setState({
        exchangeRate: this.getExchangeRate(`${currency.id}_${this.state.toCurrency.id}`),
        fromInputAmount: "",
        toInputAmount: "",
      });
    }
  };

  onUpdateToCurrency = (currency) => {
    console.log(currency);
    this.setState({
      toCurrency: currency,
    });

    if (this.state.fromCurrency.id) {
      console.log(`Updating exchangeRate: ${this.state.fromCurrency.id}_${currency.id}`);
      this.setState({
        exchangeRate: this.getExchangeRate(`${this.state.fromCurrency.id}_${currency.id}`),
        fromInputAmount: "",
        toInputAmount: "",
      });
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
