import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

// Define the color schemes
const lightTheme = {
  primaryBgColor: "#f0f7fa",
  secondaryBgColor: "#ffffff",
  textPrimary: "#2c3e50",
  accentColor: "#08aeea",
  hoverAccentColor: "#06c2de",
  buttonBgColor: "#daeef6",
  buttonText: "#2c3e50",
  shadowColor: "rgba(44, 62, 80, 0.15)",
};

const darkTheme = {
  primaryBgColor: "#121212",
  secondaryBgColor: "#1d1d1d",
  textPrimary: "#ffffff",
  accentColor: "#1e88e5",
  buttonBgColor: "#333333",
  buttonText: "#ffffff",
  shadowColor: "rgba(255, 255, 255, 0.1)",
};

// Define the initial context state
const initialState = {
  questions: [],
  currentQuestion: null,
  language: 'python',
  userCode: '',
  feedback: '',
  timeLeft: 60,
  searchQuery: '',
  filteredQuestions: [],
  selectedQuestionId: null,
  hasAttempted: false,
  showSolution: false,
  fetchedSolution: '',
  isDarkMode: false, // default value
  theme: lightTheme, // default to light theme
};

// Create the context
const EditorContext = createContext(initialState);

// Create a provider component
export const EditorProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Fetch questions from the API and update state
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8000/questions");
        setState(prevState => ({
          ...prevState,
          questions: response.data,
          currentQuestion: response.data[0],
          userCode: response.data[0].starterCode || "",
        }));
      } catch (error) {
        console.error("There was an error fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    const newTheme = state.isDarkMode ? darkTheme : lightTheme;
    setState(prevState => ({ ...prevState, theme: newTheme }));
    localStorage.setItem("preferredTheme", state.isDarkMode ? "dark" : "light");
  }, [state.isDarkMode]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setState(prevState => ({ ...prevState, isDarkMode: !prevState.isDarkMode }));
  };

 // Debounced search function
  const debouncedSetSearchQuery = debounce((query) => {
    setState(prevState => ({
      ...prevState,
      searchQuery: query.toLowerCase(),
      filteredQuestions: query
        ? prevState.questions.filter(q =>
            q.question.toLowerCase().includes(query.toLowerCase())
          )
        : prevState.questions.slice(0, 3),
    }));
  }, 300);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    debouncedSetSearchQuery(event.target.value);
  };

  const formatStarterCode = (starterCode) => {
    if (!starterCode) return '';
  
    // Assuming the starter code is a string and indented with 4 spaces
    return starterCode
      .trim() // Remove leading/trailing whitespace
      .split("\n") // Split the string into lines
      .map(line => "    " + line) // Add indentation (4 spaces) to each line
      .join("\n"); // Rejoin the lines back into a single string
  };
  
  // Add this function inside your EditorProvider component
  

  useEffect(() => {
    if (state.timeLeft > 0) {
      const timerId = setTimeout(() => {
        setState(prevState => ({ ...prevState, timeLeft: prevState.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      setState(prevState => ({ ...prevState, feedback: "Time is up!" }));
    }
  }, [state.timeLeft]);

  useEffect(() => {
    if (state.currentQuestion && state.currentQuestion.starterCode) {
      const starterCodeByLang = state.currentQuestion.starterCode[state.language];
      if (starterCodeByLang) {
        setState(prevState => ({
          ...prevState,
          userCode: formatStarterCode(starterCodeByLang),
        }));
      }
    }
  }, [state.language, state.currentQuestion]);

  






  const handleSubmit = async (id) => {
    setHasAttempted(true);
    try {
      let solutionToCompare = state.fetchedSolution;
  
      // Fetch the solution if it's not already fetched
      if (!solutionToCompare) {
        const response = await axios.get(`http://localhost:8000/solutions/${id}`);
        const rawSolution = response.data.solutions[state.language] || "";
        solutionToCompare = formatSolution(rawSolution);
        setFetchedSolution(solutionToCompare); // Update the state with the fetched solution
      }
  
      const isCorrect = isSolutionEquivalent(state.userCode, solutionToCompare, state.language);
      if (isCorrect) {
        setFeedback("You Nailed it! Great job, keep it up!");
      } else {
        setFeedback("Almost there! Take another look at the code...");
      }
      
      // Always show the solution after submission
      setShowSolution(true);
  
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setFeedback("An error occurred while processing your solution. Please try again or check your network connection.");
    }
  };
  
  const handleViewSolution = async () => {
    if (state.hasAttempted && state.currentQuestion) {
      setState(prevState => ({ ...prevState, showSolution: true })); // Show solution immediately
      if (!state.fetchedSolution) {
        // Fetch the solution if it hasn't been fetched yet
        try {
          const response = await axios.get(`http://localhost:8000/solutions/${state.currentQuestion.id}`);
          const rawSolution = response.data.solutions[state.language] || "";
          const solutionToShow = formatSolution(rawSolution);
          setState(prevState => ({
            ...prevState,
            fetchedSolution: solutionToShow,
            userCode: `${prevState.userCode.trim()}\n\n# Solution:\n${solutionToShow}`
          }));
        } catch (error) {
          console.error("Error in handleViewSolution:", error);
          setState(prevState => ({
            ...prevState,
            feedback: "An error occurred while fetching the solution. Please try again."
          }));
        }
      } else {
        // Solution is already fetched, just append it
        const solutionToShow = state.fetchedSolution;
        setState(prevState => ({
          ...prevState,
          userCode: `${prevState.userCode.trim()}\n\n# Solution:\n${solutionToShow}`
        }));
      }
    }
  };
  
  
  
  
  
  


  const fetchSolution = async (id, language) => {
    try {
      const response = await axios.get(`http://localhost:8000/solutions/${id}`);
      const rawSolution = response.data.solutions[language] || "";
      const formattedSolution = formatSolution(rawSolution);
      
      setState(prevState => ({
        ...prevState,
        fetchedSolution: formattedSolution
      }));
    } catch (error) {
      console.error("Error fetching solution:", error);
      setState(prevState => ({
        ...prevState,
        feedback: "Error fetching solution. Please try again."
      }));
    }
  };



//   const appendSolutionToUserCode = (solution) => {
//     if (typeof solution === "string" && solution) {
//       // Only append if the solution is a non-empty string
//       const combinedCode = `${userCode.trim()}\n\n# Solution:\n${solution}`;
//       setUserCode(combinedCode);
//     }
//   };

const appendSolutionToUserCode = (solution) => {
    if (typeof solution === "string" && solution) {
      // Only append if the solution is a non-empty string
      setState(prevState => ({
        ...prevState,
        userCode: `${prevState.userCode.trim()}\n\n# Solution:\n${solution}`
      }));
      
    }
  };

 

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  
 

  const isSolutionEquivalent = (userSolution, correctSolution, language) => {
    const normalizeCode = (code) => {
      // Remove comments based on the language
      if (language === "python") {
        code = code.replace(/#.*$/gm, ""); // Remove Python comments
      } else if (language === "javascript") {
        code = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//gm, ""); // Remove JavaScript comments
      }
      // Normalize white spaces
      return code.replace(/\s+/g, " ").trim();
    };
  
    return normalizeCode(userSolution) === normalizeCode(correctSolution);
  };
  

  // Function to format the solution string
  const formatSolution = (solution) => {
    if (typeof solution !== "string") {
      console.error("Invalid solution format:", solution);
      return ""; // Return an empty string if the solution is not a string
    }
    return solution
      .trim()
      .replace(/\\n/g, "\n")
      .split("\n")
      .map((line) => "    " + line)
      .join("\n");
  };
  

  const setCurrentQuestionAndStarterCode = (question) => {
    setCurrentQuestion(question);
    setFeedback("");
    setTimeLeft(60);
    setHasAttempted(false);
    setShowSolution(false);

    // Fetch the starter code based on the selected language
    const starterCodeByLang = question.starterCode[language];
    const formattedStarterCode = formatStarterCode(starterCodeByLang);
    setUserCode(formattedStarterCode);
  };

  const isSolutionCorrect = (userCode, solution) => {
    // Normalize newlines and trim whitespace
    const normalizeString = (str) => {
      return str.replace(/\r\n/g, "\n").trim();
    };

    return normalizeString(userCode) === normalizeString(solution);
  };

  // Function to normalize the solution for comparison
  const normalizeSolution = (solution) => {
    return solution.replace(/\s/g, "").trim();
  };
  

  // Additional state update functions
  const setQuestions = (newQuestions) => {
    setState(prevState => ({ ...prevState, questions: newQuestions }));
  };

  const setCurrentQuestion = (question) => {
    setState(prevState => ({ ...prevState, currentQuestion: question }));
  };

  const setLanguage = (newLanguage) => {
    setState(prevState => ({ ...prevState, language: newLanguage }));
  };

  const setUserCode = (newUserCode) => {
    setState(prevState => ({ ...prevState, userCode: newUserCode }));
  };

  const setFeedback = (newFeedback) => {
    setState(prevState => ({ ...prevState, feedback: newFeedback }));
  };

  const setTimeLeft = (newTimeLeft) => {
    setState(prevState => ({ ...prevState, timeLeft: newTimeLeft }));
  };

  const setSelectedQuestionId = (newSelectedQuestionId) => {
    setState(prevState => ({ ...prevState, selectedQuestionId: newSelectedQuestionId }));
  };

  const setHasAttempted = (newHasAttempted) => {
    setState(prevState => ({ ...prevState, hasAttempted: newHasAttempted }));
  };

  const setShowSolution = (newShowSolution) => {
    setState(prevState => ({ ...prevState, showSolution: newShowSolution }));
  };

  const setFetchedSolution = (newFetchedSolution) => {
    setState(prevState => ({ ...prevState, fetchedSolution: newFetchedSolution }));
  };

  // Context value
  const value = {
    ...state,
    toggleDarkMode,
    handleSearchChange,
    setQuestions,
    setCurrentQuestion,
    setLanguage,
    setUserCode,
    setFeedback,
    setTimeLeft,
    setSelectedQuestionId,
    setHasAttempted,
    setShowSolution,
    setFetchedSolution,
    handleSubmit,
    fetchSolution,
    handleViewSolution,
    handleLanguageChange,
    handleSubmit,
    appendSolutionToUserCode,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to use the editor context
export const useEditorContext = () => {
  const context = React.useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};

export default EditorContext;
