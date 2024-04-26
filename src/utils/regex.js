// 유효성 검사

/**
 * 이메일 유효성 검사 정규식
 */
export const emailRegex = {
  regex:
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  message: "이메일 형식으로 입력해주세요"
};

/**
 * 비밀번호 유효성 검사 정규식
 */
export const passwordRegex = {
  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[!@#])[\da-zA-Z!@#]{8,}$/,
  message: "비밀번호는 숫자, 영문, 특수문자를 포함한 8자 이상이어야 합니다."
};

/**
 * 이름 유효성 검사 정규식
 */
export const nameRegex = {
  regex: /^[가-힣]+$/,
  message: "한글만 입력해주세요"
};

/**
 * 핸드폰번호 유효성 검사 정규식
 */
export const phoneRegex = {
  regex: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
  message: "휴대폰 번호를 입력해주세요"
};
/**
 * 핸드폰번호 첫번째 유효성 검사 정규식
 */
export const phoneRegex1 = {
  regex: /^01([0|1|6|7|8|9])$/,
  message: "올바른 번호를 입력해주세요"
};
/**
 * 핸드폰번호 두번째 유효성 검사 정규식
 */
export const phoneRegex2 = {
  regex: /^([0-9]{3,4})$/,
  message: "올바른 번호를 입력해주세요"
};
/**
 * 핸드폰번호 세번째 유효성 검사 정규식
 */
export const phoneRegex3 = {
  regex: /^([0-9]{4})$/,
  message: "올바른 번호를 입력해주세요"
};

/**
 * 숫자 유효성 검사 정규식
 */
export const numberRegex = {
  regex: /^[0-9]*$/,
  message: "숫자만 입력해주세요"
};
