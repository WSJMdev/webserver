import React, {useState, useRef} from 'react';
import style from '../../css/Login.module.css';
import {Modal} from 'react-bootstrap';
import {TextareaAutosize} from '@material-ui/core';
import CircularIntegration from './IntegrationBtn.js';
import {javaprob} from './problemSet.js';
export default ({props, setTest}) => {
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
        <Modal
        className={style.Box}
        size="lg"
        show={props.test && props.testr != 2}
        onHide={() => setTest(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
                <Modal.Title className={style.Ti} id="example-modal-sizes-title-sm">
                    {javaprob[number].title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <br />
                <h6 className={style.Tex}>{javaprob[number].text}</h6>
                <br />
                <TextareaAutosize className={style.CodeArea} aria-label="minimum height" rowsMin={3} 
                defaultValue={formal} onKeyDown={handleKeyDown} onChange={handleCode}
                ref={textArea} value={code}/>
                <CircularIntegration props={{number:number, code:code, prefer:props.prefer, num:props.number}}/>
            </Modal.Body>
        </Modal>
    );
};