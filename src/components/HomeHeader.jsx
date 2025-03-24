import React from 'react'
import profileIcon from '../assets/profileIcon.png'
import Logo from '../assets/Logo.png'
import SearchBar from './SearchBar'

const HomeHeader = () => {
  return (
    <div className='home-header px-[2.5%] py-[1.5%] flex gap-[5%] h-[10%] w-full'>

      <div className='left-section w-[20%] flex items-center justify-start gap-[8%]'>
        <img src={profileIcon} alt="profile" className='h-[60%]' />
        <img src={Logo} alt="logo" className='w-[50%]' />
      </div>

      <div className='middle-section flex justify-end items-center w-[40%]'>
        <SearchBar />
      </div>

      <div className='right-section w-[30%] flex gap-[2%] items-center'>
        <div className='w-[50%] h-[65%] border rounded-l-full'></div>
        <div className='w-[50%] h-[65%] border rounded-r-full'></div>
      </div>
    </div>
  )
}

export default HomeHeader