import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import HomeIcon from '@material-ui/icons/Home';
import {signOut} from '../auth'
import { withRouter } from 'react-router-dom'
const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

const NavBar = ({history}) => {
    const classes = useStyles();
  const [value, setValue] = React.useState('Dashboard');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Dashboard" value="Dashboard" icon={<HomeIcon />}/>
      <BottomNavigationAction label="Signout" value="Signout" onClick={()=>{
        signOut(()=>{
          history.push("/");
        })
      }} icon={<PowerSettingsNewIcon/>} />
    </BottomNavigation>
  );
}
 
export default withRouter(NavBar);