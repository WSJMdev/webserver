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
    /* State
    passwd : 비밀번호
    email : 이메일
    prefer : 언어
    error : 에러 (for Modal)
    test : 
    testr : 테스트 정답 확인, js 직접 바꿀 줄 아는 인원은 회원가입 문항 정도는 그냥 풀기 때문에, 굳이 백엔드에서 처리하지 않음
    */
    const [passwd, setPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [prefer, setPrefer] = useState(false);
    const [error, setError] = useState(false);
    const [test, setTest] = useState(false);
    const testr = useSelector(state => state.user.testr);

    //입력
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
    //제출
    const handleSubmit = async (event) => {
        event.preventDefault(); //리로드방지
        if(testr != 2){
            setTest(true);
        }
        else {
            try{
                if(passwd.length >= 20){    // 예외 : 패스워드의 길이는 20글자보다 작아야한다. 
                    setError(true);
                    throw Error;
                }
                // axios post to /users
                let result = await axios.post(process.env.REACT_APP_SERVER_HOST+"/users",{
                    email:email,
                    password:sha256(passwd),
                    language:prefer
                })
                //회원가입이 잘되면, 자동로그인(토큰을 받는다.)
                if(result.status === 201){
                    console.log(result);
                    dispatch(login(result));
                }
            } catch(e){
                //회원가입실패
                dispatch(logout());
                setError(true);
            }
        }
    }

    // 회원가입 테스트를 위한 언어별 문제를 담고 있는 컴포넌트
    // switch 문을 굳이 안 써도 되나, 테스트 과정에서 채점서버와 병행으로 구현하였기 때문에,
    // 그 과정에서 작성된 switch문.
    // 성능상 굳이 바꾸지 않아도됨
    // @dev 한 언어만 통과해도 되는 구조를 가입을 원하는 언어를 통과해야하는 구조로 바꿀지는 미지수
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

    // 회원가입을 입력
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