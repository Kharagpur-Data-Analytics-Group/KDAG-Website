import React from 'react'
import "./style.css"


const Sidebar = () => {
    return (
        
        <div className='sidebar-container'>
            <div className="banner">
                <img src= {process.env.PUBLIC_URL + "/icons/winterworkshop.svg"} className="workshop-banner" alt="banner" />
            </div>
            <div className="navbar-container">
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow1gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 1</span>
                    <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" />
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow1gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 2</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow1gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 3</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow2gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 4</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow2gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 5</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow3gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 6</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
                <div className="day-container" role="button" onClick={()=> {window.location.pathname = "#html"}}>
                    <img src={"/icons/snow3gray.svg"} className="day-icon" alt="icon" />
                    <span className="day">Day 7</span>
                    {/* <img src={"/icons/tick.svg"} className="tick-icon" alt="tick" /> */}
                </div>
        
            </div>
        </div>
    )
}

export default Sidebar
