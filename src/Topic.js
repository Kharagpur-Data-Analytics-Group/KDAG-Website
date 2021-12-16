import React from 'react'
import './Topic.css';
import vector from './Vector.png';

function Card(props){
    return(
        <div>
   
          <div className='content-container'>

              <div className="session-head">Session 1 </div>
              <div className="session-subhead">| 16 Nov, 8:00 am-12:00 </div>
          
           <div className='record'>
           <img className="record-img" src={vector} href="{props.recording"/>
              <span className='record-text'>Recording</span>
          </div>
          <div className='topic-tabs'>

          <div class="tab">
  <button class="tablinks" >{props.topic1}</button>
  <button class="tablinks" >{props.topic2}</button>
  <button class="tablinks" >{props.topic3}</button>
  <button class="tablinks" >{props.topic4}</button>
</div>
          </div>
            </div>
            </div>
           

    )
}


const Topic = () => {

    
    return (
        <div className='main-container'>
            <div>
                <div className="main-head">
                <div className='Topicrect'>    </div>
                <span className="topic">
                  Topics Covered
                </span>

                </div>

            <Card
            topic1="#"
            topic2='#'
            topic3="#"
            topic4='#'
            recording='#'
            />
              <Card
            topic1="#"
            topic2='#'
            topic3="#"
            topic4='#'
            recording='#'
            />
          </div>
            </div>
    )
}

export default Topic 
