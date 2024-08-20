import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider'
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from '../context/reducer';
import { FaUsers } from 'react-icons/fa';
import { GiLoveSong, GiMusicalNotes } from "react-icons/gi";
import { RiUserStarFill } from "react-icons/ri";


export const DashboardCard = ({ icon, name, count, bgColor }) => {
  return (
    <div className={`p-6 w-56 h-48 rounded-lg shadow-lg flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105`}
         style={{ 
           background: `${bgColor}`,
         }}>
      <div className="text-5xl text-white mb-4">{icon}</div>
      <p className='text-xl text-white font-bold mb-2'>{name}</p>
      <p className='text-3xl text-white font-semibold'>{count}</p>
    </div>
  )
}

// Función auxiliar para ajustar el color
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const DashboardHome = () => {
  const [{ allUsers, allSongs, artists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if(!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, [])

  return (
    <div className="w-full p-6 flex items-center justify-evenly flex-wrap gap-6">
      <DashboardCard icon={<FaUsers />} name="Users" count={allUsers?.length > 0 ? allUsers?.length : 0} bgColor="#0c90cc" />
      <DashboardCard icon={<GiLoveSong />} name="Songs" count={allSongs?.length > 0 ? allSongs?.length : 0} bgColor="#0e6ee9" />
      <DashboardCard icon={<RiUserStarFill />} name="Artists" count={artists?.length > 0 ? artists?.length : 0} bgColor="#e9520e" />
      <DashboardCard icon={<GiMusicalNotes />} name="Albums" count={allAlbums?.length > 0 ? allAlbums?.length : 0} bgColor="#e90e38" />
    </div>
  );
}

export default DashboardHome