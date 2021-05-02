import React, { Component } from 'react';
import ExpensesCard from './ExpensesCard';
import IncomeCard from './IncomeCard';
import SavingsCard from './SavingsCard';
import Grid from '@material-ui/core/Grid';

class MainWidgets extends Component {
    state = {}
    render() {
        return (
                <Grid container direction="column"
                    justify="space-evenly"
                    alignItems="center"
                    style={{height:'85vh'}}
                >
                <IncomeCard />
                <ExpensesCard />
                <SavingsCard />
                </Grid>
        );
    }
}

export default MainWidgets;