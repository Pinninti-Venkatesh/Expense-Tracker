import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
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
      <CardActionArea>
        <CardContent>
          <Typography variant="body2" component="p" className={classes.balance}>
            Income
            <Chip label={incomeData.days} />
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ₹ {(incomeData.income).toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
