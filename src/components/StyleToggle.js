import React from 'react';
import { useStyle } from '../contexts/StyleContext';
import '../styles/StyleToggle.css';

const StyleToggle = () => {
  const { style, toggleStyle } = useStyle();

  return (
    <button className="style-toggle-btn" onClick={toggleStyle}>
      {style === 'formal' ? 'Switch to Sci-Fi' : 'Switch to Formal'}
    </button>
  );
};

export default StyleToggle;
