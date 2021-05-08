import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import MoneyIcon from "@material-ui/icons/Money";
import ReceiptIcon from '@material-ui/icons/Receipt';
import SettingsIcon from '@material-ui/icons/Settings';
import { signOut } from './auth'
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      height: '100vh',
      width: '7vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderRight: 'black 2px solid',
      backgroundColor: '#272c34'
    },
    [theme.breakpoints.down('md')]:{
      backgroundColor: '#272c34',
      justifyContent: 'space-around',
    }
  },
  actionButton:{
    [theme.breakpoints.down('md')]:{
      width:'20%',
      padding:0
    }
  }
}));

const NavBar = ({ history }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(window.location.pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function navBar() {
    if (window.location.pathname != '/') {
      return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
          <BottomNavigationAction className={classes.actionButton}label="Bills" value="/bills" icon={<ReceiptIcon />} component={Link} to="/bills" />
          <BottomNavigationAction className={classes.actionButton}label="CTC" value="/ctc" icon={<MoneyIcon />} component={Link} to="/ctc" />
          <BottomNavigationAction className={classes.actionButton}label="Dashboard" value="/dashboard" icon={<HomeIcon />} component={Link} to="/dashboard" />
          <BottomNavigationAction className={classes.actionButton}label="Settings" value="/settings" icon={<SettingsIcon />} component={Link} to="/settings" />
          <BottomNavigationAction className={classes.actionButton}label="Signout" value="Signout" onClick={() => {
            signOut(() => {
              history.push("/");
            });
            setValue('/dashboard');
          }} icon={<PowerSettingsNewIcon />} />
        </BottomNavigation>
      );
    }
    else {
      return <div></div>
    }
  }

  return navBar();

}

export default withRouter(NavBar);