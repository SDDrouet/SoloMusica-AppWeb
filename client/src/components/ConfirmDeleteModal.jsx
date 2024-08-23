import React from 'react';
import { motion } from 'framer-motion';

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-primaryColor text-base text-quaternaryColor border-2 border-secondaryColorLight rounded-lg p-6 w-96"
      >
        <h2 className="text-xl font-semibold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">¿Estás seguro de que deseas eliminar <span className="font-bold">{itemName}</span>? Esta acción no se puede deshacer.</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondaryColor rounded-md hover:bg-secondaryColorLight font-semibold"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 rounded-md hover:bg-deleteColor font-semibold"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteModal;
