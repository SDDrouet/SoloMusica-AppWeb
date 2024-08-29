import React, { useEffect, useState } from 'react';
import { getAllAlbums, deleteAlbum } from '../api'; // Asegúrate de tener estas funciones en tu API
import { MdDelete } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { IoAdd } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import ConfirmDeleteModal from './ConfirmDeleteModal';

const DashboardAlbums = () => {
  const [{ allAlbums, alertType }, dispatch] = useStateValue();
  let alertTimeout = null; // Variable para guardar el timeout
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({
          type: actionType.SET_ALL_ALBUMS,
          allAlbums: data.album
        });
      });
    }
  }, []);

  // Función para eliminar un álbum
  const handleDeleteAlbum = (album) => {
    try {
      deleteAlbum(album._id).then((res) => {
        if (res) {
          const deletRefImage = ref(storage, album.imageUrl);
          deleteObject(deletRefImage);

          // Filtra el álbum eliminado del estado local
          const newAlbums = allAlbums.filter((albumItem) => albumItem._id !== album._id);

          // Actualiza el estado local
          dispatch({
            type: actionType.SET_ALL_ALBUMS,
            allAlbums: newAlbums
          });
        }

        showMessage("success");

      });
    } catch (error) {
      showMessage("error");
    }

    setIsModalOpen(false);  // Cierra el modal después de eliminar
  };

  return (
    <div className='w-full p-4 flex items-end justify-start flex-col text-quaternaryColor'>
      <NavLink to={"/dashboard/newSong"} className="text-base font-semibold text-primaryColor flex gap-4 items-center justify-center px-4 py-2 border border-tertiaryColor rounded-md bg-tertiaryColor hover:bg-tertiaryColorLight hover:shadow-md cursor-pointer">
        <IoAdd /> <p>Nuevo Álbum</p>
      </NavLink>
      <div className='relative w-full py-12 overflow-x-auto my-4 flex flex-col items-start justify-start p-4 border border-secondaryColorLight rounded-md gap-3 bg-black bg-opacity-50'>
        {/* Conteo total de álbumes */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Número de álbumes registrados: <span className='text-sm font-bold'>{allAlbums?.length}</span>
          </p>
        </div>

        {/* Tabla de álbumes */}
        <table className='table-auto w-full text-left'>
          <thead className='border-b-2 border-tertiaryColor'>
            <tr>
              <th className='p-2'></th>
              <th className='p-2'>Foto</th>
              <th className='p-2'>Nombre</th>
            </tr>
          </thead>
          <tbody>
            {allAlbums && allAlbums.map((album, i) => (
              <DashboardAlbumCard key={i} album={album} handleDeleteAlbum={handleDeleteAlbum} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DashboardAlbumCard = ({ album, handleDeleteAlbum }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <tr className='hover:bg-white hover:bg-opacity-5'>
      <td className='p-2'>
        <motion.div
          whileTap={{ scale: 0.75 }}
          className='text-2xl text-primaryColor w-12 h-12 rounded-md flex items-center justify-center bg-quaternaryColor hover:bg-red-500 cursor-pointer'
          onClick={() => setIsModalOpen(true)}
        >
          <MdDelete />
        </motion.div>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDeleteAlbum(album)}
          itemName={`Álbum: "${album.name}"`}
        />
      </td>
      <td className='p-2'>
        <img src={album.imageUrl} alt={album.name} className='w-16 h-16 object-cover rounded-md' />
      </td>
      <td className='p-2 text-base text-quaternaryColor'>{album.name}</td>
    </tr>
  );
};

export default DashboardAlbums;
