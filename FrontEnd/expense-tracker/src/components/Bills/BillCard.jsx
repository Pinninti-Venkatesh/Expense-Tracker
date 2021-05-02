import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    // width:
    margin: 15,
    // width: '90%',
    // width:'auto',
    width: '20%',
    backgroundColor: '#495766',
    display: 'inline-block',
    color: '#fff'
  },
  mainTitle: {
    color:'black'
  },
  chip: {
    color: 'white'
  },
  titles:{
    marginBottom:0,
    color:'black'
  },
  money: {
    marginBottom: 25,
    marginTop: 15
  }
});

const BillCard = ({name,value,validity,nextPayDate}) => {
  const classes = useStyles();
  return (
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="body2" component="div" className={classes.mainTitle}>
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
            {/* ₹ {value} */}
            ₹ {(value).toFixed(2)}
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
                {validity}
              </Typography>
            </div>

            <div>
              <Typography gutterBottom variant="body1" component="h2" className={classes.titles}>
                Next PayDate
              </Typography>
              <Typography variant="body2" component="div">
                {nextPayDate}
              </Typography>
            </div>
          </Grid>
        </CardContent>
      </Card>
    );
}

export default BillCard;