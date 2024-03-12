import React, { useState } from 'react';
import FlashCard from '../Flashcard'; 
import reactQuestions from '../../data/flashcardData/reactQuestions.json'; // Import the reactQuestions data

const ReactQuestions = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Add state to track the current index

  const handleNext = () => {
    if (currentIndex < reactQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <button onClick={onClose}>Close</button>
      {reactQuestions[currentIndex] && (
        <FlashCard 
          question={reactQuestions[currentIndex].question} 
          answer={reactQuestions[currentIndex].answer}
          toggleFlashcard={onClose} // Pass the onClose function here
        />
      )}
      <div className="mt-8 flex space-x-4">
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default ReactQuestions;
