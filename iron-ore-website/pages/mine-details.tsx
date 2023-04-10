import { useState } from 'react';
import { useRouter } from 'next/router';
// import firebase from 'firebase/app';
import 'firebase/firestore';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/firestore';
import 'firebase/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


export default function MineDetails() {
  const [mineName, setMineName] = useState('');
  const [mineLocation, setMineLocation] = useState('');
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    db.collection('mines')
      .doc(user?.uid)
      .set({
        mineName,
        mineLocation,
      })
      .then(() => {
        router.push('/predictions');
      })
      .catch((error) => {
        console.error('Error adding mine details: ', error);
      });
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50">
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <h1 className="mb-4 text-2xl font-bold">Enter Mine Details</h1>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="mine-name">
            Mine Name
          </label>
          <input
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="mine-name"
            type="text"
            value={mineName}
            onChange={(event) => setMineName(event.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="mine-location">
            Mine Location
          </label>
          <input
            className="w-full px-3 py-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline"
            id="mine-location"
            type="text"
            value={mineLocation}
            onChange={(event) => setMineLocation(event.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    <Footer></Footer>
    </>
  );
}
