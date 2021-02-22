import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { sha256 } from 'js-sha256';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {login} from '../store/state/login.js';
import TT from './a.js';
const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: '35ch',
      }
    },
    btn : {
        width: '30ch',
        margin: '1ch',
        height: '6ch'
    }
}));

export default ({func}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePassword = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (event) => {
        dispatch(login());
        /* After backend created, use this statements.
        try{
            console.log({
                email : email,
                password : sha256(password)
            });
            let result = await axios.post(process.env.REACT_APP_SERVER_HOST + "/auth", {
                email : email,
                password : sha256(password)
            });
            if(result.status === 200){
                dispatch(login(result.token));
            }
        } catch(e) {
            console.log("로그인 실패");
        }*/
    }




    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
                <TextField
            required
            id="outlined-required"
            label="Email"
            defaultValue=""
            variant="outlined"
            alignItems="center"
            onChange={handleEmail}
            />
                <TextField
            required
            id="outlined-required"
            label="Password"
            defaultValue=""
            variant="outlined"
            alignItems="center"
            onChange={handlePassword}
            />
            <Button className={classes.btn} variant="contained" color="primary" onClick={handleSubmit}>
                로그인
            </Button>
            <Button className={classes.btn} variant="contained" color="secondary" onClick={()=>{func(false);}}>
                회원가입
            </Button>
        </Grid>
        </form>
    );
};