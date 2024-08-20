import React from 'react'
import Header from './Header'
import { building } from '../assets/img'

const Home = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primaryColorLight'>
      <Header />
      <div className='h-[calc(100vh-64px)] bg-primaryColorLight flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-semibold text-tertiaryColor mb-10'>Página de Inicio</h1>
            <img src={building} alt='building' className='w-3/4 rounded-2xl bg-tertiaryColorLight border-secondaryColorLight border-4' />
        </div>
    </div>
  )
}

export default Home