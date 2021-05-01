import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { isAuthenticated } from '../auth';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { deleteTransaction, getAllTransactions } from './helper/apicalls';
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
    const { authToken } = isAuthenticated();
    const [transactions, setTransactions] = useState([]);
    let removeTransaction=(id)=>{
        deleteTransaction(authToken,{_id:id}).then(res=>{
            if(res.response=='done'){
                const updatedTransactions =transactions.filter(transaction=>transaction._id!=id);
                setTransactions(updatedTransactions);
            }
            else{
                alert(res);
            }
        }).catch(err=>{
           
        })
        
    };
    useEffect(() => {
        getAllTransactions(authToken).then(res => {
            setTransactions(res.response);
        }).catch(err => {
            console.log('error in TransactionsMod', err);
        });
    }, []);
    return (
        <div className="transaction-mod">
            <Typography variant="body2" component="div" variant="h4" m={2} className={classes.head}>
                Transactions
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

                    return <TransactionComponent id={transaction._id} category={transaction.category} description={transaction.description} date={months[transactionDate.getMonth()]+" "+transactionDate.getDate()} value={transaction.type=="Earn"?"+"+transaction.value:"-"+transaction.value} onDelete={removeTransaction} />
                })}
            </List>
        </div>
    );
}

export default TransactionsMod;