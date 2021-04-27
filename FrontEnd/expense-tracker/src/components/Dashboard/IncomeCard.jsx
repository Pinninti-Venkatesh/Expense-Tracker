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
  money:{
    marginBottom:0,
    marginTop:5
  }  
});

export default function IncomeCard() {
  const classes = useStyles();
  const { authToken } = isAuthenticated();
  const [incomeData, setIncomeData] = useState({
    days: "12 Days Left",
    income: "683899.99"
  });
  useEffect(() => {
    getPayDay(authToken).then(res => {
      setIncomeData({ ...incomeData, days: res.response });
    });
    getNetSalary(authToken).then(res => {
      setIncomeData({ ...incomeData, income: res.response });
    })
  }, []);
  return (
    <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" component="div" className={classes.balance}>
            Income
            <Chip label={incomeData.days} />
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
            ₹ 683899.99
            {/* ₹ {(incomeData.income).toFixed(2)} */}
          </Typography>
        </CardContent>
    </Card>
  );
}
