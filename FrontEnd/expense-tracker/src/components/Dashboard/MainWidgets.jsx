import React, { Component } from 'react';
import ExpensesCard from './ExpensesCard';
import IncomeCard from './IncomeCard';
import SavingsCard from './SavingsCard';

class MainWidgets extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <IncomeCard />
                <ExpensesCard />
                <SavingsCard />
            </React.Fragment>

        );
    }
}

export default MainWidgets;