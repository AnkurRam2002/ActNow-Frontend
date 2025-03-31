import React, { useState, useEffect, useRef } from 'react'
import profileIcon from '../assets/profileIcon.png'
import Logo from '../assets/Logo.png'
import SearchBar from './SearchBar'
import ProfileMenu from './ProfileMenu'

const HomeHeader = () => {

  // State variables
  const menuRef = useRef(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when clicking outside or on scroll
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false); // Close menu if clicked outside
    }
  };

  const handleScroll = () => {
    setIsMenuOpen(false); // Close menu if page is scrolled
  };
    
  useEffect(() => {
    // Add event listeners for click and scroll
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='home-header px-[2.7%] py-[1.5%] flex gap-[5%] h-[10%] w-full'>

      {/* Left Section: Profile Icon, Dropdown Menu, and Logo */}
      <div ref={menuRef} className='left-section w-[20%] flex items-center justify-start gap-[8%]'>
        <img src={profileIcon} alt="profile" className='h-[60%] cursor-pointer' onClick={toggleMenu} />

        {/* Profile Dropdown Menu */}
        {isMenuOpen && (
          <div className='profile-menu fixed md:top-[12%] top-[9%] left-[2%] w-[18%]'>
            <ProfileMenu />
          </div>
        )}

        <img src={Logo} alt="logo" className='w-[50%]' />
      </div>
      
      {/* Middle Section: Search Bar */}
      <div className='middle-section flex justify-end items-center w-[40%]'>
        <SearchBar />
      </div>
      
      {/* Right Section: Date Filters */}
      <div className='right-section w-[30%] flex gap-[2%] items-center text-[1.1vw]'>

        {/* Start Date Input */}
        <input 
            type="date" 
            className="start-date w-[50%] h-[65%] border border-[#b3b3b3] rounded-l-full px-[3%] text-[#757575]" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
        />

        {/* End Date Input */}
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