import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "../lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { industries } from "@/constants/industries";
import { UserStore, useUserStore } from "@/store/useUserStore";

const auth = getAuth(app);
const db = getFirestore(app);

const SignInForm = () => {
  const [signUpType, setSignUpType] = useState("Buyer");

  return (
    <>
      <Navbar />
      <div className="flex items-center min-h-screen px-4 bg-gray-100">
        <div className="w-full max-w-3xl mx-auto shadow-xl bg-base-100 rounded-xl">
          <div className="px-4 py-8">
            <LoginForm />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface LoginFormType {
  email: string;
  password: string;
}

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useUserStore();

  const { register, handleSubmit } = useForm<LoginFormType>();

  const onSubmit = async (data: LoginFormType) => {
    const { email, password, ...rest } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const userDoc = await getDoc(doc(db, "users", userId));
      const userDocData = { id: userId, ...userDoc.data() };
      setUser(userDocData);
      router.push(userDoc.data()?.type === "Buyer" ? "/buyer" : "/prediction");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <div className="form-control">
        <label className="label">Email</label>
        <input
          {...register("email")}
          required
          type="email"
          className="input input-bordered"
        />
      </div>
      {/* Password */}
      <div className="form-control">
        <label className="label">Password</label>
        <input
          required
          {...register("password")}
          type="password"
          className="input input-bordered"
        />
      </div>

      <div className="mt-5 form-control">
        <button className="btn-primary btn">Login</button>
      </div>
    </form>
  );
}

export default SignInForm;
