import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

import Image from "next/image";
import Flashcard from "./Flashcard1";
import CarouselComponent from "./CarouselComp";
import Quiz from "./Quiz1";
import Editor from "./Editor";
import FlashcardUpload from "./FlashcardUpload";

import axios from "axios";
import styles from "../styles/FlashCardMenu.module.css";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function FlashCardMenu({ session }) {
  const userToken = session.accessToken; // Replace with the actual path to the token in your session object
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [flashcardCount, setFlashcardCount] = useState(0);
  const [flashcardProgress, setFlashcardProgress] = useState({});

  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [isFlashcardsCompleted, setIsFlashcardsCompleted] = useState(false);

  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isFlashcardActive, setIsFlashcardActive] = useState(false);

  // State to hold whether the custom flashcards should be displayed
  const [showCustomFlashcards, setShowCustomFlashcards] = useState(false);
  const [customFlashcards, setCustomFlashcards] = useState([]);
  const [customFlashcardsId, setCustomFlashcardsId] = useState(null);

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentQuestionId, setCurrentQuestionId] = useState(null); // State to track the current question ID
  const [currentLanguage, setCurrentLanguage] = useState("python"); // State to track the current programming language, default to python

  // New state definitions for flashcards and quizzes
  const [flashcardsData, setFlashcardsData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // State to hold the selected flashcard's frameworkKey
  const [selectedFlashcardKey, setSelectedFlashcardKey] = useState(null);
  const [isScrollPaused, setIsScrollPaused] = useState(false);
  const [hoveredFlashcardDetails, setHoveredFlashcardDetails] = useState(null);



  const [loadingError, setLoadingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [menuData, setMenuData] = useState([]);

  const { isDarkMode, toggleTheme } = useTheme(); // Use the custom hook to access theme context
  const [isClient, setIsClient] = useState(false); // New state to track if we're on the client

  useEffect(() => {
    setIsClient(true); // Indicate that we are on the client side now

    const storedPreference = localStorage.getItem("isDarkMode");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check if there's a stored preference and it differs from the current theme state
    if (storedPreference) {
      const storedIsDarkMode = storedPreference === "true";
      if (storedIsDarkMode !== isDarkMode) {
        toggleTheme(); // Toggle only if stored preference differs from current state
      }
    } else if (prefersDark !== isDarkMode) {
      toggleTheme(); // Toggle only if system preference differs from current state
    }

    // Ensure the body class is updated to reflect the initial theme
    document.body.classList.toggle("dark-mode", isDarkMode);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // This effect toggles the dark mode class on the body
    document.body.classList.toggle("dark-mode", isDarkMode);

    // Save preference to localStorage when isDarkMode changes
    localStorage.setItem("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  // Declare flashcardsCache state without initializing it
  const [flashcardsCache, setFlashcardsCache] = useState(() => {
    if (typeof window !== "undefined") {
      const cache = localStorage.getItem("flashcardsCache");
      return cache ? JSON.parse(cache) : {};
    }
    return {};
  });

  // Combined useEffect for fetching flashcards and quizzes data based on selectedFramework
  useEffect(() => {
    if (!selectedFramework) return;

    const fetchData = async () => {
      setIsLoading(true);
      setLoadingError("");

      // Fetch Flashcards
      if (flashcardsCache[selectedFramework]) {
        setFlashcardsData(flashcardsCache[selectedFramework]);
      } else {
        try {
          const flashcardsResponse = await axios.get(
            `http://localhost:8000/flashcards/${selectedFramework}`
          );
          console.log("Fetched Flashcards Data:", flashcardsResponse.data);
          setFlashcardsData(flashcardsResponse.data);
          updateFlashcardsCache(flashcardsResponse.data);
        } catch (error) {
          console.error("Error fetching flashcards data:", error);
          setLoadingError("Failed to load flashcards data. Please try again.");
        }
      }

      setIsLoading(false);
    };

    fetchData(); //eslint-disable-next-line
  }, [selectedFramework]);

  useEffect(() => {
    console.log("Flashcards Data State:", flashcardsData);
  }, [flashcardsData]);

  const updateFlashcardsCache = (data) => {
    const updatedCache = { ...flashcardsCache, [selectedFramework]: data };
    setFlashcardsCache(updatedCache);
    localStorage.setItem("flashcardsCache", JSON.stringify(updatedCache));
  };

  // Handler for selectedFramework change
  const handleFrameworkChange = (framework) => {
    setSelectedFramework(framework);
  };

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("flashcardProgress"));
    if (savedProgress) {
      setFlashcardProgress(savedProgress);
    }
  }, []);

  // Handler for search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTechNameClick = (frameworkKey) => {
    const isAlgorithmic = frameworkKey.toLowerCase().includes("algo");
    if (isAlgorithmic) {
      // If it's an algorithmic framework, strip language and use 'algo' as the key
      setSelectedFramework("algo");
    } else {
      setSelectedFramework(frameworkKey);
    }
    setIsFlashcardActive(true);
    fetchFlashcardsData(frameworkKey);
  };

  // Adjusted function to fetch flashcards data
  const fetchFlashcardsData = async (frameworkKey) => {
    setIsLoading(true);
    let endpoint = `http://localhost:8000/flashcards/${frameworkKey}`;

    try {
      const response = await axios.get(endpoint);
      setFlashcardsData(response.data);
      setIsLoading(false);
      setIsReady(true);
      setTimeout(() => setIsReady(false), 3000);
    } catch (error) {
      console.error("Error fetching flashcards data:", error);
      setLoadingError("Failed to load flashcards data. Please try again.");
      setIsLoading(false);
    }
  };

  // This function is triggered when hovering over a tech name in InfiniteScroll
  const handleTechNameHover = (frameworkKey) => {
    const preview = renderFrameworkPreview(frameworkKey);
    setHoveredFlashcardDetails(preview);
  };

  const handleTechNameHoverEnd = () => {
    setHoveredFlashcardDetails(null);
  };

  const findFlashcardDetails = (frameworkKey) => {
    return menuData.find(
      (flashcard) => flashcard.frameworkKey === frameworkKey
    );
  };

  // Find the language for the selected framework
  const selectedFrameworkLanguage = useMemo(() => {
    const framework = menuData.find(
      (f) => f.frameworkKey === selectedFramework
    );
    return framework ? framework.language : ""; // Default to empty string if not found
  }, [menuData, selectedFramework]);

  const renderFrameworkPreview = (frameworkKey) => {
    const frameworkDetails = findFlashcardDetails(frameworkKey);
    if (!frameworkDetails) return null;

    const progressWidth =
      (flashcardProgress[frameworkDetails.frameworkKey] /
        filteredFlashcardsData.length) *
      100;

    return (
      <div key={frameworkDetails.frameworkKey} className={styles.framework}>
        {/* The background image container will use a fixed background image */}
        <div className={styles.imageContainer}>
          {/* Title and description now appear within the image container */}
          <div className={styles.frameworkInfoOverlay}>
            <div className={styles.frameworkTitle}>
              {frameworkDetails.title}
            </div>
            <p className={styles.frameworkDescription}>
              {frameworkDetails.description}
            </p>
          </div>
        </div>
        {/* Progress bar and button are outside the image container */}
        {flashcardProgress[frameworkDetails.frameworkKey] > 0 && (
          <div className={styles.progressBarBackground}>
            <div
              className={styles.progressBarForeground}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        )}
        <button
          className={styles.expandButton}
          onClick={() => activateFlashcard(frameworkDetails.frameworkKey)}
        >
          {flashcardProgress[frameworkDetails.frameworkKey] > 0
            ? "Continue Session"
            : "Start Session"}
        </button>
      </div>
    );
  };

  // Update memoized filtered flashcards to use the state that holds data fetched from the backend
  const filteredFlashcardsData = useMemo(() => {
    if (!searchTerm.trim()) {
      return flashcardsData; // Use data fetched from the backend
    } else {
      // Ensure flashcard has a title and it's a string before calling toLowerCase
      return flashcardsData.filter(
        (flashcard) =>
          flashcard.title &&
          typeof flashcard.title === "string" &&
          flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, flashcardsData]);

  useEffect(() => {
    console.log("Filtered Flashcards Data:", filteredFlashcardsData);
  }, [filteredFlashcardsData]);

  // Fetch menu data from the backend
  useEffect(() => {
    const fetchMenuData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/flashcards/menu`
        );
        setMenuData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching menu data:", error);
        setLoadingError("Failed to load menu data. Please try again.");
        setIsLoading(false);
      }
    };
    fetchMenuData();
  }, []);

  useEffect(() => {
    if (!isLoading && flashcardsData.length > 0) {
      // Triggered when loading is completed and flashcards are available
      setIsReady(true);
      setTimeout(() => setIsReady(false), 3000); // Disappear after 3 seconds
    }
  }, [isLoading, flashcardsData]);

  // useMemo for filtering and limiting flashcards based on menuData
  const displayedFlashcards = useMemo(() => {
    const dataToUse = menuData.length > 0 ? menuData : [];
    return searchTerm
      ? dataToUse.filter((flashcard) =>
          flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : dataToUse.slice(0, 3);
  }, [searchTerm, menuData]);

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
    setSearchTerm(""); // Clear the search term when a framework is activated
    setIsFlashcardActive(true);
    setCurrentIndex(flashcardProgress[frameworkKey] || 0);
  };

  // This function will be called to deactivate the flashcard and show the menu again
  const deactivateFlashcard = () => {
    setIsFlashcardActive(false); // This should show the menu and hide the flashcard
    setCurrentIndex(0); // Reset the index if you want to start from the first flashcard next time
    setFlashcardCount(0); // Reset the flashcard count
  };

 

  // Function to close the editor
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
  };

  const handleNextFlashcard = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= filteredFlashcardsData.length - 1) {
        // End of flashcards reached
        setIsFlashcardsCompleted(true);
        setShowCompletionMessage(true); // Show completion feedback
        return prevIndex; // Stay on the last flashcard
      } else {
        // Proceed to the next flashcard
        return prevIndex + 1;
      }
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        // Beginning of flashcards, cannot go back further
        return prevIndex; // Stay on the first flashcard
      } else {
        // Go back to the previous flashcard
        return prevIndex - 1;
      }
    });
  };

  const restartFlashcards = () => {
    setCurrentIndex(0);
    setIsFlashcardsCompleted(false);
    setShowCompletionMessage(false);
  };

  const returnToMenu = () => {
    setIsFlashcardActive(false); // Hide flashcards, showing the menu
    setShowCompletionMessage(false);
  };

  // Handle completion of flashcard upload and generation
  // const handleFlashcardsReady = (flashcards) => {
  //   setCustomFlashcards(flashcards);
  //   setShowCustomFlashcards(true); // Display the custom flashcards
  // };

  // // Handle the logic to return to the main menu
  // const handleReturnToMenu = () => {
  //   setShowCustomFlashcards(false); // Hide the custom flashcards and show the menu
  // };

  const handleFlashcardsReady = async (flashcardsId) => {
    // Set the ID for the custom flashcards
    setCustomFlashcardsId(flashcardsId);
  
    // Attempt to fetch the custom flashcards before showing them
    const success = await fetchCustomFlashcards(flashcardsId); // Make sure this function returns a success flag
  
    // Only show custom flashcards if they were successfully fetched
    if (success) {
      setShowCustomFlashcards(true);
    } else {
      console.error("Failed to fetch custom flashcards");
      // Handle error (e.g., show an error message to the user)
    }
  };
  

  // Fetch custom flashcards from the server
  
  const fetchCustomFlashcards = async () => {
    if (!customFlashcardsId) return;
    setIsLoading(true);
    try {
        const response = await axios.get(`${API_BASE_URL}/flashcards/custom/${customFlashcardsId}`);
        const data = await response.data;
        setCustomFlashcards(data); // Assuming you have a state in FlashCardMenu to store these
        setIsLoading(false);
    } catch (error) {
        console.error("Error fetching custom flashcards:", error);
        setLoadingError("Failed to load custom flashcards. Please try again.");
        setIsLoading(false);
    }
};




  // UseEffect to fetch custom flashcards once the component mounts
  useEffect(() => {
    fetchCustomFlashcards();//eslint-disable-next-line
  }, []);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ""}`}>
      <h1 className={styles.heroTitle}>
        Build Confidence with Targeted Flashcard Practice
      </h1>
      <p className={styles.heroSubtitle}>
        <span className={styles.highlight}>Explore</span> expert-curated
        frameworks and topics, or
        <span className={styles.highlight}> craft your own</span> interactive
        flashcards.
      </p>
      {isClient && ( // Only render this button on the client
        <div className={styles.themeToggleContainer}>
          <IconButton onClick={toggleTheme} className={styles.themeToggleButton}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </div>
      )}

      {!isFlashcardActive && (
        <input
          type="text"
          placeholder="Search flashcards..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
      )}

      {showCompletionMessage && (
        <div className={styles.completionMessage}>
          <p className={styles.completionText}>
            Congratulations! You have successfully completed all the flashcards.
          </p>
          <button
            onClick={returnToMenu}
            className={`${styles.completionButton} ${styles.returnToMenuButton}`}
          >
            Return to Menu
          </button>
          <button
            onClick={restartFlashcards}
            className={`${styles.completionButton} ${styles.restartFlashcardsButton}`}
          >
            Restart Flashcards
          </button>
        </div>
      )}

      {isLoading ? (
        <div className={styles.loadingSpinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      ) : loadingError ? (
        <div className={styles.error}>Error: {loadingError}</div>
      ) : menuData.length === 0 ? (
        <div className={styles.error}>No flashcards data found</div>
      ) : (
        <>
          {!isFlashcardActive && (
            <>
              <div className={styles.frameworks}>
                <h2>Featured Flashcards</h2>
                {displayedFlashcards
                  .slice(0, 3)
                  .map((framework) =>
                    renderFrameworkPreview(framework.frameworkKey)
                  )}
              </div>

              <div className={styles.carouselwraper}>
                <CarouselComponent
                  techData={menuData} // Pass the techData to the CarouselComponent
                  handleTechNameClick={handleTechNameClick}
                  handleTechNameHover={handleTechNameHover}
                  handleTechNameHoverEnd={handleTechNameHoverEnd}
                  renderFrameworkPreview={renderFrameworkPreview}
                />
              </div>
            </>
          )}

          {isFlashcardActive && (
            <div className={styles.flashcardOrEditorContainer}>
              {!isEditorOpen ? (
                <Flashcard
                  framework={selectedFramework}
                  questions={filteredFlashcardsData}
                  currentIndex={currentIndex}
                  handleNext={handleNextFlashcard}
                  handlePrevious={handlePrevious}
                  handleExit={() => {
                    deactivateFlashcard();
                    setFlashcardCount(0);
                  }}
                  // onOpenEditor={handleOpenEditor}
                  frameworkDetails={{
                    key: selectedFramework,
                    language: selectedFrameworkLanguage,
                  }}
                />
              ) : (
                <Editor
                  onCloseEditor={handleCloseEditor}
                  questionId={currentQuestionId} // Pass the current question ID to the Editor
                  initialLanguage={currentLanguage} // Pass the current programming language to the Editor
                />
              )}
            </div>
          )}
        </>
      )}

      {showQuiz && (
        <Quiz
          data={quizData}
          currentQuizIndex={quizIndex}
          onCompleted={handleQuizCompleted}
        />
      )}

      {showFeedback && <div>{feedbackMessage}</div>}

      {!showCustomFlashcards && (
        <>
          <FlashcardUpload
            userToken={userToken}
            onComplete={handleFlashcardsReady}
          />
        </>
      )}

      {/* Conditionally render the Flashcard1 component if custom flashcards are ready */}
      {showCustomFlashcards && customFlashcards?.length > 0 && (
        <>
          <Flashcard flashcards={customFlashcards} />=
          <button
            onClick={() => setShowCustomFlashcards(false)}
            className={styles.returnButton}
          >
            Return to Menu
          </button>
        </>
      )}

      {isLoading && (
        <div className={styles.loadingSpinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}

      {isReady && (
        <div className={styles.notification}>Flashcards are ready!</div>
      )}
    </div>
  );
}
