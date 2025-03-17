import React from 'react'
import aboutBanner from '../assets/aboutBanner.png'


function About() {
  return (    
      
    <div id="about" className='page-container px-[6%]'>
      <div className="about-flex-container h-[45.2vw] flex items-center justify-between">
      
        <div className='left-banner-section w-[40%]'>
          <img src={aboutBanner} alt="About Us" className='' />
        </div>

        <div className='right-section w-[50%]'>
          <h1 className="text-[3.5vw] font-bold text-[#544B4B]">Making Volunteering Simple & Impactful</h1>
          <p className="text-[1.3vw] text-[#2A2525] mt-3">We bridge the gap between volunteers and nonprofits, helping you find opportunities that match your skills and passion.</p>
          <button className="read-more-btn bg-[#463E3E] text-white px-8 py-2 mt-[8%] text-[1.4vw] rounded-full cursor-pointer">Read more</button>
        </div>

      </div>
    </div>
    
  )
}

export default About