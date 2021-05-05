import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = makeStyles({
    cardContent:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10
    },
    card:{
        // height:'8%',
        width:'85%',
        marginBottom:'20px'
    },
    typography:{
        margin:0,

    }
})
const BarCard = ({name,month,year,id,selectSlip}) => {
    const classes=styles();
    return (
        <Card className={classes.card}>
        <CardActionArea onClick={()=>{
            selectSlip(id);
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
    </Card>
    );
}
 
export default BarCard;