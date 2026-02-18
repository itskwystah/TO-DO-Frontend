import { create } from "zustand";
import type {
  TodoStoreType,
  Todo,
  UpdateTodoPayload,
} from "@/types/todo/todostore.type";
import { showError } from "@/utils/error/error.util";
import {
  createTodoApi,
  deleteTodoApi,
  getTodosApi,
  updateTodoApi,
} from "@/api/todo/todo.api";

export const useTodoStore = create<TodoStoreType>((set, get) => ({
  todos: [],
  loading: false,

  getTodos: async () => {
    set({ loading: true });
    try {
      const response = await getTodosApi();
      const todos: Todo[] = Array.isArray(response.data) ? response.data : [];
      set({ todos });
      return true;
    } catch (error) {
      showError(error);
      set({ todos: [] });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async (data) => {
    set({ loading: true });
    try {
      const response = await createTodoApi(data.title!, data.description!);
      const newTodo: Todo = response.data;
      set({ todos: [newTodo, ...get().todos] });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  updateTodo: async (id, data: UpdateTodoPayload) => {
    set({ loading: true });
    try {
      const response = await updateTodoApi(id, data);
      const updatedTodo: Todo = response.data;

      set({
        todos: get().todos.map((todo) =>
          todo._id === id ? updatedTodo : todo,
        ),
      });

      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  deleteTodo: async (id) => {
    set({ loading: true });
    try {
      await deleteTodoApi(id);
      set({ todos: get().todos.filter((todo) => todo._id !== id) });
      return true;
    } catch (error) {
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clearTodos: () => set({ todos: [] }),
}));
