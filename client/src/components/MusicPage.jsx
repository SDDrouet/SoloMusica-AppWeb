import React from 'react';
import Header from './Header';
import DashboardSongs from './DashboardSongs'; // Asegúrate de tener este componente disponible
import { BackgroundImage } from '../assets/img/index';

const MusicPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-secondaryColor via-primaryColor to-primaryColor'>
      <Header />
      <img
        src={BackgroundImage}
        alt="Background"
        className='w-full h-full object-cover fixed top-0 left-0 opacity-70 filter blur-lg'
      />
      <h1 className='text-4xl font-bold text-white mt-4 mb-8 z-10'>Disfruta!</h1>
      <div className='z-10 mb-32 max-h-[700px] w-3/4'>
        <DashboardSongs isEditable={false} />
      </div>

    </div>
  );
}

export default MusicPage;
