import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import profileIcon from '../assets/profileIcon.png'
import Logo from '../assets/Logo.png'
import SearchBar from './SearchBar'
import expandIcon from '../assets/expandIcon.png'
import api from '../api';

const HomeHeader = () => {

  // Extract user ID from JWT token stored in localStorage
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  // State variables
  const [user, setUser] = useState(null);
  const menuRef = useRef(null); 
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch user details on component mount or when userId changes
  useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/users/${userId}`); // API call to fetch user details
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }, [userId]);

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

  // Navigate to the user's profile page
  const goToProfile = () => {
    navigate(`/users/${userId}`); // Redirect to the profile page with userId 
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/login'); // Redirect to login page after logout
  }

  return (
    <div className='home-header px-[2.7%] py-[1.5%] flex gap-[5%] h-[10%] w-full'>

      {/* Left Section: Profile Icon, Dropdown Menu, and Logo */}
      <div className='left-section w-[20%] flex items-center justify-start gap-[8%]'>
        <img src={profileIcon} alt="profile" className='h-[60%] cursor-pointer' onClick={toggleMenu} />

        {/* Profile Dropdown Menu */}
        {isMenuOpen && (
          <div className='profile-menu fixed md:top-[12%] top-[9%] left-[2%] w-[18%] bg-white shadow-[0px_2px_3px_rgba(0,0,0,0.4)] rounded-sm p-[1%] border-1 border-[#e3e1e1] font-[Poppins]'>

            {/* Display Username and Email */}
            <p className='text-[1.1vw]'>{user?.username}</p>
            <p className='text-[1vw] text-[#6A6767] font-light mb-[5%]'>{user?.email}</p>
            <hr className='border-[#B6B3B3] mb-[4%]' />

            <div className='flex gap-[4%] items-center'>
              {/* Linking to profile page */}
              {userId && (
                  <p onClick={goToProfile} className="text-[#383A42] text-[1.1vw] font-medium cursor-pointer hover:underline">
                    View Profile
                  </p>
                )}

              <img src={expandIcon} alt="expand" className='size-[5%]' />
            </div>

            {/* Logout Button */}
            <button className='logout-btn mt-[7%] mx-auto w-full bg-[#FF2C0C] rounded-sm text-white text-[1.2vw] font-medium py-[1.2%] cursor-pointer' onClick={handleLogout}>Logout</button>
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