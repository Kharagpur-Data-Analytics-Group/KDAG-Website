import React, { useEffect } from 'react'
import DropDown from './questionCont'
import styles from '../styles/CompAndTopic.module.css'
import './comp.css'
import { useState } from 'react'
import './compAndTopic.css'

function CompAndTopic() {
	const TopicData = [
		{
		  topic: "Basic Concepts of Probability",
		  questions: [
			{
			  qno: 1,
			  title: "What is the definition of probability?",
			},
			{
			  qno: 2,
			  title: "How do you calculate the probability of a single event?",
			},
			{
			  qno: 3,
			  title: "What are mutually exclusive events?",
			},
		  ],
		},
		{
		  topic: "Conditional Probability",
		  questions: [
			{
			  qno: 1,
			  title: "What is conditional probability?",
			},
			{
			  qno: 2,
			  title: "How do you apply Bayes' theorem?",
			},
			{
			  qno: 3,
			  title: "What is the difference between independent and dependent events?",
			},
		  ],
		},
		{
		  topic: "Probability Distributions",
		  questions: [
			{
			  qno: 1,
			  title: "What is a probability distribution?",
			},
			{
			  qno: 2,
			  title: "What is the difference between discrete and continuous probability distributions?",
			},
			{
			  qno: 3,
			  title: "What is a binomial distribution?",
			},
		  ],
		},
		{
		  topic: "Random Variables",
		  questions: [
			{
			  qno: 1,
			  title: "What is a random variable?",
			},
			{
			  qno: 2,
			  title: "What is the expected value of a random variable?",
			},
			{
			  qno: 3,
			  title: "How is variance related to random variables?",
			},
		  ],
		},
	  ];
	const CompData = [
		{
		  topic: "TechCorp",
		  questions: [
			{
			  qno: 1,
			  title: "What is the definition of probability?",
			},
			{
			  qno: 2,
			  title: "How do you calculate the probability of a single event?",
			},
			{
			  qno: 3,
			  title: "What are mutually exclusive events?",
			},
		  ],
		},
		{
		  topic: "Innovatech",
		  questions: [
			{
			  qno: 1,
			  title: "What is conditional probability?",
			},
			{
			  qno: 2,
			  title: "How do you apply Bayes' theorem?",
			},
			{
			  qno: 3,
			  title: "What is the difference between independent and dependent events?",
			},
		  ],
		},
		{
		  topic: "Green Solutions",
		  questions: [
			{
			  qno: 1,
			  title: "What is a probability distribution?",
			},
			{
			  qno: 2,
			  title: "What is the difference between discrete and continuous probability distributions?",
			},
			{
			  qno: 3,
			  title: "What is a binomial distribution?",
			},
		  ],
		},
		{
		  topic: "Future Innovations",
		  questions: [
			{
			  qno: 1,
			  title: "What is a random variable?",
			},
			{
			  qno: 2,
			  title: "What is the expected value of a random variable?",
			},
			{
			  qno: 3,
			  title: "How is variance related to random variables?",
			},
		  ],
		},
	  ]
	  
	const [activeCategory, setActiveCategory] = useState(true)
	const [Data,setData] = useState(TopicData)
	const [searchTerm, setSearchTerm] = useState('');
	const [filteredData, setFilteredData] = useState([]);
  
	useEffect(() => {
	  const currentData = activeCategory ? TopicData : CompData; // Select data based on category
  
	  const filteredData = currentData.filter((item) => {
		if (!item || !item.topic || !item.questions) {
		  return false;
		}
		const topicMatch = item.topic.toLowerCase().includes(searchTerm.toLowerCase());
		const questionMatch = item.questions.some((question) => {
		  if (!question || !question.title) {
			return false;
		  }
		  return question.title.toLowerCase().includes(searchTerm.toLowerCase());
		});
		return topicMatch || questionMatch;
	  });
  
	  setFilteredData(filteredData);
	}, [searchTerm, activeCategory, TopicData, CompData]);
  
	const handleSearch = (e) => {
	  e.preventDefault();
	  setSearchTerm(e.target.value);
	};

	


  return (
	<>
	 <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search topics or questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button class="search-button" type="submit">Search</button>
        </form>
      </div>
		
      
	
    <div className={styles.compandtopic_cont}>
         <div className={styles.btn_cont}>
         <div className={`${activeCategory==true?  "btn_cont_cover" : "border_not"}`}   >
		 <div className={`discussion-card-button-container  ` }  
		  style={{padding:"5px"} }  >
								<button style={{ cursor: "none" }}
								 onClick={()=>{setActiveCategory(true)
									setData(TopicData)
								
									console.log(activeCategory)
								 }}
								
								 >
									<div  style={{ cursor: "none",with:"100%" }}>
										 
										<span style={{padding:"2rem"}} >Topic-wise</span>
										 
									</div>
								</button>
					</div>
		 </div>
           <div className={`${activeCategory==false?  "btn_cont_cover" : "border_not"}`} >
		   <div className="discussion-card-button-container"
		     style={{padding:"5px"} }>
								<button style={{ cursor: "none" }}  
								onClick={()=>
									{setActiveCategory(false)
									setData(CompData)
									console.log(activeCategory)}}
								>
									<div  style={{ cursor: "none" }}>
										 
										<span  style={{padding:"2rem"}}
										 >Company-wise</span>
										 
									</div>
								</button>
					</div>
		   </div>
          
         </div>
		 {/* <div className='question-cont' style={{display:"flex",flexDirection:"column",gap:"10px"}}>
		 {Data?.map((Data, index) => (
         <DropDown  key={index} index={index} Data={Data}/>
      ))}
		 </div> */}
		
		 <div className="question-cont" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filteredData?.map((Data, index) => (
            <DropDown key={index} index={index} Data={Data} />
          ))}
        </div>
		 
    </div>
	
	</>
  )
}

export default CompAndTopic