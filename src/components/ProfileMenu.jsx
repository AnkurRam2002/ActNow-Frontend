import React from 'react'
import { useNavigate } from 'react-router-dom'
import expandIcon from '../assets/expandIcon.png'

const ProfileMenu = () => {

  const navigate = useNavigate();

  // Retrieve username and email from localStorage (fallback to defaults if not found)
  const username = localStorage.getItem('username') || 'User';
  const useremail = localStorage.getItem('userEmail') || 'Email'

  // Extract user ID from JWT token stored in localStorage
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

  // Navigate to the user's profile page
  const goToProfile = () => {
    navigate(`/users/${userId}`); // Redirect to the profile page with userId 
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
    
    <div className='profile-menu w-full bg-white shadow-[0px_2px_3px_rgba(0,0,0,0.4)] rounded-sm p-[5%] border-1 border-[#e3e1e1] font-[Poppins]'>
    
      {/* Display Username and Email */}
      <p className='text-[1.1vw]'>{username}</p>
      <p className='text-[1vw] text-[#6A6767] font-light mb-[5%]'>{useremail}</p>
      <hr className='border-[#B6B3B3] mb-[4%]' />

      <div className='flex gap-[4%] items-center'>
        {/* Link to user profile (only if userId exists) */}
        {userId && (
            <p onClick={goToProfile} className="text-[#383A42] text-[1.1vw] font-medium cursor-pointer hover:underline">
              View Profile
            </p>
          )}

        <img src={expandIcon} alt="expand" className='size-[5%]' />
      </div>

      {/* Logout Button */}
      <button className='logout-btn mt-[7%] mx-auto w-full bg-[#FF2C0C] rounded-sm text-white text-[1.2vw] font-medium py-[1.2%] cursor-pointer hover:bg-[#e62b0e] active:bg-[#FF2C0C] transition-all' onClick={handleLogout}>Logout</button>
    </div>
    
  )
}

export default ProfileMenu