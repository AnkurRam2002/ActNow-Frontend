import React from 'react'
import servicesHeading from '../assets/servicesHeading.png'
import servicesEventManage from '../assets/servicesEventManage.png'
import servicesRealTime from '../assets/servicesRealTime.png'
import servicesRecruit from '../assets/servicesRecruit.png'
import servicesDashboard from '../assets/servicesDashboard.png'
import servicesShift from '../assets/servicesShift.png'

const Services = () => {
  
  return (
    <div id="services" className="page-container h-[45.2vw] px-[10%] pt-[8%] pb-[5%]">
    
      <div className='flex-container h-full font-[Poppins] text-center text-white flex gap-[0.7%]'>

        {/* Left section */}
        <div className='left-section h-full w-[30%] flex flex-col gap-[1.5%]'>

          {/* Heading */}
          <div className='left-top-box w-full h-[40%] rounded-lg bg-center bg-cover' style={{ backgroundImage: `url(${servicesHeading})` }}></div>

          {/* Event Management */}
          <div className='left-bottom-box w-full h-[60%] rounded-lg flex flex-col items-center px-[15%] py-[10%] bg-cover bg-center' style={{ backgroundImage: `url(${servicesEventManage})` }}>
            <h1 className='text-[2vw] font-semibold tracking-wide mb-[10%]'>Event Management</h1>
            <p className='text-[0.9vw]'>Plan, coordinate, and track events while ensuring efficient volunteer participation.</p>
          </div>
        </div>

        {/* Middle section */}
        <div className='middle-section flex flex-col h-full w-[45%] gap-[1.5%]'>

          {/* Real-time Updates */}
          <div className='middle-top-box w-full h-[30%] rounded-lg flex flex-col items-center px-[8%] py-[3%] bg-cover bg-center' style={{ backgroundImage: `url(${servicesRealTime})`}}>
            <h1 className='text-[2vw] font-semibold tracking-wide mb-[2%]'>Real-Time Updates</h1>
            <p className='text-[0.9vw]'>Stay informed with instant notifications about schedules, tasks, and event changes.</p>
          </div>

          
          <div className='middle-bottom-box flex w-full h-[70%] gap-[1.5%]'>

            {/* Volunteer Recruitment */}
            <div className='middle-bottom-left-box h-full w-[50%] rounded-lg flex flex-col items-center p-[10%] bg-cover bg-center' style={{ backgroundImage: `url(${servicesRecruit})`}}>
              <h1 className='text-[2vw] font-semibold tracking-wide mb-[10%]'>Volunteer Recruitment</h1>
              <p className='text-[0.9vw]'>Easily find and apply for volunteer opportunities that match your skills and interests.</p>
            </div>

            {/* Admin Dashboard */}
            <div className='middle-bottom-right-box h-full w-[50%] rounded-lg flex flex-col items-center px-[7%] py-[10%] bg-cover bg-center' style={{ backgroundImage: `url(${servicesDashboard})`}}>
              <h1 className='text-[2vw] font-semibold tracking-wide mb-[10%]'>Admin Dashboard</h1>
              <p className='text-[0.9vw]'>A smart dashboard to manage volunteers, track participation, and streamline operations.</p>
            </div>

          </div>
        </div>


        {/* Right section -> Shift Scheduling */}
        <div className='right-section h-full w-[25%] rounded-lg flex flex-col items-center px-[5%] py-[10%] bg-cover bg-center' style={{ backgroundImage: `url(${servicesShift})`}}>
          <h1 className='text-[2vw] font-semibold tracking-wide mb-[10%]'>Shift Scheduling</h1>
          <p className='text-[0.9vw]'>Manage and organize volunteer shifts with automated scheduling and reminders.</p>
        </div>
        
      </div>
    </div>
  )
}

export default Services