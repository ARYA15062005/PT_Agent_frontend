import React from 'react';
import '../styles/ExportConversation.css';

const ExportConversation = ({ messages }) => {
  const exportChat = () => {
    const content = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-conversation.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button className="export-btn" onClick={exportChat}>
      Export Chat
    </button>
  );
};

export default ExportConversation;
