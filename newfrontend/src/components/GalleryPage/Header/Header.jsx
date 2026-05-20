import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{`
        .resources-list-header-gallery {
          opacity: 0;
          transition: opacity 1s;
        }

        .resources-list-header-gallery.show {
          opacity: 1;
        }

        .resources-list-header-gallery {
          height: 20rem;
          padding-top: 10rem;
          background-size: cover;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
          transition: 1s;
        }

        @media (max-width: 480px) {
          .resources-list-header-gallery {
            display: block;
          }
        }

        .resources-list-header-subtitle {
          font-family: Poppins, sans-serif;
          font-size: 1.2rem;
          text-align: center;
          color: #ddd;
          width: 50%;
          margin: auto;
          min-width: 30rem;
        }
      `}</style>

      <div>
        <div
          className={`resources-list-header-gallery ${
            isVisible ? 'show' : ''
          }`}
        >
          <div className="resources-list-header-title">
            Gallery
          </div>

          <div
            className="resources-list-header-subtitle"
            style={{ fontSize: '1.15rem' }}
          >
            Explore our Event Highlights! From ground breaking ideas to
            creativity sprints, see the moments that make our Events
            unforgettable. Get a glimpse of the action and the innovation that
            drives us!
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

