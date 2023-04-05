import Navbar from "@/components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function Buyer() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const formDataRef = collection(db, "formData");
      const snapshot = await getDocs(formDataRef);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-extrabold text-gray-900">Recent Data</h2>
        {selectedData ? (
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quality: {selectedData.prediction}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>Feed 1: {selectedData.inputValues.feed1}</p>
                <p>Feed 2: {selectedData.inputValues.feed2}</p>
                <p>Flow 1: {selectedData.inputValues.flow1}</p>
                <p>Flow 2: {selectedData.inputValues.flow2}</p>
                <p>Flow 3: {selectedData.inputValues.flow3}</p>
                <p>pH: {selectedData.inputValues.ph}</p>
                <p>Density: {selectedData.inputValues.density}</p>
                <p>Airflow 1: {selectedData.inputValues.airflow1}</p>
                <p>Airflow 4: {selectedData.inputValues.airflow4}</p>
                <p>Airflow 7: {selectedData.inputValues.airflow7}</p>
                <p>Level 1: {selectedData.inputValues.level1}</p>
                <p>Level 4: {selectedData.inputValues.level4}</p>
                <p>Level 7: {selectedData.inputValues.level7}</p>
              </div>
              <button
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => setSelectedData(null)}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((formData) => (
              <div
                key={formData.id}
                onClick={() => setSelectedData(formData)}
                className="bg-white overflow-hidden shadow rounded-lg cursor-pointer"
                >
                <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                Quality: 
                {formData.prediction}
                </h3>
                </div>
                </div>
            ))}
        </div>
    )}
    </div>
    </>
);
}