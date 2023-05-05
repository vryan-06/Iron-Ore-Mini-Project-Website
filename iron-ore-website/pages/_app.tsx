import { auth, db } from "@/lib/firebase";
import { useUserStore } from "@/store/useUserStore";
import "@/styles/globals.css";
import { collection, doc, getDoc } from "firebase/firestore";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      getDoc(doc(collection(db, "users"), user.uid)).then((doc) => {
        if (!doc.exists()) return;

        setUser({ ...auth.currentUser, type: doc.data().type });

        console.log(doc.data());
      });
    });

    return () => unsubscribe();
  }, []);

  return <Component {...pageProps} />;
}
