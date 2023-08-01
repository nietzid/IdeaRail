import React from 'react'

export default function LoginLeft() {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-full bg-white dark:bg-gray-800 ">
        <img src="img/login-illus.png" alt="collaboration" className='max-w-lg hidden md:block'/>
        <h1 className='bg-clip-text text-2xl md:text-4xl text-center font-bold text-transparent bg-gradient-to-r from-blue-500 to-teal-400 p-6 pb-0'>
          Idearail is The Ultimate
          Idea Generation Platform
        </h1>
        <br />
        <p className='text-md px-12 text-center hidden md:block'>
          Idearail adalah platform aplikasi yang menginspirasi dan mendorong inovasi tanpa batas! Yuk jelajahi dunia kreativitas dan rancang ide-ide luar biasa.
        </p>
      </div>
    </>
  )
}
