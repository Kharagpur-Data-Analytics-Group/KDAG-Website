import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import { Link } from 'react-router-dom';

function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <style>{`
        .dropdown-menu {
          background: red;
          width: 200px;
          position: absolute;
          top: 80px;
          list-style: none;
          text-align: start;
        }

        .dropdown-menu li {
          background: #f50202d0;
          cursor: pointer;
        }

        .dropdown-menu li:hover {
          background: #d92c0dab;
        }

        .dropdown-menu.clicked {
          display: none;
        }

        .dropdown-link {
          display: block;
          height: 100%;
          width: 100%;
          text-decoration: none;
          color: #fff;
          padding: 16px;
        }

        @media screen and (max-width: 960px) {
          .fa-caret-down {
            display: none;
          }
        }
      `}</style>

      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Dropdown;
