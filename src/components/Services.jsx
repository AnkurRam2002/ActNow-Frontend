import React from 'react'
import servicesHeading from '../assets/servicesHeading.png'
import { FaUsers, FaCalendarAlt, FaCogs } from 'react-icons/fa';
import { MdNotifications } from "react-icons/md";
import { RiRobot2Fill } from "react-icons/ri";

const Services = () => {
  
  return (
    <div id="services" className="page-container h-[45.2vw] px-[10%] pt-[8%] pb-[5%]">
    
      <div className='flex-container h-full font-[Poppins] text-center text-black flex gap-[1%]'>

        {/* Left section */}
        <div className='left-section h-full w-[30%] flex flex-col gap-[2%]'>

          {/* Heading */}
          <div className='left-top-box w-full h-[40%] rounded-lg bg-center bg-cover' style={{ backgroundImage: `url(${servicesHeading})` }}></div>

          {/* Event Management */}
          <div className='left-bottom-box w-full h-[60%] rounded-lg flex flex-col items-center justify-center px-[15%] py-[10%] bg-[#d4c685] text-stone-900'>
          <FaCalendarAlt className="text-[2.3vw] mb-[1vw]" />
            <h1 className='text-[1.7vw] font-semibold tracking-wide mb-[5%]'>Event Management</h1>
            <p className='text-[0.9vw]'>Plan and track events with efficient volunteer participation.</p>
          </div>
        </div>

        {/* Middle section */}
        <div className='middle-section flex flex-col h-full w-[45%] gap-[2.5%]'>

          {/* Real-time Updates */}
          <div className='middle-top-box w-full h-[38%] rounded-lg flex flex-col items-center justify-center px-[10%] bg-[#f7ef81] text-stone-900'>
          <MdNotifications className="text-[2.8vw] mb-[0.5vw]" />
            <h1 className='text-[1.7vw] font-semibold tracking-wide mb-[1%]'>Real-Time Updates</h1>
            <p className='text-[0.9vw]'>Stay updated with instant alerts on schedules and tasks.</p>
          </div>

          
          <div className='middle-bottom-box flex w-full h-[62%] gap-[2.5%]'>

            {/* Volunteer Recruitment */}
            <div className='middle-bottom-left-box h-full w-[50%] rounded-lg flex flex-col items-center justify-center px-[10%] bg-[#cfe795] text-stone-900'>
              <FaUsers className="text-[3vw] mb-[0.5vw]" />
              <h1 className='text-[1.7vw] font-semibold tracking-wide mb-[5%]'>Volunteer Recruitment</h1>
              <p className='text-[0.9vw]'>Find and apply for roles matching your skills and interests.</p>
            </div>

            {/* Admin Dashboard */}
            <div className='middle-bottom-left-box h-full w-[50%] rounded-lg flex flex-col items-center justify-center px-[7%] bg-[#a7d3a6] text-stone-900'>
              <FaCogs className="text-[3vw] mb-[0.1vw]" />
              <h1 className='text-[1.7vw] font-semibold tracking-wide mb-[5%]'>Admin Dashboard</h1>
              <p className='text-[0.9vw]'>Manage volunteers, view stats, and track activity easily.</p>
            </div>

          </div>
        </div>


        {/* Right section -> Shift Scheduling */}
        <div className='right-section h-full w-[25%] rounded-lg flex flex-col items-center text-stone-900 px-[5%] py-[10%] bg-[#add2c2]'>
          <RiRobot2Fill className="text-[2.5vw] mb-[1.5vw]" />
          <h1 className='text-[1.7vw] font-semibold tracking-wide mb-[10%]'>AI Chat Assistant</h1>
          <p className='text-[0.9vw]'>Choose events suggested by AI and get instant event updates.</p>
        </div>
        
      </div>
    </div>
  )
}

export default Services