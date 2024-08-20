import React from 'react'
import Header from './Header'
import { IoHome } from 'react-icons/io5'
import { NavLink, Route, Routes } from 'react-router-dom'
import { isActiveStyle, isNotActiveStyle } from '../assets/utils/styles'
import DashboardUsers from './DashboardUsers'
import DashboardArtists from './DashboardArtists'
import DashboardAlbums from './DashboardAlbums'
import DashboardSongs from './DashboardSongs'
import DashboardHome from './DashboardHome'

const Dashboard = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center bg-primary'>
        <Header />

        <div className='w-[60%] my-2 p-4 flex items-center justify-evenly'>
          <NavLink to={"/dashboard/home"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}> <IoHome className='text-2xl text-textLight' /></NavLink>
          <NavLink to={"/dashboard/users"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}> Users </NavLink>
          <NavLink to={"/dashboard/songs"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}> Songs </NavLink>
          <NavLink to={"/dashboard/artists"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}> Artists </NavLink>
          <NavLink to={"/dashboard/albums"} className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}> Albums </NavLink>
        </div>

        <div className='my-4 w-full p-4'>
          <Routes>
            <Route path='/home' element={<DashboardHome />} />
            <Route path='/users' element={<DashboardUsers />} />
            <Route path='/songs' element={<DashboardSongs />} />
            <Route path='/artists' element={<DashboardArtists />} />
            <Route path='/albums' element={<DashboardAlbums />} />
            <Route path='/newSong' element={<DashboardHome />} />
          </Routes>

        </div>


    </div>
  )
}

export default Dashboard
