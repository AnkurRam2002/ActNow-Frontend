import { useState,useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profileIcon.png';
import homeIcon from '../assets/homeIcon.png';
import Logo from '../assets/Logo.png';
import ProfileMenu from './ProfileMenu'

const TopBar = () => {

  const menuRef = useRef(null); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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

    const goHome = () => {
      navigate('/home'); 
    }

  return (
    <div className='border-b border-b-gray-900 px-[2.7%] py-[1.5%] flex justify-between items-center h-[10%] w-full'>
      
      {/* Left section for Logo */}
      <div className='flex items-center'>
        <img src={Logo} alt="logo" className='w-[50%]' />
      </div>

      {/* Right section for Home button and Profile */}
      <div className='flex items-center gap-[10%]'>
        {/* Home button */}
        <img
            src={homeIcon}
            alt="profile"
            className='h-[2.5vw] cursor-pointer mx-2 opacity-75' // Ensuring profile icon has same size as home icon
            onClick={goHome}
          />

        {/* Vertical Line between Home and Profile */}
        <div className='h-15 w-7.5 bg-[#5f5e5a]'></div>

        {/* Profile Label and Icon */}
          <img
            ref={menuRef}
            src={profileIcon}
            alt="profile"
            className='h-[2.5vw] cursor-pointer mx-2' // Ensuring profile icon has same size as home icon
            onClick={toggleMenu}
          />
          
          {/* Profile menu */}
          {isMenuOpen && (
          <div className='profile-menu fixed md:top-[12%] top-[9%] right-[2%] w-[18%]'>
            <ProfileMenu />
          </div>
        )}
        </div>
      </div>
  );
};

export default TopBar;
