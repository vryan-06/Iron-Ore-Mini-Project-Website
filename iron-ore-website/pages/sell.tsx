import { FormEvent, MouseEvent, PropsWithChildren, useState } from "react";
import axios from "axios";
import "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import router from "next/router";

export default function Form() {
    const [inputValues, setInputValues] = useState({
        mineName: "",
        mineLocation: "",
        ore_type: "",
        density: "",
        ph: "",
        si: "",
        al: "",
        sulfur: "",
        phosphor: "",
        moisture: "",
        abrasion: "",
        prediction: ""
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const formData = { inputValues };
        const formDataRef = collection(db, "formData");
        try {
            const docRef = await addDoc(formDataRef, formData);
            console.log("Document written with ID: ", docRef.id);
            router.push("/buyer")
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
                <title>Other Ores</title>
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
                            <label htmlFor="ore_type" className="text-sm font-bold label">
                                Ore Type
                            </label>
                            <select
                                className="w-full select select-bordered"
                                id="ore_type"
                                autoFocus
                                value={inputValues.ore_type}
                                onChange={handleInputChange}
                            >
                                <option value="">Select the Type of Ore</option>
                                <option value="limonite">Limonite</option>
                                <option value="magnetite">Magnetite</option>
                                <option value="siderite">Siderite</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label htmlFor="density" className="text-sm font-bold label">
                                Density
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="density"
                                autoFocus
                                value={inputValues.density}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="ph" className="text-sm font-bold label">
                                pH
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="ph"
                                autoFocus
                                value={inputValues.ph}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="si" className="text-sm font-bold label">
                                SiO2
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="si"
                                autoFocus
                                value={inputValues.si}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="al" className="text-sm font-bold label">
                                Al2O3
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="al"
                                autoFocus
                                value={inputValues.al}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="phosphor" className="text-sm font-bold label">
                                Phosphor
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="phosphor"
                                autoFocus
                                value={inputValues.phosphor}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="sulfur" className="text-sm font-bold label">
                                Sulfur
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="sulfur"
                                autoFocus
                                value={inputValues.sulfur}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="moisture" className="text-sm font-bold label">
                                Moisture
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="moisture"
                                autoFocus
                                value={inputValues.moisture}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="abrasion" className="text-sm font-bold label">
                                Abrasion Index
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="abrasion"
                                autoFocus
                                value={inputValues.abrasion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-control">
                            <label htmlFor="prediction" className="text-sm font-bold label">
                                % Iron Concentrate
                            </label>
                            <input
                                type="text"
                                className="w-full input input-bordered"
                                id="prediction"
                                autoFocus
                                value={inputValues.prediction}
                                onChange={handleInputChange}
                            />
                        </div>
                    </FormSection>
                    <div className="flex w-full mt-6 gap-x-6">
                        <button
                            className="w-full btn-primary btn"
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>
                </form>
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
