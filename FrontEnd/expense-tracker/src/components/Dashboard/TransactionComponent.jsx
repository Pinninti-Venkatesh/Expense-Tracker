import React from 'react';
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
        display:'none',
        transform:'width 2s'
    }
});

const TransactionComponent = ({ id, category, description, date, value, onDelete }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ListItem className={classes.list}>
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
                <Button endIcon={<Delete/>} variant="outlined" color="secondary" onClick={() => { onDelete(id) }}>Delete</Button>
            </ListItem>
            <Divider />
        </React.Fragment>
    );
}

export default TransactionComponent;