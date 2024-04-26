import styled from "styled-components";
import Modal from "../components/Modal";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import InicisAuthentication from "../components/InicisAuthentication";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { alertSuccess, alertWarning, alertError } from "../hooks/useAlert";
import { getUserInfoApi, updateUserInfoApi } from "../api/api";
// import { DevTool } from "@hookform/devtools";
import {
  nameRegex,
  passwordRegex,
  phoneRegex1,
  phoneRegex2,
  phoneRegex3
} from "../utils/regex";

const UserProfile = () => {
  const {
    register,
    watch,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    trigger
    //control
  } = useForm({
    mode: "onBlur"
  });

  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
  const isValidAuth = useRef(false); //  인증여부
  const mobileNo = useRef("");
  const watchUserPwd = watch("userPwd");
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate();

  const [inicisModalOpen, setInicisModalOpen] = useState(false);
  const HandleInicisModal = () => setInicisModalOpen(!inicisModalOpen);

  // 프로필 가져오기
  useEffect(() => {
    const setData = async () => {
      //console.log(userId);
      const profile = await getUserInfoApi(userId);
      setProfile(profile);
    };
    setData();
  }, []);

  // 인증
  const authRequest = (e) => {
    e.preventDefault();

    if (isValidAuth.current)
      return alertSuccess({ title: "이미 인증되었습니다." });

    HandleInicisModal();
  };

  const inicisCallback = (data) => {
    //console.log(data);

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

  // 프로필수정
  const onSubmit = async (data) => {
    const userInfo = (data) => {
      // watch, getValues, setValue는 input창이 활성화된 경우만 값이 들어감.
      //console.log("data: ", data);

      data.userId = profile.userId;

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
      //console.log("formData: ", formData);
      return formData;
    };

    const info = await userInfo(data);

    if (info) {
      //서버전송
      console.log(info);
      updateUserInfoApi(info)
        .then((res) => {
          if (res.status == "OK") {
            alertSuccess({
              title: "수정",
              text: res.message,
              callback: async () => {
                navigate(`/`);
              }
            });
          }
        })
        .catch((err) => alertError(err));
    }
  };

  return (
    <>
      <UserInfoWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="아이디"
            erroMsg={errors["userId"]?.message}
            inputProps={{
              readOnly: true,
              defaultValue: profile?.userId
            }}
          ></FormInput>
          <FormInput
            label="패스워드"
            erroMsg={errors["userPwd"]?.message}
            inputProps={{
              type: "password",
              defaultValue: "",
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
              defaultValue: "",
              ...register("userPwdChk", {
                validate: (value) =>
                  value === watchUserPwd || "일치하지 않습니다.",
                required: {
                  value: true,
                  message: "패스워드를 확인해주세요."
                }
              })
            }}
          ></FormInput>
          <FormInput
            label="이름"
            erroMsg={errors["userNm"]?.message}
            inputProps={{
              type: "text",
              readOnly: true,
              onClick: (e) => authRequest(e),
              defaultValue: profile?.userNm,
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
                onClick: (e) => authRequest(e),
                defaultValue: profile?.mobileNo?.slice(0, 3),
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
                onClick: (e) => authRequest(e),
                defaultValue: profile?.mobileNo?.slice(3, 7),
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
                onClick: (e) => authRequest(e),
                defaultValue: profile?.mobileNo?.slice(7),
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
            수정
          </Button>
        </Form>
        {/* <DevTool control={control} /> */}
      </UserInfoWrap>
      {inicisModalOpen && (
        <InicisAuthentication
          isOpen={inicisModalOpen}
          closeModal={HandleInicisModal}
          width="500px"
          callback={inicisCallback}
        />
      )}
    </>
  );
};

export default UserProfile;

const UserInfoWrap = styled.div`
  width: 750px;
  heith: auto;
  margin: 50px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;

  > button {
    margin-left: 1rem;
  }

  div:first-child div input {
    cursor: default;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
