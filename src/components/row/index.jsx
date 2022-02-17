import React from "react";
import { Grid, MenuItem, Select } from "@mui/material";
import { Input } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    height: "24px",
  },
  select: {
    height: "26px",
    width: "90px",
    fontSize: 10,
  },
}));

export const Row = ({
  onChangeCurrency,
  selectedCurrency,
  onChangeAmount,
  amount,
}) => {
  const styles = useStyles();
  return (
    <Grid
      width="300px"
      justifyContent="space-between"
      gridTemplateColumns="1fr 80px"
      container
    >
      <Grid item>
        <Input
          className={styles.input}
          type="number"
          onChange={onChangeAmount}
          value={amount}
          inputProps={{ min: "0" }}
        />
      </Grid>
      <Grid item>
        <Select
          className={styles.select}
          value={selectedCurrency}
          onChange={onChangeCurrency}
        >
          <MenuItem value="UAH">UAH</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
};
