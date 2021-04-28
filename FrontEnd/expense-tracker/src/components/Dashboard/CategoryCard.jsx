import React, { useState, useEffect } from 'react';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    card: {
        height: '45%',
        width:'25%',
        margin:'10px  20px'
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
    money: {
        marginBottom: 0,
        marginTop: 5
    }
});

const CategoryCard = ({name,total}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="body2" component="div" className={classes.balance}>
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2" className={classes.money}>
                ₹ {total}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default CategoryCard;