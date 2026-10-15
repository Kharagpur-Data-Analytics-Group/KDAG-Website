import React from 'react';

export function Button() {
  return (
    <>
      <style>{`
        :root {
          --primary: #d80f08ec;
        }

        .btn {
          padding-top: 8px;
          padding-bottom: 8px;
          padding-left: 20px;
          padding-right: 20px;
          outline: none;
          border: none;
          font-size: 18px;
          color: azure;
          cursor: pointer;
          background-color: var(--primary);
          transition: all 5s easeout;
        }

        .btn:hover {
          background-color: transparent;
          color: azure;
          border-radius: 4px;
          border: 2px solid var(--primary);
        }
      `}</style>

      <a
        href='https://unstop.com/hackathon/kharagpur-data-science-hackathon-2022-indian-institute-of-technology-iit-kharagpur-542463'
        target="_blank"
        rel="noreferrer noopener"
      >
        <button className='btn'>Register Now</button>
      </a>
    </>
  );
}
