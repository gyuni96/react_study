import axios from "axios";

import { alertSuccess, alertError } from "../hooks/useAlert";

const api = axios.create({
  baseURL: `http://localhost:7077/`,
  headers: {
    "X-Requested-With": "XMLHttpRequest" // CORS preflight 요청에 필요할 수 있음
  }
});

/**
 * request 인터셉터
 */
api.interceptors.request.use(
  (config) => {
    // request 정상
    // header 셋팅
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Expose-Headers"] = "Authorization";

    // 토큰 확인
    const token = localStorage.getItem("user") ?? null;
    console.log("토근", token);
    if (token !== null) {
      config.headers["Authorization"] =
        `Bearer ${JSON.parse(token).accessToken}`;
    }

    console.log("config", config);
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
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const oldToken = userInfo.accessToken;
      if (oldToken !== newToken) {
        userInfo.accessToken = newToken.split(/\s+/g)[1];
        localStorage.setItem("user", JSON.stringify(userInfo));
      }
    }

    return response;
  },
  (error) => {
    //response 에러
    console.log(error);
    alertError("로그인이 필요합니다.");

    if (error.response.status === 401) {
      //권한 없음
      // localStorage.removeItem("user");
      alertError("로그인이 필요합니다.");
      // location.reload();
    }
    console.log("에러발생!");
    return Promise.reject(error);
  }
);

export const loginApi = async (param) => {
  const response = await api.post(`auth/login`, param);
  console.log("로그인 : ", response);
  return response;
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
  const response = await api.delete(`intent/${indentId}`);
  return response;
};

/**
 * 인텐트 상세 조회
 * @param {String} indentId
 * @returns
 */
export const getIntentInfoApi = async (indentId) => {
  const param = { intentId: indentId };
  const response = await api.post(`intent/find`, param);
  return response.data;
};

/**
 * 인텐트 상세 저장
 * @param {object} param
 */
export const saveIntentInfoApi = async (param) => {
  const response = await api.put(`intent/save`, param);
  response.status == 200
    ? alertSuccess({
        title: "저장",
        text: "정상적으로 저장되었습니다."
      })
    : alertError();
};

/**
 * 엔티티ID 저장
 * @param param
 * @returns
 */
export const saveEntityIdApi = async (param) => {
  const response = await api.put("ent", param);
  return response.data;
};

export const getEntitySlotPromptApi = async (param) => {
  const respone = await api.post(`intent/find/prompt`, param);
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
  console.log("확인 : ", param);
  const response = await api.put(`ent/collection`, param);
  console.log(response);
  return response.data;
};

/**
 * 엔티티 삭제
 * @param entityId
 * @returns
 */
export const deleteEntityIdApi = async (entityId) => {
  const response = await api.delete(`ent/${entityId}`);
  return response.data;
};
