import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../reducers/action";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailRegex, passwordRegex } from "../utils/regex";
import FormInput from "../components/FormInput";

const Login = () => {
  const { register, handleSubmit, setFocus, formState } = useForm({
    mode: "onBlur"
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // page 진입시
  useEffect(() => {
    setFocus("userId");
  }, []);

  const handleSignup = async () => {
    navigate(`/signup`);
  };
  const handleFindId = async () => {
    navigate(`/findUserId`);
  };
  const handleFindPwd = async () => {
    navigate(`/findUserPwd`);
  };

  const onSubmit = (data) => {
    console.log("data", data);
    dispatch(login(data));
  };

  return (
    <LoginWrap>
      <Button
        type="submit"
        sizeStyle="lg"
        onClick={() => {
          dispatch(login({ userId: "test3", userPwd: "1" }));
        }}
      >
        로그인
      </Button>

      <LoginBox>
        <h1>CHATBOT</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px"
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            icon={
              <FontAwesomeIcon
                icon={faUser}
                size="sm"
                color="rgba(0,0,0,0.5)"
                style={{ marginRight: "5px" }}
              />
            }
            erroMsg={formState.errors["userId"]?.message}
            inputProps={{
              placeholder: "아이디",
              type: "text",
              ...register("userId", {
                pattern: {
                  value: emailRegex.regex,
                  message: emailRegex.message
                },
                required: {
                  value: true,
                  message: "아이디를 입력해주세요."
                }
              })
            }}
          />
          <FormInput
            icon={
              <FontAwesomeIcon
                icon={faLock}
                size="sm"
                color="rgba(0,0,0,0.5)"
                style={{ marginRight: "5px" }}
              />
            }
            erroMsg={formState.errors["userPwd"]?.message}
            inputProps={{
              placeholder: "비밀번호",
              type: "text",
              ...register("userPwd", {
                pattern: {
                  value: passwordRegex.regex,
                  message: passwordRegex.message
                },
                required: {
                  value: true,
                  message: "비밀번호를 입력해주세요."
                }
              })
            }}
          />
          <Button type="submit" sizeStyle="lg">
            로그인
          </Button>
        </form>
        <ButtonWrap>
          <SingupBtn onClick={handleSignup}>회원가입</SingupBtn>
          <FindIdBtn onClick={handleFindId}>아이디 찾기</FindIdBtn>
          <FindPwdBtn onClick={handleFindPwd}>비밀번호 찾기</FindPwdBtn>
        </ButtonWrap>
      </LoginBox>
    </LoginWrap>
  );
};

export default Login;

const LoginBox = styled.div`
  background-color: #fff;
  width: 600px;
  height: 400px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 35px;
`;

const LoginWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  height: 100%;
`;
const ButtonWrap = styled.div`
  display: flex;
  color: #0077ff;
  margin-top: 10px;
`;
const SingupBtn = styled.span`
  cursor: pointer;
`;
const FindIdBtn = styled.span`
  cursor: pointer;
  margin-left: auto;
  padding-right: 5px;
`;
const FindPwdBtn = styled.span`
  cursor: pointer;
  padding-left: 5px;
`;
