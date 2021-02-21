import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, IconButton, Accordion} from '@material-ui/core';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import CodeWrapper from '../code/codeWrapper.js';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
/*
props는
title

context : [{detailed:string, formal:string, language:string}] 을 지닌다.
*/
const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightBold,
    },
    contextBox: {
        display:'block',
        'font-family': '-apple-system, BlinkMacSystemFont,"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    lovecon:{
        marginLeft: 'auto',
        color: red[500],
        height:'1rem'
    }
}));

export default ({props}) => {
    const classes = useStyles();
    const Context = () => {
        const childlist =  props.context.map(elem =>
            <Typography style={{textAlign:'left', width:'100%'}}>
                {elem.detailed.split('\n').map((line)=> {
                return  <Typography>
                    {line}</Typography>
                    })}
                <CodeWrapper props={{number:0, formal:elem.formal, prefer:elem.language, num:0}}/>
            </Typography>
        );
        return (
           <div >{childlist}</div>
        );
    }
    return (
        <Accordion>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography className={classes.heading}>{props.title}</Typography>
            <IconButton className={classes.lovecon}>
                <FavoriteIcon />
            </IconButton>
            <pre>{props.pos}</pre>
            </AccordionSummary>
            <AccordionDetails className={classes.contextBox}>
                <Context/>
            </AccordionDetails>
        </Accordion>
    );
}