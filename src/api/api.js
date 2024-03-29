import axios from "axios";
import { alertSuccess, alertError } from "../hooks/useAlert";

const api = axios.create({
  baseURL: `http://localhost:7077/`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

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

  response.data == "save successfully!"
    ? alertSuccess({
        title: "저장",
        text: "정상적으로 저장되었습니다."
      })
    : alertError();
};

/**
 * 엔티티 전체 리스트 조회
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
  const response = await api.post("ent/collection", param);
  return response.data;
};
