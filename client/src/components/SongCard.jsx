import React from 'react'
import { motion } from "framer-motion"
import { IoTrash } from 'react-icons/io5'

const SongCard = ({data, index}) => {
  return (
    <motion.div
        className='relative w-40 min-w-210 px-2 cursor-pointer hover:bg-primaryColor bg-primaryColorLight shadow-md rounded-lg flex flex-col items-center duration-150 transition-all ease-in-out'
    >
        <div className='w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden'>
            <motion.img
                whileHover={{ scale: 1.05}}
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

        <div className='select-none w-full absolute bottom-2 right-2 flex items-center justify-between px-4'>
            <motion.i
            whileTap={ {scale: 0.75}}
                className='text-base text-red-500 drop-shadow-md hover:text-deleteColor'
            >
                <IoTrash />
            </motion.i>
        </div>
    </motion.div>
  )
}

export default SongCard