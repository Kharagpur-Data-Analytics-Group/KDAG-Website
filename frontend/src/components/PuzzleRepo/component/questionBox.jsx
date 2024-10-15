import React from 'react'
import './questionBox.css'
import { Link } from 'react-router-dom/cjs/react-router-dom'
function QuestionBox({item,no}) {
  return (
    <Link to={`/${no}`}  className='que-cont'>
        <p style={{display:"flex",gap:"3px"}}>
          <span>{no+1}.</span>
          {item.title}</p>
        
        
    </Link>
  )
}

export default QuestionBox