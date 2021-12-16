/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import './style.css'

const NavTab = () => {
    return (
            <div className="nav-container">
              <div role="button" className="nav topics">
                <img className="nav-icon" src="/icons/topicgray.svg"/>
                <span className="nav-title">
                  Topic
                </span>
              </div>
              <div role="button" className="nav resources">
                <img className="nav-icon" src="/icons/resourcesgray.svg"/>
                <span className="nav-title">
                  Resouces
                </span>
              </div>
              <div role="button" className="nav projects">
                <img className="nav-icon" src="/icons/projectgray.svg" />
                <span className="nav-title">
                  Projects
                </span>
              </div>
              <div role="button" className="nav tasks">
                <img className="nav-icon" src="/icons/taskgray.svg"/>
                <span className="nav-title">
                  Tasks
                </span>
              </div>
            </div>
    )
}

export default NavTab
