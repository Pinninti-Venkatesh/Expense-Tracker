import React, { useState, useEffect } from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import BarCard from './BarCard';
import { getAllSalary } from "./helper/apicalls";
import { isAuthenticated } from "../auth";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import InputForm from "./SalaryInputForm";
import Divider from "@material-ui/core/Divider";
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
        height: "100%",
    },
    paperGrid: {
        margin:'25px 0',
        height:'80%'
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
        net_salary: 0
    });
    const [paperDisplay,setPaperDisplay]=useState("none");
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { authToken } = isAuthenticated();
    const [form, setForm] = useState({
        toggle: true,
        open: false
    });
    useEffect(() => {
        getAllSalary(authToken).then(res => {
            setSalaries(res.response);
        })
    }, []);
    const selectSlip = id => {
        salaries.forEach(salary => {
            if (salary._id == id) {
                setPaperDisplay("block");
                setPaper(salary);
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
                {salaries.map(salary => {
                    // var blob = new Blob([salary.doc.data], { type: "application/pdf" });
                    // const link = document.createElement('a');
                    // // Browsers that support HTML5 download attribute
                    // if (link.download !== undefined) {
                    //     const url = URL.createObjectURL(blob);
                    //     link.setAttribute('href', url);
                    //     link.setAttribute('download', "test");
                    //     link.style.visibility = 'hidden';
                    //     document.body.appendChild(link);
                    //     link.click();
                    //     document.body.removeChild(link);
                    // }
                    // var objectUrl = URL.createObjectURL(blob);
                    // window.open(objectUrl);
                    return <BarCard selectSlip={selectSlip} name={salary.company_name} year={(salary.YearMonth).substr(0, 4)} month={months[parseInt((salary.YearMonth).substr(5, 7))]} id={salary._id} />
                })}
            </div>
            <div className={classes.paperComp}>
                <Paper className={classes.paper} style={{display:paperDisplay}}>
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
                </Paper>
            </div>
            <Fab color="secondary" aria-label="edit" className={classes.Fab} onClick={() => {
                setForm({ toggle: !form.toggle, open: true });
            }}>
                <EditIcon />
            </Fab>
            <InputForm key={form} openDialog={form} />
        </Grid>
    );
}

export default SalaryPanel;