import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app } from "../lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { industries } from "@/constants/industries";

const auth = getAuth(app);
const db = getFirestore(app);

const SignupForm = () => {
  const [signUpType, setSignUpType] = useState("Buyer");

  return (
    <>
      <Navbar />
      <div className="flex items-center min-h-screen px-4 bg-gray-100">
        <div className="w-full max-w-3xl mx-auto shadow-xl bg-base-100 rounded-xl">
          <div className="grid grid-cols-2 border-b border-green-500">
            <button
              onClick={() => setSignUpType("Buyer")}
              className={`py-2 duration-300 rounded-tl-xl ${
                signUpType === "Buyer" && "text-white bg-green-500"
              }`}
            >
              Buyer
            </button>
            <button
              onClick={() => setSignUpType("Seller")}
              className={`py-4 duration-300 rounded-tr-xl ${
                signUpType === "Seller" && "text-white bg-green-500"
              }`}
            >
              Seller
            </button>
          </div>

          <div className="px-4 py-8">
            {signUpType === "Buyer" ? <BuyerForm /> : <SellerForm />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

interface BuyerFormType {
  email: string;
  password: string;
  industry_type: string;
}

function BuyerForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<BuyerFormType>();

  const onSubmit = async (data: BuyerFormType) => {
    const { email, password, ...rest } = data;

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Create user document in Firestore
      await setDoc(doc(db, "users", userId), {
        email,
        type: "Buyer",
        ...rest,
      });

      router.push("/login");
      // redirect to dashboard or home page
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
          type="email"
          className="input input-bordered"
        />
      </div>
      {/* Password */}
      <div className="form-control">
        <label className="label">Password</label>
        <input
          {...register("password")}
          type="password"
          className="input input-bordered"
        />
      </div>
      {/* Type of Industry */}
      <div className="form-control">
        <label className="label">Type</label>
        <select
          {...register("industry_type")}
          className="select select-bordered"
        >
          {industries.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </div>

      <div className="mt-5 form-control">
        <button className="btn-primary btn">Submit</button>
      </div>
    </form>
  );
}

interface SellerFormType {
  email: string;
  password: string;
  mine_name: string;
  mine_location: string;
  industry_type: string;
}

function SellerForm() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<SellerFormType>();

  const onSubmit = async (data: BuyerFormType) => {
    const { email, password, ...rest } = data;

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;

      // Create user document in Firestore
      await setDoc(doc(db, "users", userId), {
        email,
        type: "Seller",
        ...rest,
      });

      router.push("/login");
      // redirect to dashboard or home page
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
          type="email"
          className="input input-bordered"
        />
      </div>

      {/* Password */}
      <div className="form-control">
        <label className="label">Password</label>
        <input
          {...register("password")}
          type="password"
          className="input input-bordered"
        />
      </div>

      {/* Mine Name */}
      <div className="form-control">
        <label className="label">Mine Name</label>
        <input
          {...register("mine_name")}
          type="text"
          className="input input-bordered"
        />
      </div>

      {/* Mine Location */}
      <div className="form-control">
        <label className="label">Mine Location</label>
        <input
          {...register("mine_location")}
          type="text"
          className="input input-bordered"
        />
      </div>

      <div className="mt-5 form-control">
        <button className="btn-primary btn">Submit</button>
      </div>
    </form>
  );
}

export default SignupForm;
