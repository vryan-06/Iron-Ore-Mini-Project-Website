import Navbar from "@/components/Navbar";
import { app } from "@/lib/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { ChevronLeft } from "heroicons-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const db = getFirestore(app);

export default function Ore() {
  const router = useRouter();
  const id = router.query.id as string;

  const [ore, setOre] = useState<any>();

  useEffect(() => {
    getDoc(doc(db, "formData", id))
      .then((snapshot) => {
        setOre({
          id: snapshot.id,
          ...snapshot.data(),
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container px-4 mx-auto my-10">
        <div className="max-w-full prose">
          <button
            className="gap-2 pl-2 pr-5 mb-5 btn btn-ghost"
            onClick={() => router.back()}
          >
            <ChevronLeft />
            Back
          </button>

          <h1>{ore?.inputValues.mineName}</h1>

          <h3>Quality : {Number(ore?.inputValues.prediction).toFixed(3)}</h3>

          <table>
            <thead>
              <tr>
                <th colSpan={2}>Mine Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Id</td>
                <td>{id}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{ore?.inputValues.mineName}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{ore?.inputValues.mineLocation}</td>
              </tr>
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th colSpan={2}>Ore Information</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ore Density</td>
                <td>{ore?.inputValues.density}</td>
              </tr>
              <tr>
                <td>Ore pH</td>
                <td>{ore?.inputValues.ph}</td>
              </tr>
              <tr>
                <td>SiO2</td>
                <td> {ore?.inputValues.si}</td>
              </tr>
              <tr>
                <td>Al2O3</td>
                <td>{ore?.inputValues.al}</td>
              </tr>
              <tr>
                <td>Phosphor</td>
                <td>{ore?.inputValues.phosphor}</td>
              </tr>
              <tr>
                <td>Sulfur</td>
                <td>{ore?.inputValues.sulfur}</td>
              </tr>
              <tr>
                <td>Moisture</td>
                <td>{ore?.inputValues.moisture}</td>
              </tr>
              <tr>
                <td>Abrasion Index</td>
                <td>{ore?.inputValues.abrasion}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
