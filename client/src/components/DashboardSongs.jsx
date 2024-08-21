import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from 'react-icons/io5'
import { AiOutlineClear } from 'react-icons/ai'
import { useStateValue} from '../context/StateProvider'
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard'

const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [{allSongs}, dispath] = useStateValue();

  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispath({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song
        })
      })
    }
  }, []);

  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      
      <div className='w-full flex justify-center items-center gap-10'>
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center px-4 py-3 border border-tertiaryColor rounded-md bg-tertiaryColor hover:bg-tertiaryColorLight  hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>

        <input
        type="text"
        className={`w-52 select-none px-4 py-1.5 border-2 hover:border-tertiaryColor ${isFocus ? "border-tertiaryColor shadow-md" : "border-quaternaryColor"} bg-quaternaryColor font-semibold text-primaryColor rounded-md outline-none duration-150 transition-all ease-in-out text-base`}
        placeholder='Busca aquí...'
        value={songFilter}
        onChange={(e) => setSongFilter(e.target.value)}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        />

        <i>
          <AiOutlineClear className="text-3xl text-tertiaryColor hover:text-tertiaryColorLight cursor-pointer" />
        </i>

      </div>

      {/* Main Content*/}

      <div className='relative w-full py-12 overflow-x-auto my-4 flex flex-col items-start justify-start p-4 border border-secondaryColorLight rounded-md gap-3 bg-secondaryColor'>
        {/* Song */}
        <div className='absolute top-4 left-4 text-quaternaryColor'>
          <p className='text-sm font-semibold'>
            Número de Canciones: <span className='text-sm font-bold'>{allSongs?.length}</span>
          </p>
        </div>

        <SongContainer data={allSongs} />

      </div>
    
    </div>
  )
}

export const SongContainer = ({data}) => {
  return (
    <div className='w-full flex flex-wrap gap-3 items-center justify-center'>
      {data && data.map((song, i) => (
        <SongCard key={song._id} data={song}/>
      ))}
    </div>
  );
};

export default DashboardSongs