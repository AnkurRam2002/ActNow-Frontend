import { useNavigate } from 'react-router-dom';
import homeIcon from '../assets/homeIcon.png';
import Logo from '../assets/Logo.png';

const ProfileTopBar = () => {

  const navigate = useNavigate();

  const goHome = () => {
      navigate('/home'); 
    }
  // Handle logout
  const handleLogout = () => {
    // Remove authentication-related data from localStorage
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
            className='h-[2.5vw] cursor-pointer mx-2 opacity-75 hover:opacity-55 active:opacity-75 transition-all' // Ensuring profile icon has same size as home icon
            onClick={goHome}
          />

        {/* Vertical Line between Home and Profile */}
        <div className='h-15 w-9 bg-[#5f5e5a]'></div>
         
        {/* Logout Button */}
        <button
        className='logout-btn px-4 py-2 bg-[#FF2C0C] rounded text-white text-[1vw] font-medium cursor-pointer hover:bg-[#e62b0e] active:bg-[#FF2C0C] transition-all'
        onClick={handleLogout}>
        Logout</button>
        </div>
      </div>
  );
};

export default ProfileTopBar;