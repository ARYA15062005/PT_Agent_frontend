/* global webkitSpeechRecognition */
import React, { useState, useEffect } from 'react';

const VoiceInput = ({ onTranscriptComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscriptComplete(transcript);
        setIsListening(false);
      };

      speechRecognition.onerror = () => {
        setIsListening(false);
      };

      setRecognition(speechRecognition);
    } else {
      alert('Your browser does not support Speech Recognition.');
    }
  }, [onTranscriptComplete]);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="voice-input">
      <button
        onClick={isListening ? stopListening : startListening}
        className={`mic-button ${isListening ? 'listening' : ''}`}
      >
        🎙️ {isListening ? 'Stop' : 'Speak'}
      </button>
    </div>
  );
};

export default VoiceInput;
