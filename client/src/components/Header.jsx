import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaCrown, FaHeart, FaUser, FaAngleDoubleRight } from 'react-icons/fa'
import { MdSpaceDashboard } from "react-icons/md";

import { Logo } from '../assets/img/index'
import { isActiveStyle, isNotActiveStyle } from '../assets/utils/styles'
import { useStateValue } from '../context/StateProvider'
import { app } from '../config/firebase.config'
import { getAuth } from 'firebase/auth'

import { motion } from 'framer-motion'

const Header = () => {
    const [{ user }] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    const navigate = useNavigate();

    const logOut = () => {
        // Log out the user
        const firebaseAuth = getAuth(app);
        firebaseAuth.signOut().then(() => {
            window.localStorage.setItem('auth', false);
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
        navigate('/login', { replace: true });
    }

    return (
        <header className='flex items-center w-full p-4 md:py-2 md:px-6 bg-primaryColor text-quaternaryColor'>
            <NavLink to={"/"}>
                <img src={Logo} alt="Logo" className='w-24 h-24 bg-quaternaryColor  hover:bg-opacity-90 rounded-md' />
            </NavLink>

            <ul className='flex items-center justify-center ml-7'>
                <li className='mx-5 text-lg'><NavLink to={'/inicio'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Inicio</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/musica'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Música</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/premium'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Premium</NavLink></li>
                <li className='mx-5 text-lg'><NavLink to={'/contactanos'} className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}>Contactanos</NavLink></li>
            </ul>

            <div
                onMouseEnter={() => setIsMenu(true)}
                onMouseLeave={() => setIsMenu(false)}
                className='flex items-center ml-auto cursor-pointer gap-3 bg-secondaryColor rounded-full py-2 px-3 hover:bg-secondaryColorLight transition-all duration-300 ease-in-out'
            >
                <img
                    src={user?.user?.imageURL}
                    className='w-11 h-11 min-w-[40px] object-cover rounded-full shadow-md border-2 border-tertiaryColor'
                    alt=""
                    referrerPolicy='no-referrer'
                />
                <div className='flex flex-col pr-2'>
                    <p className='text-quaternaryColor text-lg font-semibold truncate max-w-[150px]'>
                        {user?.user?.name}
                    </p>
                    <p className='flex items-center gap-1 text-xs text-tertiaryColor font-medium'>
                        Premium Member <FaCrown className='text-sm text-amber-500' />
                    </p>
                </div>

                {isMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, x: 50 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 50 }}

                        className='absolute z-10 top-20 p-4 right-0 w-275 gap-2 bg-secondaryColor bg-opacity-50 shadow-lg rounded-lg backdrop-blur-sm flex flex-col'>
                        <NavLink to={'/userProfile'}>
                            <p className='flex items-center gap-1 text-base text-quaternaryColor hover:font-semibold hover:text-tertiaryColorLight transition duration-300 ease-in-out'><FaUser /> Perfil</p>
                        </NavLink>
                        <p className='flex items-center gap-1 text-base text-quaternaryColor hover:font-semibold hover:text-tertiaryColorLight duration-300 transition ease-in-out'><FaHeart /> Me Gusta</p>
                        <hr />

                        {
                            user?.user?.role === 'admin' && (
                                <>
                                    <NavLink to={'/Dashboard/home'}>
                                        <p className='flex items-center gap-1 text-base text-quaternaryColor hover:font-semibold hover:text-tertiaryColorLight duration-300 transition ease-in-out'><MdSpaceDashboard /> Administrador</p>
                                    </NavLink>

                                    <hr />
                                </>
                            )
                        }



                        <p onClick={logOut} className='flex items-center gap-1 text-base text-quaternaryColor hover:font-semibold hover:text-red-400 duration-300 transition ease-in-out'><FaAngleDoubleRight /> Cerrar Sesión</p>
                    </motion.div>
                )}
            </div>
        </header>
    )
}

export default Header