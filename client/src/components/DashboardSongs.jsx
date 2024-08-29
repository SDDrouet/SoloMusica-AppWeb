import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { useStateValue } from '../context/StateProvider'
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard'


const DashboardSongs = ({ isEditable }) => {
  const [songFilter, setSongFilter] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [{ allSongs }, dispath] = useStateValue();
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })

        setFilteredSongs(data.song);
      })
      

    } else {
      setFilteredSongs(allSongs);
    }

    
  }, []);

  const shearchSong = (shearchStringSongs) => {
    setSongFilter(shearchStringSongs);
    if (shearchStringSongs !== '') {
      console.log(songFilter);
      const filtered = allSongs.filter(song => {
        const filterByName = song.name.toLowerCase().includes(shearchStringSongs.toLowerCase());
        const filterByArtist = song.artist.toLowerCase().includes(shearchStringSongs.toLowerCase());

        return filterByName || filterByArtist;
      });
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(allSongs);
    }
  }


  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>

      <div className='w-full flex justify-center items-center gap-10'>

        {isEditable && (
          <NavLink to={"/dashboard/newSong"} className="text-base font-semibold text-primaryColor flex gap-4 items-center justify-center px-4 py-2 border border-tertiaryColor rounded-md bg-tertiaryColor hover:bg-tertiaryColorLight  hover:shadow-md cursor-pointer">
            <IoAdd /> <p>Agregar Música</p>
          </NavLink>
        )}


        <input
          type="text"
          className={`w-52 select-none px-4 py-1.5 border-2 hover:border-tertiaryColor ${isFocus ? "border-tertiaryColor shadow-md" : "border-quaternaryColor"} bg-quaternaryColor font-semibold text-primaryColor rounded-md outline-none duration-150 transition-all ease-in-out text-base`}
          placeholder='Busca aquí...'
          value={songFilter}
          onChange={(e) => shearchSong(e.target.value)}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}          
        />

        <i>
          <AiOutlineClear
            onClick={() => shearchSong('')}
            className="text-3xl text-tertiaryColor hover:text-tertiaryColorLight cursor-pointer"
            />
        </i>

      </div>

      {/* Main Content*/}

      <div className='relative w-full py-12 overflow-y-auto max-h-[700px] my-4 flex flex-col items-start justify-start p-4 border border-secondaryColorLight rounded-md gap-3 bg-black bg-opacity-50'>
        {/* Song */}
        <div className='absolute top-4 left-4 text-quaternaryColor'>
          <p className='text-sm font-semibold'>
            Número de Canciones: <span className='text-sm font-bold'>{allSongs?.length}</span>
          </p>
        </div>

        <SongContainer data={filteredSongs} isEditable={isEditable} />

      </div>

    </div>
  )
}

export const SongContainer = ({ data, isEditable }) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-center'>
      {data && data.map((song, i) => (
        <SongCard key={song._id} data={song} index={i} isEditable={isEditable} />
      ))}
    </div>
  );
};

export default DashboardSongs