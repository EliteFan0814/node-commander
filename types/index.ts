export interface TodoItem {
  title: string;
  done: boolean;
  type?: string;
}
export interface Actions {
  [propName: string]: (list: TodoList, taskIndex: number) => void;
}
export type TodoList = Array<TodoItem>;
