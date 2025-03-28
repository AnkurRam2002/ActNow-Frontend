import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from '../assets/profileIcon.png';
import homeIcon from '../assets/homeIcon.png';
import Logo from '../assets/Logo.png';
import expandIcon from '../assets/expandIcon.png'

const TopBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const username = localStorage.getItem('username') || 'User';
  const useremail = localStorage.getItem('userEmail') || 'Email'

  const token = localStorage.getItem('token');
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

    // Toggle menu visibility
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const goToProfile = () => {
      navigate(`/users/${userId}`); // Redirect to the profile page with userId 
    }

    const goHome = () => {
      navigate('/home'); 
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
            className='h-[2.5vw] cursor-pointer mx-2' // Ensuring profile icon has same size as home icon
            onClick={goHome}
          />

        {/* Vertical Line between Home and Profile */}
        <div className='h-15 w-7.5 bg-gray-900'></div>

        {/* Profile Label and Icon */}
          <img
            src={profileIcon}
            alt="profile"
            className='h-[2.5vw] cursor-pointer mx-2' // Ensuring profile icon has same size as home icon
            onClick={toggleMenu}
          />
          
          {/* Profile menu */}
          {isMenuOpen && (
            <div className='fixed md:top-[12%] top-[9%] right-[5%] w-[18%] bg-white shadow-[0px_2px_3px_rgba(0,0,0,0.4)] rounded-sm p-[1%] border-1 border-[#e3e1e1] font-[Poppins]'>
              <p className='text-[1.1vw]'>{username}</p>
              <p className='text-[1vw] text-[#6A6767] font-light mb-[5%]'>{useremail}</p>
              <hr className='border-[#B6B3B3] mb-[4%]' />
              <div className='flex gap-[4%] items-center'>
                <p className='text-[#383A42] text-[1.1vw] font-medium'>View profile</p>
                <img src={expandIcon} alt="expand" className='size-[5%]' onClick={goToProfile}/>
              </div>
              <button className='mt-[7%] mx-auto w-full bg-[#FF2C0C] rounded-sm text-white text-[1.2vw] font-medium py-[1.2%] cursor-pointer' onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
  );
};

export default TopBar;
