import React from 'react';
import '../styles/BotSelector.css';

const BotSelector = ({ onSelectBot, selectedBot }) => {
  const bots = ['Gemini', 'Groq'];

  return (
    <div className="bot-selector">
      {bots.map((bot) => (
        <button
          key={bot}
          className={`bot-btn ${selectedBot === bot ? 'active' : ''}`}
          onClick={() => onSelectBot(bot)}
        >
          {bot}
        </button>
      ))}
    </div>
  );
};

export default BotSelector;
