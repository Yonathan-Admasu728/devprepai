import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import styles from "../styles/Flashcard.module.css";

import AceEditor from "react-ace";
import { Button } from "@mui/material";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

export default function Flashcard({
  questions,
  currentIndex,
  handleNext,
  handlePrevious,
  handleExit,
  navigateToQuestion,
  onOpenEditor,
}) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [darkMode, setDarkMode] = useState(() => {
    // Get the saved dark mode preference from localStorage, defaulting to false if not set
    return localStorage.getItem("darkMode") === "true";
  });

  const [showEditor, setShowEditor] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [language, setLanguage] = useState("python");

  useEffect(() => {
    // Save the dark mode preference to localStorage whenever it changes
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);

  useEffect(() => {
    if (showAnswer) {
      // Ensuring the element is present and then focusing
      const nextButton = document.getElementById("nextButton");
      if (nextButton) nextButton.focus();
    }
  }, [showAnswer]);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem("darkMode", newDarkMode);

      // Set the snackbar message
      const mode = newDarkMode ? "Dark" : "Light";
      setSnackbarMessage(`Switched to ${mode} Mode`);
      setSnackbarOpen(true); // Open the snackbar

      return newDarkMode;
    });
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
    // Optionally, after showing the answer, automatically focus the 'Next' button for better flow
    if (!showAnswer) {
      // This will run after the state has been updated due to the asynchronous nature of setState
      setTimeout(() => document.getElementById("nextButton").focus(), 0);
    }
  };

  const filteredQuestions =
    questions?.filter((question) =>
      question.title?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Safely access the current question
  const currentQuestion =
    currentIndex >= 0 && currentIndex < questions?.length
      ? questions[currentIndex]
      : null;

  // Determine if the current question is algorithmic
  const isAlgorithmic = currentQuestion?.category === "algorithm";

  // Calculate progress safely
  const progress =
    questions?.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const showSearchBar =
    currentQuestion?.solution === "Python" ||
    currentQuestion?.solution === "JavaScript";

  const handleDropdownClick = (index) => {
    navigateToQuestion(index);
    setSearchTerm("");
  };

  if (!currentQuestion) {
    return <div>No question available.</div>;
  }

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.progressWrapper}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={80} // Adjust size to fit the corner
          thickness={4} // Adjust thickness for visual appeal
          className={styles.circularProgress}
        />
        <div className={styles.progressCircleBackground}></div>
        <Typography
          variant="caption"
          component="div"
          className={styles.progressText}
        >
          {`${currentIndex + 1}/${questions.length}`} {/* Updated format */}
        </Typography>
      </div>

      <svg style={{ height: 0 }}>
        <defs>
          <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feFlood
              result="flood"
              flood-color="#ffd700"
              flood-opacity="0.75"
            ></feFlood>
            <feComposite
              in="flood"
              result="mask"
              in2="SourceGraphic"
              operator="in"
            ></feComposite>
            <feMorphology
              in="mask"
              result="dilated"
              operator="dilate"
              radius="2"
            ></feMorphology>
            <feGaussianBlur
              in="dilated"
              result="blurred"
              stdDeviation="3"
            ></feGaussianBlur>
            <feMerge>
              <feMergeNode in="blurred"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          {/* Include other filters if necessary */}
        </defs>
      </svg>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className={styles.topBar}>
        <div className={styles.topRightButtons}>
          <IconButton
            className={styles.darkModeToggle}
            onClick={toggleDarkMode}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <IconButton className={styles.exitBtn} onClick={handleExit}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>

      <div className={styles.flashcardContent}>
        <div
          className={`${styles.flipContainer} ${
            showAnswer ? styles.flipContainerFlipped : ""
          }`}
        >
          <div
            className={styles.flashcardFront}
            style={{ display: showAnswer ? "none" : "flex" }} // Hide front face when showing the answer
          >
            <div className={styles.flashcardHeader}>
              {currentQuestion?.title && (
                <div className={styles.flashcardTitle}>
                  {currentQuestion?.title}
                </div>
              )}
              <div className={styles.flashcardQuestion}>
                {currentQuestion?.question}
              </div>
            </div>
          </div>
          <div className={styles.flashcardBack}>
            <div className={styles.flashcardBackContent}>
              {currentQuestion?.solution === "Python" ||
              currentQuestion?.solution === "JavaScript" ? (
                <pre className={styles.codeBlock}>
                  <code>{currentQuestion?.answer}</code>
                </pre>
              ) : (
                <div className={styles.flashcardAnswer}>
                  {currentQuestion?.answer}
                </div>
              )}
            </div>
          </div>
        </div>

        {showEditor && (
          <div style={{ position: "relative" }}>
            <div
              style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
            >
              <Button
                variant="contained"
                color={language === "python" ? "primary" : "secondary"}
                onClick={() =>
                  setLanguage(language === "python" ? "javascript" : "python")
                }
              >
                {language === "python" ? "JavaScript" : "Python"}
              </Button>
            </div>
            <AceEditor
              mode={language}
              theme="monokai"
              value={userCode}
              onChange={(newCode) => setUserCode(newCode)}
              name="editor"
              editorProps={{ $blockScrolling: true }}
              style={{ margin: "auto", width: "80%" }}
            />
          </div>
        )}

        <button
          className={styles.hintButton}
          onClick={toggleAnswer}
          title="Show the answer"
        >
          {showAnswer ? "Hide" : "Hint"} 💡
        </button>

        {(currentQuestion?.solution === "Python" ||
          currentQuestion?.solution === "JavaScript") && (
          <Button
            className={styles.openEditorBtn}
            variant="contained"
            color="primary"
            onClick={onOpenEditor}
            title="Switch to coding mode to edit and test your code"
          >
            Coding Mode
          </Button>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <button
          className={`${styles.navButton} ${styles.previous}`}
          onClick={handlePrevious}
        >
          &lt;
        </button>

        <button
          id="nextButton"
          className={`${styles.navButton} ${styles.next}`}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}








/*updated approach for the Flashcard component and how it interacts with the "Code Mode" (Editor):

Flashcard Component:
General Q&A Display: For non-algorithmic frameworks (e.g., Vue.js, React), the flashcard will display questions and answers as usual, without any code-specific elements.

Algorithmic Content Display: For algorithmic frameworks (identified by frameworkKey: "algo"), flashcards will display the question normally, and the answer will be shown in a code block. The language for the code block (JavaScript or Python) will depend on the flashcard category they are currently viewing.

"Code Mode" Button: This button will be available for algorithmic flashcards. Upon clicking, it will open the Editor with the same question displayed and the starter code and solution in the language last viewed in the flashcard.*/