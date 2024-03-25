import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:7077/`,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const getIntents = async () => {
  // 인텐트 리스트 불러오기
  const response = await api.post(`intent/all`, {});
  return response.data;
};

export const deletedIntend = async (id) => {
  const response = await api.delete(`intent/${id}`);
  console.log(response);
};
