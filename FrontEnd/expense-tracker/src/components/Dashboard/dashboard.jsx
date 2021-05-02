import MainWidgetMod from './MainWidgetMod'
import CategoryMod from "./CategoryMod";
import TransactionsMod from "./TransactionsMod";
import React from 'react';
const Dashboard = () => {
    return (
        <React.Fragment>
            <MainWidgetMod />
            <div className="cat-trans-mod">
                <CategoryMod />
                <TransactionsMod />
            </div>
        </React.Fragment>

    );
}

export default Dashboard;