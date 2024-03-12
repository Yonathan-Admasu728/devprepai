// import React, { useEffect, useRef, useState, useCallback } from "react";
// import styles from "../styles/InfiniteScroll.module.css";

// const InfiniteScroll = ({
//   renderFrameworkPreview,
//   onTechNameClick,
//   setIsScrollPaused,
//   techData,
// }) => {
//   const [hoveredTech, setHoveredTech] = useState(null);
//   const scrollerRefLeft = useRef(null);
//   const scrollerRefRight = useRef(null);
//   const [scrollValue, setScrollValue] = useState(0);

//   // Function to handle the manual scroll
//   const handleManualScroll = (e) => {
//     const newValue = e.target.value;
//     setScrollValue(newValue);

//     const leftScrollValue = (newValue / 100) * (scrollerRefLeft.current.scrollWidth - scrollerRefLeft.current.clientWidth);
//     const rightScrollValue = (newValue / 100) * (scrollerRefRight.current.scrollWidth - scrollerRefRight.current.clientWidth);

//     scrollerRefLeft.current.scrollLeft = leftScrollValue;
//     scrollerRefRight.current.scrollLeft = rightScrollValue;
//   };

//   // Initialize the scrolling animation
//   useEffect(() => {
//     setupScrolling(scrollerRefLeft.current, styles.scrollToLeft);
//     setupScrolling(scrollerRefRight.current, styles.scrollToRight);
//   }, []);

//   const setupScrolling = (scroller, animationClass) => {
//     if (scroller) {
//       let totalWidth = 0;
//       const items = Array.from(scroller.children);
//       items.forEach((item) => {
//         totalWidth += item.offsetWidth;
//       });
//       scroller.style.width = `${totalWidth}px`;
//       scroller.classList.add(animationClass);
//     }
//   };

//   const handleTechClick = useCallback((frameworkKey) => {
//     setIsScrollPaused(true);
//     if (typeof onTechNameClick === "function") {
//       onTechNameClick(frameworkKey);
//     }
//   }, [onTechNameClick, setIsScrollPaused]);

//   const handleMouseEnter = useCallback((frameworkKey) => {
//     setIsScrollPaused(true);
//     const preview = renderFrameworkPreview ? renderFrameworkPreview(frameworkKey) : null;
//     setHoveredTech(preview);
  
//     // Pause animation
//     scrollerRefLeft.current.classList.add('paused');
//     scrollerRefRight.current.classList.add('paused');
//   }, [renderFrameworkPreview, setIsScrollPaused, scrollerRefLeft, scrollerRefRight]);
  
//   const handleMouseLeave = useCallback(() => {
//     setIsScrollPaused(false);
//     setHoveredTech(null);
  
//     // Resume animation
//     scrollerRefLeft.current.classList.remove('paused');
//     scrollerRefRight.current.classList.remove('paused');
//   }, [setIsScrollPaused, scrollerRefLeft, scrollerRefRight]);
  

//   const renderItems = () => {
//     return techData ? techData.map((item, index) => (
//       <span
//         key={index}
//         className={styles.techItem}
//         onClick={() => handleTechClick(item.frameworkKey)}
//         onMouseEnter={() => handleMouseEnter(item.frameworkKey)}
//         onMouseLeave={handleMouseLeave}
//       >
//         {item.frameworkKey}
//       </span>
//     )) : null;
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.center}>Pick Your Topic</h1>
//       <div className={styles.scrollerContainer}>
//         <div className={styles.scroller} data-speed="fast">
//           <div className={`${styles.scrollerInner} ${styles.scrollToLeft}`} ref={scrollerRefLeft}>
//             {renderItems()}
//           </div>
//         </div>
//         <input
//           type="range"
//           className={styles.customScrollbar}
//           value={scrollValue}
//           max="100"
//           onChange={handleManualScroll}
//           style={{
//             position: 'absolute',
//             bottom: '10px',
//             left: '0',
//             right: '0',
//           }}
//         />
//         <div className={styles.scroller} data-speed="fast">
//           <div className={`${styles.scrollerInner} ${styles.scrollToRight}`} ref={scrollerRefRight}>
//             {renderItems()}
//           </div>
//         </div>
//       </div>
//       {hoveredTech && (
//         <div className={styles.frameworkPreviewContainer}>
//           {hoveredTech}
//         </div>
//       )}
//     </div>
//   );
// };

// export default InfiniteScroll;



// import React, { useState, useEffect, useMemo, useRef } from "react";

// import Image from "next/image";
// import Flashcard from "./Flashcard1";
// import CarouselComponent from "./CarouselComp";
// import Quiz from "./Quiz1";
// import Editor from "./Editor";
// import InfiniteScroll from "./InfiniteScroll";
// import FlashcardUpload from "./FlashcardUpload";

// import axios from "axios";
// import styles from "../styles/FlashCardMenu.module.css";

// export default function FlashCardMenu({ session }) {
//   const userToken = session.accessToken; // Replace with the actual path to the token in your session object
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [selectedFramework, setSelectedFramework] = useState("");
//   const [flashcardCount, setFlashcardCount] = useState(0);
//   const [flashcardProgress, setFlashcardProgress] = useState({});

//   const [quizIndex, setQuizIndex] = useState(0);
//   const [showQuiz, setShowQuiz] = useState(false);
//   const [showFeedback, setShowFeedback] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [isFlashcardActive, setIsFlashcardActive] = useState(false);

//   // State to hold whether the custom flashcards should be displayed
//   const [showCustomFlashcards, setShowCustomFlashcards] = useState(false);
//   const [customFlashcards, setCustomFlashcards] = useState([]);

//   const [isEditorOpen, setIsEditorOpen] = useState(false);

//   // New state definitions for flashcards and quizzes
//   const [flashcardsData, setFlashcardsData] = useState([]);
//   const [quizData, setQuizData] = useState([]);

//   const [questions, setQuestions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State to hold the selected flashcard's frameworkKey
//   const [selectedFlashcardKey, setSelectedFlashcardKey] = useState(null);
//   const [isScrollPaused, setIsScrollPaused] = useState(false);
//   const [hoveredFlashcardDetails, setHoveredFlashcardDetails] = useState(null);

//   const [loadingError, setLoadingError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isReady, setIsReady] = useState(false);

//   const [menuData, setMenuData] = useState([]);

//   // Declare flashcardsCache state without initializing it
//   const [flashcardsCache, setFlashcardsCache] = useState({});

//   // Use useEffect to populate state after component mounts
//   useEffect(() => {
//     // Check if window is defined (this ensures code runs only in the browser)
//     if (typeof window !== "undefined") {
//       const cache = localStorage.getItem("flashcardsCache");
//       setFlashcardsCache(cache ? JSON.parse(cache) : {});
//     }
//   }, []);

//   // Fetch flashcards data from the server
//   useEffect(() => {
//     const fetchFlashcardsData = async () => {
//       setIsLoading(true);
//       if (flashcardsCache[selectedFramework]) {
//         setFlashcardsData(flashcardsCache[selectedFramework]);
//         setIsLoading(false);
//       } else {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/flashcards/${selectedFramework}`
//           );
//           setFlashcardsData(response.data);
//           setFlashcardsCache((prevCache) => {
//             const updatedCache = {
//               ...prevCache,
//               [selectedFramework]: response.data,
//             };
//             localStorage.setItem(
//               "flashcardsCache",
//               JSON.stringify(updatedCache)
//             );
//             return updatedCache;
//           });
//           setIsLoading(false);
//           setIsReady(true);
//           setTimeout(() => setIsReady(false), 3000); // Disappear after 3 seconds
//         } catch (error) {
//           console.error("Error fetching flashcards data:", error);
//           setLoadingError("Failed to load flashcards data. Please try again.");
//           setIsLoading(false);
//         }
//       }
//     };

//     if (selectedFramework) {
//       fetchFlashcardsData();
//     }
//   }, [selectedFramework, flashcardsCache]);

//   // Fetch quiz data from the server
//   useEffect(() => {
//     const fetchQuizData = async () => {
//       if (selectedFramework) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8000/quizzes/${selectedFramework}`
//           );
//           setQuizData(response.data);
//         } catch (error) {
//           console.error("Error fetching quiz data:", error);
//         }
//       }
//     };

//     fetchQuizData();
//   }, [selectedFramework]);

//   useEffect(() => {
//     const savedProgress = JSON.parse(localStorage.getItem("flashcardProgress"));
//     if (savedProgress) {
//       setFlashcardProgress(savedProgress);
//     }
//   }, []);

//   // Handler for search input change
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   // Function to handle tech name click from InfiniteScroll
//   const handleTechNameClick = (frameworkKey) => {
//     // Update the selected framework
//     setSelectedFramework(frameworkKey);

//     // Update the selected flashcard key
//     setSelectedFlashcardKey(frameworkKey);

//     // Activate the flashcard view
//     setIsFlashcardActive(true);

//     // Fetch and display the flashcard details
//     const flashcardDetails = findFlashcardDetails(frameworkKey);
//     if (flashcardDetails) {
//       // Set the flashcards data to the one found, which will update the display
//       setFlashcardsData([flashcardDetails]);
//       setCurrentIndex(0); // Set to the first card in the details view
//     } else {
//       // If no details are found, you could set a default state or show an error
//       console.error("No flashcard details found for framework:", frameworkKey);
//       // Optionally, set an error message in the state to display to the user
//     }

//     // If you have a scrolling or selection effect, reset it
//     setIsScrollPaused(false);
//   };

//   // This function is triggered when hovering over a tech name in InfiniteScroll
//   const handleTechNameHover = (frameworkKey) => {
//     const preview = renderFrameworkPreview(frameworkKey);
//     setHoveredFlashcardDetails(preview);
//   };

//   const handleTechNameHoverEnd = () => {
//     setHoveredFlashcardDetails(null);
//   };

//   const findFlashcardDetails = (frameworkKey) => {
//     return menuData.find(
//       (flashcard) => flashcard.frameworkKey === frameworkKey
//     );
//   };

//   const renderFrameworkPreview = (frameworkKey) => {
//     const frameworkDetails = findFlashcardDetails(frameworkKey);
//     if (!frameworkDetails) return null;

//     const progressWidth =
//       (flashcardProgress[frameworkDetails.frameworkKey] /
//         filteredFlashcardsData.length) *
//       100;

//     return (
//       <div key={frameworkDetails.frameworkKey} className={styles.framework}>
//         {/* The background image container will use a fixed background image */}
//         <div className={styles.imageContainer}>
//           {/* Title and description now appear within the image container */}
//           <div className={styles.frameworkInfoOverlay}>
//             <div className={styles.frameworkTitle}>
//               {frameworkDetails.title}
//             </div>
//             <p className={styles.frameworkDescription}>
//               {frameworkDetails.description}
//             </p>
//           </div>
//         </div>
//         {/* Progress bar and button are outside the image container */}
//         {flashcardProgress[frameworkDetails.frameworkKey] > 0 && (
//           <div className={styles.progressBarBackground}>
//             <div
//               className={styles.progressBarForeground}
//               style={{ width: `${progressWidth}%` }}
//             />
//           </div>
//         )}
//         <button
//           className={styles.expandButton}
//           onClick={() => activateFlashcard(frameworkDetails.frameworkKey)}
//         >
//           {flashcardProgress[frameworkDetails.frameworkKey] > 0
//             ? "Continue Session"
//             : "Start Session"}
//         </button>
//       </div>
//     );
//   };

//   // Update memoized filtered flashcards to use the state that holds data fetched from the backend
//   const filteredFlashcardsData = useMemo(() => {
//     if (!searchTerm.trim()) {
//       return flashcardsData; // Use data fetched from the backend
//     } else {
//       // Ensure flashcard has a title and it's a string before calling toLowerCase
//       return flashcardsData.filter(
//         (flashcard) =>
//           flashcard.title &&
//           typeof flashcard.title === "string" &&
//           flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//   }, [searchTerm, flashcardsData]);

//   // Fetch menu data from the backend
//   useEffect(() => {
//     const fetchMenuData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8000/flashcards/menu`
//         );
//         setMenuData(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching menu data:", error);
//         setLoadingError("Failed to load menu data. Please try again.");
//         setIsLoading(false);
//       }
//     };
//     fetchMenuData();
//   }, []);

//   useEffect(() => {
//     if (!isLoading && flashcardsData.length > 0) {
//       // Triggered when loading is completed and flashcards are available
//       setIsReady(true);
//       setTimeout(() => setIsReady(false), 3000); // Disappear after 3 seconds
//     }
//   }, [isLoading, flashcardsData]);

//   // useMemo for filtering and limiting flashcards based on menuData
//   const displayedFlashcards = useMemo(() => {
//     const dataToUse = menuData.length > 0 ? menuData : [];
//     return searchTerm
//       ? dataToUse.filter((flashcard) =>
//           flashcard.title.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       : dataToUse.slice(0, 3);
//   }, [searchTerm, menuData]);

//   const handleQuizCompleted = (isCorrect) => {
//     if (isCorrect) {
//       setFeedbackMessage("Congratulations! You got it right.");
//       setShowFeedback(true);
//       setTimeout(() => {
//         setShowFeedback(false);
//         setShowQuiz(false);
//         setCurrentIndex(currentIndex + 1);
//       }, 2000);
//     } else {
//       setFeedbackMessage("Oops! That's not correct. Try again.");
//       setShowFeedback(true);
//       setTimeout(() => {
//         setShowFeedback(false);
//       }, 2000);
//     }

//     setFlashcardCount(0);
//     setShowQuiz(false); // Hide the quiz after it's completed
//     setCurrentIndex(currentIndex + 1); // Move to the next flashcard
//     // Move to the next quiz question or reset to the first if at the end
//     setQuizIndex((prevQuizIndex) => (prevQuizIndex + 1) % quizData.length);
//   };

//   // This function will be called when a flashcard is activated
//   const activateFlashcard = (frameworkKey) => {
//     setSelectedFramework(frameworkKey);
//     setSearchTerm(""); // Clear the search term when a framework is activated
//     setIsFlashcardActive(true);
//     setCurrentIndex(flashcardProgress[frameworkKey] || 0);
//   };

//   // This function will be called to deactivate the flashcard and show the menu again
//   const deactivateFlashcard = () => {
//     setIsFlashcardActive(false); // This should show the menu and hide the flashcard
//     setCurrentIndex(0); // Reset the index if you want to start from the first flashcard next time
//     setFlashcardCount(0); // Reset the flashcard count
//   };

//   // Function to open the editor
//   const handleOpenEditor = () => {
//     setIsEditorOpen(true);
//   };

//   // Function to close the editor
//   const handleCloseEditor = () => {
//     setIsEditorOpen(false);
//   };

//   const handleNextFlashcard = () => {
//     const newFlashcardCount = currentIndex + 1;
//     console.log("New currentIndex: ", newFlashcardCount);
//     setCurrentIndex(newFlashcardCount);
//     setFlashcardProgress((prev) => ({
//       ...prev,
//       [selectedFramework]: newFlashcardCount,
//     }));

//     if (newFlashcardCount % 5 === 0) {
//       setShowQuiz(true);
//     } else {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrevious = () => {
//     const newFlashcardCount = currentIndex - 1;
//     setCurrentIndex(newFlashcardCount);
//     setFlashcardProgress((prev) => ({
//       ...prev,
//       [selectedFramework]: newFlashcardCount,
//     }));
//     // ... other logic ...
//   };

//   // Handle completion of flashcard upload and generation
//   const handleFlashcardsReady = (flashcards) => {
//     setCustomFlashcards(flashcards);
//     setShowCustomFlashcards(true); // Display the custom flashcards
//   };

//   // Handle the logic to return to the main menu
//   const handleReturnToMenu = () => {
//     setShowCustomFlashcards(false); // Hide the custom flashcards and show the menu
//   };

//   // Fetch custom flashcards from the server
//   const fetchCustomFlashcards = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/flashcards/custom");
//       if (!response.ok) {
//         throw new Error("Failed to fetch custom flashcards");
//       }
//       const data = await response.json();
//       setCustomFlashcards(data.flashcards);
//     } catch (error) {
//       console.error("Error fetching custom flashcards:", error);
//       // Handle error, show user feedback, etc.
//     }
//   };

//   // UseEffect to fetch custom flashcards once the component mounts
//   useEffect(() => {
//     fetchCustomFlashcards();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.heroTitle}>
//         Build Confidence with Targeted Flashcard Practice
//       </h1>
//       <p className={styles.heroSubtitle}>
//         <span className={styles.highlight}>Explore</span> expert-curated
//         frameworks and topics, or
//         <span className={styles.highlight}> craft your own</span> interactive
//         flashcards.
//       </p>

//       <input
//         type="text"
//         placeholder="Search flashcards..."
//         value={searchTerm}
//         onChange={handleSearchChange}
//         className={styles.searchInput}
//       />

//       {isLoading ? (
//         <div className={styles.loadingSpinnerContainer}>
//           <div className={styles.spinner}></div>
//         </div>
//       ) : loadingError ? (
//         <div className={styles.error}>Error: {loadingError}</div>
//       ) : menuData.length === 0 ? (
//         <div className={styles.error}>No flashcards data found</div>
//       ) : (
//         <>
//           {!isFlashcardActive && (
//             <>
//               <div className={styles.frameworks}>
//                 {displayedFlashcards
//                   .slice(0, 3)
//                   .map((framework) =>
//                     renderFrameworkPreview(framework.frameworkKey)
//                   )}
//               </div>

//               <div className={styles.carouselwraper}>
//                 <CarouselComponent
//                   techData={menuData} // Pass the techData to the CarouselComponent
//                   handleTechNameClick={handleTechNameClick}
//                   handleTechNameHover={handleTechNameHover}
//                   handleTechNameHoverEnd={handleTechNameHoverEnd}
//                   renderFrameworkPreview={renderFrameworkPreview}
//                 />
//               </div>

//               <div className={styles.techListFullWidthWrapper}>
//                 <InfiniteScroll
//                   renderFrameworkPreview={renderFrameworkPreview}
//                   onTechNameClick={handleTechNameClick}
//                   onTechNameHover={handleTechNameHover}
//                   onTechNameHoverEnd={handleTechNameHoverEnd}
//                   setIsScrollPaused={setIsScrollPaused}
//                   isScrollPaused={isScrollPaused}
//                   techData={menuData}
//                 />

//                 {hoveredFlashcardDetails && (
//                   <div className="flashcard-preview">
//                     <Flashcard details={hoveredFlashcardDetails} />
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {isFlashcardActive && (
//             <Flashcard
//               framework={selectedFramework}
//               questions={filteredFlashcardsData}
//               currentIndex={currentIndex}
//               handleNext={handleNextFlashcard}
//               handlePrevious={() => {
//                 if (flashcardCount > 0) {
//                   setFlashcardCount(flashcardCount - 1);
//                 }
//                 setCurrentIndex(currentIndex - 1);
//               }}
//               handleExit={() => {
//                 deactivateFlashcard();
//                 setFlashcardCount(0);
//               }}
//               onOpenEditor={handleOpenEditor}
//             />
//           )}
//         </>
//       )}

//       {isEditorOpen && <Editor onCloseEditor={handleCloseEditor} />}

//       {showQuiz && (
//         <Quiz
//           data={quizData}
//           currentQuizIndex={quizIndex}
//           onCompleted={handleQuizCompleted}
//         />
//       )}

//       {showFeedback && <div>{feedbackMessage}</div>}

//       {!showCustomFlashcards && (
//         <>
//           <FlashcardUpload
//             userToken={userToken}
//             onComplete={handleFlashcardsReady}
//           />
//           {/* ...other components like the flashcard menu... */}
//         </>
//       )}

//       {/* Conditionally render the Flashcard1 component if custom flashcards are ready */}
//       {showCustomFlashcards && customFlashcards.length > 0 && (
//         <>
//           <Flashcard flashcards={customFlashcards} />=
//           <button
//             onClick={() => setShowCustomFlashcards(false)}
//             className={styles.returnButton}
//           >
//             Return to Menu
//           </button>
//         </>
//       )}

//       {isLoading && (
//         <div className={styles.loadingSpinnerContainer}>
//           <div className={styles.spinner}></div>
//         </div>
//       )}

//       {isReady && (
//         <div className={styles.notification}>Flashcards are ready!</div>
//       )}
//     </div>
//   );
// }
