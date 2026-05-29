import api from "./api";

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const toggleTodo = async (id) => {
  const response = await api.put(`/todos/${id}`, {});
  return response.data;
};

export const createTodo = async (data) => {
  const response = await api.post("/todos", data);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};