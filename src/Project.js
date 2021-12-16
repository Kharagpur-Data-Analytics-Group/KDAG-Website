import React,{useState} from 'react'
import './Project.css';

const Project = () => {
 function Item(){
  <div className='project-container'>
  <div class="tab">
    <div className="project">
    <button class="tablinks" onClick={()=>setShow1(!show1)} >Project Title</button>
    {show1? <div className="project-desc">
  
    <span className='title'>Project Title</span>
    <img className="nav-icon " src="/icons/github.svg"/>
    <img className="nav-icon " src="/icons/drive.svg"/>
     <p>Project Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
  
  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  </p></div>:null}
        </div>
        </div>
        </div>
 }
      const[show1,setShow1]=  useState(false);
      const[show2,setShow2]=  useState(false);
      const[show3,setShow3]=  useState(false);
   
    return (
       <Item/>
          
    )
}

export default Project 



