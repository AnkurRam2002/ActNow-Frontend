import { React, useState } from 'react'
import HomeHeader from '../components/HomeHeader'
import EventCardContainer from '../components/EventCardContainer'
import BackToTop from '../components/BackToTop'
import homeBanner from '../assets/homeBanner.png'
import eventsHeading from '../assets/eventsHeading.png'

const HomePage = () => {

  // change: State variables for search query and date filters
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Handles search query received from HomeHeader component
  const handleSearch = ({ query }) => {
    setQuery(query); // Updates the state with the received search query
    console.log('Query set in HomePage:', query); //3rd log
  };

  // Handles date filter values received from HomeHeader component
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    console.log('Date filters set in Homepage:', { start, end });
  };

  return (
    <div className='relative'>
      <HomeHeader onSearch={handleSearch} onDateChange={handleDateChange} />

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

      {/* EventCardContainer receives search and date filter values as props */}
      <EventCardContainer query={query} startDate={startDate} endDate={endDate} />
      
    </div>
  )
}

export default HomePage