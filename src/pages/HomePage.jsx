import React from 'react'
import HomeHeader from '../components/HomeHeader'
import EventCardContainer from '../components/EventCardContainer'
import BackToTop from '../components/BackToTop'
import homeBanner from '../assets/homeBanner.png'
import eventsHeading from '../assets/eventsHeading.png'

const HomePage = () => {
  return (
    <div className='relative'>
      <HomeHeader />

      <BackToTop />
      
      <div className='w-[95%] mx-auto mt-[1%]'>
        <img src={homeBanner} alt="home banner" className='w-full' />
      </div>

      <div className='absolute top-[90%] left-[5%] w-[12%]'>
        <img src={eventsHeading} alt="" className='w-full h-full object-cover rounded-[5%]' />
      </div>

      <div className='absolute top-[70%] left-[20%] flex gap-[10%] items-center w-[30%] text-[1.8vw] font-bold text-white '>
        <p>ALL</p>
        <p>MY EVENTS</p>
      </div>

      <EventCardContainer />
      
    </div>
  )
}

export default HomePage