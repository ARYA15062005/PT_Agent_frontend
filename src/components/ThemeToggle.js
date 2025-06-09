import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = ['light', 'dark', 'child', 'pro'];

  return (
    <div className="theme-toggle">
      {themes.map((t) => (
        <button
          key={t}
          className={`theme-btn ${theme === t ? 'active' : ''}`}
          onClick={() => setTheme(t)}
        >
          {t.charAt(0).toUpperCase() + t.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
