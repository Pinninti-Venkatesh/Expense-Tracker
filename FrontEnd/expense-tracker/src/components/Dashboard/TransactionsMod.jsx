import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from '../auth';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { getAllTransactions } from './helper/apicalls';
import TransactionComponent from './TransactionComponent';
const months=["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
];

const useStyles = makeStyles({
    card: {
        height: '45%',
        width: '25%',
        margin: '10px  20px'
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#fff',
        margin: '0 10px',

    },
    chip: {
        margin: '0 5px',
        color: '#fff'
    },
    listItem: {
        color: '#fff'
    },
    money: {
        marginBottom: 0,
        marginTop: 5
    }
});
const TransactionsMod = () => {
    const classes = useStyles();
    const handleChipClick = p => {
        console.log(p);
        let routeName = p == 'D' ? 'dailyCagExpenses' : p == 'W' ? 'weeklyCagExpenses' : 'monthlyCagExpenses';
        console.log(routeName);
        // getCategoricalExpenses(authToken, routeName).then(res => {
        //     let apiResObject = res.response;
        //     console.log('api response hclick'+routeName,apiResObject);
        //     let cardsJSONdup = cardsJSON.map(element => {
        //         element.total=0;
        //         apiResObject.forEach(apiObj => {
        //             if (element.name == apiObj._id) {
        //                 element.total = apiObj.total;
        //             }
        //         });
        //         return element;
        //     })
        //     setCardJSON(cardsJSONdup);
        // });
    }
    const { authToken } = isAuthenticated();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        getAllTransactions(authToken).then(res => {
            setTransactions(res.response);
        }).catch(err => {
            console.log('error in TransactionsMod', err);
        });
    }, [])
    return (
        <div className="transaction-mod"

        >
            <Typography variant="body2" component="div" variant="h4" m={2} className={classes.head}>
                Transactions
                <Grid item >
                    <Chip
                        className={classes.chip}
                        label="D"
                        onClick={() => {
                            handleChipClick('D');
                        }}
                        m={1}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        className={classes.chip}
                        label="W"
                        onClick={() => {
                            handleChipClick('W');
                        }}
                        size="small"
                        variant="outlined"
                    />
                    <Chip
                        className={classes.chip}
                        label="M"
                        onClick={() => {
                            handleChipClick('M');
                        }}
                        size="small"
                        variant="outlined"
                    />
                </Grid>
            </Typography>
            <List
                style={{
                    width: '100%',
                    overflow: 'scroll',
                    height: '85%',
                    padding: 0
                }}
            >
                {transactions.map(transaction => {
                    let transactionDate=new Date(transaction.createdAt);

                    return <TransactionComponent category={transaction.category} description={transaction.description} date={months[transactionDate.getMonth()]+" "+transactionDate.getDate()} value={transaction.type=="Earn"?"+"+transaction.value:"-"+transaction.value} />
                })}
            </List>
            {/* </Grid> */}
        </div>
    );
}

export default TransactionsMod;