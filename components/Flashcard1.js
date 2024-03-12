import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "font-awesome/css/font-awesome.min.css";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import Editor from "./Editor";
import styles from "../styles/Flashcard.module.css";

import AceEditor from "react-ace";
import { Button } from "@mui/material";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import { DarkMode } from "@mui/icons-material";

export default function Flashcard({
  questions,
  currentIndex,
  handleNext,
  handlePrevious,
  handleExit,
  frameworkDetails,
}) {
  const [showAnswer, setShowAnswer] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { isDarkMode, toggleTheme } = useTheme();

  const [showEditor, setShowEditor] = useState(false);

  // Determine if the current question is algorithmic
  const currentQuestion = questions?.[currentIndex];

  // const isAlgorithmic = Boolean(currentQuestion?.solutions);
  const isAlgorithmic = Boolean(currentQuestion?.solution);

  const { language: currentFrameworkLanguage } = frameworkDetails || {
    language: "python",
  };

  // Inside Flashcard component
  useEffect(() => {
    console.log("Questions Prop in Flashcard Component:", questions);
  }, [questions]);

  console.log("Questions Prop:", questions);

  const handleOpenEditor = useCallback(() => {
    setShowEditor(true);
  }, []);

  // Function to close the editor
  const handleCloseEditor = useCallback(() => {
    setShowEditor(false);
  }, []);

  // Function to format the solution string
  const formatSolution = useCallback((solution) => {
    if (typeof solution !== "string") return "";
    return solution
      .trim()
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => "    " + line)
      .join("\n");
  }, []);

  const solutionToShow = useMemo(() => {
    if (!currentQuestion) return "No question available.";
    return isAlgorithmic
      ? formatSolution(currentQuestion.solution)
      : currentQuestion.answer || "Answer not available.";
  }, [currentQuestion, isAlgorithmic, formatSolution]);

  useEffect(() => {
    setShowAnswer(false);
  }, [currentIndex]);

  useEffect(() => {
    if (showAnswer) {
      const nextButton = document.getElementById("nextButton");
      if (nextButton) nextButton.focus();
    }
  }, [showAnswer]);

 

  const toggleAnswer = useCallback(() => {
    setShowAnswer((prev) => !prev);
  }, []);

  // Calculate progress safely

  const progress = useMemo(
    () =>
      questions?.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0,
    [currentIndex, questions]
  );

  if (!currentQuestion) return <div>No question available.</div>;

  // console.log(currentQuestion);
  // console.log("Current Question Title:", currentQuestion?.title);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      {showEditor ? (
        <Editor
          onCloseEditor={handleCloseEditor}
          questionId={currentQuestion?.id}
          initialLanguage={frameworkDetails?.language || "python"}
        />
      ) : (
        <>
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
                onClick={toggleTheme} 
              >
                {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
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
              <div className={styles.flashcardFront}>
                <div className={styles.flashcardHeader}>
                  {/* Conditionally render the title for algorithmic questions */}
                  {isAlgorithmic && currentQuestion && (
                    <div className={styles.flashcardTitle}>
                      {currentQuestion.title ||
                        `Debug: Title Missing for Question ID ${currentQuestion?.id}`}
                    </div>
                  )}
                  <div className={styles.flashcardQuestion}>
                    {currentQuestion.question}
                  </div>
                </div>
              </div>

              <div className={styles.flashcardBack}>
                <div className={styles.flashcardBackContent}>
                  {showAnswer &&
                    (isAlgorithmic ? (
                      <div className={styles.codeBlock}>
                        <AceEditor
                          key={currentQuestion.id || "editor"}
                          mode={currentFrameworkLanguage}
                          theme={isDarkMode ? "monokai" : "github"}
                          readOnly
                          value={formatSolution(solutionToShow)}
                          editorProps={{ $blockScrolling: true }}
                          setOptions={{
                            showLineNumbers: true,
                            tabSize: 4,
                          }}
                        />
                      </div>
                    ) : (
                      <div className={styles.flashcardAnswer}>
                        {solutionToShow}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <button className={styles.hintButton} onClick={toggleAnswer}>
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </button>
            {isAlgorithmic && (
              <Button
                className={styles.openEditorBtn}
                variant="contained"
                color="primary"
                onClick={handleOpenEditor}
              >
                Code Mode
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
              className={`${styles.navButton} ${styles.next}`}
              onClick={handleNext}
            >
              &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
