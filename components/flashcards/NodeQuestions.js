import React, { useState } from 'react';
import { motion } from 'framer-motion';
import nodeQuestions from '../../data/flashcardData/nodeQuestions.json'; // Import the nodeQuestions data

const FlashCard = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div 
      className="flashcard-container w-80 h-96 mx-auto my-10 relative cursor-pointer perspective"
      onClick={handleFlip}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Question Side */}
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-teal-500 via-purple-600 to-gold-400 text-white rounded-lg shadow-xl p-8 flex flex-col justify-between"
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ backfaceVisibility: 'hidden', transformOrigin: 'center' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="flex-grow flex items-center justify-center text-2xl font-semibold wrap-text overflow-y-auto">
          {question}
        </div>
      </motion.div>

      {/* Answer Side */}
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-purple-600 via-teal-500 to-gold-400 text-white rounded-lg shadow-xl p-8 flex flex-col justify-between absolute top-0"
        initial={{ rotateY: -180 }}
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        style={{ backfaceVisibility: 'hidden', transformOrigin: 'center' }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="flex-grow flex flex-col items-center justify-center space-y-4 overflow-y-auto break-words">
          <div className="text-2xl font-semibold wrap-text">
            {answer}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const NodeQuestions = ({ onClose }) => {
  return (
    <div>
      <button onClick={onClose}>Close</button>
      {nodeQuestions.map((item, index) => (
        <FlashCard key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default NodeQuestions;
