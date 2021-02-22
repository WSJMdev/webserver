import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper} from '@material-ui/core';
import Tab from './tab.js';
import Tabmin from './tabmin.js';
import Hidden from '@material-ui/core/Hidden';
import {useSelector} from 'react-redux';
import PostContainer from '../post/container.js';
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
    const menu = useSelector(state => state.menu.menu);
    if(menu == 0){
        return (
            <Grid container justify="center" direction="column" className={classes.root} spacing={0}>
                <Hidden smDown>
                <Paper  elevation={0} className={classes.paper} >
                    <Tab />
                </Paper>
                </Hidden>
                <Hidden smUp>
                <Paper  elevation={0} className={classes.paper} >
                    <Tabmin />
                </Paper>
                </Hidden>
            </Grid>
        );
    } else if (menu == 1){
        return (
            <PostContainer className={classes.root}/>
        );
    }
}