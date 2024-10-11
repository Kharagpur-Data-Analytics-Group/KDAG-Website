import React from 'react'
import './questionBox.css'
function QuestionBox({item,no}) {
  return (
    <div className='que-cont'>
        <p style={{display:"flex",gap:"3px"}}>
          <span>{no+1}.</span>
          {item.title}</p>
        
        
    </div>
  )
}

export default QuestionBox