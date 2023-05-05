import { FormEvent, MouseEvent, PropsWithChildren, useState } from "react";
import axios from "axios";
import "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Form() {
  const [inputValues, setInputValues] = useState({
    mineName: "",
    mineLocation: "",
    ore_type: "Haematite",
    feed1: "56.298307",
    feed2: "14.648984",
    flow1: "2869.636615",
    flow2: "488.165523",
    flow3: "397.570736",
    ph: "9.767315",
    density: "1.680424",
    airflow1: "280.119813",
    airflow4: "299.446217",
    airflow7: "290.740507",
    level1: "520.168402",
    level4: "420.169753",
    level7: "420.910258",
    prediction: "---"
  });

  const [prediction, setPrediction] = useState("-");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios
      .post("http://127.0.0.1:5000/predict", {
        ...inputValues,
      })
      .then(async (res) => {
        if (res.data.error) {
          console.log("Error : ", res.data.error);
          return;
        }
        const prediction = res.data.predicted[0];
        console.log(prediction);
        setInputValues({ ...inputValues, prediction });

        const formData = { inputValues: { ...inputValues, prediction } };
        const formDataRef = collection(db, "formData");
        try {
          const docRef = await addDoc(formDataRef, formData);
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      });
  };

  const handleInputChange = (e: { target: { id: any; value: any } }) => {
    const { id, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Haematite Ores</title>
      </Head>
      <Navbar />
      <div className="container px-4 mx-auto my-12">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-12">
          <FormSection
            title={"Mine Details"}
            subtitle={"Information about the Mine"}
            className="grid-cols-2"
          >
            <div className="form-control">
              <label htmlFor="mineName" className="text-sm font-bold label">
                Mine Name
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="mineName"
                autoFocus
                value={inputValues.mineName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="mineLocation" className="text-sm font-bold label">
                Mine Location
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="mineLocation"
                autoFocus
                value={inputValues.mineLocation}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>
          <FormSection
            title={"Ore's Details"}
            subtitle={"Information about the Ore"}
            className="grid-cols-2 lg:grid-cols-3"
          >
            <div className="form-control">
              <label htmlFor="feed1" className="text-sm font-bold label">
                % Iron Feed
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="feed1"
                autoFocus
                value={inputValues.feed1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="feed2" className="text-sm font-bold label">
                % Silica Feed
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="feed2"
                value={inputValues.feed2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="flow1" className="text-sm font-bold label">
                Starch Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="flow1"
                value={inputValues.flow1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="flow2" className="text-sm font-bold label">
                Amina Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="flow2"
                value={inputValues.flow2}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="flow3" className="text-sm font-bold label">
                Ore Pulp Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="flow3"
                value={inputValues.flow3}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="ph" className="text-sm font-bold label">
                Ore Pulp pH
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="ph"
                value={inputValues.ph}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="density" className="text-sm font-bold label">
                Ore Pulp Density
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="density"
                value={inputValues.density}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="airflow1" className="text-sm font-bold label">
                Flotation Column 01 Air Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="airflow1"
                value={inputValues.airflow1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="airflow4" className="text-sm font-bold label">
                Flotation Column 04 Air Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="airflow4"
                value={inputValues.airflow4}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="airflow7" className="text-sm font-bold label">
                Flotation Column 07 Air Flow
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="airflow7"
                value={inputValues.airflow7}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="level1" className="text-sm font-bold label">
                Flotation Column 01 Level
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="level1"
                value={inputValues.level1}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="level4" className="text-sm font-bold label">
                Flotation Column 04 Level
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="level4"
                value={inputValues.level4}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor="level7" className="text-sm font-bold label">
                Flotation Column 07 Level
              </label>
              <input
                type="text"
                className="w-full input input-bordered"
                id="level7"
                value={inputValues.level7}
                onChange={handleInputChange}
              />
            </div>
          </FormSection>
          <div className="flex w-full mt-6 gap-x-6">
            <button
              className="w-full btn-primary btn"
              type="submit"
            // onClick={(e) => handleSubmit(e)}
            >
              Predict
            </button>
          </div>
        </form>
        {/* <div className="max-w-md p-6 mx-auto mt-10 bg-green-500 rounded-lg shadow-xl">
          <p className="mb-4 text-xl font-bold text-white">
            Prediction results: {Number(prediction).toFixed(2)}
          </p>
        </div> */}
        <div className="mt-10 card bg-secondary text-secondary-content">
          <div className="items-center card-body">
            <h3>Prediction</h3>
            <h2 className="text-4xl font-bold">
              {Number(inputValues.prediction).toFixed(2)}
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

interface FormSectionType {
  title: string;
  subtitle: string;
  className?: string;
}
function FormSection({
  className,
  title,
  subtitle,
  children,
}: PropsWithChildren<FormSectionType>) {
  return (
    <div className="pb-12 border-b border-gray-900/10">
      <h2 className="text-xl font-semibold leading-7 text-gray-900">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>

      <div className={`grid grid-cols-1 gap-6 mt-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}
