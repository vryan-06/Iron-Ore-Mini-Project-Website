import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAT1RPu_BC7Qs_woRdLv7om4KJSPs6dms",
  authDomain: "my-first-project-3b899.firebaseapp.com",
  projectId: "my-first-project-3b899",
  storageBucket: "my-first-project-3b899.appspot.com",
  messagingSenderId: "448283769835",
  appId: "1:448283769835:web:371ccbbf5f627edde3b7ae",
  measurementId: "G-MK6GG5S5GT"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
