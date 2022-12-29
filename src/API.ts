import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { currentUser } from './router';
import { List } from './types';

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
    email,
    username,
    friends: [],
  });
}

export async function createList(listName: string): Promise<List> {
  const auth = getAuth();
  if (!auth.currentUser) return { name: '', id: '', todos: [], userID: '' };
  const ListID = auth.currentUser?.uid + Math.random().toString().substring(2, 15);
  await setDoc(doc(getFirestore(), 'Lists', ListID), {
    name: listName,
  });
  return { name: listName, id: ListID, todos: [], userID: auth.currentUser?.uid };
}
export async function getTodoLists(): Promise<List[]> {
  const auth = getAuth();
  const docs: QueryDocumentSnapshot<DocumentData>[] = [];
  // get all lists from firestore where the user id includes the current user id
  const querySnapshot = await getDocs(query(collection(getFirestore(), 'Lists'), where('id', '==', auth.currentUser?.uid)));
  querySnapshot.forEach(doc => {
    docs.push(doc);
  });
  return docs.map(doc => doc.data()).map(list => ({ ...list, todos: Object.values(list.todos) } as List));
}
// export async function updateTodoList(list: TodoList): Promise<void> {
//   console.log(list);
//   // TODO:
// }
// export async function addTodoList(list: TodoList): Promise<void> {
//   console.log(list);
//   // TODO:
// }
// export async function getTodoLists(): Promise<TodoList[]> {
//   const docs: QueryDocumentSnapshot<DocumentData>[] = [];
//   const querySnapshot = await getDocs(collection(getFirestore(), 'lists'));
//   querySnapshot.forEach(doc => {
//     docs.push(doc);
//   });
//   return docs.map(doc => doc.data()).map(list => ({ ...list, todos: Object.values(list.todos) } as TodoList));
// }
