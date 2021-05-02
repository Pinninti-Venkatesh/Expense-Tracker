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
import { getPeriodExpenses, getTotalExpenses } from './helper/apicalls';
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
    chip:{
        margin:'0 5px'
    },
    money:{
        marginBottom:0,
        marginTop:5
      }  
});

const ExpensesCard = () => {
    const classes = useStyles();
    const {authToken}=isAuthenticated();
    const[total,setTotal]=useState('737387');
    const handleChipClick=p=>{
        console.log(p);
        let routeName=p=='D'?'dailyExpenses':p=='W'?'weeklyExpenses':'monthlyExpenses';
        console.log(routeName);
        getPeriodExpenses(authToken,routeName).then(res=>{
            if(res.response.length){
                setTotal(res.response[0].total);
            }
            else{
                setTotal(0);
            }
            
        });
    }
    useEffect(() => {
        getTotalExpenses(authToken).then(res => {
            if(res.response.length){
                setTotal(res.response[0].total);
            }
            else{
                setTotal(0);
            }
        });
      }, []);
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="body2" component="div" className={classes.balance}>
                    Expenses
                    <Grid item >
                        <Chip
                        className={classes.chip}
                            label="D"
                            onClick={()=>{
                                handleChipClick('D');
                            }}
                            m={1}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                        className={classes.chip}
                            label="W"
                            onClick={()=>{
                                handleChipClick('W');
                            }}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                        className={classes.chip}
                            label="M"
                            onClick={()=>{
                                handleChipClick('M');
                            }}
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
                    ₹ {total}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ExpensesCard;