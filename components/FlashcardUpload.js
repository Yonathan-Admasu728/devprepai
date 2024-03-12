import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/UploadFile.module.css';



const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

// For WebSocket connections
const WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL || 'wss://localhost:8000';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPE = 'application/pdf';
const MAX_RECONNECT_ATTEMPTS = 3;
const RECONNECT_INTERVAL_MS = 2000;

const WebSocketStatus = ({ status }) => {
  const statusColors = {
    connected: '#28a745', // green
    disconnected: '#dc3545', // red
    error: '#ffc107', // orange
  };
  const statusText = {
    connected: 'Connected',
    disconnected: 'Disconnected',
    error: 'Connection Error',
  };
  return (
    <div className={styles.websocketStatus}>
      <span className={styles.statusDot} style={{ backgroundColor: statusColors[status] }}></span>
      {statusText[status]}
    </div>
  );
};

const FlashcardUpload = ({ userToken, onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [websocketStatus, setWebsocketStatus] = useState('disconnected');
  const websocket = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { isDarkMode } = useTheme(); 

  const isFileValid = (file) => {
    if (file.type !== ALLOWED_FILE_TYPE) {
      toast.error('Only PDF files are allowed.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 10MB limit.');
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isFileValid(file)) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  useEffect(() => {
    let reconnectAttempts = 0;
  
    const connectWebSocket = () => {
      if (!userToken || reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.error('Max WebSocket reconnection attempts reached.');
        return;
      }
  
      websocket.current = new WebSocket(`${WS_BASE_URL}/ws/flashcard-progress?user_token=${userToken}`);
  
      websocket.current.onopen = () => {
        console.log('WebSocket connected');
        setWebsocketStatus('connected');
        reconnectAttempts = 0; // Reset reconnect attempts on a successful connection
      };
  
      websocket.current.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        setWebsocketStatus('disconnected');
        if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
          setTimeout(connectWebSocket, RECONNECT_INTERVAL_MS); // Attempt to reconnect
          reconnectAttempts++;
        }
      };
  
      websocket.current.onerror = (error) => {
        console.error('WebSocket error', error);
        setWebsocketStatus('error');
      };
    };
  
    connectWebSocket();
  
    return () => {
      websocket.current?.close();
    };
  }, [userToken]);
  
  

  const handleUploadProgress = (progressEvent) => {
    const progress = (progressEvent.loaded / progressEvent.total) * 100;
    setUploadProgress(progress);
  };

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_token', userToken);
    try {
      const response = await fetch(`${API_BASE_URL}/upload-pdf`, {
        method: 'POST',
        body: formData,
      });
    
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Upload failed with status: ${response.status} - ${errorText}`);
      }
    
      const result = await response.json();
      onComplete(result.flashcards);
      toast.success(`"${file.name}" uploaded successfully!`);
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred during the upload.');
    } finally {
      setIsLoading(false);
      setFileName('');
      setUploadProgress(0);
    }    
  };

  return (
    <div className={`${styles.uploadContainer} ${isDarkMode ? styles.dark : ""}`}>
  <div className={styles.cardHeader}>
    <h1 className={styles.uploadPrompt}>Create Your Flashcards</h1>
    <p>Upload a PDF and we&apos;ll turn it into study-ready flashcards.</p>
    <button className={styles.selectFileButton} onClick={() => fileInputRef.current.click()} aria-label="Select PDF file">
  Select PDF File
</button>

<input
  type="file"
  onChange={handleFileChange}
  ref={fileInputRef}
  accept="application/pdf"
  style={{ display: 'none' }}
  aria-label="File upload input"
/>
    <div className={styles.uploadImageContainer}>
      <Image
        src="/flash-wiz.png"
        alt="Upload"
        width={200}
        height={200}
        priority
        onClick={() => fileInputRef.current.click()}
        style={{ cursor: 'pointer' }}
      />
    </div>

    {fileName && (
      <div className={styles.fileDetails}>
        <div className={styles.fileName}>{fileName}</div>
        <button className={styles.uploadButton} onClick={handleFileUpload} disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    )}
  </div>
  <div className={styles.progressContainer}>
    <div className={styles.progressBar} style={{ width: `${uploadProgress}%` }}>
      {uploadProgress > 0 ? `Uploading ${fileName}...` : ''}
    </div>
  </div>
  <WebSocketStatus status={websocketStatus} />
  <ToastContainer position="bottom-center" />
</div>

  );
};

export default FlashcardUpload;

