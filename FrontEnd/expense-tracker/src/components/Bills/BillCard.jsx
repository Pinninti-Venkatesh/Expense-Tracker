import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // width:
    margin: 5,
    // width: '90%',
    // width:'auto',
    width: '20%',
    backgroundColor: '#495766',
    display: 'inline-block',
    color: '#fff'
  },
  balance: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  chip: {
    color: 'white'
  },
  titles:{
    marginBottom:0
  },
  money: {
    marginBottom: 25,
    marginTop: 15
  }
});

const BillCard = () => {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" component="div" className={classes.balance}>
            Youtube Subscription
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
            ₹ {7485485}
            {/* ₹ {(incomeData.income).toFixed(2)} */}
          </Typography>
          <Grid
            container
            direction="row"
            justify="space-between"
          >
            <div>
              <Typography gutterBottom variant="body1" component="h2" className={classes.titles}>
                Validity
              </Typography>
              <Typography variant="body2" component="div">
                1 Month
              </Typography>
            </div>

            <div>
              <Typography gutterBottom variant="body1" component="h2" className={classes.titles}>
                Next PayDate
              </Typography>
              <Typography variant="body2" component="div">
                4/5/2021
              </Typography>
            </div>
          </Grid>
        </CardContent>
      </Card>
    );
}

export default BillCard;