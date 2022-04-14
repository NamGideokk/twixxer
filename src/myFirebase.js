import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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

export const authService = getAuth();

// 현재 로그인된 유저 정보
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(authService, (user) => {
      setCurrentUser(user);

      return unsub;
    });
  }, []);
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(authService, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(authService, email, password);
}
