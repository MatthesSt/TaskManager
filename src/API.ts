import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getDoc,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { currentUser } from './router';
import { Id, List, Todo, User } from './types';

export async function login(email: string, password: string): Promise<void> {
  const auth = getAuth();
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout(): Promise<void> {
  const auth = getAuth();
  await signOut(auth);
  currentUser.value = null;
}

export async function register(email: string, password: string, username: string): Promise<void> {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(getFirestore(), 'users', userCredential.user.uid), {
    username,
  });
}

export async function createList(listName: string): Promise<List> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  const ListID = auth.currentUser?.uid + Math.random().toString().substring(2, 15);
  const List = { name: listName, id: ListID, authorId: auth.currentUser?.uid, authorized: [auth.currentUser?.uid] };
  await setDoc(doc(getFirestore(), 'Lists', ListID), {
    ...List,
  });
  return { ...List, todos: [] };
}
export async function getLists(): Promise<List[]> {
  const auth = getAuth();
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  const querySnapshot = await getDocs(query(collection(getFirestore(), 'Lists'), where('authorized', 'array-contains', auth.currentUser?.uid)));
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(doc => doc.data()).map(list => ({ ...list } as List));
}
export async function getList(listId: Id): Promise<List> {
  const Listquery = await getDoc(doc(getFirestore(), 'Lists', listId));
  const Todoquery = await getDocs(query(collection(getFirestore(), 'Lists', listId, 'todos')));
  const Todos: QueryDocumentSnapshot<DocumentData>[] = [];
  Todoquery.forEach(doc => {
    Todos.push(doc);
  });
  return { ...Listquery.data(), todos: Todos.map(t => t.data()) } as List;
}

export async function setTodo(listId: Id, todoName: string): Promise<Todo> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  const UserId = auth.currentUser.uid;
  const todoId = UserId + Math.random().toString().substring(2, 15);
  const Todo = { name: todoName, id: todoId, completed: false, completedAt: null, authorId: UserId };
  await setDoc(doc(getFirestore(), 'Lists', listId, 'todos', todoId), {
    ...Todo,
  });
  return Todo;
}

//delete todo
export async function deleteTodo(todo: Todo, listId: Id): Promise<void> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  await deleteDoc(doc(getFirestore(), 'Lists', listId, 'todos', todo.id));
}

//updateTodo
export async function updateTodo(todo: Todo, listId: Id): Promise<void> {
  await updateDoc(doc(getFirestore(), 'Lists', listId, 'todos', todo.id), {
    ...todo,
  });
}

//getUsers
export async function getUsers(): Promise<any> {
  const querySnapshot = await getDocs(collection(getFirestore(), 'users'));
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(doc => ({
    name: doc.data().username,
    id: doc.id,
  }));
}

//addFriend
export async function addFriend(user: User): Promise<User> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  const friend = { ...user };
  await setDoc(doc(getFirestore(), 'users', auth.currentUser.uid, 'friends', user.id), {
    id: user.id,
    name: user.name,
  });
  return friend;
}

//getFriends
export async function getFriends(): Promise<User[]> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  const querySnapshot = await getDocs(query(collection(getFirestore(), 'users', auth.currentUser.uid, 'friends')));
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(doc => doc.data()) as User[];
}

//changeAuthState
export async function changeAuthState(list: List, userId: Id): Promise<void> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  let authorized = list.authorized;
  if (authorized.includes(userId)) {
    authorized = authorized.filter(id => id !== userId);
  } else authorized.push(userId);
  await updateDoc(doc(getFirestore(), 'Lists', list.id), {
    authorized,
  });
}

//deleteList
export async function deleteList(list: List): Promise<void> {
  const auth = getAuth();
  if (!auth.currentUser) throw new Error('Not logged in');
  if (list.authorId !== auth.currentUser.uid) throw new Error('Not authorized');
  await deleteDoc(doc(getFirestore(), 'Lists', list.id));
}
