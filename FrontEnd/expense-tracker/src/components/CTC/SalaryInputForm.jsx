import React, { useEffect, useState, useRef } from 'react';
import MenuItem from "@material-ui/core/MenuItem"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { addSalary } from './helper/apicalls';
import { isAuthenticated } from '../auth';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        // backgroundColor:'#495766',
        // direction: 'row'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
        color: 'black'
    },
    input: {
        display: 'none'
    },
    uploadButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
        color: 'black'
    }
}));

export default function InputForm({ openDialog }) {
    const classes = useStyles();
    const { authToken } = isAuthenticated();
    const handleChange = (name) => (event) => {
        let valueData = name == 'doc' ? event.target.files[0] : event.target.value
        setValue({ ...value, [name]: valueData });
        formData.set(name, valueData);
    };
    let date = new Date();
    const [value, setValue] = useState({
        YearMonth: date.getFullYear() + "-" + ((date.getMonth() + 1) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)),
        company_name: 'Newgen Software',
        basic: 1500,
        flexi_basket: 900,
        variable_pay: 500,
        PF: 400,
        tax: 0,
        deductions: 0,
        reversal: 0,
        doc: '',
        formData: new FormData()
    });
    const { formData } = value;
    for (const [key, data] of Object.entries(value)) {
        if (key != 'formData') {
            formData.set(key, data);
        }
    }
    const [salary, setSalary] = useState({
        net_salary: parseInt(value.basic) + parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.reversal) - (parseInt(value.PF) + parseInt(value.deductions) + parseInt(value.tax)),
        total_salary: parseInt(value.basic) + parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.reversal)

    })
    const [open, setOpen] = useState(openDialog.open);
    const handleClose = () => {
        setOpen(false);
    };
    const submitSalary = () => {
        addSalary(authToken, formData).then(response => {
            handleClose();
            // window.location.reload();
        })
    }
    useEffect(() => {
        setSalary({
            net_salary: parseInt(value.basic) + parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.reversal) - (parseInt(value.PF) + parseInt(value.deductions) + parseInt(value.tax)),
            total_salary: parseInt(value.basic) + parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.reversal)
        });
        formData.set('net_salary', salary.net_salary);
        formData.set('total_salary', salary.total_salary);
    }, [value]);
    useEffect(() => {
        setOpen(openDialog.open);
    }, [openDialog]);

    useEffect(() => {
        // getCategories(authToken).then(res => {
        //     setCategories(res.response);
        // })
    }, []);

    return (
        <div>
            <Dialog open={open} onClose={handleClose}
                aria-labelledby="form-dialog-title"
                scroll={'body'}
            >
                <DialogTitle id="form-dialog-title">Add Salary</DialogTitle>
                <DialogContent>
                    <form
                        className={classes.root}
                        noValidate autoComplete="off">
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}
                        >
                            <TextField id="CompanyName" className={classes.textField}
                                label="Company Name" value={value.company_name} onChange={handleChange("YearMonth")} />
                            <TextField id="YearMonth" type="month" className={classes.textField}
                                label="YearMonth" value={value.YearMonth} onChange={handleChange("YearMonth")} />
                            <TextField id="Basic" className={classes.textField}
                                label="Basic" value={value.basic} onChange={handleChange("basic")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}

                        >
                            <TextField id="FlexiBasket" className={classes.textField}
                                label="Flexi Basket" value={value.flexi_basket} onChange={handleChange("flexi_basket")} />
                            <TextField id="Variable Pay" className={classes.textField}
                                label="Variable Pay" value={value.variable_pay} onChange={handleChange("variable_pay")} />
                            <TextField id="PF" className={classes.textField}
                                label="Provident Fund" value={value.PF} onChange={handleChange("PF")} />

                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}

                        >
                            <TextField id="tax" className={classes.textField}
                                label="tax" value={value.tax} onChange={handleChange("tax")} />
                            <TextField id="deductions" className={classes.textField}
                                label="Deductions" value={value.deductions} onChange={handleChange("deductions")} />
                            <TextField id="reversal" className={classes.textField}
                                label="Reversal" value={value.reversal} onChange={handleChange("reversal")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}

                        >
                            <TextField id="net_salary" className={classes.textField}
                                label="Net Salary" value={salary.net_salary} onChange={handleChange("net_salary")} />
                            <TextField id="total_salary" className={classes.textField}
                                label="Total Salary" value={salary.total_salary} onChange={handleChange("total_salary")} />
                            <div className={classes.uploadButton}>
                                <input
                                    id="doc"
                                    onChange={handleChange("doc")}
                                    accept="application/pdf"
                                    className={classes.input}
                                    type="file"
                                />
                                <label htmlFor="doc">
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
                                </label>
                            </div>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            submitSalary();
                        }}
                    >Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
