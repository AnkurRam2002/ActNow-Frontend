import React from 'react'
import EventCard from './EventCard'

const EventCardContainer = () => {
  return (
    <div className='absolute top-[90%] left-[20%] w-[75%] flex flex-wrap gap-[3%] pr-[2%]'>
      <EventCard /> 
      <EventCard /> 
      <EventCard /> 
      <EventCard /> 
      <EventCard />
      <EventCard />
      <EventCard />
          
    </div>
  )
}

export default EventCardContainer