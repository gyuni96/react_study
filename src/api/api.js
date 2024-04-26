import axios from "axios";
import store from "../reducers/store";
import { logout } from "../reducers/action";

import { alertSuccess, alertError } from "../hooks/useAlert";

const api = axios.create({
  baseURL: `http://localhost:7077/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // CORS preflight 요청에 필요할 수 있음
    "Content-Type": "application/json"
  }
});

/**
 * request 인터셉터
 */
api.interceptors.request.use(
  (config) => {
    // request 정상
    // header 셋팅
    config.headers["Access-Control-Expose-Headers"] = "Authorization";

    // 토큰 확인
    const token = localStorage.getItem("token") ?? null;
    if (token !== null) {
      config.headers["Authorization"] =
        `Bearer ${JSON.parse(token).accessToken}`;

      config.data.compCd = JSON.parse(localStorage.getItem("user")).compCd;
    }

    return config;
  },
  (error) => {
    //request 에러
    return Promise.reject(error);
  }
);

/**
 * respone 인터셉터
 */
api.interceptors.response.use(
  (response) => {
    //response 정상
    const newToken = response.headers["authorization"];

    if (newToken !== undefined) {
      const token = JSON.parse(localStorage.getItem("token"));
      const oldToken = token.accessToken;
      if (oldToken !== newToken) {
        token.accessToken = newToken.split(/\s+/g)[1];
        localStorage.setItem("token", JSON.stringify(token));
      }
    }

    return response.data;
  },
  (error) => {
    //response 에러
    console.log("에러발생!");
    console.log("error : ", error);

    if (error.response?.status === 401) {
      // 권한 없음
      alertError("로그인이 필요합니다.", error.response.status, () => {
        store.dispatch(
          logout({ userId: JSON.parse(localStorage.getItem("user")).userId })
        );
      });
    } else if (error.code === "ERR_NETWORK") {
      alertError("서버와 통신이 원활하지 않습니다.", error.code);
    } else {
      alertError(error.response?.data.message, error.response?.status);
    }
    return Promise.reject(error);
  }
);

/**
 * 로그인 요청
 * @param {*} param
 * @returns
 */
export const loginApi = async (param) => {
  const response = await api.post(`auth/login`, param);
  return response;
};

/**
 * 로그아웃 요청
 * @param {*} param
 * @returns
 */
export const logoutApi = async (param) => {
  const respone = await api.post(`auth/logout`, param);
  return respone;
};

export const menuApi = async (param) => {
  const respone = await api.post(`auth/menu`, param);

  return respone.data;
};

/**
 * 인텐트 전체 리스트 조회
 * @returns
 */
export const getIntentsApi = async () => {
  const response = await api.post(`intent/all`, {});
  return response.data;
};

/**
 * 인텐트 삭제 요청
 * @param {String} indentId
 * @returns
 */
export const deletedIntendApi = async (indentId) => {
  const response = await api.delete(`intent`, {
    data: { intentId: indentId }
  });
  return response;
};

/**
 * 인텐트 상세 조회
 * @param {String} indentId
 * @returns
 */
export const getIntentInfoApi = async (indentId) => {
  const param = { intentId: indentId };
  const response = await api.post(`intent`, param);

  return response.data;
};

/**
 * 인텐트 상세 저장
 * @param {object} param
 */
export const saveIntentInfoApi = async (param) => {
  const response = await api.put(`intent`, param);

  if (response.status == "OK") {
    alertSuccess({
      title: "저장",
      text: response.message
    });

    return response.data;
  }
};

/**
 * slot 저장
 * @param {object} param
 * @returns
 */
export const savePropmptApi = async (param) => {
  const response = await api.put(`intent/prompt`, param);

  if (response.status == "OK") {
    alertSuccess({
      title: "저장",
      text: response.message
    });

    return response.data;
  }
};

/**
 * 엔티티ID 저장
 * @param param
 * @returns
 */
export const saveEntityIdApi = async (param) => {
  //console.log("param: ", param)
  const response = await api.put("ent", param);
  return response;
};

export const getEntitySlotPromptApi = async (param) => {
  const respone = await api.post(`intent/prompt`, param);
  return respone.data;
};

/**
 * 엔티티ID 조회
 * @returns
 */
export const getEntityApi = async () => {
  const response = await api.post("ent", {});
  return response.data;
};

/**
 * 엔티티 단어 리스트 조회
 * @param {String} entityId
 * @returns
 */
export const getEntityWordApi = async (entityId) => {
  const param = { entityId: entityId };
  const response = await api.post(`ent/collection`, param);
  return response.data;
};

/**
 * 엔티티 저장
 * @param param
 * @returns
 */
export const saveEntityInfoApi = async (param) => {
  //console.log("확인 : ", param);
  const response = await api.put(`ent/collection`, param);
  return response;
};

/**
 * 엔티티 삭제
 * @param entityId
 * @returns
 */
export const deleteEntityIdApi = async (entityId) => {
  const param = { entityId: entityId };
  const response = await api.post(`ent/delete`, param);
  return response;
};

/**
 * 회원가입_이메일(id) 중복확인
 * @param userId
 * @returns
 */
export const checkUserIdApi = async (userId) => {
  const param = { userId: userId };
  console.log("param: ", param);
  const response = await api.post(`signup/checkId`, param);
  return response;
};

/**
 * 회원가입 저장
 * @param param
 * @returns
 */
export const saveUserInfoApi = async (param) => {
  console.log("param: ", param);
  const response = await api.put(`signup/saveInfo`, param);
  return response;
};

/**
 * 회원정보 조회
 * @param userId
 * @returns
 */
export const getUserInfoApi = async (userId) => {
  const param = { userId: userId };
  const response = await api.post(`userInfo`, param);
  return response.data;
};

/**
 * 회원정보 수정
 * @param param
 * @returns
 */
export const updateUserInfoApi = async (param) => {
  console.log("param: ", param);
  const response = await api.put(`userInfo/updateInfo`, param);
  return response;
};

/**
 * fallback 리스트 조회
 */
export const getFallbackApi = async () => {
  const response = await api.post(`intent/fallback`, {});
  return response.data;
};

/**
 * fallback 저장
 * @param {} param
 * @returns
 */
export const saveFallbackApi = async (param) => {
  const response = await api.put(`intent/fallback/save`, param);
  if (response.status == "OK") {
    alertSuccess({
      title: "저장",
      text: response.message
    });

    return response.data;
  }
};

/**
 * Analyze 초기화
 * @returns
 */
export const getAnalyzeInitApi = async () => {
  const response = await api.post(`analyze/init`, {});
  return response.data;
};

export const getHistoryApi = async (param) => {
  const response = await api.post(`analyze/history`, param);
  return response.data;
};

export const deleteConversationApi = async (param) => {
  const response = await api.delete(`analyze/history`, { data: param });
  if (response.status === "OK") {
    alertSuccess({
      title: "삭제",
      text: response.message
    });
  }
  return response.status;
};

/**
 * 실패 메시지 조회
 * @param {*} param
 * @returns
 */
export const getAnswerFailedApi = async (param) => {
  const response = await api.post(`analyze/answerfailed`, param);
  return response.data;
};

/**
 * 실패 메시지 삭제
 * @param {*} param
 * @returns
 */
export const deleteAnswerFailedApi = async (param) => {
  const response = await api.delete(`analyze/answerfailed`, {
    data: param
  });

  if (response.status === "OK") {
    alertSuccess({
      title: "삭제",
      text: response.message
    });
  }
  return response.status;
};

/**
 * 아이디/비밀번호 찾기
 * @param param
 * @returns
 */
export const findUserInfoApi = async (param) => {
  console.log("param: ", param);
  const response = await api.post(`userInfo/find/userInfo`, param);
  return response.data;
};

/**
 * 비밀번호 변경
 * @param param
 * @returns
 */
export const UpdateUserPwdApi = async (param) => {
  console.log("param: ", param);
  const response = await api.put(`userInfo/find/updatePwd`, param);
  return response.data;
};
