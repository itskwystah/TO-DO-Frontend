// src/api/todosApi.ts
import axiosInstance from "@/axios/axios-instance";
import type { Todo, UpdateTodoPayload } from "@/types/todo/todostore.type";

// Create a new todo
export const createTodoApi = async (title: string, description: string) => {
  const response = await axiosInstance.post("/todos", { title, description });
  return response.data; // { message, todo }
};

// Get all todos
export const getTodosApi = async () => {
  const response = await axiosInstance.get("/todos");
  return response.data; // { message, todos }
};

// Upadate a todo
export const updateTodoApi = async (
  id: string,
  data: UpdateTodoPayload,
): Promise<{ message: string; data: Todo }> => {
  const res = await axiosInstance.put<{ message: string; data: Todo }>(
    `/todos/${id}`,
    data,
  );
  return res.data;
};

// Delete a todo
export const deleteTodoApi = async (id: string) => {
  const response = await axiosInstance.delete(`/todos/${id}`);
  return response.data; // { message }
};
