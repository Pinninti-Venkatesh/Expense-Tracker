import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { getNetSalary, getPayDay } from './helper/apicalls';
import { isAuthenticated } from '../auth';
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles({
  root: {
    // width:
    margin: 5
  },
  balance: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  money: {
    marginBottom: 0,
    marginTop: 5
  }
});

export default function IncomeCard() {
  const classes = useStyles();
  const { authToken } = isAuthenticated();
  const [incomeData, setIncomeData] = useState({
    days: "",
    income: 6
  });

  useEffect(() => {
    getPayDay(authToken).then(res => {
      getNetSalary(authToken).then(res2 => {
        setIncomeData({ days: res.response, income: res2.response });
      });
    });
    
  }, []);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="div" className={classes.balance}>
          Income
            <Chip
            className={classes.chip}
            label={incomeData.days}
            size="small"
            variant="outlined"
          />
          {/* <Chip label={incomeData.days} /> */}
        </Typography>
        <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
            ₹ {7485485}
            {/* ₹ {(incomeData.income).toFixed(2)} */}
        </Typography>
      </CardContent>
    </Card>
  );
}
