import { makeStyles } from "@material-ui/core/styles"
import React, { useState } from 'react';
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton"
import Delete from "@material-ui/icons/Delete"
const styles = makeStyles({
    cardContent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    card:{
        // height:'8%',
        display:'flex',
        flexDirection:'row',
        width:'95%',
        marginBottom:'20px'
    },
    typography:{
        margin:0,
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
})
const BarCard = ({name,month,year,id,onSelect,onDelete}) => {
    const classes=styles();
    const [showDelete,setShowDelete]=useState(false);

    return (
        <Card className={classes.card}
        onMouseEnter={()=>{
            setShowDelete(true);
        }}
        onMouseLeave={
            ()=>{
                setShowDelete(false);
            }
        }
        >
            
        <CardActionArea onClick={()=>{
            onSelect(id);
        }}>
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom className={classes.typography}>
                    {name}
                </Typography>
                <div
                style={{display:"flex",flexDirection:"row",width:'20%',justifyContent:"space-between"}}>
                <Typography gutterBottom className={classes.typography}>
                    {month}
                </Typography>
                <Typography gutterBottom className={classes.typography}>
                    {year}
                </Typography>
                </div>
            </CardContent>
        </CardActionArea>
        <IconButton variant="outlined" color="secondary" className={showDelete?classes.buttonAppear:classes.buttonHidden}  onClick={() => { onDelete(id) }}>
                <Delete/>
        </IconButton>
    </Card>
    );
}
 
export default BarCard;