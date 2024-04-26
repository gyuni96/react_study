import styled from "styled-components";
import Modal from "../components/Modal";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowRightLong,
  faLongArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { alertSuccess, alertWarning, alertError } from "../hooks/useAlert";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserIdApi, saveUserInfoApi } from "../api/api";
import { get, useForm } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";
import {
  emailRegex,
  nameRegex,
  passwordRegex,
  phoneRegex,
  phoneRegex1,
  phoneRegex2,
  phoneRegex3
} from "../utils/regex";

import InicisAuthentication from "../components/InicisAuthentication";

const SignUp = () => {
  const {
    register,
    watch,
    handleSubmit,
    setFocus,
    getValues,
    setValue,
    formState: { errors },
    trigger
    //control
  } = useForm({
    mode: "onBlur"
  });

  const isValidId = useRef(false); //  중복확인여부
  const isValidAuth = useRef(false); //  인증여부
  const watchUserId = watch("userId");
  const watchUserPwd = watch("userPwd");
  const watchTermsAllYn = watch("termsAllYn");
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const modalBackground = useRef("");
  const navigate = useNavigate();

  const [inicisModalOpen, setInicisModalOpen] = useState(false);
  const HandleInicisModal = () => setInicisModalOpen(!inicisModalOpen);

  // id 중복확인
  const handleIdCheck = async (e) => {
    e.preventDefault();

    // 유효성검사실행 (입력없이 버튼누른경우)
    const isValid = await trigger("userId");

    // id중복확인여부 체크
    if (!isValid) {
      return;
    }

    //서버전송
    const id = getValues("userId");
    checkUserIdApi(id)
      .then((res) => {
        if (res.status == "OK")
          alertSuccess({
            title: "사용가능한 아이디 입니다."
          });
        // 인증완료여부 저장
        isValidId.current = true;
      })
      .catch((err) => alertError(err));
  };

  // 인증버튼클릭
  const authRequest = async (e) => {
    e.preventDefault();

    if (isValidAuth.current)
      return alertSuccess({ title: "이미 인증되었습니다." });

    HandleInicisModal();
  };

  const inicisCallback = (data) => {
    console.log(data);

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

  // 이용약관 일괄체크
  useEffect(() => {
    //console.log(watchTermsAllYn);
    setValue("termsUseYn", watchTermsAllYn ? true : false);
    setValue("personalInfoTermsUseYn", watchTermsAllYn ? true : false);
  }, [watchTermsAllYn]);

  // 이용약관 모달창 열기
  const ModalOpen = (e) => {
    const modal = e.currentTarget.dataset.modal;
    setModalOpen(modal === "def" ? true : false);
    setModal2Open(modal === "opt" ? true : false);
  };

  // 이용약관 모달창 닫기
  const ModalClose = () => {
    setModalOpen(false);
    setModal2Open(false);
  };

  // id중복확인 여부 체크
  useEffect(() => {
    isValidId.current = false;
  }, [watchUserId]);

  // 회원가입
  const onSubmit = async (data) => {
    const userInfo = (data) => {
      if (!isValidId.current) {
        alertWarning({
          title: "이메일 중복확인은 필수입니다."
        });
        return;
      }
      if (!isValidAuth) {
        alertWarning({
          title: "휴대폰 인증 필요"
        });
      }

      // 이용약관 값넣기
      if (data.termsUseYn || data.termsAllYn) {
        data.termsUseYn = data.termsUseYn ? "Y" : "N";
        data.personalInfoTermsUseYn = data.personalInfoTermsUseYn ? "Y" : "N";
      } else {
        alertWarning({
          title: "필수 이용약관에 동의해주세요."
        });
        return;
      }
      const mobileNo =
        getValues("phone") + getValues("phone2") + getValues("phone3");

      // 휴대폰번호 넣기
      const formData = { ...data, mobileNo: mobileNo };
      return formData;
    };

    const info = await userInfo(data);

    if (info) {
      //서버전송
      console.log(info);
      saveUserInfoApi(info)
        .then((res) => {
          if (res.status == "OK") {
            alertSuccess({
              title: "가입이 완료되었습니다.",
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
          >
            <Button
              type="button"
              //disabled={!dirtyFields.userId}
              onClick={(e) => {
                handleIdCheck(e);
              }}
            >
              중복확인
            </Button>
          </FormInput>
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
          <FormInput
            label="이름"
            erroMsg={errors["userNm"]?.message}
            inputProps={{
              type: "text",
              placeholder: "이름을 입력해주세요.",
              onClick: (e) => authRequest(e),
              readOnly: true,
              ...register("userNm", {
                pattern: {
                  value: nameRegex.regex,
                  message: nameRegex.message
                },
                required: {
                  value: true,
                  message: "이름을 입력해주세요."
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
                ...register("phone", {
                  pattern: {
                    value: phoneRegex1.regex,
                    message: phoneRegex1.message
                  },
                  required: {
                    value: phoneRegex.regex,
                    message: phoneRegex.message
                  }
                })
              }}
            ></FormInput>
            <FormInput
              inputProps={{
                type: "text",
                readOnly: true,
                onClick: (e) => authRequest(e),
                ...register("phone2", {
                  pattern: {
                    value: phoneRegex2.regex,
                    message: phoneRegex2.regex
                  },
                  required: {
                    value: phoneRegex.regex,
                    message: phoneRegex.message
                  }
                })
              }}
            ></FormInput>
            <FormInput
              inputProps={{
                type: "text",
                readOnly: true,
                onClick: (e) => authRequest(e),
                ...register("phone3", {
                  pattern: {
                    value: phoneRegex3.regex,
                    message: phoneRegex3.regex
                  },
                  required: {
                    value: phoneRegex.regex,
                    message: phoneRegex.message
                  }
                })
              }}
            >
              <Button
                sizeStyle="lg"
                onClick={(e) => {
                  authRequest(e);
                }}
              >
                인증
              </Button>
            </FormInput>
          </InputWrap>
          {/***************************** 이용약관 start *****************************/}
          <TermsWrap>
            <div>이용약관동의</div>
            <TermsItem>
              <input
                type="checkbox"
                name="termsAllYn"
                id="termsAllYn"
                {...register("termsAllYn", {
                  required: {
                    valueAsBoolean: true
                  }
                })}
              />
              <TermsText>
                <label htmlFor="termsAllYn">
                  <div>전체 동의합니다.</div>
                </label>
              </TermsText>
            </TermsItem>
            <p>
              선택항목에 동의하지 않은 경우도 회원가입 및 일반적인 서비스를
              이용할 수 있습니다.
            </p>
            <TermsItem>
              <input
                type="checkbox"
                name="termsUseYn"
                id="termsUseYn"
                {...register("termsUseYn", {
                  required: {
                    valueAsBoolean: true
                  }
                })}
              />
              <TermsText>
                <label htmlFor="termsUseYn">
                  <span>이용약관 동의 (필수)</span>
                </label>
              </TermsText>
              <div className="modalBtn">
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  size="xl"
                  data-modal="def"
                  onClick={ModalOpen}
                />
              </div>
            </TermsItem>
            <TermsItem>
              <input
                type="checkbox"
                name="personalInfoTermsUseYn"
                id="personalInfoTermsUseYn"
                {...register("personalInfoTermsUseYn", {
                  required: {
                    valueAsBoolean: false
                  }
                })}
              />
              <TermsText>
                <label htmlFor="personalInfoTermsUseYn">
                  <span>개인정보 수집 및 이용 동의 (선택)</span>
                </label>
              </TermsText>
              <div className="modalBtn">
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  size="xl"
                  data-modal="opt"
                  onClick={ModalOpen}
                />
              </div>
            </TermsItem>
          </TermsWrap>
          <Button size="lg" type="submit">
            가입
          </Button>
        </Form>
        {/* <DevTool control={control} /> */}
      </UserInfoWrap>
      {/***************************** 이용약관 end *****************************/}
      {/***************************** form end *****************************/}

      <Modal
        isOpen={modalOpen}
        title={"이용약관(필수)"}
        closeModal={ModalClose}
        modalBackground={modalBackground}
      >
        <div>이용약관-필수</div>
      </Modal>
      <Modal
        isOpen={modal2Open}
        title={"이용약관(선택)"}
        closeModal={ModalClose}
        modalBackground={modalBackground}
      >
        <div>이용약관-선택</div>
      </Modal>
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

export default SignUp;

const UserInfoWrap = styled.div`
  width: 750px;
  height: auto;
  margin: 50px auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px auto;

  > button {
    margin-left: 1rem;
  }
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TermsWrap = styled.div`
  margin: 30px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.8);

  p {
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  div {
    text-align: center;
    margin: 5px 0;
  }
`;

const TermsItem = styled.div`
  width: 100%;
  margin: 10px 5px;
  display: flex;

  &:first-child {
    flex-direction: column;
  }

  div.modalBtn {
    margin-left: auto;
    margin-right: 30px;
    color: rgba(0, 0, 0, 0.4);
    cursor: pointer;

    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;

const TermsText = styled.div`
  label span {
    margin: 0 20px;
  }

  div {
    color: rgba(0, 0, 0, 0.8);
    font-size: 16px;
    font-weight: bolder;
    margin: 0 20px;
  }

  &:hover {
    color: rgba(0, 0, 0, 0.8);
  }
`;
