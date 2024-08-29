import React from 'react'
import Header from './Header'
import { building } from '../assets/img'

import { useStateValue } from '../context/StateProvider'

const UserProfilePage = () => {
  const [{ user }] = useStateValue();
  console.log("usuario:", user.user);
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-secondaryColor via-primaryColor to-primaryColor'>
      <Header />
      <h1 className='text-4xl font-bold text-quaternaryColor mt-8 mb-12'>Perfil de Usuario</h1>
      <div className='mb-32 w-full flex items-center justify-center'>
        <div className='flex gap-8 items-start justify-center bg-secondaryColorLight p-8 border-2 border-primaryColor rounded-md'>
          <div className='flex items-center justify-center flex-col w-auto h-full'>
            <img src={user.user.imageURL} alt='Building' className='w-44 h-44 rounded-full border-2 border-primaryColor shadow-md' />
            <h2 className='text-2xl font-bold text-quaternaryColor mt-4'>{user.user.name}</h2>
          </div>

          <div className='flex gap-6 items-start justify-start flex-col bg-primaryColor rounded-md border-2 border-primaryColorLight shadow-md p-8'>
            <h2 className='text-2xl font-bold text-quaternaryColor'>Información del usuario</h2>
            <div className='grid grid-cols-2'>
              <p className='text-quaternaryColor font-semibold'>Usuario: </p> <p className='text-quaternaryColor'>{user.user.name}</p>
              <p className='text-quaternaryColor font-semibold'>Correo: </p> <p className='text-quaternaryColor'>{user.user.email}</p>
              <p className='text-quaternaryColor font-semibold'>Verificado: </p> <p className='text-quaternaryColor'>{user.user.email_verified ? "Sí" : "No"}</p>
              <p className='text-quaternaryColor font-semibold'>Rol: </p> <p className='text-quaternaryColor'>{user.user.role === "admin" ? "Administrador" : "Miembro"}</p>
              <p className='text-quaternaryColor font-semibold'>Fecha de creación: </p> <p className='text-quaternaryColor'>{user.user.createdAt}</p>

            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default UserProfilePage