import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    fontSize: "40px",
    textShadow: "1px 1px darkgrey",
    border: "2px solid teal",
    backgroundColor: "teal",
  },
  child: {
    display: "flex",
    alignItems: "center",
    color: "white",
    padding: "10px",
    width: "220px",
  },
  progres: {
    width: "20px",
    height: "20px",
  },
}));

export const Header = () => {
  const styles = useStyles();
  const [usdCurrencys, setUsdCurrencys] = useState(0);
  const [eurCurrencys, setEurCurrencys] = useState(0);

  useEffect(() => {
    fetch(
      "https://freecurrencyapi.net/api/v2/latest?apikey=f94ec700-8ea3-11ec-9bb2-ed4e191db451&base_currency=USD"
    )
      .then((res) => res.json())
      .then((apidata) => {
        setUsdCurrencys(apidata.data["UAH"]);
        console.log(apidata);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://freecurrencyapi.net/api/v2/latest?apikey=f94ec700-8ea3-11ec-9bb2-ed4e191db451&base_currency=EUR"
    )
      .then((res) => res.json())
      .then((apidata) => {
        setEurCurrencys(apidata.data["UAH"]);
      });
  }, []);

  return (
    <Typography className={styles.root} component="div">
      <h2 className={styles.child}>
        USD:{" "}
        {usdCurrencys || (
          <CircularProgress className={styles.progres} color="inherit" />
        )}
      </h2>
      <h2 className={styles.child}>
        EUR:{" "}
        {eurCurrencys || (
          <CircularProgress className={styles.progres} color="inherit" />
        )}
      </h2>
    </Typography>
  );
};
