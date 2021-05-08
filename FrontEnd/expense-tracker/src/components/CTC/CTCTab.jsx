import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SalaryPanel from './SalaryPanel';
import CTCPanel from './CTCPanel';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      style={{height:'92vh'}}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ height: '100%',boxSizing:'border-box' }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]:{
      width: '93vw',
    },
    [theme.breakpoints.down('md')]:{
      width: '100%',
    },
    flexGrow: 1,
    backgroundColor: "#272c34"
  },
}));

export default function CTCTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" style={
        {
          backgroundColor: "#272c34",
          height: '8vh'
        }
      }>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Salary" {...a11yProps(0)} />
          <Tab label="CTC" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <SalaryPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CTCPanel />
      </TabPanel>
    </div>
  );
}
