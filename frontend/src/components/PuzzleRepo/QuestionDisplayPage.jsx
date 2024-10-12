import React, { useState } from 'react';
import Particless from '../Common/Particles/Particless';
import { useParams } from 'react-router-dom';
import styles from './QuestionDisplayPage.module.css'; // Import the CSS module

function QuestionDisplayPage() {
  const { question_id } = useParams();
  console.log(question_id);

  const [showSolution, setShowSolution] = useState(false); // State to toggle solution display

  // Sample data for rendering, you can replace this with your dynamic data
  const questionData = {
    topic: "Arrays",
    name: "Find the Missing Number",
    question: "Given an array of integers, find the missing number in the series.",
    companies :[
      {
        name: "Google",
        link: "https://www.google.com",
        imageUrl: "https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" // Google logo
      },
      {
        name: "Amazon",
        link: "https://www.amazon.com",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSvonPbCcoYYFBe7PVsZRv8NCpYPwREsTu0OyaMdKGFzuuSEDaD35bWqq5KNGvEEtG1E&usqp=CAU" // Amazon logo
      },
      {
        name: "Microsoft",
        link: "https://www.microsoft.com",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" // Microsoft logo
      }
    ],
    
    image: "https://machinelearningmastery.com/wp-content/uploads/2019/08/Histogram-Plot-With-3-Bins-of-a-Random-Data-Sample.png", // Use actual image path or set to null if not available
    solution: "Use a mathematical formula to find the missing number.",
    tags: ["Arrays", "Math", "Problem Solving"]
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Question Section */}
        <div className={styles.questionSection}>
          
          <h1 className={styles.questionName}>{questionData.name}</h1>
          <p className={styles.questionText}>{questionData.question}</p>
          
          {questionData.image && <img className={styles.questionImage} src={questionData.image} alt="Example" />}
          
          <div className={styles.contributorsContainer}>
      <div className={styles.contributorsHeader}>
        <h4 className={styles.contributorsTitle}>Companies</h4>
       
      </div>
      <div className={styles.contributorsList}>
        {questionData.companies.map((user) => (
          <img
            key={user.handle} // Assuming `user.handle` is unique
            className={styles.contributorAvatar}
            src={user.imageUrl}
           
          />
        ))}
      </div>
       
    </div>
          <div className={styles.tags}>
            <h4>Topic:</h4>
            <div className={styles.tagList}>
              {questionData.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* View Solution Button */}
        <button className={styles.solutionButton} onClick={toggleSolution}>
          {showSolution ? 'Hide Solution' : 'View Solution'}
        </button>

        {/* Solution Section */}
        {showSolution && (
          <div className={styles.solutionSection}>
            <h1>Solution</h1>
            <p>{questionData.solution}</p>
          </div>
        )}
      </div>
      <Particless />
    </>
  );
}

export default QuestionDisplayPage;
