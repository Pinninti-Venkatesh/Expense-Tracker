import React, { Component } from 'react';
import BalanceCard from './BalanceCard';

class MainWidgetMod extends Component {
    state = {  }
    render() { 
        return (<div className="main-widget-mod">
            <BalanceCard/>
        </div>);
    }
}
 
export default MainWidgetMod;