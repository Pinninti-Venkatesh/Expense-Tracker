import React, { useState, useEffect } from 'react';
import { Link, Redirect,useHistory} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import './login.scss'
import { Typography, Button } from '@material-ui/core';
import {API} from '../../backend';
import { authenticate, signIn } from '../auth';
const Login = () => {
    const handleChange = (name) => (event) => {
        setAuth({ [name]: event.target.value });
    };
    const [auth, setAuth] = useState({
        email: 'venky@gmail.com',
        password: '123456',
        error:false,
        redirect:false
    });
    const {email,password}=auth;
    if(auth.redirect){
        return <Redirect to='/dashboard' />
    }
    let login=event=>{
        signIn({email,password}).then(response=>{
            if(response.error){
                setAuth({...auth,error:true});
                return;
            }
            authenticate(response,()=>{
                setAuth({...auth,redirect:true});
            });
            
            
        }).catch(err=>{
            console.log('error in loging in',err);
        });
        
    };

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{
                height: '100%',
                width: '100%'
            }}
            spacing={3}
        >
            <Grid item>
                <Typography variant="h1">Say the Magic Word</Typography>
            </Grid>
            <Grid item >
                <TextField id="username" value={auth.email} style={{ display: 'none' }} disabled></TextField>
                <TextField error={auth.error} id="password" type="password" style={{ width: 300 }} value={auth.password} onChange={handleChange("password")}></TextField>
            </Grid>
            <Grid item >
                <Button variant='contained' onClick={()=>{login();}}>Login</Button>
            </Grid>
        </Grid>
    );
}

export default Login;