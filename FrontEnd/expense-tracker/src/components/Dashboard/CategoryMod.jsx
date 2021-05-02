import React, { useState, useEffect } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip"
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { isAuthenticated } from '../auth';
import { getCategoricalExpenses } from '../Dashboard/helper/apicalls'
import CategoryCard from './CategoryCard';
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
    money: {
        marginBottom: 0,
        marginTop: 5
    }
});
const CategoryMod = () => {
    const classes = useStyles();
    const handleChipClick = p => {
        console.log(p);
        let routeName = p == 'D' ? 'dailyCagExpenses' : p == 'W' ? 'weeklyCagExpenses' : 'monthlyCagExpenses';
        console.log(routeName);
        getCategoricalExpenses(authToken, routeName).then(res => {
            let apiResObject = res.response;
            console.log('api response hclick'+routeName,apiResObject);
            let cardsJSONdup = cardsJSON.map(element => {
                element.total=0;
                apiResObject.forEach(apiObj => {
                    if (element.name == apiObj._id) {
                        element.total = apiObj.total;
                    }
                });
                return element;
            })
            setCardJSON(cardsJSONdup);
        });
    }
    const { authToken } = isAuthenticated();
    const [cardsJSON, setCardJSON] = useState([{
        name: 'Food',
        total: 0
    }, {
        name: 'Grocery',
        total: 0
    }, {
        name: 'Electronics',
        total: 0
    }, {
        name: 'Gift',
        total: 0
    }, {
        name: 'Bills',
        total: 0
    }, {
        name: 'Miscallenous',
        total: 0
    }
    ]);
    useEffect(() => {
        getCategoricalExpenses(authToken, 'totalCagExpenses').then(res => {
            let apiResObject = res.response;
            let cardsJSONdup = cardsJSON.map(element => {
                apiResObject.forEach(apiObj => {
                    if (element.name == apiObj._id) {
                        element.total = apiObj.total;
                    }   
                });
                return element;
            })
            setCardJSON(cardsJSONdup);
        });
    }, [])
    return (

        <div className="category-mod">
            <Typography variant="body2" component="div" variant="h4" m={2} className={classes.head}>
                Expenses
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
            <Grid
                container
                direction="row"
                style={{
                    width: '100%',
                    overflow: 'scroll',
                    height: '85%'
                }}
                justify="flex-start"

            >
                {cardsJSON.map(cat => {
                    return <CategoryCard name={cat.name} key={cat.name} total={cat.total} />
                })}
            </Grid>
        </div>
    );
}

export default CategoryMod;