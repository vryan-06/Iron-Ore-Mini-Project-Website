import { useState } from 'react'
import axios from "axios";
import "firebase/database";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase"
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Form() {
    const [inputValues, setInputValues] = useState({
        feed1: "56.298307",
        feed2: "14.648984",
        flow1: "2869.636615",
        flow2: "488.165523",
        flow3: "397.570736",
        ph:"9.767315",
        density: "1.680424",
        airflow1: "280.119813",
        airflow4: "299.446217",
        airflow7: "290.740507",
        level1: "520.168402",
        level4: "420.169753",
        level7: "420.910258"
      });

      const [prediction, setPrediction] = useState("-");
    
      const handleSubmit = async (e) => {
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
        setPrediction(prediction);

        const formData = { inputValues, prediction };
        const formDataRef = collection(db, 'formData');
        try {
          const docRef = await addDoc(formDataRef, formData);
          console.log("Document written with ID: ", docRef.id);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        
        // Router.push('/');
        });
      };
    
      const handleInputChange = (e) => {
        const { id, value } = e.target;
        setInputValues((prevState) => ({
          ...prevState,
          [id]: value,
        }));
      };

    return(
    <>
    <Navbar></Navbar>
    <div className='max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl bg-green-500'>
    <p className="text-xl text-white font-bold mb-4">Prediction results: {Number(prediction).toFixed(2)}</p>
    </div>
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-xl bg-gray-100">
      <form action="#" method="POST">
        <h1 className="text-lg font-bold mb-4">Enter the values</h1>
        <div className="mb-4">
          <label htmlFor="feed1" className="block text-gray-700 font-bold mb-2">
            % Iron Feed
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-full"
            id="feed1"
            autoFocus
            value={inputValues.feed1}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="feed2" className="block text-gray-700 font-bold mb-2">
            % Silica Feed
          </label>
          <input type="text" className="input input-bordered w-full" id="feed2" value={inputValues.feed2}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="flow1" className="block text-gray-700 font-bold mb-2">
            Starch Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="flow1" value={inputValues.flow1}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="flow2" className="block text-gray-700 font-bold mb-2">
            Amina Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="flow2" value={inputValues.flow2}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="flow3" className="block text-gray-700 font-bold mb-2">
            Ore Pulp Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="flow3" value={inputValues.flow3}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="ph" className="block text-gray-700 font-bold mb-2">
            Ore Pulp pH
          </label>
          <input type="text" className="input input-bordered w-full" id="ph" value={inputValues.ph}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="density" className="block text-gray-700 font-bold mb-2">
            Ore Pulp Density
          </label>
          <input type="text" className="input input-bordered w-full" id="density" value={inputValues.density}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="airflow1" className="block text-gray-700 font-bold mb-2">
            Flotation Column 01 Air Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="airflow1" value={inputValues.airflow1}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="airflow4" className="block text-gray-700 font-bold mb-2" >
            Flotation Column 04 Air Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="airflow4" value={inputValues.airflow4}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="airflow7" className="block text-gray-700 font-bold mb-2">
            Flotation Column 07 Air Flow
          </label>
          <input type="text" className="input input-bordered w-full" id="airflow7" value={inputValues.airflow7}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="level1" className="block text-gray-700 font-bold mb-2">
            Flotation Column 01 Level
          </label>
          <input type="text" className="input input-bordered w-full" id="level1" value={inputValues.level1}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="level4" className="block text-gray-700 font-bold mb-2">
            Flotation Column 04 Level
          </label>
          <input type="text" className="input input-bordered w-full" id="level4" value={inputValues.level4}
            onChange={handleInputChange}/>
        </div>
        <div className="mb-4">
          <label htmlFor="level7" className="block text-gray-700 font-bold mb-2">
            Flotation Column 07 Level
          </label>
          <input type="text" className="input input-bordered w-full" id="level7" value={inputValues.level7}
            onChange={handleInputChange}/>
        </div>
        <div>
          <button type="submit" onClick={(e)=>handleSubmit(e)} className="btn bg-blue-500 text-white hover:bg-blue-700 font-bold">
            Predict
          </button>
        </div>
      </form>
    </div>
    <Footer></Footer>
    </>
    )
}