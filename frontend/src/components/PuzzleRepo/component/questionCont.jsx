 
import React, { useState,useEffect } from "react";
import styles from "./Dropdown.module.css"; 
import QuestionBox from './questionBox';


 

const DropDown = ({index,Data}) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(toggleFAQ,[Data])

  return (
    

     
        <div className={styles.border}>
          <div className={styles.question} onClick={() => toggleFAQ(index)}>
            <h4 className={styles.question_cont_div}>{Data.topic}</h4>
            <div>
                {openIndex === index ? <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" fill="none" viewBox="0 0 30 31"><path fill="white" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.2 12.2 0 0 0 15 3.312Zm4.688 13.124h-9.375a.938.938 0 0 1 0-1.875h9.374a.938.938 0 0 1 0 1.876Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="30" height="31" fill="none" viewBox="0 0 30 31"><path fill="red" d="M15 3.313A12.187 12.187 0 1 0 27.188 15.5 12.203 12.203 0 0 0 15 3.312Zm4.688 13.124h-3.75v3.75a.938.938 0 0 1-1.876 0v-3.75h-3.75a.938.938 0 0 1 0-1.875h3.75v-3.75a.938.938 0 0 1 1.876 0v3.75h3.75a.938.938 0 0 1 0 1.876Z"/></svg>}
              </div>
          </div>
          {openIndex === index && <div className={styles.answer}>
             {Data.questions?.map((item,index)=> 
             <QuestionBox key={index} item={item} no={index}/>)
             }
            </div>}
         
        </div>
    
    
  );
};

export default DropDown;
