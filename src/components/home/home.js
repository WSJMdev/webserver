import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper} from '@material-ui/core';
import Tab from './tab.js';
const useStyles = makeStyles((theme) => ({
    root : {
        height : '100%',
        width :'100%',
        flexGrow: 1
    },
    paper: {
        height: '100%',
        width: '100%',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

}));
export default() => {
    const classes = useStyles();
    return (
        <Grid container justify="center" direction="column" className={classes.root} spacing={0}>
            <Paper elevation={0} className={classes.paper} >
                <Tab />
            </Paper>
        </Grid>
    );


}