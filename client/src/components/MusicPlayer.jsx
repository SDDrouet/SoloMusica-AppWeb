import React, { useEffect, useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { RiPlayListFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { IoMusicalNote, IoDisc  } from 'react-icons/io5';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const MusicPlayer = () => {
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
    const [isPlayList, setIsPlayList] = useState(false);
    const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Estado para controlar la visibilidad del reproductor

    const nextTrack = () => {
        if (songIndex > allSongs.length - 2) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: songIndex + 1,
            });
        }
    }

    const previousTrack = () => {
        if (songIndex <= 0) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: 0,
            });
        } else {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: songIndex - 1,
            });
        }
    }

    const togglePlayerVisibility = () => {
        setIsPlayerVisible(!isPlayerVisible);
    }
    

    return (
        <div className='w-full flex items-center gap-3 min-h-8 z-30'>
            {isPlayerVisible ? (
                <div>
                    <p className='flex gap-2 items-center justify-center pl-4 py-1 text-base text-primaryColor font-semibold'>
                        <IoDisc className='text-xl'/>
                        {`${allSongs[songIndex]?.name.length > 20
                            ? allSongs[songIndex]?.name.slice(0, 20) + '...'
                            : allSongs[songIndex]?.name
                            }`}{" - "}
                        <span className='text-base'>
                            {" "}
                            {allSongs[songIndex]?.artist.length > 20
                                ? allSongs[songIndex]?.artist.slice(0, 20) + '...'
                                : allSongs[songIndex]?.artist}
                        </span>
                    </p>

                    <FaAngleUp
                        className='absolute top-2 right-2 text-2xl text-primaryColor cursor-pointer hover:text-quaternaryColor duration-200 z-50'
                        onClick={togglePlayerVisibility}
                    />
                </div>
            ) : (
                <FaAngleDown
                    className='absolute top-2 right-2 text-2xl text-primaryColor cursor-pointer hover:text-quaternaryColor duration-200 z-50'
                    onClick={togglePlayerVisibility}
                />


            )}



            <div className={`relative w-full items-center gap-3 p-4 flex ${isPlayerVisible && "hidden"}`}>

                <div className='w-5/12 flex items-center gap-3 p-4'>
                    <img
                        src={allSongs[songIndex]?.imageUrl}
                        alt=""
                        className='w-20 h-20 rounded-md object-cover border-collapse border-2 border-primaryColor'
                    />

                    <div className='flex items-start flex-col'>                        
                        <p className='text-2xl text-primaryColor font-semibold'>
                            

                            {`${allSongs[songIndex]?.name.length > 20
                                ? allSongs[songIndex]?.name.slice(0, 20) + '...'
                                : allSongs[songIndex]?.name
                                }`}{" "}
                            <span className='text-base'>({allSongs[songIndex]?.album})</span>
                        </p>
                        <p className='text-primaryColorLight'>
                            {allSongs[songIndex]?.artist.length > 20
                                ? allSongs[songIndex]?.artist.slice(0, 20) + '...'
                                : allSongs[songIndex]?.artist}{" "}
                            <span className='text-sm text-primaryColorLight font-semibold'>
                                ({allSongs[songIndex]?.category})
                            </span>
                        </p>

                        <motion.i
                            whileTap={{ scale: 0.8 }}
                            onClick={() => setIsPlayList(!isPlayList)}
                        >
                            <RiPlayListFill className='text-xl cursor-pointer text-primaryColor hover:text-quaternaryColor duration-200' />

                        </motion.i>
                    </div>
                </div>

                <div className='flex-1'>
                    <AudioPlayer
                        src={allSongs[songIndex]?.songUrl}
                        onPlay={() => console.log('onPlay')}
                        autoPlay={true}
                        onClickNext={nextTrack}
                        onClickPrevious={previousTrack}
                        showJumpControls={true}
                        showFilledVolume={true}
                        showSkipControls={true}
                        className='outline-none'
                        onEnded={nextTrack}
                        
                    />
                </div>

                {isPlayList && <PlayListCard />}
            </div>

        </div>
    )
}

export const PlayListCard = () => {
    const [{ allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();

    useEffect(() => {
        if (!allSongs) {
            getAllSongs().then(data => {
                dispatch({
                    type: actionType.SET_ALL_SONGS,
                    allSongs: data.song
                })
            })
        }
    }, []);

    const setCurrentPlaySong = (index) => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            })
        }

        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }
    }

    return (
        <div className='absolute left-4 bottom-24 gap-2 py-2 w-350 max-w-[350px] h-510 max-h-[510px] flex flex-col overflow-y-scroll rounded-md shadow-md bg-primaryColor justify-start items-start border-2 border-secondaryColor'>
            {allSongs.length > 0 ? (
                allSongs.map((data, index) => (
                    <motion.div
                        initial={{ opacity: 0, translateX: -50 }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className={`group w-full p-4 hover:bg-primaryColorLight flex gap-3 items-center cursor-pointer bg-transparent border-b border-secondaryColor`}
                        onClick={() => setCurrentPlaySong(index)}
                        key={index}
                    >

                        <IoMusicalNote className='text-quaternaryColor group-hover:text-quaternaryColorLight text-2xl cursor-pointer' />

                        <div className='flex items-start flex-col'>
                            <p className='text-lg 
                            text-quaternaryColorLight font-semibold'>
                                {`${data?.name.length > 20
                                    ? data?.name.slice(0, 20) + '...'
                                    : data?.name
                                    }`}{" "}
                                <span className='text-base'>({data?.album})</span>

                            </p>
                            <p className='text-quaternaryColor'>
                                {data?.artist.length > 20
                                    ? data?.artist.slice(0, 20) + '...'
                                    : data?.artist}{" "}
                                <span className='text-sm text-quaternaryColorLight'>
                                    ({data?.category})
                                </span>
                            </p>
                        </div>
                    </motion.div>
                ))
            ) :
                <></>

            }
        </div>
    )

}

export default MusicPlayer;
