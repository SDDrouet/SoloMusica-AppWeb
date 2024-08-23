import React from 'react';
import Header from './Header';
import DashboardSongs from './DashboardSongs'; // Asegúrate de tener este componente disponible
import { building } from '../assets/img';

const MusicPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-secondaryColor via-primaryColor to-primaryColor'>
      <Header />
      <h1 className='text-4xl font-bold text-white mt-4 mb-8'>Disfruta!</h1>
      <div className='mb-32'>
        <DashboardSongs isEditable={false} />
      </div>

    </div>
  );
}

export default MusicPage;
