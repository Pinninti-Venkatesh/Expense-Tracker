import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
const useStyles=makeStyles({
    list:{
        color: '#fff',
        width:'100%'

    },
    textFields:{
        width:'20%'
    }
});

const TransactionComponent = ({id,category,description,date,value,onDelete}) => {
    const classes=useStyles();
    return (
        <ListItem className={classes.list}>
            <Grid container
                direction="row"
                justify="space-between"
                className={classes.list}
            >
                <Typography className={classes.textFields}>{category}</Typography>
                <Typography className={classes.textFields} noWrap={true}>{description}</Typography>
                <Typography className={classes.textFields}>{date}</Typography>
                <Typography className={classes.textFields}>₹ {value}</Typography>
                <Button varitant="contained" color="secondary" onClick={()=>{onDelete(id)}}>Delete</Button>
            </Grid>
        </ListItem>
    );
}

export default TransactionComponent;