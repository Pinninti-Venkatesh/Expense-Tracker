import React, { useState } from 'react';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton"
import Delete from "@material-ui/icons/Delete"
const useStyles = makeStyles({
    list: {
        color: '#fff',
        width: '100%'
    },
    textFields: {
        width: '20%'
    },
    Dbutton:{
        // width:'20%',
        transition:'2s',
        animationName:'deleteButton',
        animationDuration:'2s'
        // animation-name: example;
        // animation-duration: 4s;
    }
});

const TransactionComponent = ({ id, category, description, date, value, onDelete }) => {
    const classes = useStyles();
    const [showDelete,setShowDelete]=useState(false);
    return (
        <React.Fragment>
            <ListItem
                onMouseEnter={()=>{
                    setShowDelete(true);
                }}
                onMouseLeave={
                    ()=>{
                        setShowDelete(false);
                    }
                }
            className={classes.list}>
                <Grid container
                    direction="row"
                    justify="space-around"
                    // align="center"
                    className={classes.list}
                >
                    <Typography className={classes.textFields}>{category}</Typography>
                    <Typography className={classes.textFields} noWrap={true}>{description}</Typography>
                    <Typography className={classes.textFields}>{date}</Typography>
                    <Typography className={classes.textFields}>₹ {value}</Typography>
                </Grid>
                {showDelete &&<Button endIcon={<Delete/>} variant="contained" className={classes.Dbutton} color="secondary" onClick={() => { onDelete(id) }}>Delete</Button>}
            </ListItem>
            <Divider />
        </React.Fragment>
    );
}

export default TransactionComponent;