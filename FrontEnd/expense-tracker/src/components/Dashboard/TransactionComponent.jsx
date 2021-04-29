import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
const useStyles=makeStyles({
    list:{
        color: '#fff',
        width:'100%'

    },
    textFields:{
        width:'20%'
    }
})
const TransactionComponent = ({category,description,date,value}) => {
    const classes=useStyles();
    return (
        <ListItem className={classes.list}>
            <Grid container
                direction="row"
                justify="space-between"
                className={classes.list}
            >
                <Typography className={classes.textFields}>{category}</Typography>
                <Typography className={classes.textFields}>{description}</Typography>
                <Typography className={classes.textFields}>{date}</Typography>
                <Typography className={classes.textFields}>₹ {value}</Typography>
            </Grid>
        </ListItem>
    );
}

export default TransactionComponent;