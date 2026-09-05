import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className={`resources-list-header-gallery ${isVisible ? 'show' : ''}`}>
        <div className="resources-list-header-title">Gallery</div>
        <div
          className="resources-list-header-subtitle"
          style={{ fontSize: '1.15rem' }}
        >
          Explore our Event Highlights! From ground breaking ideas to creativity
          sprints, see the moments that make our Events unforgettable. Get a
          glimpse of the action and the innovation that drives us!
        </div>
      </div>
    </div>
  );
};

export default Header;
