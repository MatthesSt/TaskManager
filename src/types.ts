export interface List {
  name: string;
  id: string;
  userID: string;
  todos: Todo[];
}
export interface Todo {
  name: string;
  id: string;
  completed: boolean;
}
