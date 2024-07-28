import React from 'react'
import Header from './Header'
import { building } from '../assets/img'

const PremiumPage = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-slate-400'>
        <Header />
        <div className='h-[calc(100vh-64px)] bg-slate-400 flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-black mb-10'>Página Premium</h1>
            <img src={building} alt='building' className='w-3/4 rounded-2xl bg-slate-300 border-slate-800 border-4' />
        </div>
    </div>
  )
}

export default PremiumPage