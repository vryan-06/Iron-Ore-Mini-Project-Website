import Navbar from "@/components/Navbar";
import Head from "next/head";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GuardedPage from "@/components/GuardedPage";
import Footer from "@/components/Footer";

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
    <GuardedPage role="Buyer">
      <Head>
        <title>Buy Iron Ore</title>
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
              onClick={() => {
                if (formData.inputValues.ore_type === 'Haematite') {
                  router.push(`/haematite/${formData.id}`);
                } else {
                  router.push(`/other/${formData.id}`);
                }
              }}
              className="shadow-lg cursor-pointer card transform hover:-translate-y-1 hover:translate-x-1 hover:shadow-2xl hover:bg-green-50"
            >
              <div className="card-body">
                <h1 className="mb-3 text-2xl font-bold">
                  {formData.inputValues.mineName}
                </h1>

                <div className="gap-2 btn">
                  Type:
                  <div className="badge badge-outline">
                    {formData.inputValues.ore_type}
                  </div>
                </div>

                <div className="btn-group ">
                  <div className="text-xs btn">Quality</div>
                  <div className="btn btn-primary">
                    {Number(formData.inputValues.prediction).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </GuardedPage>
  );
}
