import React from 'react'

function Footer() {
  return (
    <div className="flex flex-col items-center justify-around bg-white p-3">
      <h1 className="text-base font-semibold text-gray-800">
        © All rights reserved | Built by
        <span className="cursor-pointer font-semibold hover:text-green-600">
          Ryan V and Deon Gracias
        </span>
      </h1>
    </div>
  )
}

export default Footer
