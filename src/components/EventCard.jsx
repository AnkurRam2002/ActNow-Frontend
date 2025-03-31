import React from 'react';
import { Link } from "react-router-dom";
import locationIcon from '../assets/locationIcon.png';
import dateIcon from '../assets/dateIcon.png';
import { FaEye, FaClock, FaPlayCircle, FaCheckCircle } from "react-icons/fa";

// EventCard Component: Displays an event's details in a card format
const EventCard = ({ name, ngo, city, date, description, eventId, status }) => {

  let statusIcon = <FaClock className="text-blue-500 text-[1.2vw]" />;
  let bgColor = "bg-white";

  if (status === "Ongoing") {
    statusIcon = <FaPlayCircle className="text-green-500 text-[1.2vw]" />;
    bgColor = "bg-green-100";
  } else if (status === "Completed") {
    statusIcon = <FaCheckCircle className="text-gray-500 text-[1.2vw]" />;
    bgColor = "bg-gray-100";
  } 

  return (
    <div className='relative event-card bg-white rounded-[5%] w-[22%] p-[2%] shadow-[0px_0px_0.5vw_rgba(0,0,0,0.6)] font-[Poppins] mb-[3%]'>

      {/* Bookmark Status Icon */}
      {statusIcon && (
        <div className={`absolute shadow-[0px_0px_0.2vw_rgba(0,0,0,0.6)] top-0 right-0 w-[3vw] h-[4vw] ${bgColor} flex flex-col items-center justify-center rounded-bl-[1vw]`}>
          {statusIcon}
        </div>
      )}

      {/* Event Name */}
      <div className="event-name mr-6">
        <p className="font-semibold text-[1.3vw] text-[#463E3E] line-clamp-2">{name}</p>
      </div>

      {/* NGO Name */}
      <p className='NGO-name font-semibold text-[#7A7C7D] text-[1.1vw] line-clamp-1'>{ngo}</p>

      {/* Event Location */}
      <div className='city flex items-center gap-[2%] mt-[1%]'>
        <img src={locationIcon} alt="location" className='size-[6%]' />
        <p className='text-[1vw] text-[#7A7C7D]'>{city}</p>
      </div>

      {/* Event Date */}
      <div className='date flex items-center gap-[2%] my-[6%]'>
        <img src={dateIcon} alt="date" className='size-[7%]' />
        <p className='text-[1vw] text-[#292929] font-medium'>{date}</p>
      </div>

      {/* Event Description */}
      <p className='details text-[1vw] font-light line-clamp-3 mb-[10%]'>{description}</p>

      {/* Event details page link */}
      <div className='see-details flex items-center gap-[4%]'>
        <Link to={`/events/${eventId}`} className='text-[1vw] cursor-pointer hover:underline'>See Details</Link>
        <FaEye className='size-[8%]' />
      </div>
      
    </div>
  );
};

export default EventCard;
