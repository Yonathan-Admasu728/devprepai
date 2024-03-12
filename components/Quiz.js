import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Quiz = ({ framework, currentQuizIndex, onCompleted }) => {
    const [quizData, setQuizData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState(null);

    // Fetch quiz data from the server
    useEffect(() => {
        const fetchQuizData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/quizzes/${framework}`);
            setQuizData(response.data);
            setError(null); // Reset error state on successful fetch
          } catch (error) {
            console.error('Error fetching quiz data:', error);
            setError('Failed to load quiz data. Please try again later.'); // Set user-friendly error message
          }
        };

        if (framework) {
          fetchQuizData();
        }
    }, [framework]);

    const currentQuestion = quizData && currentQuizIndex >= 0 && currentQuizIndex < quizData.length
      ? quizData[currentQuizIndex]
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
        {error ? (
          <p>{error}</p> // Display error message if any
        ) : currentQuestion ? (
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
