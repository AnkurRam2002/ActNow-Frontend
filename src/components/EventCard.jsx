import React from 'react';
import locationIcon from '../assets/locationIcon.png';
import dateIcon from '../assets/dateIcon.png';
import expandIcon from '../assets/expandIcon.png';

const EventCard = ({ name, ngo, city, date, description }) => {
  return (
    <div className='event-card bg-white rounded-[5%] w-[22%] p-[2%] shadow-[0px_0px_0.5vw_rgba(0,0,0,0.6)] font-[Poppins] mb-[3%]'>

      <div className='event-name flex items-center justify-between'>
        <p className='font-semibold text-[1.3vw] text-[#463E3E] line-clamp-2'>{name}</p>
      </div>

      <p className='NGO-name font-semibold text-[#7A7C7D] text-[1.1vw] line-clamp-1'>{ngo}</p>

      <div className='city flex items-center gap-[2%] mt-[1%]'>
        <img src={locationIcon} alt="location" className='size-[6%]' />
        <p className='text-[1vw] text-[#7A7C7D]'>{city}</p>
      </div>

      <div className='date flex items-center gap-[2%] my-[6%]'>
        <img src={dateIcon} alt="date" className='size-[7%]' />
        <p className='text-[1vw] text-[#292929] font-medium'>{date}</p>
      </div>

      <p className='details text-[1vw] font-light line-clamp-3 mb-[10%]'>{description}</p>

      <div className='see-details flex items-center gap-[4%]'>
        <p className='text-[1vw]'>See Details</p>
        <img src={expandIcon} alt="expand" className='size-[5%]' />
      </div>
      
    </div>
  );
};

export default EventCard;
