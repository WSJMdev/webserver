import React from 'react';
import {Grid, Paper, IconButton,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CodeWrapper from './postCode.js';
import Stepper from './stepper.js';
const useStyles = makeStyles((theme) => ({
    root : {
        height: '100vh',
        minHeight:'100vh',
        flexGrow:1
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height:'90vh',
        minHeight:'90vh',
        width:'100%'
    },
    header : {
        minHeight:'5vh',
        background: '#B4E5FF',
        textAlign:'center',
        alignItems:'center'
    },
    footer : {
        minHeight:'5vh',
        background: '#B4E5FF',
        alignItems:'center',
        textAlign:'right'
    },
    saveicon:{
        marginLeft: 'auto'
    },
    text:{
        overflow:'auto'
    },
    code:{
        maxHeight:"45vh"
    }
}));




export default() => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container className={classes.header} >
                <Grid item xs={12}>
                    <h2>당신의 포스트를 작성해주세요</h2>
                </Grid>
            </Grid>
            <Grid container direction="row"  >
                    <Grid item className={classes.text} xs={6} >
                    <TextField className={classes.paper}
                        id="filled-multiline-static"
                        label="글작성"
                        multiline
                        row='auto'
                        defaultValue=""
                        variant="filled"
                    />
                    </Grid>
                    <Grid item className={classes.text} xs={6}>
                        <Grid container direction="row"  >
                            <Grid item className={classes.code} xs={12}>
                                <CodeWrapper props={{number:0, formal:"", prefer:"java", num:0}}/>
                            </Grid>
                            <Grid item className={classes.code} xs={12}>
                                <CodeWrapper props={{number:0, formal:"", prefer:"java", num:0}}/>
                            </Grid>
                        </Grid>
                    </Grid>
            </Grid>
            <Grid container className={classes.footer}>
                <Grid item xs={9} alignContent="center">
                    <Stepper />
                </Grid>
                <Grid item xs={3} alignContent="center">
                    <IconButton className={classes.saveicon}>
                        <SaveIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    );

}