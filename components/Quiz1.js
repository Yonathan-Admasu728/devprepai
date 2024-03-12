
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Quiz = ({ data, currentQuizIndex, onCompleted }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const currentQuestion = data && currentQuizIndex >= 0 && currentQuizIndex < data.length
    ? data[currentQuizIndex]
    : null;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setOpenSnackbar(true); // Open Snackbar for feedback
    onCompleted(correct);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    setOpenSnackbar(false);
    setSelectedOption(null);
    setIsCorrect(null);
  }, [currentQuizIndex]);

  return (
    <div className="quiz-container">
      {currentQuestion ? (
        <>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="quiz-button"
              onClick={() => handleOptionClick(option)}
              disabled={openSnackbar}
            >
              {option}
            </button>
          ))}
        </>
      ) : (
        <p>No more questions available.</p>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={isCorrect ? "success" : "error"}>
          {isCorrect ? "Congratulations! You got it right." : "Oops! That's not correct."}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Quiz;

