import React, { useEffect } from 'react';
import '../styles/VoiceOutput.css';

const VoiceOutput = ({ text, isSpeaking, isToggleButton = false, onClick }) => {
  useEffect(() => {
    if (isSpeaking && text && !isToggleButton) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.cancel(); // stop any ongoing speech
      speechSynthesis.speak(utterance);
    }
  }, [text, isSpeaking, isToggleButton]);

  return isToggleButton ? (
    <button className="voice-toggle" onClick={onClick}>
      {isSpeaking ? '🔊 Voice On' : '🔇 Voice Off'}
    </button>
  ) : (
    <button className="voice-icon-button" onClick={() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }} title="Speak this message">
      🔊
    </button>
  );
};

export default VoiceOutput;
