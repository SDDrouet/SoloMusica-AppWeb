import React, { useEffect, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { motion } from 'framer-motion'
import { useStateValue } from '../context/StateProvider';

const FilterButtons = ({ filterData, flag}) => {
    const [filterName, setFilterName] = useState(null);
    const [filterMenu, setFilterMenu] = useState(false);
    const [ {artistFilter, albumFilter, filterTerm, languageFilter}, dispatch] = useStateValue();

    const [longitud, setLongitud] = useState(20);

    useEffect(() => {
        if ( flag === 'Artista' || flag === 'Álbum') {
            setLongitud(15);
        }
    });

    const updateFilterButton = (name) => {
        setFilterName(name);

        if (flag === 'Artista') {
            dispatch({
                type: 'SET_ARTIST_FILTER',
                artistFilter: name,
            });
        }

        if (flag === 'Álbum') {
            dispatch({
                type: 'SET_ALBUM_FILTER',
                albumFilter: name,
            });
        }

        if (flag === 'Idioma') {
            dispatch({
                type: 'SET_LANGUAGE_FILTER',
                languageFilter: name,
            });
        }

        if (flag === 'Género') {
            dispatch({
                type: 'SET_FILTER_TERM',
                filterTerm: name,
            });
        }
    }


  return (
    <div className='w-48 select-none border bg-secondaryColorLight border-primaryColor rounded-md pl-4 pr-1 py-1 relative cursor-pointer hover:border-primaryColorLight'
    onClick={() => setFilterMenu(!filterMenu)}
    >
        <div className='relative w-full flex items-center'>

        
            <p className=' text-end text-base tracking-wide text-quaternaryColor hover:text-quaternaryColorLight flex items-center gap-2'
            >
                {!filterName && flag}
                {filterName && (
                    <>
                        {filterName.length > 15 ? `${filterName.slice(0, 15)}...` : filterName}
                    </>
                )}
        
            </p>

            <IoChevronDown className='absolute right-2 text-quaternaryColor hover:text-quaternaryColorLight text-base duration-150 transition-all ease-in-out' /> 

        </div>

        {filterData && filterMenu && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='w-64 z-50 backdrop-blur-sm max-h-44 overflow-y-scroll py-2 flex flex-col rounded-md shadow-md absolute top-8 left-0 bg-primaryColor text-quaternaryColor'
            >
                {filterData.map((data, i) => (
                    <div
                        key={i}
                        className='flex items-center gap-4 px-4 py-1 hover:bg-secondaryColorLight'
                        onClick={() => updateFilterButton(data.name)}
                    >
                        
                        {(flag === 'Artista' || flag === 'Álbum') && (
                         <img 
                            src={data.imageUrl}                            
                            className='w-8 min-w-[32px] h-8 rounded-full object-cover'
                         />                            
                        )}

                        <p className='w-full font-semibold'>
                            {data.name.length > longitud ? `${data.name.slice(0, longitud)}...` : data.name}
                        </p>
                    </div>                    
                ))}


            </motion.div>
        )}
    </div>
  )
}

export default FilterButtons