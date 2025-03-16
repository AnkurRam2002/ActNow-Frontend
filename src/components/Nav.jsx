import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = () => {

  const navigate = useNavigate();

  const handleScroll = (id) => { //scrolls to specific section on clicking from nav
    document.getElementById(id)?.scrollIntoView();
  };

  return (
    <div className='nav-container flex justify-center my-auto h-[60%] w-full font-[Poppins] text-[1.2vw]'>

      <div className='left-section w-[78%] bg-white rounded-bl-full flex items-center px-[8%]'>
        <ul className='nav-list flex justify-between w-full'>
          <li className='cursor-pointer' onClick={() => handleScroll('home')}>Home</li>
          <li className='cursor-pointer' onClick={() => handleScroll('about')}>About</li>
          <li className='cursor-pointer' onClick={() => handleScroll('services')}>Services</li>
          <li className='cursor-pointer' onClick={() => handleScroll('contact')}>Contact</li>
        </ul>
      </div>

      <div className='right-section w-[22%] bg-[#463E3E] rounded-tr-full text-white flex justify-center items-center cursor-pointer' onClick={() => navigate('/login')}>
        Login
      </div>
    </div>
  )
}

export default Nav