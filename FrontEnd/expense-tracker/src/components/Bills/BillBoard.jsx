import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import BillCard from './BillCard';
import { getBills } from './helper/apicalls';
import { isAuthenticated } from '../auth';
const styles=makeStyles((theme)=>({
  root:{
    [theme.breakpoints.down('md')]:{
      flexDirection:'column'
    },
    [theme.breakpoints.up('md')]:{
      flexDirection:'row'
    },
  }
}))
const BillBoard = () => {
  const [bills,setBills]=useState([]);
  const{authToken}=isAuthenticated();
  useEffect(()=>{
      getBills(authToken).then(res=>{
        setBills(res.response);
      });
  },[])
  const classes=styles();
  return (
    <div className="billboard-container">
      <Grid
      container
      className={classes.root}
      >
        {bills.map(bill=>{
          let validity=bill.validity;
          let nextPayDate=new Date(bill.pay_date);
          let indicator=validity.substr(validity.length-1);
          let currentDate=new Date();
          let validityNum= parseInt(validity.substr(0,validity.length-1));
          currentDate.setHours(0,0,0,0);
          if(indicator=='D'){
            nextPayDate = new Date(nextPayDate.getTime() + validityNum* 24 * 60 * 60 * 1000);
            if(nextPayDate<currentDate){
              console.log('inside this ');
              return;
            }
            nextPayDate=nextPayDate.getDate()+"/"+(nextPayDate.getMonth()+1)+"/"+nextPayDate.getFullYear();
            validityNum=validityNum+" Days";
          }
          else if(indicator=='M'){
            nextPayDate.setMonth(nextPayDate.getMonth()+validityNum);
            if(nextPayDate<currentDate){
              return;
            }
            nextPayDate=nextPayDate.getDate()+"/"+(nextPayDate.getMonth()+1)+"/"+nextPayDate.getFullYear();
            validityNum+=validityNum>1?" Months":" Month";
          }
          else{
            nextPayDate.setFullYear(nextPayDate.getFullYear()+validityNum);
            if(nextPayDate<currentDate){
              return;
            }
            validityNum+=validityNum>1?" Years":" Year";
            nextPayDate=nextPayDate.getDate()+"/"+(nextPayDate.getMonth()+1)+"/"+nextPayDate.getFullYear();
          }
          return <BillCard name={bill.name} value={bill.value} validity={validityNum} nextPayDate={nextPayDate}/> ;
        })}
        
      </Grid>
      </div>

  );
}

export default BillBoard;