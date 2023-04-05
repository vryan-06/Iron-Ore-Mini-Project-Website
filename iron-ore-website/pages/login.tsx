import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';

const auth = getAuth(app);
const db = getFirestore(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === '' || password === '') {
        setError('Please enter email and password.');
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      // redirect to dashboard or home page
      router.push("/prediction")
      console.log(email);
      console.log(password);
    } catch (error) {
      console.error(error);
      setError('Invalid email or password.');
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-medium mb-4">Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-green-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-green-400"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;