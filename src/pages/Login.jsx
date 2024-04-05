import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN, login } from "../reducers/action";
const Login = () => {
  const [loginKeep, setLoginKeep] = useState(false);

  // const handleCheck = () => {
  //   setLoginKeep((prevLoginKeep) => !prevLoginKeep);
  // };

  const dispatch = useDispatch();
  const userId = useRef();
  const userPwd = useRef();

  const handleChange = (e, type) => {
    const value = e.target.value;

    type.current = value;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const param = {
      userId: userId.current,
      userPwd: userPwd.current
    };

    dispatch(login(param));
  };

  return (
    <LoginWrap>
      <LoginForm>
        <h1>CHATBOT</h1>
        <IdPwWrap>
          <IdPwItem>
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              color="rgba(0,0,0,0.5)"
              style={{ marginRight: "5px" }}
            />
            <IdPwInput
              onChange={(e) => handleChange(e, userId)}
              type="text"
              placeholder="아이디"
            />
          </IdPwItem>
          <IdPwItem>
            <FontAwesomeIcon
              icon={faLock}
              size="sm"
              color="rgba(0,0,0,0.5)"
              style={{ marginRight: "5px" }}
            />
            <IdPwInput
              onChange={(e) => handleChange(e, userPwd)}
              type="text"
              placeholder="비밀번호"
            />
          </IdPwItem>
        </IdPwWrap>
        <KeepWrap>
          <KeepCheck
            type="checkbox"
            name=""
            id="login-keep"
            // checked={loginKeep}
            // onChange={handleCheck}
          />
          <KeepLabel htmlFor="login-keep">로그인 상태 유지</KeepLabel>
        </KeepWrap>
        {/* <p>존재하지 않는 아이디 입니다.</p> */}
        <Button sizeStyle="lg" onClick={handleLogin}>
          로그인
        </Button>
      </LoginForm>
    </LoginWrap>
  );
};

export default Login;

const LoginWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
`;

const LoginForm = styled.form`
  background-color: #fff;
  width: 600px;
  height: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 35px;
`;

const IdPwWrap = styled.div`
  /* padding: 0 20px; */
`;

const IdPwItem = styled.div`
  padding: 16px 18px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  &:last-child {
    border-radius: 0 0 12px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
  }
`;

const IdPwInput = styled.input`
  border: none;
  outline: none;
`;
const KeepWrap = styled.div`
  margin-bottom: 20px;
`;
const KeepCheck = styled.input``;
const KeepLabel = styled.label`
  color: rgba(0, 0, 0, 0.5);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const loginValidText = styled.p`
  color: #ff003e;
`;
