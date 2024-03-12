import React from 'react';
import { useEditorContext } from '../contexts/EditorContext.js';
import AceEditor from 'react-ace';
import {
  Button, IconButton, ButtonGroup, Container,
  Typography, Paper, Grid, TextField, ListItem, Slide, List
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

function Highlight({ search, children }) {
  if (!search) return children;
  const regex = new RegExp(search, "gi");
  const parts = children.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>{part}</span>
    ) : part
  );
}

const SidePanel = ({
  questions, setCurrentQuestion, searchQuery, handleSearchChange, theme, selectedQuestionId, setSelectedQuestionId
}) => (
  <div>
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search questions..."
      onChange={handleSearchChange}
      style={{
        marginBottom: "20px",
        color: theme.textPrimary,
        backgroundColor: theme.secondaryBgColor,
        borderColor: theme.textPrimary
      }}
      InputProps={{
        style: {
          color: theme.textPrimary
        }
      }}
    />
    <List style={{ maxHeight: "100%", overflow: "auto" }}>
      {questions.map((q) => {
        const isQuestionSelected = selectedQuestionId === q.id;
        const questionPreview = isQuestionSelected || searchQuery
          ? <Highlight search={searchQuery}>{q.question}</Highlight>
          : `${q.question.split(" ").slice(0, 3).join(" ")}...`;

        return (
          <ListItem
            key={q.id}
            button
            onClick={() => {
              setCurrentQuestion(q);
              setSelectedQuestionId(q.id);
            }}
            style={{
              backgroundColor: theme.secondaryBgColor,
              color: theme.textPrimary
            }}
          >
            {questionPreview}
          </ListItem>
        );
      })}
    </List>
  </div>
);

export default function Home({ onCloseEditor }) {
  const {
    questions, currentQuestion, language, userCode, feedback, timeLeft, searchQuery, theme, selectedQuestionId,
    hasAttempted, showSolution, fetchedSolution, setCurrentQuestion, setUserCode, setFeedback, setTimeLeft,
    setSelectedQuestionId, setHasAttempted, setShowSolution, setFetchedSolution, handleSearchChange, handleSubmit,
    handleViewSolution, handleLanguageChange, isDarkMode,toggleDarkMode
  } = useEditorContext();

  

  return (
    <Container style={{ backgroundColor: theme.primaryBgColor, color: theme.textPrimary, padding: 0 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <SidePanel
            questions={questions}
            setCurrentQuestion={setCurrentQuestion}
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            theme={theme}
            selectedQuestionId={selectedQuestionId}
            setSelectedQuestionId={setSelectedQuestionId}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} style={{ padding: "16px", backgroundColor: theme.secondaryBgColor, boxShadow: `0 4px 20px ${theme.shadowColor}` }}>
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
                  onClick={() => handleLanguageChange("python")}
                >
                  Python
                </Button>

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
                  onClick={() => handleLanguageChange("javascript")}
                >
                  JavaScript
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
                  onClick={toggleDarkMode}
                >
                  {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
                </IconButton>
              </ButtonGroup>
            </div>

            <AceEditor
              key={isDarkMode ? "dark" : "light"}
              mode={language}
              theme={isDarkMode ? "monokai" : "github"} // Switch to "monokai" for dark mode
              // value={userCode}
              value={typeof userCode === "string" ? userCode : ""}
              // value={formattedSolution}
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
              // onClick={() => fetchSolution(currentQuestion.id)}
              onClick={() => handleSubmit(currentQuestion.id)}
            >
              Submit
            </Button>
            {/* Button to show the solution */}
            {hasAttempted && !showSolution && (
              <Button onClick={handleViewSolution}>View Solution</Button>
            )}

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
              onClick={onCloseEditor}
            >
              Close Editor
            </Button>
            <Slide direction="up" in={!!feedback} mountOnEnter unmountOnExit>
              <Typography
                variant="body1"
                style={{
                  marginTop: "16px",
                  color: theme.textPrimary, // Ensure feedback text is visible
                  backgroundColor: theme.secondaryBgColor, // Match the dark theme
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

