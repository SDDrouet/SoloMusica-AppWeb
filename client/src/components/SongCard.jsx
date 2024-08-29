import React, { useState } from 'react'
import { motion } from "framer-motion"
import { IoTrash } from 'react-icons/io5'
import { storage } from '../config/firebase.config'
import { deleteObject, ref } from 'firebase/storage'
import { deleteSong, getAllSongs } from '../api'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
import ConfirmDeleteModal from './ConfirmDeleteModal'

const SongCard = ({ data, index, isEditable}) => {
    const [{allSongs, alertType, isSongPlaying, songIndex}, dispath] = useStateValue();
    const [isModalOpen, setIsModalOpen] = useState(false);

    let alertTimeout = null; // Variable para guardar el timeout

    const showMessage = (msg) => {
        // Si hay un timeout activo, limpiarlo
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }

        // Despachar la acción para borrar el mensaje anterior (si existe)
        if (alertType !== null) {
            dispath({
                type: actionType.SET_ALERT_TYPE,
                alertType: null,
            });
        }

        // Despachar la acción para mostrar el nuevo mensaje
        dispath({
            type: actionType.SET_ALERT_TYPE,
            alertType: msg,
        });

        // Establecer un nuevo timeout para ocultar el mensaje después de 4 segundos
        alertTimeout = setTimeout(() => {
            dispath({
                type: actionType.SET_ALERT_TYPE,
                alertType: null,
            });
        }, 4000);
    };


    const handleDeleteSong = (data) => {
        try {

            deleteSong(data._id).then((res) => {
                if (res) {
                    const deletRefImage = ref(storage, data.imageUrl);
                    const deletRefAudio = ref(storage, data.songUrl);

                    deleteObject(deletRefImage);
                    deleteObject(deletRefAudio);

                    getAllSongs().then(dataRes => {
                        dispath({
                            type: actionType.SET_ALL_SONGS,
                            allSongs: dataRes.song
                        })
                    });
                }
            });              

            showMessage("success");
        } catch (error) {
            showMessage("error");
        }
        setIsModalOpen(false);
    }

    const addToContext = () => {
        if(!isSongPlaying) {
            dispath({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            })
        }

        if (songIndex !== index) {
            dispath({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            });
        }


    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className='transition relative w-40 min-w-210 px-2 cursor-pointer hover:bg-primaryColorLight bg-primaryColor shadow-md rounded-lg flex flex-col items-center duration-150 ease-in-out'
            onClick={addToContext}
        >
            <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
                <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={data.imageUrl}
                    className='w-full h-full rounded-lg object-cover'
                />
            </div>
            <p className='text-tertiaryColorLight text-base font-semibold mt-2'>
                {data.name.length > 25 ? data.name.slice(0, 25) + '...' : data.name}
            </p>
            <p className='text-sm text-quaternaryColor mt-1 mb-4'>
                {data.artist.length > 25 ? data.artist.slice(0, 25) + '...' : data.artist}
            </p>


            {isEditable && (
            <div className='select-none w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
                <motion.i
                    whileTap={{ scale: 0.75 }}
                    className='text-base text-red-500 drop-shadow-md hover:text-deleteColor'
                    onClick={() => setIsModalOpen(true)}
                >
                    <IoTrash />
                </motion.i>
            </div>

            )}
            
            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={() => handleDeleteSong(data)}
                itemName={`Canción: "${data.name}"`}
            />
        </motion.div>
    )
}

export default SongCard