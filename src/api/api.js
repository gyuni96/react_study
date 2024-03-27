import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:7077/`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

/**
 * 인텐튼 전체 리스트 조회
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
