import React, { useState, useEffect } from 'react';

function calculateTimeRemaining(eventDate) {
  const currentTime = new Date();
  const timeRemaining = eventDate - currentTime;
  const seconds = Math.floor((timeRemaining / 1000) % 60);
  const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
  const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

const Countdown = ({ eventDate }) => {
  const [isEventLive, setIsEventLive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      setIsEventLive(currentTime >= eventDate);
      setTimeRemaining(calculateTimeRemaining(eventDate));
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [eventDate]);

  if (!isEventLive && timeRemaining) {
    return (
      <div>
        <div className="banner-countdown-heading-flex">
          <div className="banner-countdown-heading">
            <h2>Count every second until the event</h2>
          </div>
        </div>
        <div className='countdown-wrapper'>
          <div className='countdown-box'> 
            {timeRemaining.days} 
            <span className='legend'>Days</span>
          </div>
          <div className='countdown-box'>
            {timeRemaining.hours}  
            <span className='legend'>Hours</span>
          </div>
          <div className='countdown-box'>
            {timeRemaining.minutes}  
            <span className='legend'>Minutes</span>
          </div>
          <div className='countdown-box'>
            {timeRemaining.seconds} 
            <span className='legend'>Seconds</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='Banner-Eventislive'>
      <h1></h1>
    </div>
  );
};

const EventCount = () => {
  const [day, setDay] = useState(27);    // set Event date , month and year 
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2022);
  const eventDate = new Date(year, month - 1, day);
  return (
    <div className='page'>
      <Countdown eventDate={eventDate} />
    </div>
  );
};

export default EventCount;

