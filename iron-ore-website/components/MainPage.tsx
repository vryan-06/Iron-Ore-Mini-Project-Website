import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroImage from '../images/mine.jpg';

export default function MainPage() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-fit'>
      <div className='flex flex-col md:flex-row items-center justify-center w-full md:w-4/5'>
        <div className='md:w-1/2 md:mr-5'>
          <h1 className='text-4xl md:text-6xl font-bold text-gray-900'>
            Find the Best Mining Plants
          </h1>
          <p className='mt-5 p-2 text-lg md:text-xl text-gray-700'>
            Whether you're looking to buy or sell high-quality iron ores, you've come to the right place. Our platform connects miners from all over the world with buyers who are looking for the best quality ores available.
          </p>
          <div className='mt-7 flex flex-col md:flex-row justify-around items-center gap-5'>
            <Link href="/buyer">
              <button className='h-12 px-4 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden'>
                <span className='truncate'>Find Top-Quality Iron</span>
              </button>
            </Link>
            <Link href="/prediction">
            <button className='h-12 px-4 text-lg font-semibold text-green-900 border-2 border-green-600 rounded-lg hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 overflow-hidden'>
                <span className='truncate'>Post About Your Iron Ore</span>
              </button>
            </Link>
          </div>
        </div>
        <div className='hidden md:block'>
          <Image
            src={HeroImage}
            // width={1000}
            height={400}
            alt="Mine"
            className='rounded-xl'
          />
        </div>
      </div>
    </div>
  );
}
