import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const InterviewMaster = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userToken, setUserToken] = useState(null); // Add this state
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  useEffect(() => {
    // Retrieve Google ID token from local storage
    const token = localStorage.getItem('googleIdToken');
    setUserToken(token);
  }, []);

  

  const handleStartRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        mediaRecorder.current.onstop = handleAudioUpload;
        mediaRecorder.current.start();
        setIsRecording(true);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
        setError('Error accessing the microphone.');
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
    audioChunks.current = []; // Reset for the next recording session
  };

  const handleAudioUpload = async () => {
    setIsLoading(true);
    const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
    const formData = new FormData();
    formData.append('file', audioBlob, 'myvoice.wav');
    const userToken = "some_unique_token"; // Replace this with the actual user

    try {
      const response = await axios.post('http://localhost:8000/talk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        params: {
          user_token: userToken, // Include the user_token here
        },
        responseType: 'arraybuffer',
      });

      const audioBlobResponse = new Blob([response.data], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlobResponse);

      // Automatically play the audio
      const audio = new Audio(audioUrl);
      audio.play();
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error uploading audio:', error);
      setError('Failed to process audio.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="interview-master">
      <h2>Interview Master</h2>
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <button className={`audio-button ${isLoading ? 'spinner' : ''}`} shape='circle' onClick={isRecording ? handleStopRecording : handleStartRecording}>
        {!isLoading && (isRecording ? '🛑 Stop' : '🎙 Start')}
      </button>

    </div>
  );
};

export default InterviewMaster;
