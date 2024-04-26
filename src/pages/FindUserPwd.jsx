import styled from "styled-components";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import InicisAuthentication from "../components/InicisAuthentication";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  alertSuccess,
  alertWarning,
  alertError,
  alertConfirm
} from "../hooks/useAlert";
import { findUserInfoApi, UpdateUserPwdApi } from "../api/api";

import {
  emailRegex,
  passwordRegex,
  phoneRegex1,
  phoneRegex2,
  phoneRegex3
} from "../utils/regex";

const FindUserPwd = () => {
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
  const userNm = useRef("");
  const watchUserPwd = watch("userPwd");
  const [hasPwd, setHasPwd] = useState(false);
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

    formatPhoneNumber(data.userPhone);
    userNm.current = data.userName;

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

  // 계정확인
  const onSubmitId = async (data) => {
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
        mobileNo: mobileNo.current,
        userNm: userNm.current
      };
      return formData;
    };
    userInfo(data);

    const info = await userInfo(data);

    //서버전송
    if (info) {
      console.log("서버전송");
      const findInfo = await findUserInfoApi(info);
      //console.log("findInfo: ", findInfo);

      if (findInfo.userId === getValues("userId")) {
        alertConfirm({
          icon: "success",
          title: "계정 확인",
          text: "패스워드를 변경하시겠습니까?",
          callback: () => {
            setHasPwd(!hasPwd);
          }
        });
      } else {
        alertWarning({
          title: "일치하는 계정이 없습니다."
        });
      }
    }
  };

  // 비밀번호 변경
  const onSubmitPwd = async (data) => {
    const formData = {
      ...data,
      mobileNo: mobileNo.current,
      userNm: userNm.current
    };
    console.log(formData);
    if (data.userId) {
      UpdateUserPwdApi(formData)
        .then((res) => {
          if (res.status == "OK") {
            alertSuccess({
              title: "변경이 완료되었습니다.",
              callback: async () => {
                navigate(`/`);
              }
            });
          }
        })
        .catch((err) => alertError(err));
    }
  };

  const temp = () => {
    setHasPwd(!hasPwd);
  };

  return (
    <>
      {!hasPwd && (
        <FindPwdWrap>
          <h2>패스워드 찾기</h2>
          <Form onSubmit={handleSubmit(onSubmitId)}>
            <FormInput
              label="아이디"
              erroMsg={errors["userId"]?.message}
              inputProps={{
                type: "text",
                placeholder: "이메일을 입력해주세요.",
                ...register("userId", {
                  pattern: {
                    value: emailRegex.regex,
                    message: emailRegex.message
                  },
                  required: {
                    value: true,
                    message: "이메일 입력은 필수입니다."
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
              확인
            </Button>
          </Form>
        </FindPwdWrap>
      )}
      {inicisModalOpen && (
        <InicisAuthentication
          isOpen={inicisModalOpen}
          closeModal={HandleInicisModal}
          width="500px"
          callback={inicisCallback}
        />
      )}
      {hasPwd && (
        <FindPwdWrap>
          <h2>패스워드 변경</h2>
          <Form onSubmit={handleSubmit(onSubmitPwd)}>
            <FormInput
              label="패스워드"
              erroMsg={errors["userPwd"]?.message}
              inputProps={{
                type: "password",
                placeholder: "패스워드를 입력해주세요.",
                ...register("userPwd", {
                  pattern: {
                    value: passwordRegex.regex,
                    message: passwordRegex.message
                  },
                  required: {
                    value: true,
                    message: "패스워드를 입력해주세요."
                  }
                })
              }}
            ></FormInput>
            <FormInput
              label="패스워드 확인"
              erroMsg={errors["userPwdChk"]?.message}
              inputProps={{
                type: "password",
                placeholder: "패스워드를 한번 더 입력해주세요.",
                ...register("userPwdChk", {
                  validate: (value) =>
                    value === watchUserPwd || "패스워드가 일치하지 않습니다.",
                  required: {
                    value: true,
                    message: "패스워드를 확인해주세요."
                  }
                })
              }}
            ></FormInput>
            <Button size="lg" type="submit">
              확인
            </Button>
          </Form>
        </FindPwdWrap>
      )}
      <Button onClick={temp}>버튼</Button>
    </>
  );
};

export default FindUserPwd;

const FindPwdWrap = styled.div`
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
  width: 100%;
  heigh: 100%;
  margin: 20px auto;

  > button {
    margin: 1.5rem 0 1rem 1rem;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
