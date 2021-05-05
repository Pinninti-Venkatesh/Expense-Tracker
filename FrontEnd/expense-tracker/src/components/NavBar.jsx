import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from "@material-ui/icons/Money";
import ReceiptIcon from '@material-ui/icons/Receipt';
import { signOut } from './auth'
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const NavBar = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('/dashboard');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function navBar(){
    if(window.location.pathname!='/'){
      return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
        <BottomNavigationAction label="Bills" value="/bills" icon={<ReceiptIcon />} component={Link} to="/bills" />
        <BottomNavigationAction label="Dashboard" value="/dashboard" icon={<HomeIcon />} component={Link} to="/dashboard"/>
        <BottomNavigationAction label="CTC" value="/ctc" icon={<MoneyIcon />} component={Link} to="/ctc" />
        <BottomNavigationAction label="Signout" value="Signout" onClick={() => {
          signOut(() => {
            history.push("/");
          });
          setValue('/dashboard');
        }} icon={<PowerSettingsNewIcon />} />
      </BottomNavigation>
      );
    }
    else{
      return <div></div>
    }
  }
  
  return navBar();
  
}

export default withRouter(NavBar);