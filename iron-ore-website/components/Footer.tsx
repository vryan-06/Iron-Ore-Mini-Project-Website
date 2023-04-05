import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100  p-7 text-center">
      <h1 className="text-base font-semibold text-gray-800">
        © All rights reserved | Build by Mini Project Group of {' '}
        <span className="cursor-pointer font-semibold hover:text-violet-600">
          TE Comps A{' '}
        </span>
      </h1>
    </div>
  )
}

export default Footer