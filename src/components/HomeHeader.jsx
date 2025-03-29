import React, { useState } from 'react'
import profileIcon from '../assets/profileIcon.png'
import Logo from '../assets/Logo.png'
import SearchBar from './SearchBar'
import expandIcon from '../assets/expandIcon.png'

const HomeHeader = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='home-header px-[2.7%] py-[1.5%] flex gap-[5%] h-[10%] w-full'>

      <div className='left-section w-[20%] flex items-center justify-start gap-[8%]'>
        <img src={profileIcon} alt="profile" className='h-[60%] cursor-pointer' onClick={toggleMenu} />

        {/* Profile menu */}
        {isMenuOpen && (
          <div className='profile-menu fixed md:top-[12%] top-[9%] left-[2%] w-[18%] bg-white shadow-[0px_2px_3px_rgba(0,0,0,0.4)] rounded-sm p-[1%] border-1 border-[#e3e1e1] font-[Poppins]'>
            <p className='text-[1.1vw]'>username</p>
            <p className='text-[1vw] text-[#6A6767] font-light mb-[5%]'>email123@gmail.com</p>
            <hr className='border-[#B6B3B3] mb-[4%]' />
            <div className='flex gap-[4%] items-center'>
              <p className='text-[#383A42] text-[1.1vw] font-medium cursor-pointer hover:underline'>View profile</p>
              <img src={expandIcon} alt="expand" className='size-[5%]' />
            </div>
            <button className='logout-btn mt-[7%] mx-auto w-full bg-[#FF2C0C] rounded-sm text-white text-[1.2vw] font-medium py-[1.2%] cursor-pointer'>Logout</button>
          </div>
        )}

        <img src={Logo} alt="logo" className='w-[50%]' />
      </div>

      <div className='middle-section flex justify-end items-center w-[40%]'>
        <SearchBar />
      </div>

      <div className='right-section w-[30%] flex gap-[2%] items-center text-[1.1vw]'>
        <input 
            type="date" 
            className="start-date w-[50%] h-[65%] border border-[#b3b3b3] rounded-l-full px-[3%] text-[#757575]" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
        />
        <input 
          type="date" 
          className="end-date w-[50%] h-[65%] border border-[#b3b3b3] rounded-r-full px-[3%] text-[#757575]" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>
  )
}

export default HomeHeader