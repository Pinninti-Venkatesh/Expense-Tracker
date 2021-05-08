import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import BarCard from './BarCard';
import { getAllSalary, removeSalary } from "./helper/apicalls";
import { isAuthenticated } from "../auth";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import InputForm from "./SalaryInputForm";
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
const styles = makeStyles((theme)=>({
    root: {
        [theme.breakpoints.up('md')]:{
            flexDirection:'row',
            height: '100%',
            width: '100%',
            boxSizing:'border-box'
        },
        [theme.breakpoints.down('md')]:{
            flexDirection:'column',
            width: '100%',
            boxSizing:'border-box'
        },
    },
    salaryComps: {
        [theme.breakpoints.up('md')]:{
            width: '55%',
        },
        [theme.breakpoints.down('md')]:{
            width: '100%',
        },
        overflow: 'scroll',
        height: '100%'
    },
    paperComp: {
        [theme.breakpoints.up('md')]:{
            width: '45%',
        },
        [theme.breakpoints.down('md')]:{
            width: '100%',
        },
    },
    Fab: {
        position: 'absolute',
        right: '3%',
        bottom: '5%'
    },
    paper: {
        [theme.breakpoints.up('md')]:{
            height: "100%",
        },
        position:'relative'
    },
    paperGrid: {
        margin: '25px 0 0 0',
        height: '70%'
    },
    textField: {
        fontSize: 17,
        margin: '5px 0'
    },
    boldTextField: {
        fontSize: 17,
        fontWeight: 500
    },
    downloadIcon:{
        position:'absolute',
        top:0,
        right:0,
        padding:'6px'
    }
}))
const SalaryPanel = () => {
    const classes = styles();
    const [salaries, setSalaries] = useState([]);
    const [paper, setPaper] = useState({
        YearMonth: "2021-5",
        basic: 0,
        flexi_basket: 0,
        variable_pay: 0,
        reversal: 0,
        total_salary: 0,
        PF: 0,
        tax: 0,
        deductions: 0,
        net_salary: 0,
        doc: ''
    });
    const [paperDisplay, setPaperDisplay] = useState("none");
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { authToken } = isAuthenticated();
    const [form, setForm] = useState({
        toggle: true,
        open: false
    });
    useEffect(() => {
        getAllSalary(authToken).then(res=> {
            if(res.response){
                setSalaries(res.response);
            }
        })
    }, [salaries]);
    const downloadDoc = doc => {
        console.log('file', doc);
        var a = document.createElement("a");
        var dataURI = "data:" + "application/pdf" +
            ";base64," +doc;
        a.href = dataURI;
        a['download'] = "payslip-"+paper.YearMonth+".pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    const updateSalary=newSalary=>{
        console.log('in here',newSalary);
        let updatedsalary=salaries;
        updatedsalary.push(newSalary);
        setSalaries(updatedsalary);
    }

    const selectSlip = id => {
        salaries.forEach(salary => {
            if (salary._id == id) {
                setPaperDisplay("block");
                setPaper(salary);
                return;
            }
        })
    }
    const deletePaySlip=id=>{
        removeSalary({id},authToken).then(res=>{
            if(res.response=='S'){
                let updatedSalary=salaries.filter(salary=>{
                    return salary._id!=id;
                });
                setSalaries(updatedSalary);
            }
        })
    }
    return (
        <Grid
            container
            className={classes.root}>
            <div className={classes.salaryComps}>
                {salaries.map(salary => {
                    return <BarCard onDelete={deletePaySlip} onSelect={selectSlip} name={salary.company_name} year={(salary.YearMonth).substr(0, 4)} month={months[parseInt((salary.YearMonth).substr(5, 7))]} id={salary._id} />
                })}
            </div>
            <div className={classes.paperComp}>
                <Paper className={classes.paper} style={{ display: paperDisplay }}>
                    <Typography align="center" variant="h4">
                        {paper.company_name}
                    </Typography>
                    <Typography align="center" variant="h5">
                        {(paper.YearMonth).substr(0, 4)} {months[parseInt((paper.YearMonth).substr(5, 7))]}
                    </Typography>
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
                                Reversal
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                Total Salary
                            </Typography>
                            <Typography className={classes.textField}>
                                PF
                            </Typography>
                            <Typography className={classes.textField}>
                                Tax
                            </Typography>
                            <Typography className={classes.textField}>
                                Deductions
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                Net Salary
                            </Typography>
                        </div>
                        <div >
                            <Typography className={classes.textField}>
                                {paper.basic}
                            </Typography >
                            <Typography className={classes.textField}>
                                {paper.flexi_basket}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.variable_pay}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.reversal}
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                {paper.total_salary}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.PF}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.tax}
                            </Typography>
                            <Typography className={classes.textField}>
                                {paper.deductions}
                            </Typography>
                            <Typography className={classes.boldTextField}>
                                {paper.net_salary}
                            </Typography>
                        </div>
                    </Grid>
                    <IconButton  className={classes.downloadIcon}variant="outlined" onClick={() => { downloadDoc(paper.doc) }}>
                        <GetAppIcon />
                    </IconButton>
                </Paper>
            </div>
            <Fab color="secondary" aria-label="edit" className={classes.Fab} onClick={() => {
                setForm({ toggle: !form.toggle, open: true });
            }}>
                <EditIcon />
            </Fab>
            <InputForm updatePanel={updateSalary} key={form} openDialog={form} />
        </Grid>
    );
}

export default SalaryPanel;