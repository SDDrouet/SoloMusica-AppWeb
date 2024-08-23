import React from 'react';
import Header from './Header';
import DashboardHome from './DashboardHome';
import { Logo, BackgroundImage } from '../assets/img/index'; // Asegúrate de tener estas imágenes disponibles
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div
      className='w-full min-h-screen flex flex-col items-center bg-gradient-to-b to-primaryColor via-primaryColorLight from-primaryColor'
    >
      <img
        src={BackgroundImage}
        alt="Background"
        className='w-full h-full object-cover fixed top-0 left-0 opacity-70 filter blur-lg'
      />
      <Header />

      <div className='relative flex flex-col items-center justify-center pb-16 px-6'>
        <img
          src={Logo}
          alt="Logo"
          className='w-96'
        />
        <div className='bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-2xl text-center'>
          <h2 className='text-4xl font-bold text-quaternaryColor mb-6'>
            "El latido de tu música, donde quiera que vayas"
          </h2>
          <p className='text-xl text-gray-300 mb-4'>
            Deja que la música te inspire y eleve tus emociones. Sumérgete en nuestra vasta colección de canciones, artistas y álbumes, todo en un solo lugar.
          </p>
          <p className='text-xl text-gray-300 mb-8'>
            Disfruta de la mejor experiencia musical con Solo Música.
          </p>
          <NavLink to={"/musica"}>
            <button className='bg-tertiaryColor hover:bg-tertiaryColorLight text-primaryColor py-2 px-6 rounded-md font-semibold shadow-md transition duration-300'>
              Escuchar Música Ahora
            </button>
          </NavLink>
        </div>
        <DashboardHome />
      </div>
    </div>
  );
}

export default Home;
