import React from 'react';
import Header from './Header';
import { BackgroundImage } from '../assets/img/index';
import { NavLink } from 'react-router-dom';

const PremiumPlans = () => {
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

      <div className='relative flex flex-col items-center justify-center pb-16 px-6 mt-12 '>
        <div className='bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-4xl text-center mb-24'>
          <h2 className='text-4xl font-bold text-quaternaryColor mb-6'>
            "Disfruta más con Solo Música Premium"
          </h2>
          <p className='text-xl text-gray-300 mb-8'>
            Explora nuestros planes premium y elige el que mejor se adapte a ti.
          </p>
          <div className='flex flex-col md:flex-row gap-8 justify-center'>
            {/* Plan Estudiante */}
            <div className='bg-primaryColorLight border-2 border-secondaryColor p-6 rounded-lg shadow-lg w-full'>
              <h3 className='text-2xl font-bold text-quaternaryColor mb-4'>Plan Estudiante</h3>              
              <p className='text-quaternaryColorLight mb-4'>Descuento especial para estudiantes. Todo lo que necesitas para estudiar con buena música.</p>
              <p className='text-3xl font-semibold text-quaternaryColorLight mb-6'>$4.99/mes</p>
              <NavLink to={"/subscribe/estudiante"}>
                <button className='bg-tertiaryColor hover:bg-tertiaryColorLight text-primaryColor py-2 px-6 rounded-md font-semibold shadow-md transition duration-300'>
                  Suscribirse
                </button>
              </NavLink>
            </div>
            {/* Plan Personal */}
            <div className='bg-primaryColorLight border-2 border-secondaryColor p-6 rounded-lg shadow-lg w-full'>
              <h3 className='text-2xl font-bold text-quaternaryColor mb-4'>Plan Personal</h3>
              <p className='text-quaternaryColorLight mb-4'>Tu música, tus reglas. Disfruta de una experiencia personalizada sin interrupciones.</p>
              <p className='text-3xl font-semibold text-quaternaryColorLight mb-6'>$9.99/mes</p>
              <NavLink to={"/subscribe/personal"}>
                <button className='bg-tertiaryColor hover:bg-tertiaryColorLight text-primaryColor py-2 px-6 rounded-md font-semibold shadow-md transition duration-300'>
                  Suscribirse
                </button>
              </NavLink>
            </div>
            {/* Plan Familiar */}
            <div className='bg-primaryColorLight border-2 border-secondaryColor p-6 rounded-lg shadow-lg w-full'>
              <h3 className='text-2xl font-bold text-quaternaryColor mb-4'>Plan Familiar</h3>
              <p className=' text-quaternaryColorLight mb-4'>Comparte con los tuyos. Hasta 6 cuentas para disfrutar en familia.</p>
              <p className='text-3xl font-semibold text-quaternaryColorLight mb-6'>$14.99/mes</p>
              <NavLink to={"/subscribe/familiar"}>
                <button className='bg-tertiaryColor hover:bg-tertiaryColorLight text-primaryColor py-2 px-6 rounded-md font-semibold shadow-md transition duration-300'>
                  Suscribirse
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumPlans;
