import React, { Component } from 'react';
import ExpensesCard from './ExpensesCard';
import IncomeCard from './IncomeCard';
import SavingsCard from './SavingsCard';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
const styles=makeStyles((theme)=>({
    root:{
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',

        [theme.breakpoints.up('md')]:{
            height:'85vh'
        }
    }
}))

const MainWidgets = () => {
    const classes=styles();
        return (
                <Grid container
                className={classes.root}
                >
                <IncomeCard />
                <ExpensesCard />
                <SavingsCard />
                </Grid>
        );
}
 
export default MainWidgets;