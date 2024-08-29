import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { motion } from 'framer-motion';
import moment from 'moment';
import 'moment/locale/es';
import { changeUserRole, getAllUsers, removeUser } from '../api';
import { actionType } from '../context/reducer';
import { MdDelete } from "react-icons/md";

moment.locale('es');

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  

  useState(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }
  }, []);

  return (
    <div className='w-full p-4 flex items-start justify-start flex-col text-quaternaryColor'>
      {/* Tabular datos en formulario */}
      <div className='relative w-full py-12 overflow-x-auto my-4 flex flex-col items-start justify-start p-4 border border-secondaryColorLight rounded-md gap-3 bg-black bg-opacity-50'>
        {/* Total count of the users */}
        <div className='absolute top-4 left-4'>
          <p className='text-sm font-semibold'>
            Número de usuarios registrados: <span className='text-sm font-bold'>{allUsers?.length}</span>
          </p>
        </div>

        {/* Tabla de usuarios */}
        <table className='table-auto w-full text-left'>
          <thead className='border-b-2 border-tertiaryColor'>
            <tr>
              <th className='p-2'></th>
              <th className='p-2'>Foto</th>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Verificado</th>
              <th className='p-2'>Fecha Creación</th>
              <th className='p-2'>Rol</th>
            </tr>
          </thead>
          <tbody>
            {allUsers && allUsers.map((data, i) => (
              <DashboardUserCard data={data} index={i} key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const DashboardUserCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);

  const createdAt = moment(new Date(data.createdAt)).format('MMMM Do YYYY');

  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
    changeUserRole(userId, role).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    });
  };

  return (
    <tr className='hover:bg-white hover:bg-opacity-5'>
      <td className='p-2'>
        {data._id !== user?.user._id && (
          <motion.div
            whileTap={{ scale: 0.75 }}
            className='text-xl text-primaryColor w-8 h-8 rounded-md flex items-center justify-center bg-quaternaryColor hover:bg-red-500 cursor-pointer'
            onClick={() => deleteUser(data._id)}
          >
            <MdDelete/>
          </motion.div>
        )}
      </td>
      <td className='p-2'>
        <img src={data.imageURL} referrerPolicy='no-referrer' alt="" className='w-10 h-10 object-cover rounded-md' />
      </td>
      <td className='p-2'>{data.name}</td>
      <td className='p-2'>{data.email}</td>
      <td className='p-2'>{data.email_verified ? "Verificado" : "No verificado"}</td>
      <td className='p-2'>{createdAt}</td>
      <td className='p-2'>
        <div className='flex items-center justify-start gap-6'>
          <p>{data.role === 'admin' ? 'Admin' : 'Miembro'}</p>
          {data._id !== user?.user._id && (
            <motion.p
              whileTap={{ scale: 0.75 }}
              className='text-[10px] font-bold px-2 py-1 rounded bg-tertiaryColor text-primaryColor hover:bg-tertiaryColorLight cursor-pointer'
              onClick={() => setIsUserRoleUpdated(true)}
            >
              {data.role !== 'admin' ? 'Admin' : 'Miembro'}
            </motion.p>
          )}
        </div>
        {isUserRoleUpdated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-primaryColor shadow-xl rounded-md'
          >
            <p className='text-quaternaryColor text-sm font-semibold'>
              ¿Quieres marcar este usuario como {data.role !== "admin" ? "Administrador" : "Miembro"}?
            </p>

            <div className='flex items-center justify-center text-center gap-4'>
              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-tertiaryColorLight text-primaryColor hover:shadow-md'
                onClick={() => updateUserRole(data._id, data.role === "admin" ? "member" : "admin")}
              >
                Sí
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.75 }}
                className='outline-none border-none text-sm px-4 py-1 rounded-md bg-secondaryColor text-quaternaryColor hover:shadow-md'
                onClick={() => setIsUserRoleUpdated(false)}
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </td>
    </tr>
  );
};

export default DashboardUsers;
