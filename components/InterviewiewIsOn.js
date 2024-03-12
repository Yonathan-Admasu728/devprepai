import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "antd";
import Button from "./Mic-button";
import Image from "next/image";
import styles from "../styles/InterviewOn.module.css";
import "font-awesome/css/font-awesome.min.css";

const MyComponent = ({ handleExit }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [transcription, setTranscription] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    const token = localStorage.getItem("googleIdToken");
    console.log("Token from local storage:", token); // Debug line
    setUserToken(token);
  }, []);

  const handleStartRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = handleAudioUpload;
        mediaRecorder.current.start();
        setIsRecording(true);
        setError(null);
      })
      .catch((err) => {
        setError("Error accessing the microphone.");
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
    audioChunks.current = [];
  };

  // This is the function that will be used throughout your component
  const fetchCurrentQuestion = async (index) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get_question/${index}`
      );
      if (response.data && response.data.question) {
        setCurrentQuestion(response.data.question);
      } else {
        console.error("No question data received");
      }
    } catch (error) {
      console.error("Error fetching current question:", error);
    }
  };

  // This is your useEffect hook
  useEffect(() => {
    // Initialize index, for example, to 1. Change this as needed.
    const initialIndex = 0;
    fetchCurrentQuestion(initialIndex);
  }, []);

  const fetchTranscription = async () => {
    if (!userToken) {
      console.error("User token is null");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/get_transcription?user_token=${userToken}`
      );
      if (response.data && response.data.transcription) {
        setTranscription(response.data.transcription);
      } else {
        console.error("No transcription data received");
      }
    } catch (error) {
      console.error("Error fetching transcription:", error);
    }
  };

  const handleAudioUpload = async () => {
    setIsLoading(true);
    const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioBlob, "myvoice.wav");

    // Use the userToken state here
    const actualUserToken = userToken || "fallback_token"; // Fallback in case the token is null
    console.log("Sending user_token:", actualUserToken); // Debug line

    try {
      const response = await axios.post(
        "http://localhost:8000/talk",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            user_token: actualUserToken, // Include the user_token here
          },
          responseType: "arraybuffer",
        }
      );

      const audioBlobResponse = new Blob([response.data], {
        type: "audio/mpeg",
      });
      const audioUrl = URL.createObjectURL(audioBlobResponse);
      const audio = new Audio(audioUrl);
      audio.play();
      setError(null);
    } catch (error) {
      setError("Failed to process audio.");
    } finally {
      setIsLoading(false);
    }

    // transcription display
    await fetchTranscription();
  };

  return (
    <div className={`${styles.container} fade-in`}>
      <button className={styles.exit} onClick={handleExit}>
        <i className="fa fa-times"></i>
      </button>
      <Row justify="center" align="middle" className={styles.contentContainer}>
        <Col span={24} className={styles.fancyBox}>
          <Image
            src="/bot-tiny.png"
            alt="Robot Icon"
            width={25}
            height={30}
          />
          <div className={styles.subtitle}>
            {currentQuestion ? currentQuestion : "Loading question..."}
          </div>
        </Col>
        <Col span={24} className={styles.fancyBox}>
          <Image
            src="/listening.png"
            alt="Listening Icon"
            width={30}
            height={30}
          />
          <div className={styles.description}>
            {transcription ? transcription : "Waiting for your response..."}
          </div>
        </Col>
      </Row>
      <div className={styles.bottomCenter}>
        <Button
          width={121}
          height={121}
          className={isRecording ? "recording" : ""}
          onClick={isRecording ? handleStopRecording : handleStartRecording}
        >
          {isRecording ? "Stop" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default MyComponent;


