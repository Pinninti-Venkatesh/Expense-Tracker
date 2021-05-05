import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import BarCard from './BarCard';
import { getAllCTC, getAllSalary } from "./helper/apicalls";
import { isAuthenticated } from "../auth";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import CTCInputForm from './CTCInputForm';
const styles = makeStyles({
    root: {
        height: '100%',
        width: '100%'
    },
    salaryComps: {
        width: '50%',
        overflow: 'scroll',
        height: '100%'
    },
    paperComp: {
        width: '50%',
    },
    Fab: {
        position: 'absolute',
        right: 20,
        bottom: 20
    },
    paper: {
        height: "90%",
    },
    paperGrid: {
        margin:'25px 0'
    },
    textField:{
        fontSize:17,
        margin:'5px 0'
    },
    boldTextField:{
        fontSize:17,
        fontWeight:500
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
    }, []);
    const selectSlip = id => {
        ctc.forEach(ctc => {
            if (ctc._id == id) {
                setPaperDisplay("block");
                setPaper(ctc);
                return;
            }
        })
    }
    return (
        <Grid
            container
            direction="row"
            className={classes.root}>
            <div className={classes.salaryComps}>
            {ctc.map(ctc => {
                    return <BarCard selectSlip={selectSlip} name={ctc.company_name} year={(ctc.from).substr(0, 4)} month={months[parseInt((ctc.from).substr(5, 7))]} key={ctc._id} id={ctc._id} />
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
                </Paper>
            </div>
            <Fab color="secondary" aria-label="edit" className={classes.Fab} onClick={() => {
                setForm({ toggle: !form.toggle, open: true });
            }}>
                <EditIcon />
            </Fab>
            <CTCInputForm  key={form} openDialog={form} />
            {/* <CTCInputForm/> */}
        </Grid>
    );
}

export default CTCPanel;