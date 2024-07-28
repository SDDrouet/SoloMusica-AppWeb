import React, { useEffect } from 'react'

import { FcGoogle } from 'react-icons/fc'

import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { app } from '../config/firebase.config';

import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { validateUser } from '../api';
import { bgVideo } from '../assets/video';
import { Logo } from '../assets/img';

const Login = ({ setAuth }) => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();

    const [{ user }, dispatch] = useStateValue();

    const loginWithGoogle = async () => {
        await signInWithPopup(firebaseAuth, provider).then((userCredential) => {
            if (userCredential) {
                setAuth(true);
                window.localStorage.setItem('auth', true);

                firebaseAuth.onAuthStateChanged((userCredential) => {
                    if (userCredential) {
                        userCredential.getIdToken().then((token) => {
                            validateUser(token).then((data) => {
                                dispatch({
                                    type: actionType.SET_USER,
                                    user: data,
                                })
                            });
                        })
                        navigate('/', { replace: true });
                    } else {
                        setAuth(false);
                        dispatch({
                            type: actionType.SET_USER,
                            user: null,
                        })
                        navigate('/login', { replace: true });
                    }
                });

            }
        });
    }

    useEffect(() => {
        if (window.localStorage.getItem('auth') === "true") {
            navigate('/', { replace: true });
        }
    }, [])


    return (
        <div className='relative w-screen h-screen bg-black'>
            <video
                src={bgVideo}
                type='video/mp4'
                autoPlay
                loop
                muted
                className='object-cover w-full h-full backdrop-blur-sm opacity-50'
            />
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center p-4'>
                <div className='mb-8 select-none'>
                    <img
                        src={Logo}
                        alt="Solo Musica"
                        className='w-40 h-40 max-w-md rounded-full border-4 border-cyan-300 bg-gray-600 bg-opacity-70 p-2 shadow-xl'
                    />
                </div>
                <div className='w-full max-w-md p-6 bg-gray-800 bg-opacity-80 rounded-lg shadow-xl backdrop-blur-md'>
                    <h2 className='text-3xl font-bold text-center text-cyan-300 mb-6'>Bienvenido a Solo Música</h2>
                    <div
                        className='flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-cyan-500 hover:bg-cyan-400 cursor-pointer hover:shadow-lg transition duration-300'
                        onClick={loginWithGoogle}
                    >
                        <FcGoogle className='text-3xl text-white' />
                        <span className='text-white text-lg font-semibold'>Iniciar sesión con Google</span>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Login