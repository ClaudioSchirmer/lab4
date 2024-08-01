import {
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./Firebase";

export async function getBooks(isBorrowed = false) {
  const booksRef = collection(db, "books");
  const q = query(booksRef, where("borrowed", "==", isBorrowed));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export async function borrowBook(book) {
  try {
    await updateDoc(doc(db, "books", book.id), { ...book, borrowed: true });
    return true;
  } catch (e) {
    return false;
  }
}

export async function returnBook(book) {
  try {
    await updateDoc(doc(db, "books", book.id), { ...book, borrowed: false });
    return true;
  } catch (e) {
    return false;
  }
}
