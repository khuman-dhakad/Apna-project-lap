import { db } from "../firebaseconfig";
import {
  addDoc,
  where,
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  getDoc
} from "firebase/firestore";
import { onSnapshot } from "firebase/firestore";

const COLLECTION_NAME = "posts";

export const subscribeToPosts = (cb) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    orderBy("date", "desc")
  );
  return onSnapshot(q, (querySnapshot) => {
    const posts = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: Number(doc.id),
    }));
    cb(posts);
  });
};

export const craetePost = (post) => {
  return addDoc(collection(db, COLLECTION_NAME), post);
};

export const getPosts = () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("date", "desc"));
  return getDocs(q);
};

export const getPostByUserId = (id) => {
  const q = query(collection(db, COLLECTION_NAME), where("userId", "==", id));
  return getDocs(q);
};

export const getPost = (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  return getDoc(docRef);
};

export const deletePost = (id) => {
  return deleteDoc(doc(db, COLLECTION_NAME, id));
};