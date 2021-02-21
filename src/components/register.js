import React,{useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextareaAutosize} from '@material-ui/core';
import style from '../css/Login.module.css';
import axios from 'axios';
import {sha256} from 'js-sha256';
import {useDispatch, useSelector} from 'react-redux';
import {login, logout} from '../store/state/login.js';
import ProblemWrapper from './problem/problemWrapper.js';
import {javaformal, pythonformal, cplusformal }   from './problem/problemSet.js';
export default () => {
    const dispatch = useDispatch();
    const [passwd, setPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [prefer, setPrefer] = useState(false);
    const [error, setError] = useState(false);
    const [test, setTest] = useState(false);
    const testr = useSelector(state => state.user.testr);

    const handlePasswdChange = (e) => {
        setPasswd(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePrefer = (e) => {
        setTest(false);
        setPrefer(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(testr);
        if(testr != 2){
            setTest(true);
        }
        else {
            try{
                if(passwd.length >= 20){
                    setError(true);
                    throw Error;
                }
                console.log("보내드리는 json의 구조는 다음과 같습니다. 이 때, password는 암호화되서 전송됩니다~",{
                    email:email,
                    password:sha256(passwd),
                    language:prefer
                });
                let result = await axios.post(process.env.REACT_APP_SERVER_HOST+"/users",{
                    email:email,
                    password:sha256(passwd),
                    language:prefer
                })
                if(result.status === 201){
                    dispatch(login(result));
                }
            } catch(e){
                dispatch(logout());
                setError(true);
            }
        }
    }

    const Problem = () => {
        switch (prefer) {
            case "java":
            if(testr == 0){
                return (
                    <ProblemWrapper props={{number:testr,formal:javaformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
                );
            }
            else if(testr == 1){
                return (
                    <ProblemWrapper props={{number:testr, formal:javaformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
                );
            }
            break;
            case "python" :
            if(testr == 0)
                return (
                    <ProblemWrapper props={{number:testr + 2, formal:pythonformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
                );
            else if(testr == 1){
                return (
                    <ProblemWrapper props={{number:testr + 2, formal:pythonformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
                );
            }
            break;
            case "cplusplus":
            if(testr == 0)
            return (
                <ProblemWrapper props={{number:testr + 4, formal:cplusformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
            );
            else if(testr == 1){
                return (
                    <ProblemWrapper props={{number:testr + 4, formal:cplusformal, test:test, testr:testr, prefer:prefer}} setTest={setTest} />
                );
            }
            case "go":
                return (
                    <p>아직 언어 지원안함</p>
                );
        }
        return (
            <div></div>
        );
    }

    return(
        <div className={style.In}>
            <Form className={style.LoginContainer} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswdChange}/>
                </Form.Group>
                <FormControl component="fieldset">
                <FormLabel component="legend">언어</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" onChange={handlePrefer}>
                    <FormControlLabel value="java" control={<Radio />} label="Java" />
                    <FormControlLabel value="python" control={<Radio />} label="Python" />
                    <FormControlLabel value="cplusplus" control={<Radio />} label="Cplusplus" />
                    <FormControlLabel value="go" control={<Radio />} label="Go" />
                </RadioGroup>
                </FormControl>
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="약관 동의" />
                </Form.Group>
                <Button className={style.LoginButton} variant="outline-primary" type="submit">
                    회원가입
                </Button>
            </Form>

            <Modal
                    size="sm"
                    show={error}
                    onHide={() => setError(false)}
                    aria-labelledby="example-modal-sizes-title-sm"
                >
                    <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        입력을 다시 한 번 확인해주세요
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>패스워드는 20글자 이하여야 합니다.<br/>
                    이메일 / 패스워드를 다시 한 번 확인해 주세요.
                    </Modal.Body>
            </Modal>
            <Problem />
        </div>
    );
}