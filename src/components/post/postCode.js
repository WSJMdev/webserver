import React, {useState, useRef} from 'react';
import {TextareaAutosize} from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import style from '../../css/Login.module.css';
const useStyles = makeStyles((theme) => ({
    paper: {
        color: theme.palette.text.secondary,
        height:'90vh',
        minHeight:'90vh',
        width:'100%'
    },
    text:{
        overflow:'auto'
    }
}));

export default ({props}) => {
    const classes = useStyles();
    const formal = props.formal;
    const number = props.number;
    const textArea  = useRef();
    const [code, setCode] = useState(formal);
    const handleCode = (e) => {
        setCode(e.target.value);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const { selectionStart, selectionEnd } = e.target;
            const newValue =
            code.substring(0, selectionStart) +
              "\t" +
            code.substring(selectionEnd);

            setCode(newValue);
            if (textArea.current) {
              textArea.current.value = newValue;
              textArea.current.selectionStart = textArea.current.selectionEnd = selectionStart + 1;
            }
        }
    }
    return (
        <div>
            <TextareaAutosize className={style.CodeArea2} rowsMin={25}  rowsMax={25} aria-label="minimum height"
            defaultValue="#include <iostream>" onKeyDown={handleKeyDown} onChange={handleCode}
            ref={textArea} value={code}/>
        </div>
    );
};//<CircularIntegration props={{number:number, code:code, prefer:props.prefer, num:props.number}}/>