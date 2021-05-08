import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {getTotalSavings } from './helper/apicalls';
import { isAuthenticated } from '../auth';

const useStyles = makeStyles({
    root: {
        margin: 5,
        width:'90%',
        backgroundColor:'#495766',
        color:'#fff'
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

const SavingsCard = () => {
    const classes = useStyles();
    const {authToken}=isAuthenticated();
    const[total,setTotal]=useState(0);
    useEffect(() => {
        getTotalSavings(authToken).then(res => {
            {/* ₹ {(incomeData.income).toFixed(2)} */}
            if(res.total_savings){
                setTotal((res.total_savings).toFixed(2));
            }
        });
      }, []);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body2" component="div" className={classes.balance}>
                    Savings
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
                    ₹ {(total).toFixed(2)}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default SavingsCard;