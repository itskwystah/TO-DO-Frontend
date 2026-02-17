// src/api/todosApi.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/todos", // change to your backend URL
});

export const createTodo = async (title: string, description: string) => {
  const response = await api.post("/", { title, description });
  return response.data; // { message, data }
};
