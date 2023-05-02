import { getAuth } from "firebase/auth";
import { app } from "../lib/firebase";
import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "@/store/useUserStore";

const auth = getAuth(app);

interface GuardedPageProps {
  role?: string;
}

export default function GuardedPage({
  role,
  children,
}: PropsWithChildren<GuardedPageProps>) {
  const router = useRouter();

  const { user } = useUserStore();

  useEffect(() => {
    if (role && user && user.role) {
      console.log("Invalid");
      router.push("/");
    }
  }, []);

  return <>{children}</>;
}
