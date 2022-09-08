export interface TodoItem {
  title: string;
  done: boolean;
  type?: string;
}
export type TodoList = Array<TodoItem>;
