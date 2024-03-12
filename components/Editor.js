import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";
import { debounce } from "lodash";
import AceEditor from "react-ace";
import {
  Button,
  IconButton,
  ButtonGroup,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  Slide,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import { useTheme } from "../contexts/ThemeContext";

// Define the color scheme
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

const SidePanel = ({
  questions,
  setCurrentQuestionAndStarterCode,
  searchQuery,
  handleSearchChange,
  theme,
  selectedQuestionId,
  setSelectedQuestionId,
}) => (
  <div>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search questions..."
      onChange={(e) => handleSearchChange(e)}
      style={{
        marginBottom: "20px",
        color: theme.textPrimary,
        backgroundColor: theme.secondaryBgColor,
        borderColor: theme.textPrimary,
      }}
      InputProps={{
        style: {
          color: theme.textPrimary,
        },
      }}
    />

    <List style={{ maxHeight: "100%", overflow: "auto" }}>
      {questions
        .filter((q) => q != null)
        .map((q) => {
          // Filter out null or undefined values
          const isCurrentQuestion = q.id === selectedQuestionId;
          const questionDisplay = isCurrentQuestion ? q.question : q.title;

          return (
            <ListItem
              key={q.id}
              button
              onClick={() => {
                setCurrentQuestionAndStarterCode(q);
                setSelectedQuestionId(q.id);
              }}
              style={{
                fontWeight: isCurrentQuestion ? "bold" : "normal",
                borderBottom: "1px solid #e0e0e0", // Add a subtle border to separate items
              }}
            >
              {questionDisplay}
            </ListItem>
          );
        })}
    </List>
  </div>
);



export default function Editor({ onCloseEditor, questionId, initialLanguage }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [userCode, setUserCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  const [hasAttempted, setHasAttempted] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [fetchedSolution, setFetchedSolution] = useState("");

  const { isDarkMode, toggleTheme } = useTheme();

  // Use isDarkMode to select the current theme
  const theme = isDarkMode ? darkTheme : lightTheme;

  useEffect(() => {
    const fetchQuestionsAndSetCurrent = async () => {
      try {
        const response = await axios.get("http://localhost:8000/questions");
        setQuestions(response.data);

        // Find the current question based on questionId or default to the first question
        let current;
        if (questionId) {
          current =
            response.data.find((q) => q.id === parseInt(questionId)) ||
            response.data[0];
        } else {
          current = response.data[0];
        }

        setCurrentQuestion(current);

        // Set the starter code based on the initialLanguage or the language state if initialLanguage is not provided
        const starterCodeLanguage = initialLanguage || language;
        const starterCode = current.starterCode[starterCodeLanguage];
        setUserCode(starterCode || "");

        // Update the language state if initialLanguage is provided
        if (initialLanguage) {
          setLanguage(initialLanguage);
        }
      } catch (error) {
        console.error("There was an error fetching questions data", error);
      }
    };

    fetchQuestionsAndSetCurrent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId, initialLanguage]);

  useEffect(() => {
    if (currentQuestion) {
      setSelectedQuestionId(currentQuestion.id); //for the side panel to know which question to show
    }
  }, [currentQuestion]);

  const searchRef = useRef(
    debounce((query) => setSearchQuery(query.toLowerCase()), 300)
  ).current;

  const handleSearchChange = useCallback(
    (event) => {
      searchRef(event.target.value);
    },
    [searchRef]
  );

  const filteredQuestions = useMemo(() => {
    let result = questions.filter((q) => q != null); // Ensure no null or undefined values

    if (searchQuery) {
      // Filter questions by the search query and return immediately, bypassing the limit
      return result.filter((q) =>
        q.question.toLowerCase().includes(searchQuery)
      );
    }

    // Find and temporarily remove the current question if it's in the list
    const currentQuestionIndex = result.findIndex(
      (q) => q.id === currentQuestion?.id
    );
    if (currentQuestionIndex !== -1) {
      result.splice(currentQuestionIndex, 1);
    }

    // Limit the result to 3 questions when not searching
    result = result.slice(0, 3);

    // Re-add the current question to the start of the list
    if (currentQuestion) {
      result.unshift(currentQuestion);
    }

    return result;
  }, [questions, currentQuestion, searchQuery]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setFeedback("Time is up!");
    }
  }, [timeLeft]);

  // useEffect to fetch starter code when language changes
  useEffect(() => {
    if (currentQuestion && currentQuestion.starterCode) {
      const newStarterCode = currentQuestion.starterCode[language];
      // Consider checking if the user has modified the existing code before resetting it
      setUserCode(newStarterCode || "");
    }
  }, [language, currentQuestion]);

  const handleSubmit = useCallback(
    async (id) => {
      setHasAttempted(true);
      try {
        await fetchSolution(id, language); // Fetch the solution

        const formattedSolution = formatSolution(fetchedSolution);
        // Set a positive feedback message upon submission
        if (isSolutionEquivalent(userCode, formattedSolution, language)) {
          setFeedback(
            "Great effort! Remember, practice makes perfect. Take a look at the suggested solution to see another way of solving this problem."
          );
          setShowSolution(true);
        } else {
          setFeedback(
            "Great effort! Remember, practice makes perfect. Take a look at the suggested solution to see another way of solving this problem."
          );
        }
      } catch (error) {
        console.error("Error in handleSubmit:", error);
        setFeedback(
          "An error occurred while processing your solution. Please try again or check your network connection."
        );
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [userCode, fetchedSolution, language]
  );

  const isSolutionEquivalent = (userSolution, correctSolution, language) => {
    const normalizeCode = (code, lang) => {
      // Normalize line endings to \n
      code = code.replace(/\r\n/g, "\n");

      // Further whitespace normalization: replace multiple spaces with a single space in non-string parts
      code = code.replace(/(^\s+|\s+$)/gm, ""); // Trim leading and trailing spaces on each line

      if (lang === "python") {
        code = code.replace(/#.*$/gm, ""); // Remove Python comments
      } else if (lang === "javascript") {
        code = code.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//gm, ""); // Remove JavaScript comments
      }

      // Normalize consecutive blank lines to a single blank line
      code = code.replace(/\n\s*\n/g, "\n\n");

      return code;
    };

    return (
      normalizeCode(userSolution, language) ===
      normalizeCode(correctSolution, language)
    );
  };

  // Function to format the solution string
  const formatSolution = (solution) => {
    if (typeof solution !== "string") {
      console.error("Invalid solution format:", solution);
      return ""; // Return an empty string if the solution is not a string
    }

    // Replace escaped newlines with actual newlines and trim whitespace
    return solution.replace(/\\n/g, "\n").trim();
  };

  // Function to format the starter code for display
  const formatStarterCode = (starterCode) => {
    return (
      starterCode
        .trim()
        // Assuming the starter code is indented with 4 spaces, otherwise adjust accordingly
        .split("\n")
        .map((line) => "    " + line) // Indent each line with 4 spaces
        .join("\n")
    );
  };

  const handleViewSolution = useCallback(() => {
    if (hasAttempted && currentQuestion) {
      setShowSolution(true); // Update the state to show the solution
      appendSolutionToUserCode(fetchedSolution); // Append the fetched solution
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasAttempted, currentQuestion, fetchedSolution]);

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

  const fetchSolution = async (id, language) => {
    try {
      const response = await axios.get(`http://localhost:8000/solutions/${id}`);
      const rawSolution = response.data.solutions[language] || "";
      const formattedSolution = formatSolution(rawSolution);
      setFetchedSolution(formattedSolution);
    } catch (error) {
      console.error("Error fetching solution:", error);
      setFeedback("Error fetching solution. Please try again.");
    }
  };

  const appendSolutionToUserCode = (solution) => {
    if (typeof solution === "string" && solution) {
      // Only append if the solution is a non-empty string
      const combinedCode = `${userCode.trim()}\n\n# Solution:\n${solution}`;
      setUserCode(combinedCode);
    }
  };

  const handleLanguageToggle = () => {
    const newLanguage = language === "python" ? "javascript" : "python";
    setLanguage(newLanguage);

    // Check if the currentQuestion and its starter code are available
    if (currentQuestion && currentQuestion.starterCode) {
      // Fetch the starter code for the new language
      const newStarterCode = currentQuestion.starterCode[newLanguage];
      setUserCode(newStarterCode || "");
    }
  };

  return (
    <Container
      style={{
        backgroundColor: isDarkMode
          ? darkTheme.primaryBgColor
          : lightTheme.primaryBgColor,
        color: isDarkMode ? darkTheme.textPrimary : lightTheme.textPrimary,
        padding: 0,
        borderRadius: "10px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <SidePanel
            questions={filteredQuestions}
            setCurrentQuestionAndStarterCode={setCurrentQuestionAndStarterCode}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            theme={theme}
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper
            elevation={3}
            style={{
              padding: "16px",
              backgroundColor: theme.secondaryBgColor,
              boxShadow: `0 4px 20px ${theme.shadowColor}`,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Typography variant="h6" style={{ color: theme.textPrimary }}>
                Time left: {timeLeft} seconds
              </Typography>
              <ButtonGroup variant="contained">
                <Button
                  sx={{
                    background: "linear-gradient(135deg, #0aafe6, #000000)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    color: "white",
                    textTransform: "none",
                    marginRight: "8px",
                    transition: "0.3s",
                    ":hover": {
                      background: "linear-gradient(135deg, #29b6f6, #1c1c1c)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.7)",
                      transform: "translateY(-2px)",
                    },
                    ":active": {
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  onClick={onCloseEditor}
                >
                  Back to Flashcards Mode
                </Button>
                <IconButton
                  sx={{
                    background: "linear-gradient(135deg, #0aafe6, #000000)",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                    color: "white",
                    textTransform: "none",
                    margin: "8px",
                    transition: "0.3s",
                    ":hover": {
                      background: "linear-gradient(135deg, #29b6f6, #1c1c1c)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.7)",
                      transform: "translateY(-2px)",
                    },
                    ":active": {
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                      transform: "translateY(-1px)",
                    },
                  }}
                  onClick={toggleTheme}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </ButtonGroup>
            </div>

            <AceEditor
              key={isDarkMode ? "dark" : "light"}
              mode={language}
              theme={isDarkMode ? "monokai" : "github"}
              value={userCode}
              onChange={(newCode) => setUserCode(newCode)}
              name="editor"
              editorProps={{ $blockScrolling: true }}
              style={{
                margin: "auto",
                width: "100%",
                height: "400px",
                boxShadow: `0 4px 20px ${theme.shadowColor}`,
              }}
            />
            <Typography
              variant="body1"
              style={{
                marginTop: "20px",
                color: theme.textPrimary,
                backgroundColor: theme.secondaryBgColor,
                padding: "10px",
                borderRadius: "5px",
                border: `1px solid ${theme.shadowColor}`,
              }}
            >
              <strong>Tips for Comparison:</strong>
              <ul style={{ marginTop: "10px" }}>
                <li style={{ marginBottom: "5px" }}>
                  Notice how the solution handles edge cases.
                </li>
                <li style={{ marginBottom: "5px" }}>
                  Consider the efficiency of the solution compared to yours.
                  Think about the time and space complexity.
                </li>
                <li>
                  Look at the programming constructs and patterns used in the
                  solution. Is there anything new you can learn and apply in
                  future problems?
                </li>
              </ul>
            </Typography>

            <Button
              sx={{
                background: "linear-gradient(135deg, #0aafe6, #000000)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                color: "white",
                textTransform: "none",
                margin: "8px",
                transition: "0.3s",
                ":hover": {
                  background: "linear-gradient(135deg, #29b6f6, #1c1c1c)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.7)",
                  transform: "translateY(-2px)",
                },
                ":active": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  transform: "translateY(-1px)",
                },
              }}
              onClick={() => handleSubmit(currentQuestion.id)}
            >
              Submit
            </Button>

            {hasAttempted && !showSolution && (
              <Button onClick={handleViewSolution}>View Solution</Button>
            )}

            <Button
              sx={{
                background: "linear-gradient(135deg, #0aafe6, #000000)",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                color: "white",
                textTransform: "none",
                marginLeft: "auto",
                transition: "0.3s",
                ":hover": {
                  background: "linear-gradient(135deg, #29b6f6, #1c1c1c)",
                  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.7)",
                  transform: "translateY(-2px)",
                },
                ":active": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                  transform: "translateY(-1px)",
                },
              }}
              onClick={handleLanguageToggle}
            >
              {language === "python" ? "Try in JavaScript" : "Try in Python"}
            </Button>

            <Slide direction="up" in={!!feedback} mountOnEnter unmountOnExit>
              <Typography
                variant="body1"
                style={{
                  marginTop: "16px",
                  color: theme.textPrimary,
                  backgroundColor: theme.secondaryBgColor,
                }}
              >
                {feedback}
              </Typography>
            </Slide>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
