import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Row } from "../../components/row";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: theme.spacing(3, 8, 5),
    paddingBottom: "20px",
    border: "1px solid teal",
    boxShadow: "0px 0px 15px teal",
  },
  text: {
    fontFamily: "Rubik",
    marginBottom: "40px",
  },
  icon: {
    margin: "5px 100px 5px 0",
  },
}));

const URL =
  "https://freecurrencyapi.net/api/v2/latest?apikey=f94ec700-8ea3-11ec-9bb2-ed4e191db451&base_currency=";

export const Home = () => {
  const styles = useStyles();
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amountInRow, setAmountInRow] = useState(true);
  const [exchangeValue, setExchangeValue] = useState(1);

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    if (amountInRow) {
      setToAmount((+fromAmount * exchangeValue).toFixed(2));
    } else {
      setFromAmount((+toAmount / exchangeValue).toFixed(2));
    }
  }, [exchangeValue, amountInRow, fromAmount, toAmount]);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      if (fromCurrency === toCurrency) {
        setExchangeValue(1);
        return;
      }
      fetch(URL + fromCurrency)
        .then((res) => res.json())
        .then((apidata) => {
          console.log(apidata.data);
          console.log(toCurrency);
          setExchangeValue(apidata.data[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const amountFromCurrency = (e) => {
    setAmountInRow(true);
    setFromAmount(+e.target.value);
  };

  const amountToCurrency = (e) => {
    setAmountInRow(false);
    setToAmount(+e.target.value);
  };

  return (
    <div className={styles.root}>
      <h2 className={styles.text}>💲Currency convertor💲</h2>
      <Row
        selectedCurrency={fromCurrency}
        onChangeCurrency={(e) => setFromCurrency(e.target.value)}
        onChangeAmount={amountFromCurrency}
        amount={fromAmount}
      />
      <div className={styles.icon}>🔄</div>
      <Row
        selectedCurrency={toCurrency}
        onChangeCurrency={(e) => setToCurrency(e.target.value)}
        onChangeAmount={amountToCurrency}
        amount={toAmount}
      />
    </div>
  );
};
