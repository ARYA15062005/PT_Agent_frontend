import React from 'react';
import '../styles/QuickReplies.css';

const QuickReplies = ({ onReplyClick }) => {
  const replies = ['Yes', 'No', 'Maybe', 'Thanks', 'Help'];

  return (
    <div className="quick-replies">
      {replies.map((reply, index) => (
        <button 
          key={index} 
          className="quick-reply-btn"
          onClick={() => onReplyClick(reply)}
        >
          {reply}
        </button>
      ))}
    </div>
  );
};

export default QuickReplies;
