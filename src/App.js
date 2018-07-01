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
      fromCurrencyCode: "",
      toCurrencyCode: "",
      fromInputAmount: "",
      toInputAmount: "",
      exchangeRate: 0,
      fromCurrencySymbol: "",
      toCurrencySymbol: "",
    }
  }

  onUpdateFromInput = (amount) => {
    const convertedMoneyAmount = this.convertMoneyAmount(this.state.fromCurrencyCode,
      this.state.toCurrencyCode, amount);
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

  convertMoneyAmount = (fromCode, toCode, amount) => {
    // const query = `${fromCode}_${toCode}`;
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

  onUpdateFromCurrencyCode = (code) => {
    console.log(code);
    this.setState({
      fromCurrencyCode: code
    });

    if (this.state.toCurrencyCode) {
      console.log(`Updating exchangeRate: ${code}_${this.state.toCurrencyCode}`);
      this.getExchangeRate(`${code}_${this.state.toCurrencyCode}`);
    }
  };

  onUpdateToCurrencyCode = (code, symbol) => {
    console.log(code);
    this.setState({
      toCurrencyCode: code,

    });

    if (this.state.fromCurrencyCode) {
      console.log(`Updating exchangeRate: ${this.state.fromCurrencyCode}_${code}`);
      this.getExchangeRate(`${this.state.fromCurrencyCode}_${code}`);
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
              onUpdate={this.onUpdateFromCurrencyCode}/>
          </Grid>
          <Grid item>
            <CurrencySelect
              className={classes.select}
              title="To"
              onUpdate={this.onUpdateToCurrencyCode}/>
          </Grid>
        </Grid>
        <Grid container spacing={24} justify="center" alignItems="center">
          <Grid item>
            <CurrencyInput
              onUpdate={this.onUpdateFromInput}
              amount={this.state.fromInputAmount}
              currencyCode={this.state.fromCurrencyCode}/>
          </Grid>
          <Grid item>
            <CurrencyInput
              onUpdate={this.onUpdateToInput}
              amount={this.state.toInputAmount}
              currencyCode={this.state.toCurrencyCode}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
