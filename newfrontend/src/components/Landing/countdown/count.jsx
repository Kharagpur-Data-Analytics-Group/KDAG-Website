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
        <style>{countdownStyles}</style>
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
      <style>{countdownStyles}</style>
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


// Kept as real CSS (same pattern as TeamPage.jsx / LandingPage.jsx). These
// rules used to live in LandingPage.css; the generic `.page` rule is in
// src/legacy-globals.css because other pages use it too.
const countdownStyles = `
.banner-countdown-heading-flex {
  height: 50px;
  display: flex;
  flex-direction: column;
}

.banner-countdown-heading {
  height: fit-content;
  width: fit-content;
  position: absolute;
  left: 34%;
  color: white;
}

.countdown-wrapper {
  max-width: 800px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 40px 0;
}

.countdown-box {
  background-color: black;
  font-size: 30px;
  font-weight: 700;
  color: white;
  border-radius: 15px;
  width: 100px;
  height: 100px;
  margin-right: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.legend {
  font-size: 15px;
  color: white;
}

.Banner-Eventislive h1 {
  width: 100%;
  margin-left: 0;
  padding-top: 2%;
  padding-left: 0;
  height: 100%;
  color: white;
  position: relative;
  padding-right: 17%;
  font-weight: 700;
  text-shadow: 0 0 10px rgb(0, 0, 0);
}

@media only screen and (max-width: 900px) {
  .countdown-box {
    height: 60px;
    width: 60px;
    margin-right: 20px;
    font-size: 15px;
    border-radius: 14px;
    padding: 0;
  }

  .legend {
    font-size: 10px;
  }

  .banner-countdown-heading-flex {
    align-items: center;
  }

  .banner-countdown-heading {
    position: relative;
    left: 0%;
    font-size: larger;
    top: 20px;
  }

  .Banner-Eventislive {
    position: relative;
    top: -25%;
    right: 0;
    left: 3%;
    width: 100%;
  }
}
`;

export default EventCount;
