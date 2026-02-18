// src/types/todo/todostore.type.ts

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}
export type UpdateTodoPayload = Partial<Omit<Todo, "_id">>;

export interface TodoStoreType {
  todos: Todo[];
  loading: boolean;
  getTodos: () => Promise<boolean>;
  createTodo: (data: { title: string; description?: string }) => Promise<boolean>;
  updateTodo: (id: string, data: Partial<Omit<Todo, "_id">>) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
  clearTodos: () => void;
}
