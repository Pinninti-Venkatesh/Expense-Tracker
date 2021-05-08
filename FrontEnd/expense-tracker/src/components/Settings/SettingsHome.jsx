import React, { useState, useEffect } from 'react';
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import { isAuthenticated } from '../auth';
import { updatePassword } from './helper/apicalls';
const SettingsHome = () => {
    const {authToken}=isAuthenticated();
    const handleChange = (name) => (event) => {
        setPassword({ ...password, [name]: event.target.value });
    }
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error,setError]=useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    const changePassword=()=>{
        if(password.confirmPassword!=password.newPassword){
            setError({...error,newPassword:true,confirmPassword:true});
            return;
        }
        updatePassword(authToken,password).then(response=>{
            if(response['error']){
                setError({newPassword:false,confirmPassword:false,oldPassword:true});
            }else{
            setError({oldPassword:false,newPassword:false,confirmPassword:false});
                alert('done');
            }
        })
    }
    return (
        <Paper style={{height:'fit-content',width:'400px',margin:'auto'}}>
            <Grid
                container
                direction="column"
                justify="space-evenly"
                style={{ height: '300px', width: '300px', color: '#fff',margin:'20px auto' }}
            >
                <TextField error={error.oldPassword} label="Old Password" type="password" value={password.oldPassword} onChange={handleChange("oldPassword")}></TextField>
                <TextField error={error.newPassword} label="New Password" type="password" value={password.newPassword} onChange={handleChange("newPassword")}></TextField>
                <TextField error={error.confirmPassword} label="Confirm Password" type="password" value={password.confirmPassword} onChange={handleChange("confirmPassword")}></TextField>
                <Button variant="outlined" color="primary" onClick={()=>{changePassword()}}>
                    Change Password
                </Button>
            </Grid>
            {/* <Snackbar open={true} autoHideDuration={6000}>Successfully Done</Snackbar> */}
        </Paper>

    );
}

export default SettingsHome;