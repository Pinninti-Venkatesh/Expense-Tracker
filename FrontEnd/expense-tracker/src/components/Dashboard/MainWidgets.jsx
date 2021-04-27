import React, { Component } from 'react';
import ExpensesCard from './ExpensesCard';
import IncomeCard from './IncomeCard';

class MainWidgets extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <IncomeCard />
                <ExpensesCard />
            </React.Fragment>

        );
    }
}

export default MainWidgets;