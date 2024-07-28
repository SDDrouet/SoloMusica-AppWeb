import React from 'react'
import Header from './Header'
import { building } from '../assets/img'

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
        <Header />
        <div className='w-[60%] my-2 bg-blue-500 p-4 flex items-center justify-evenly'>
          <h1 className='text-4xl text-black'>Administrador</h1>
        </div>
        <img src={building} alt='building' className='w-1/4 rounded-2xl bg-slate-300 border-slate-800 border-4' />
    </div>
  )
}

export default Dashboard
