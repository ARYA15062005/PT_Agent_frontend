import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/TypingIndicator.css';

const TypingIndicator = () => {
  const { theme } = useTheme();
  return (
    <div className={`typing-indicator ${theme}`}>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );
};

export default TypingIndicator;
