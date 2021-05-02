import React, { useEffect, useState } from 'react';
import MenuItem from "@material-ui/core/MenuItem"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import { createTransaction, getCategories } from './helper/apicalls';
import { isAuthenticated } from '../auth';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        height: 150
        // direction: 'row'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 125,
        color: 'black'
    }
}));
export default function InputForm({ openDialog }) {
    const classes = useStyles();
    const { authToken } = isAuthenticated();
    const handleChange = (name) => (event) => {
        setValue({ ...value, [name]: event.target.value });
    };
    const [value, setValue] = useState({
        type: 'Expense',
        value: '',
        category: '',
        SOE: '',
        description: '',
        paydate: '',
        validity:'',
        open: openDialog
    });
    const [categories, setCategories] = useState([{}]);
    const handleClose = () => {
        setValue({ ...value, 'open': false });
    };
    const submitTransaction=()=>{
        createTransaction(authToken,value).then(response=>{
            handleClose();
            window.location.reload();
        })
    }
    const styles = theme => ({
        multilineColor: {
            color: 'black'
        }
    });
    useEffect(() => {
        getCategories(authToken).then(res => {
            console.log('ressss', res.response);
            setCategories(res.response);
        })
    }, [true]);
    return (
        <div>
            <Dialog open={value.open} onClose={handleClose}
                fullWidth={true}
                // maxWidth={true}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create Transaction</DialogTitle>
                <DialogContent>
                    <form
                        className={classes.root}
                        noValidate autoComplete="off">
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                        >
                            <TextField
                                id="type"
                                className={classes.textField}
                                label="Type"
                                select
                                value={value.type}
                                onChange={handleChange("type")}
                            >
                                <MenuItem key="Expense" value="Expense">Expense</MenuItem>
                                <MenuItem key="Earn" value="Earn">Earn</MenuItem>
                            </TextField>

                            <TextField
                                id="category"
                                className={classes.textField}
                                label="Category"
                                select
                                value={value.category}
                                onChange={handleChange("category")}
                            >
                                {categories.map(category => {
                                    if (category.type == value.type) {
                                        return <MenuItem key={category.name} value={category.name}>{category.name}</MenuItem>
                                    }
                                })}

                            </TextField>
                            <TextField id="value" className={classes.textField}
                                label="Value" value={value.value} onChange={handleChange("value")} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            m={5}
                        >
                            <TextField
                                id="SOE"
                                className={classes.textField}
                                label="SOE"
                                select
                                value={value.SOE}
                                onChange={handleChange("SOE")}
                            >
                                <MenuItem key="Salary" value="Salary">Salary</MenuItem>
                                <MenuItem key="Savings" value="Savings">Savings</MenuItem>
                            </TextField>
                            <TextField
                                id="description"
                                className={classes.textField}
                                label="Description"
                                multiline
                                rowsMax={4}
                                value={value.description}
                                onChange={handleChange("description")}
                            />
                            {value.category == 'Bills' &&
                                <TextField
                                    id="paydate"
                                    className={classes.textField}
                                    label="Pay Date"
                                    type="date"
                                    // defaultValue="2017-05-24"
                                    value={value.paydate}
                                    // className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={handleChange("paydate")}
                                />
                            }
                            {value.category == 'Bills' &&
                                <TextField id="validity" className={classes.textField}
                                label="Validity" value={value.validity} onChange={handleChange("validity")} />
                            }

                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button
                         onClick={()=>{
                            submitTransaction();
                         }} 
                        color="Submit" >Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
