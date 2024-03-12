import React, { useState, useEffect, useMemo, useRef } from "react";

import Image from "next/image";
import Flashcard from "./Flashcard1";
import Quiz from "./Quiz1";
import Editor from "./Editor";


import styles from "../styles/FlashCardMenu.module.css";
import reactQuestions from "../data/flashcardData/reactQuestions.json";
import nextQuestions from "../data/flashcardData/nextQuestions.json";
import algPyQuestions from "../data/flashcardData/algoPyQuestions.json";
import algoJsQuestions from "../data/flashcardData/algoJsQuestions.json";
import vueQuestions from "../data/flashcardData/vueQuestions.json";
import angularQuestions from "../data/flashcardData/angularQuestions.json";
import javaQuestions from "../data/flashcardData/javaQuestions.json";
import djangoQuestions from "../data/flashcardData/djangoQuestions.json";
import bunQuestions from "../data/flashcardData/bunQuestions";
import noedQuestions from "../data/flashcardData/nodeQuestions.json";

import reactQuiz from "../data/quizData/reactQuiz.json";
import nextQuiz from "../data/quizData/nextQuiz.json";
import angularQuiz from "../data/quizData/angularQuiz.json";
import djangoQuiz from "../data/quizData/djangoQuiz.json";
import algoQuiz from "../data/quizData/algoQuiz.json";
import vueQuiz from "../data/quizData/vueQuiz.json";
import javaQuiz from "../data/quizData/javaQuiz.json";
import bunQuiz from "../data/quizData/bunQuiz.json";
import nodeQuiz from "../data/quizData/nodeQuiz.json";

import flashcardData from "../data/flashcardData/flashCardsData.json";

export default function FlashCardMenu() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [flashcardCount, setFlashcardCount] = useState(0);
  const [flashcardProgress, setFlashcardProgress] = useState({});

  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFlashcardActive, setIsFlashcardActive] = useState(false);

  const [fileInputVisible, setFileInputVisible] = useState(false);


  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const questions = useMemo(() => {
    switch (selectedFramework) {
      case "react":
        return reactQuestions;
      case "next":
        return nextQuestions;
      case "algo-js":
        return algoJsQuestions;
      case "algo-py":
        return algPyQuestions;
      case "vue-js":
        return vueQuestions;
      case "bun":
        return bunQuestions;
      case "angular-js":
        return angularQuestions;
      case "java":
        return javaQuestions;
      case "django":
        return djangoQuestions;
      case "node":
        return noedQuestions;
      default:
        return [];
    }
  }, [selectedFramework]);

  // Debugging the questions array
  console.log("Loaded Questions: ", questions);

  const quizData = useMemo(() => {
    switch (selectedFramework) {
      case "react":
        return reactQuiz;
      case "next":
        return nextQuiz;
      case "algo-js":
        return algoQuiz;
      case "algo-py":
        return algoQuiz;
      case "django":
        return djangoQuiz;
      case "vue-js":
        return vueQuiz;
      case "angular-js":
        return angularQuiz;
      case "java":
        return javaQuiz;
      case "bun":
        return bunQuiz;
      case "node":
        return nodeQuiz;
      default:
        return [];
    }
  }, [selectedFramework]);

  useEffect(() => {
    console.log("Selected Framework: ", selectedFramework);
    console.log("Loaded Questions: ", questions);
  }, [selectedFramework, questions]);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("flashcardProgress"));
    if (savedProgress) {
      setFlashcardProgress(savedProgress);
    }
  }, []);

  const filteredFlashcards = useMemo(() => {
    if (!searchTerm) return flashcardData;
    return flashcardData.filter((flashcard) =>
      flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // useMemo for filtering and limiting flashcards
  const displayedFlashcards = useMemo(() => {
    // Search term logic remains unchanged
    return searchTerm
      ? flashcardData.filter((flashcard) =>
          flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : flashcardData.slice(0, 6); // Limit to the first 6 by default
  }, [searchTerm]);

  const handleQuizCompleted = (isCorrect) => {
    if (isCorrect) {
      setFeedbackMessage("Congratulations! You got it right.");
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        setShowQuiz(false);
        setCurrentIndex(currentIndex + 1);
      }, 2000);
    } else {
      setFeedbackMessage("Oops! That's not correct. Try again.");
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
      }, 2000);
    }

    setFlashcardCount(0);
    setShowQuiz(false); // Hide the quiz after it's completed
    setCurrentIndex(currentIndex + 1); // Move to the next flashcard
    // Move to the next quiz question or reset to the first if at the end
    setQuizIndex((prevQuizIndex) => (prevQuizIndex + 1) % quizData.length);
  };

  // This function will be called when a flashcard is activated
  const activateFlashcard = (frameworkKey) => {
    setSelectedFramework(frameworkKey);
    setIsFlashcardActive(true);
    setCurrentIndex(flashcardProgress[frameworkKey] || 0);
  };

  // This function will be called to deactivate the flashcard and show the menu again
  const deactivateFlashcard = () => {
    setIsFlashcardActive(false); // This should show the menu and hide the flashcard
    setCurrentIndex(0); // Reset the index if you want to start from the first flashcard next time
    setFlashcardCount(0); // Reset the flashcard count
  };


  // Function to open the editor
  const handleOpenEditor = () => {
    setIsEditorOpen(true);
  };

  // Function to close the editor
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  

  const handleNextFlashcard = () => {
    const newFlashcardCount = currentIndex + 1;
    console.log("New currentIndex: ", newFlashcardCount);
    setCurrentIndex(newFlashcardCount);
    setFlashcardProgress((prev) => ({
      ...prev,
      [selectedFramework]: newFlashcardCount,
    }));

    if (newFlashcardCount % 5 === 0) {
      setShowQuiz(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    const newFlashcardCount = currentIndex - 1;
    setCurrentIndex(newFlashcardCount);
    setFlashcardProgress((prev) => ({
      ...prev,
      [selectedFramework]: newFlashcardCount,
    }));
    // ... other logic ...
  };



  const handleLogoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error('File input is not available');
    }
  };
  

  
  const handleFileInputClick = () => {
    // Logic to open file dialog, if needed
  };
  

  const fileInputRef = useRef(null);


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
        console.error('No file selected');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_token', 'your_user_token'); // Replace with actual user token
  
    try {
      const response = await fetch('http://localhost:8000/upload-pdf', {
          method: 'POST',
          body: formData,
      });
      const result = await response.json();
      console.log('Upload response:', result);
      alert(result.message); // or update the state to show a message in the UI
  } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file'); // or show error in the UI
  }
};

  

  const setAndPersistFlashcardProgress = (newProgress) => {
    setFlashcardProgress(newProgress);
    localStorage.setItem("flashcardProgress", JSON.stringify(newProgress));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heroTitle}>
        Build Confidence with Targeted Flashcard Practice
      </h1>
      <p className={styles.heroSubtitle}>
        <span className={styles.highlight}>Explore</span> expert-curated
        frameworks and topics, or
        <span className={styles.highlight}> craft your own</span> interactive
        flashcards.
      </p>

      <input
        type="text"
        placeholder="Search flashcards..."
        value={searchTerm}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />

      {!isFlashcardActive && (
        <div className={styles.frameworks}>
          {displayedFlashcards.map((framework) => (
            <div key={framework.frameworkKey} className={styles.framework}>
              <div className={styles.imageContainer}>
                <Image
                  src={framework.imageSrc}
                  alt={framework.title}
                  layout="fill"
                />
              </div>
              <div className={styles.frameworkInfo}>
                <div className={styles.frameworkTitle}>{framework.title}</div>
                <p className={styles.frameworkDescription}>
                  {framework.description}
                </p>
                {flashcardProgress[framework.frameworkKey] > 0 && (
                  <div className={styles.progressBarBackground}>
                    <div
                      className={styles.progressBarForeground}
                      style={{
                        width: `${
                          (flashcardProgress[framework.frameworkKey] /
                            questions.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                )}
                <button
                  className={styles.expandButton}
                  onClick={() => activateFlashcard(framework.frameworkKey)}
                >
                  {flashcardProgress[framework.frameworkKey] > 0
                    ? "Continue Session"
                    : "Start Session"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.uploadButton} onClick={handleLogoClick}>
  <Image src="/flash-wiz.png" alt="" width={250} height={250} />
  <span className={styles.tooltip}>Upload Study Material</span>
</div>


<input
  type="file"
  onChange={handleFileUpload}
  style={{ display: "none" }}
  ref={fileInputRef} // Make sure this ref is attached here
/>

      

      {showFeedback && <div>{feedbackMessage}</div>}

      {isEditorOpen ? (
        <Editor onCloseEditor={handleCloseEditor} />
      ) : showQuiz ? (
        <Quiz
          data={quizData}
          currentQuizIndex={quizIndex}
          onCompleted={handleQuizCompleted}
        />
      ) : isFlashcardActive ? (
        <Flashcard
          questions={questions}
          currentIndex={currentIndex}
          handleNext={handleNextFlashcard} // Use the new handler here
          handlePrevious={() => {
            if (flashcardCount > 0) {
              setFlashcardCount(flashcardCount - 1);
            }
            setCurrentIndex(currentIndex - 1);
          }}
          handleExit={() => {
            deactivateFlashcard();
            setFlashcardCount(0);
          }}
          onOpenEditor={handleOpenEditor}
    
      />
      ) : null}
       
    </div>
  );
}
