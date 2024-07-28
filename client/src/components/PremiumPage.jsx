import React from 'react'
import Header from './Header'

const PremiumPage = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-slate-400'>
        <Header />
        <div className='h-[calc(100vh-64px)] bg-slate-400 flex justify-center items-center'>
            <h1 className='text-4xl text-black'>Página Premium</h1>
        </div>
    </div>
  )
}

export default PremiumPage