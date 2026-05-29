import api from "./api";

export const getHistory = async () => {
  const response = await api.get("/history");
  return response.data;
};

export const getHistoryDetail = async (id) => {
  const response = await api.get(`/history/${id}`);
  return response.data;
};