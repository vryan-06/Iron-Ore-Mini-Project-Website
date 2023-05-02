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
    <div className="container mx-4 my-10 prose">
      <button
        className="gap-2 pl-2 pr-5 mb-5 btn btn-ghost"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Back
      </button>

      <h1>{ore?.inputValues.mineName}</h1>

      <h3>Quality : {ore?.prediction}</h3>

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
            <td>Feed 1</td>
            <td> {ore?.inputValues.feed1}</td>
          </tr>
          <tr>
            <td>Feed 2</td>
            <td>{ore?.inputValues.feed2}</td>
          </tr>
          <tr>
            <td>Flow 1</td>
            <td>{ore?.inputValues.flow1}</td>
          </tr>
          <tr>
            <td>Flow 2</td>
            <td>{ore?.inputValues.flow2}</td>
          </tr>
          <tr>
            <td>Flow 3</td>
            <td>{ore?.inputValues.flow3}</td>
          </tr>
          <tr>
            <td>pH</td>
            <td>{ore?.inputValues.ph}</td>
          </tr>
          <tr>
            <td>Density</td>
            <td>{ore?.inputValues.density}</td>
          </tr>
          <tr>
            <td>Airflow 1</td>
            <td>{ore?.inputValues.airflow1}</td>
          </tr>
          <tr>
            <td>Airflow 4</td>
            <td>{ore?.inputValues.airflow4}</td>
          </tr>
          <tr>
            <td>Airflow 7</td>
            <td>{ore?.inputValues.airflow7}</td>
          </tr>
          <tr>
            <td>Level 1</td>
            <td>{ore?.inputValues.level1}</td>
          </tr>
          <tr>
            <td>Level 4</td>
            <td>{ore?.inputValues.level4}</td>
          </tr>
          <tr>
            <td>Level 7</td>
            <td>{ore?.inputValues.level7}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
