import React, { Component } from 'react';
import {Grid, Paper, IconButton,TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CodeWrapper from './postCode.js';
import Stepper from './stepper.js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import EditorConvertToHTML from './editor.js';

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
        background: '#EFF8FB',
        alignItems:'center'
    },
    headerin : {
        width:'40%',
        marginLeft:'2rem'
    },

    footer : {
        minHeight:'5vh',
        background: '#EFF8FB',
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
        maxHeight:"50vh"
    },
    edit:{
        background: '#FFF',
        color: theme.palette.text.primary,
        fontSize:'1.2rem'
    }
}));
export default() => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Grid container className={classes.header} >
                <Grid item xs={12}>
                <TextField className={classes.headerin} required label="포스트 제목" defaultValue="" />
                </Grid>
            </Grid>
            <Grid container className={classes.paper} direction="row">
                    <Grid className={classes.edit} item xs={7} >
                        <EditorConvertToHTML />
                    </Grid>
                    <Grid item className={classes.text} xs={5}>
                        <Grid container direction="row"  >
                            <Grid item className={classes.code} xs={12}>
                                <CodeWrapper props={{number:0, formal:"public class Test {\n\tpublic static void main(String[] args) {\n\n\t}\n}", prefer:"java", num:0}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <div></div>
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