import Navbar from "@/components/Navbar";
import Head from "next/head";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Buyer() {
  const [data, setData] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const formDataRef = collection(db, "formData");
      const snapshot = await getDocs(formDataRef);
      const tempData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(tempData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>FeroCity</title>
      </Head>
      <Navbar />
      <div className="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Available Iron Mines
        </h2>

        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((formData) => (
            <div
              key={formData.id}
              onClick={() => router.push(`/ore/${formData.id}`)}
              className="overflow-hidden bg-gray-100 rounded-lg shadow cursor-pointer"
            >
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  Mine Name: 
                  {formData.inputValues.mineName}
                </h4>
                <h4 className="text-lg font-medium leading-6 text-gray-900">
                  Quality: 
                  {Number(formData.prediction).toFixed(2)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
