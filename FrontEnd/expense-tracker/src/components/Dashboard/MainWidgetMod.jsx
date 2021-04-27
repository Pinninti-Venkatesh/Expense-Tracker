import React, { Component } from 'react';
import BalanceCard from './BalanceCard';
import MainWidgets from './MainWidgets';

class MainWidgetMod extends Component {
    state = {  }
    render() { 
        return (<div className="main-widget-mod">
            <BalanceCard/>
            <MainWidgets/>
        </div>);
    }
}
 
export default MainWidgetMod;