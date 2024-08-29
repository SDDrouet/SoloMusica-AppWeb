import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login, Dashboard, MusicPage, PremiumPage, UserProfilePage, MusicPlayer, } from './components'
import { app } from './config/firebase.config'
import { getAuth } from 'firebase/auth'
import { AnimatePresence } from 'framer-motion'
import { validateUser } from './api'
import { useStateValue } from './context/StateProvider'
import { actionType } from './context/reducer'
import { motion } from 'framer-motion'

const App = () => {

    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();

    const [{ user, isSongPlaying }, dispatch] = useStateValue();

    const [auth, setAuth] = useState(false || window.localStorage.getItem('auth') === "true");

    useEffect(() => {
        firebaseAuth.onAuthStateChanged((userCred) => {
            if (userCred) {
                userCred.getIdToken().then((token) => {
                    validateUser(token).then((data) => {
                        dispatch({
                            type: actionType.SET_USER,
                            user: data,
                        })
                    })
                })
            } else {
                setAuth(false);
                window.localStorage.setItem('auth', false);
                dispatch({
                    type: actionType.SET_USER,
                    user: null,
                });
                dispatch({
                    type: actionType.SET_ISSONG_PLAYING,
                    isSongPlaying: false,
                });
                navigate('/login');
            }
        })
    }, [])

    return (
        <AnimatePresence mode='wait'>

            <div className='h-auto min-w-[680px] bg-primaryColor flex justify-center items-center'>
                <Routes>
                    <Route path='/login' element={<Login setAuth={setAuth} />} />
                    <Route path='/*' element={<Home />} />
                    <Route path='/dashboard/*' element={<Dashboard />} />


                    // rutas de las paginas de la aplicacion
                    <Route path='/musica' element={<MusicPage />} />
                    <Route path='/premium' element={<PremiumPage />} />
                    <Route path='/userProfile' element={<UserProfilePage />} />
                </Routes>

                {isSongPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className='z-20 fixed bottom-0 min-w-[700px] inset-x-0 max-h-[7.6rem] bg-gradient-to-t to-tertiaryColor via-tertiaryColor from-tertiaryColorLight shadow-lg flex items-center justify-center border-t-2 border-primaryColor '
                    >
                        <MusicPlayer />

                    </motion.div>
                )}

            </div>
        </AnimatePresence>
    )
}

export default App
