import React, {useState, useRef} from 'react';
import style from '../../css/Login.module.css';
import {TextareaAutosize} from '@material-ui/core';
import CircularIntegration from './code.js';
export default ({props}) => {
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
        <div style={{
            marginTop:'1.5rem',
            marginBottom:'1.5rem'}}>
            <TextareaAutosize className={style.CodeArea2} aria-label="minimum height" rowsMin={3} 
            defaultValue={formal} onKeyDown={handleKeyDown} onChange={handleCode}
            ref={textArea} value={code}/>
            <CircularIntegration props={{number:number, code:code, prefer:props.prefer, num:props.number}}/>
        </div>
    );
};