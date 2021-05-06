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
import { addCTC} from './helper/apicalls';
import { isAuthenticated } from '../auth';

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

export default function CTCInputForm({ openDialog,updatePanel}) {
    const classes = useStyles();
    const { authToken } = isAuthenticated();
    const handleChange = (name) => (event) => {
        let valueData = name == 'doc' ? event.target.files[0] : event.target.value
        setValue({ ...value, [name]: valueData });
        formData.set(name, valueData);
    };
    let date = new Date();
    const [value, setValue] = useState({
        from: date.getFullYear() + "-" + ((date.getMonth() + 1) < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1)),
        company_name: 'Newgen Software',
        basic_salary: 1500,
        flexi_basket: 900,
        variable_pay: 500,
        provident_fund: 400,
        statutory_bonus: 0,
        gratuity: 0,
        health_benefit: 0,
        insurance:0,
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
        annual_ctc: parseInt(value.basic_salary)+parseInt(value.provident_fund)+parseInt(value.statutory_bonus)+parseInt(value.gratuity)+ parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.health_benefit)+parseInt(value.insurance)
    })
    const [open, setOpen] = useState(openDialog.open);
    const handleClose = () => {
        setOpen(false);
    };
    const submitSalary = () => {
        addCTC(authToken, formData).then(response => {
            updatePanel(response.response);
            handleClose();
        })
    }
    useEffect(() => {
        setSalary({
            annual_ctc: parseInt(value.basic_salary)+parseInt(value.provident_fund)+parseInt(value.statutory_bonus)+parseInt(value.gratuity)+ parseInt(value.flexi_basket) + parseInt(value.variable_pay) + parseInt(value.health_benefit)+parseInt(value.insurance)
        });
        formData.set('annual_ctc', salary.annual_ctc);
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
                <DialogTitle id="form-dialog-title">Add CTC</DialogTitle>
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
                                label="Company Name" value={value.company_name} onChange={handleChange("from")} />
                            <TextField id="From" type="month" className={classes.textField}
                                label="From" value={value.from} onChange={handleChange("from")} />
                            <TextField id="Basic" className={classes.textField}
                                label="Basic" value={value.basic_salary} onChange={handleChange("basic_salary")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}

                        >
                            <TextField id="FlexiBasket" className={classes.textField}
                                label="Flexi Basket" value={value.flexi_basket} onChange={handleChange("flexi_basket")} />
                            <TextField id="provident_fund" className={classes.textField}
                                label="Provident Fund" value={value.provident_fund} onChange={handleChange("provident_fund")} />
                            <TextField id="statutory_bonus" className={classes.textField}
                                label="Statutory Bonus" value={value.statutory_bonus} onChange={handleChange("statutory_bonus")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}

                        >
                            <TextField id="Variable Pay" className={classes.textField}
                                label="Variable Pay" value={value.variable_pay} onChange={handleChange("variable_pay")} />
                            
                            <TextField id="gratuity" className={classes.textField}
                                label="Gratuity" value={value.gratuity} onChange={handleChange("gratuity")} />
                            <TextField id="health_benefit" className={classes.textField}
                                label="Health Care Benefit" value={value.health_benefit} onChange={handleChange("health_benefit")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-around"
                            style={{ margin: '10px 0' }}
                        >
                            <TextField id="insurance" className={classes.textField}
                                label="Insurance" value={value.insurance} onChange={handleChange("insurance")} />
                            <TextField id="annual_ctc" className={classes.textField}
                                label="Annual CTC" value={salary.annual_ctc} onChange={handleChange("annual_ctc")} />
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
