import React,{useState} from 'react';
import {Form, Button, Modal} from 'react-bootstrap';
import style from '../css/Login.module.css';
import axios from 'axios';
import {sha256} from 'js-sha256';
export default () => {
    const [passwd, setPasswd] = useState("");
    const [email, setEmail] = useState("");
    const [prefer, setPrefer] = useState(false);
    const [error, setError] = useState(false);
    const handlePasswdChange = (e) => {
        setPasswd(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePrefer = (e) => {
        console.log(e.target.value);
        setPrefer(e.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
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
            }
        } catch(e){
            setError(true);
        }
    }
    return(
        <div>
            <Form className={style.LoginContainer} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswdChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>주력 언어</Form.Label>
                    <Form.Control as="select" onChange={handlePrefer} multiple>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="cplusplus">Cplusplus</option>
                        <option value="go">Go</option>
                    </Form.Control>
                </Form.Group>
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
        </div>
    );
}