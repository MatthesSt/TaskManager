export type Id = string;

export interface List {
  name: string;
  id: Id;
  authorId: Id;
  todos: Todo[];
  authorized: Id[];
}
export interface Todo {
  name: string;
  id: Id;
  completed: boolean;
  completedAt: Date | null;
  authorId: Id;
}
export interface User {
  name: string;
  id: Id;
  friends: Id[];
}
