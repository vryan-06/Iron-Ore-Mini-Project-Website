import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";

const auth = getAuth(app);

export default function GuardedPage({ children }: PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    !auth.currentUser && router.push("/");
  }, []);

  return <>{children}</>;
}
