import styled from "styled-components";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import InicisAuthentication from "../components/InicisAuthentication";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { alertSuccess, alertWarning, alertError } from "../hooks/useAlert";
import { findUserInfoApi } from "../api/api";

import {
  nameRegex,
  phoneRegex1,
  phoneRegex2,
  phoneRegex3
} from "../utils/regex";

const FindUserId = () => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger
  } = useForm({
    mode: "onBlur"
  });

  const isValidAuth = useRef(false); //  인증여부
  const mobileNo = useRef("");
  const [hasId, setHasId] = useState(false);
  const [findInfo, setFindInfo] = useState([]);
  const navigate = useNavigate();

  const [inicisModalOpen, setInicisModalOpen] = useState(false);
  const HandleInicisModal = () => setInicisModalOpen(!inicisModalOpen);

  // 인증
  const authRequest = (e) => {
    e.preventDefault();

    if (isValidAuth.current)
      return alertSuccess({ title: "이미 인증되었습니다." });

    HandleInicisModal();
  };

  // 이니시스
  const inicisCallback = (data) => {
    console.log(data);
    console.log(data.userPhone);

    const formatPhoneNumber = (phoneNumber) => {
      // 비숫자 문자 제거
      const cleanNumber = phoneNumber.replace(/\D/g, "");

      let part1;
      let part2;
      let part3;

      // 숫자만 11자리가 맞는지 확인
      if (cleanNumber.length !== 11) {
        // 번호 분할
        part1 = cleanNumber.substring(0, 3); // 첫 3자리
        part2 = cleanNumber.substring(3, 6); // 중간 3자리
        part3 = cleanNumber.substring(6); // 마지막 4자리
      } else {
        // 번호 분할
        part1 = cleanNumber.substring(0, 3); // 첫 3자리
        part2 = cleanNumber.substring(3, 7); // 중간 4자리
        part3 = cleanNumber.substring(7); // 마지막 4자리
      }

      setValue("phone", part1);
      setValue("phone2", part2);
      setValue("phone3", part3);
    };

    setValue("userNm", data.userName);
    formatPhoneNumber(data.userPhone);

    isValidAuth.current = true;
    const validation = async () => {
      await trigger("phone");
      await trigger("phone2");
      await trigger("phone3");
      await trigger("userNm");
    };
    validation();
    HandleInicisModal();
  };

  // 아이디찾기
  const onSubmit = async (data) => {
    const userInfo = (data) => {
      // 인증여부
      if (!isValidAuth.current) {
        alertWarning({
          title: "휴대폰 인증 필요"
        });
        return;
      }
      mobileNo.current =
        getValues("phone") + getValues("phone2") + getValues("phone3");

      const formData = {
        ...data,
        mobileNo: mobileNo.current
      };
      return formData;
    };

    const info = await userInfo(data);

    //서버전송
    if (info) {
      const findInfo = await findUserInfoApi(info);
      //console.log("findInfo: ", findInfo);
      if (findInfo.userNm === getValues("userNm")) {
        setHasId(!hasId);
        setFindInfo(findInfo);
      }
    }
  };

  const handleIdCopy = (e) => {
    console.log(e.target.innerText);
  };

  const handleToLogin = () => {
    navigate(`/`);
  };

  const temp = () => {
    setHasId(!hasId);
  };

  return (
    <>
      <FindIdWrap>
        {!hasId && (
          <>
            <h2>아이디 찾기</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="이름"
                erroMsg={errors["userNm"]?.message}
                inputProps={{
                  placeholder: "이름을 입력해주세요.",
                  readOnly: true,
                  defaultValue: "",
                  onClick: (e) => authRequest(e),
                  ...register("userNm", {
                    pattern: {
                      value: nameRegex.regex,
                      message: nameRegex.message
                    }
                  })
                }}
              ></FormInput>
              <InputWrap>
                <FormInput
                  label="휴대폰"
                  erroMsg={
                    (errors["phone"] || errors["phone2"] || errors["phone3"])
                      ?.message
                  }
                  inputProps={{
                    type: "text",
                    readOnly: true,
                    defaultValue: "",
                    onClick: (e) => authRequest(e),
                    ...register("phone", {
                      pattern: {
                        value: phoneRegex1.regex,
                        message: phoneRegex1.message
                      }
                    })
                  }}
                ></FormInput>
                <FormInput
                  inputProps={{
                    type: "text",
                    readOnly: true,
                    defaultValue: "",
                    onClick: (e) => authRequest(e),
                    ...register("phone2", {
                      pattern: {
                        value: phoneRegex2.regex,
                        message: phoneRegex2.regex
                      }
                    })
                  }}
                ></FormInput>
                <FormInput
                  inputProps={{
                    type: "text",
                    readOnly: true,
                    defaultValue: "",
                    onClick: (e) => authRequest(e),
                    ...register("phone3", {
                      pattern: {
                        value: phoneRegex3.regex,
                        message: phoneRegex3.regex
                      }
                    })
                  }}
                >
                  <Button
                    onClick={(e) => {
                      authRequest(e);
                    }}
                  >
                    인증
                  </Button>
                </FormInput>
              </InputWrap>
              <Button size="lg" type="submit">
                아이디 찾기
              </Button>
            </Form>
          </>
        )}
        {inicisModalOpen && (
          <InicisAuthentication
            isOpen={inicisModalOpen}
            closeModal={HandleInicisModal}
            width="500px"
            callback={inicisCallback}
          />
        )}
        {hasId && (
          <UserInfoWrap>
            <UserInfo>
              <p>
                <span>{findInfo?.userNm}</span> 님의 아이디는
              </p>
              <p>
                <span onClick={(e) => handleIdCopy(e)}>{findInfo.userId}</span>
                입니다.
              </p>
            </UserInfo>
            <Button size="lg" onClick={handleToLogin}>
              확인
            </Button>
          </UserInfoWrap>
        )}
      </FindIdWrap>
      <Button onClick={temp}>버튼</Button>
    </>
  );
};

export default FindUserId;

const FindIdWrap = styled.div`
  background-color: #fff;
  width: 700px;
  height: 400px;
  margin: auto;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 35px;

  h2 {
    margin: 15px 10px;
    padding: 0 0 20px 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;

  > button {
    margin: 1.5rem 0 1rem 1rem;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UserInfoWrap = styled.div`
  width: 630px;
  height: 400px;
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
`;

const UserInfo = styled.div`
  font-size: 1.8rem;
  align-items: center;
  padding: 50px;

  p {
    margin: 15px;
    text-align: center;
  }
  span {
    font-weight: bold;
  }
`;
