import React from 'react'
import contactHeading from '../assets/contactHeading.png'
import contactMap from '../assets/contactMap.png'
import phoneIcon from '../assets/phoneIcon.png'
import emailIcon from '../assets/emailIcon.png'



const Contact = () => {
  return (
    <div id="contact" className='page-container h-[50vw] px-[8%] pt-[7%]'>
    
          <div className="contact-flex-container relative flex items-start justify-between">
          
            <div className='left-section w-[20%] z-10'>
              <img src={contactHeading} alt="Contact"/>
            </div>

            <div className='right-section bg-white z-10 w-[75%] shadow-[-4px_4px_20px_rgba(0,0,0,0.2)] rounded-xl flex justify-between items-center py-[4%] px-[6%]'>

              <div className='info-section w-[40%] font-[Poppins] ml-[2%]'>

                <h1 className='text-[2.3vw] font-bold text-[#463E3E] mb-[10%]'>Support</h1>
                <div className='flex items-center text-[1.1vw]'>
                  <img src={phoneIcon} alt="phone" className='w-[6%]' />
                  <p>&nbsp;&nbsp;+91 12345 67890</p>
                </div>
                <div className='flex items-center text-[1.1vw]'>
                  <img src={emailIcon} alt="email" className='w-[6%]' />
                  <p>&nbsp;&nbsp;xyzabc.21@gmail.com</p>
                </div>

                <h1 className='text-[2.3vw] font-bold text-[#463E3E] mb-[10%] mt-[15%]'>Collaboration</h1>
                <div className='flex items-center text-[1.1vw]'>
                  <img src={phoneIcon} alt="phone" className='w-[6%]' />
                  <p>&nbsp;&nbsp;+91 12345 67890</p>
                </div>
                <div className='flex items-center text-[1.1vw]'>
                  <img src={emailIcon} alt="email" className='w-[6%]' />
                  <p>&nbsp;&nbsp;xyzabc.21@gmail.com</p>
                </div>

              </div>

              <div className='map-section w-[50%]'>
                <img src={contactMap} alt="map" />
              </div>
            </div>

            <div className='ellipse-shadow absolute z-0 w-[23%] h-[53%] rounded-full bg-[#AFADAD] opacity-25 blur-2xl top-[57%] left-[19%]'></div>
            
          </div>
        </div>
  )
}

export default Contact
