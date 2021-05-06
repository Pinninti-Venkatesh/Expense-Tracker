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
import '../dashboard.scss';
const useStyles = makeStyles({
    list: {
        color: '#fff',
        width: '100%'
    },
    textFields: {
        width: '20%'
    },
    buttonHidden:{
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 1s, width 0.5s,opacity 1s linear',
    },
    buttonAppear:{
        visibility: 'visible',
        opacity: 1,
        transition: 'width 0.5s,opacity 1s,visibility 1s linear',
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
                <IconButton variant="outlined" color="secondary" className={showDelete?classes.buttonAppear:classes.buttonHidden}  onClick={() => { onDelete(id) }}>
                <Delete/>
                </IconButton>
                {/* {<Button endIcon={<Delete/>} className={showDelete?classes.buttonAppear:classes.buttonHidden} variant="contained" color="secondary" onClick={() => { onDelete(id) }}></Button>} */}
            </ListItem>
            <Divider />
        </React.Fragment>
    );
}

export default TransactionComponent;