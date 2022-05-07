import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyCL-Y6I_9SCnaX3pK4xvREwy6nhB-dgWms",
  authDomain: "twixxer-1c70d.firebaseapp.com",
  projectId: "twixxer-1c70d",
  storageBucket: "twixxer-1c70d.appspot.com",
  messagingSenderId: "6694638044",
  appId: "1:6694638044:web:ba867ef735413a7433bf19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authService = getAuth();
const storage = getStorage();
const googleProvider = new GoogleAuthProvider();

// 현재 로그인된 유저 정보
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(authService, (user) => {
      setCurrentUser(user);

      return unsub();
    });
  }, []);

  return currentUser;
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(authService, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(authService, email, password);
}

export function loginGoogle() {
  return signInWithPopup(authService, googleProvider);
}

export function logout() {
  return signOut(authService);
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, "images/" + currentUser.uid + ".png");

  setLoading(true);
  try {
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {
      photoURL: photoURL,
    });
  } catch (e) {
    console.log(e);
    alert(e.message);
  }
  setLoading(false);
}

export const myFirestore = getFirestore();
