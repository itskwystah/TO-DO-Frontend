// src/api/todosApi.ts
import axiosInstance from "@/axios/axios-instance";
import type { Todo, UpdateTodoPayload } from "@/types/todo/todostore.type";


// ========================
// CREATE TODO
// ========================
export const createTodoApi = async (
  title: string,
  description: string
) => {
  const response = await axiosInstance.post("/todos", { title, description });
  return response.data; // { message, todo }
};

// ========================
// GET ALL TODOS
// ========================
export const getTodosApi = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data; // { message, todos }
};

// ========================
// UPDATE TODO
// ========================
export const updateTodoApi = async (id: string, data: UpdateTodoPayload): Promise<{ message: string; data: Todo }> => {
  const res = await axiosInstance.put<{ message: string; data: Todo }>(`/todos/${id}`, data);
  return res.data;
};


// ========================
// DELETE TODO
// ========================
export const deleteTodoApi = async (id: string) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data; // { message }
};
