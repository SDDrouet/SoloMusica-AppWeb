import React from 'react'
import { FaCheckCircle, FaRegTimesCircle, FaInfoCircle  } from "react-icons/fa";
import { motion } from 'framer-motion';

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      key={type}
      className={`fixed top-12 z-20 right-12 p-4 rounded-md flex items-center justify-center shadow-md bg-primaryColor border-2 ${type === "success" && "border-green-500"} ${type === "error" && "border-red-500"} ${type === "info" && "border-blue-500"}`}>
      {type === 'success' && (
        <div className='flex items-center justify-center gap-4'>
          <FaCheckCircle className='text-green-500 text-3xl' />
          <p className='text-green-500 text-base font-semibold'>Datos guardados correctamente.</p>
        </div>
      )}

      {type === 'error' && (
        <div className='flex items-center justify-center gap-4'>
          <FaRegTimesCircle className='text-red-500 text-3xl' />
          <p className='text-red-500 text-base font-semibold'>Error al guardar los datos.</p>
        </div>
      )}

      {type === 'info' && (
        <div className='flex items-center justify-center gap-4'>
          <FaInfoCircle className='text-blue-500 text-3xl' />
          <p className='text-blue-500 text-base font-semibold'>Falta completar datos.</p>
        </div>
      )}
    </motion.div>
  )
}

export default Alert