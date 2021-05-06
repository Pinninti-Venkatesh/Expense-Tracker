import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import BarCard from './BarCard';
import { getAllCTC, getAllSalary, removeCTC } from "./helper/apicalls";
import { isAuthenticated } from "../auth";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import CTCInputForm from './CTCInputForm';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
const styles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        boxSizing:'border-box'
    },
    salaryComps: {
        width: '55%',
        overflow: 'scroll',
        height: '100%'
    },
    paperComp: {
        width: '45%',
    },
    Fab: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    paper: {
        height: "100%",
        position:'relative'
    },
    paperGrid: {
        margin:'25px 0 0 0 0'
    },
    textField:{
        fontSize:17,
        margin:'5px 0'
    },
    boldTextField:{
        fontSize:17,
        fontWeight:500
    },
    downloadIcon:{
        position:'absolute',
        top:0,
        right:0,
        padding:'6px'
    }
})
const CTCPanel = () => {
    const classes = styles();
    const [ctc, setctc] = useState([]);
    const [paper, setPaper] = useState({
        from:'2020-09',
        to:'',
        company_name:'Newgen Software',
        basic_salary: 0,
        flexi_basket: 0,
        variable_pay: 0,
        provident_fund: 0,
        statutory_bonus:0,
        gratuity:0,
        health_benefit:0,
        insurance:0,
        annual_ctc: 0,
    });
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { authToken } = isAuthenticated();
    const [paperDisplay,setPaperDisplay]=useState("none");
    const [form, setForm] = useState({
        toggle: true,
        open: false
    });
    useEffect(() => {
        getAllCTC(authToken).then(res => {
            setctc(res.response);
        })
    }, [ctc]);
    const updateCTC=newCTC=>{
        console.log('in here',newCTC);
        let updatedCTC=ctc;
        updatedCTC.push(newCTC);
        setctc(updatedCTC);
    }
    const selectCTC = id => {
        ctc.forEach(ctc => {
            if (ctc._id == id) {
                setPaperDisplay("block");
                setPaper(ctc);
                return;
            }
        })
    }
    const deleteCTC=id=>{
        removeCTC({id},authToken).then(res=>{
            if(res.response=='S'){
                let updatedCTC=ctc.filter(ctcItem=>{
                    return ctcItem._id!=id;
                });
                setctc(updatedCTC);
            }
        })
    }
    const downloadDoc = doc => {
        console.log('file', doc);
        var a = document.createElement("a");
        var dataURI = "data:" + "application/pdf" +
            ";base64," +doc;
        a.href = dataURI;
        a['download'] = "Payslip-"+paper.from+".pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    return (
        <Grid
            container
            direction="row"
            className={classes.root}>
            <div className={classes.salaryComps}>
            {ctc.map(ctc => {
                    return <BarCard onDelete={deleteCTC} onSelect={selectCTC} name={ctc.company_name} year={(ctc.from).substr(0, 4)} month={months[parseInt((ctc.from).substr(5, 7))]} key={ctc._id} id={ctc._id} />
                })}
            </div>
            <div className={classes.paperComp}>
            <Paper className={classes.paper} style={{display:paperDisplay}}>
                    <Typography align="center" variant="h4">
                        {paper.company_name}
                    </Typography>
                    <Grid
                    container
                    direction="row"
                    justify="space-around"
                    style={{marginTop:15}}
                    >
                    <Typography variant="h5">
                        {(paper.from).substr(0, 4)} {months[parseInt((paper.from).substr(5, 7))]}
                    </Typography>
                    <Typography variant="h5">
                        {paper.to?((paper.from).substr(0, 4) + months[parseInt((paper.from).substr(5, 7))]):"Till Date"}
                    </Typography>
                    </Grid>
                    
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        className={classes.paperGrid}
                    >
                        <div >
                            <Typography className={classes.textField}>
                                Basic
                            </Typography>
                            <Typography className={classes.textField}>
                                Flexi Basket
                            </Typography>
                            <Typography className={classes.textField}>
                                Variable Pay
                            </Typography>
                            <Typography className={classes.textField}>
                                Provident Fund
                            </Typography>
                            <Typography className={classes.textField}>
                                Statutory Bonus
                            </Typography>
                            <Typography className={classes.textField}>
                                gratuity
                            </Typography>
                            <Typography className={classes.textField}>
                                Health Care Benefit
                            </Typography>
                            <Typography className={classes.textField}>
                                Insurance
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                Annual CTC
                            </Typography>
                        </div>
                        <div >
                            <Typography className={classes.textField}>
                                {paper.basic_salary}
                            </Typography >
                            <Typography className={classes.textField}>
                                {paper.flexi_basket}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.variable_pay}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.provident_fund}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.statutory_bonus}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.gratuity}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.health_benefit}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.insurance}
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                {paper.annual_ctc}
                            </Typography>
                        </div>
                        
                    </Grid>
                    <IconButton className={classes.downloadIcon} variant="outlined" onClick={() => { downloadDoc(paper.doc) }}>
                        <GetAppIcon />
                    </IconButton>
                </Paper>
            </div>
            <Fab color="secondary" aria-label="edit" className={classes.Fab} onClick={() => {
                setForm({ toggle: !form.toggle, open: true });
            }}>
                <EditIcon />
            </Fab>
            <CTCInputForm updatePanel={updateCTC} key={form} openDialog={form} />
            {/* <CTCInputForm/> */}
        </Grid>
    );
}

export default CTCPanel;