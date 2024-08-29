import React, { useEffect, useState } from 'react';
import { getAllArtist, deleteArtist } from '../api'; // Asegúrate de tener estas funciones en tu API
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { IoAdd } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { storage } from '../config/firebase.config';
import { deleteObject, ref } from 'firebase/storage';
import ConfirmDeleteModal from './ConfirmDeleteModal';


const DashboardArtists = () => {
  const [{ allArtists, alertType }, dispatch] = useStateValue();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let alertTimeout = null; // Variable para guardar el timeout

  const showMessage = (msg) => {
      // Si hay un timeout activo, limpiarlo
      if (alertTimeout) {
          clearTimeout(alertTimeout);
      }

      // Despachar la acción para borrar el mensaje anterior (si existe)
      if (alertType !== null) {
          dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
          });
      }

      // Despachar la acción para mostrar el nuevo mensaje
      dispatch({
          type: actionType.SET_ALERT_TYPE,
          alertType: msg,
      });

      // Establecer un nuevo timeout para ocultar el mensaje después de 4 segundos
      alertTimeout = setTimeout(() => {
          dispatch({
              type: actionType.SET_ALERT_TYPE,
              alertType: null,
          });
      }, 4000);
  };

  useEffect(() => {
    if (!allArtists) {
      getAllArtist().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data.artist
        });
      });
    }
  }, []);

  // Función para eliminar un artista
  const handleDeleteArtist = (artist) => {
    try {
      deleteArtist(artist._id).then((res) => {
        if (res) {
          const deletRefImage = ref(storage, artist.imageUrl);
          deleteObject(deletRefImage);
  
          // Filtra el artista eliminado del estado local
          const newArtists = allArtists.filter((element) => element._id !== artist._id);
  
          // Actualiza el estado local
          dispatch({
            type: actionType.SET_ALL_ARTISTS,
            allArtists: newArtists
          });
  
          showMessage("success");
        }
      });
    } catch (error) {
      showMessage("error");
    }

    setIsModalOpen(false);
  };

  return (
    <div className='w-full p-4 flex items-end justify-start flex-col text-quaternaryColor'>
      <NavLink to={"/dashboard/newSong"} className="text-base font-semibold text-primaryColor flex gap-4 items-center justify-center px-4 py-2 border border-tertiaryColor rounded-md bg-tertiaryColor hover:bg-tertiaryColorLight  hover:shadow-md cursor-pointer">
          <IoAdd/> <p>Nuevo Artista</p>
        </NavLink>
      <div className='relative w-full py-12 overflow-x-auto my-4 flex flex-col items-start justify-start p-4 border border-secondaryColorLight rounded-md gap-3 bg-black bg-opacity-50'>
        {/* Conteo total de artistas */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Número de artistas registrados: <span className='text-sm font-bold'>{allArtists?.length}</span>
          </p>
        </div>

        {/* Tabla de artistas */}
        <table className='table-auto w-full text-left'>
          <thead className='border-b-2 border-tertiaryColor'>
            <tr>
              <th className='p-2'></th>
              <th className='p-2'>Foto</th>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Twitter</th>
              <th className='p-2'>Instagram</th>
            </tr>
          </thead>
          <tbody>
            {allArtists && allArtists.map((artist, i) => (
              <DashboardArtistCard key={i} artist={artist} handleDeleteArtist={handleDeleteArtist} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardArtistCard = ({ artist, handleDeleteArtist }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr className='hover:bg-white hover:bg-opacity-5'>
      <td className='p-2'>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className='text-xl text-primaryColor w-8 h-8 rounded-md flex items-center justify-center bg-quaternaryColor hover:bg-red-500 cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <MdDelete />
        </motion.div>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDeleteArtist(artist)}
          itemName={`Artista: "${artist.name}"`}
        />

      </td>
      <td className='p-2'>
        <img src={artist.imageUrl} alt={artist.name} className='w-10 h-10 object-cover rounded-md' />
      </td>
      <td className='p-2'>{artist.name}</td>
      <td className='p-2'>{artist.twitter}</td>
      <td className='p-2'>{artist.instagram}</td>
    </tr>
  );
};

export default DashboardArtists;
