import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { isAuthenticated } from '../auth';
import { loadBalance } from './helper/apicalls';
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit"
import InputForm from './InputForm';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        borderBottom: '2px solid black',
        padding: 10,
        height: '15vh'
    },
    balance: {
        height: '100%'
    },
    balanceText: {
        height: '50%',
        fontSize: 14,
        color: '#fff',
        margin: 0
    },
    button: {
        margin: 'auto 0',
        fontSize: 30,
        color: '#fff'
    },
    money: {
        height: '50%',
        fontSize: 28,
        color: '#fff',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        margin: 0
    }
});

export default function BalanceCard() {
    const [balance, setBalance] = useState(0);
    const classes = useStyles();
    const [form, setForm] = useState(false);
    const { authToken } = isAuthenticated();
    useEffect(() => {
        loadBalance(authToken).then(data => {
            setBalance(data.balance);
        });
    }, []);
    return (
        <Grid
            container
            direction="row"
            justify="space-between"
            className={classes.root}
        >
            <Grid item className={classes.balance}>
                <Typography className={classes.balanceText} color="textSecondary" gutterBottom>
                    Balance
                </Typography>
                <Typography variant="h5" className={classes.money} component="h2">
                    ₹ {balance}
                </Typography>
            </Grid>
            <Grid item className={classes.button}>

                {/* <Fab color="primary" aria-label="edit" size="small">
                    <EditIcon  />
                </Fab> */}
                <IconButton aria-label="delete" className={classes.button} size="small" onClick={() => {
                    setForm(true);
                    console.log('fab', form);
                }}>
                    <AddBoxIcon fontSize="inherit" />
                </IconButton>
                <InputForm key={form} openDialog={form} />
            </Grid>

        </Grid>
    );
}
