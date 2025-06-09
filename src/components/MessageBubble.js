import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import useTimestamp from '../hooks/useTimestamp';
import '../styles/MessageBubble.css';
import 'highlight.js/styles/github.css';  // you can choose any highlight.js theme here

const MessageBubble = ({ text, isUser, timestamp }) => {
  const relativeTime = useTimestamp(timestamp);

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
        {text}
      </ReactMarkdown>
      <span className="timestamp">{relativeTime}</span>
    </div>
  );
};

export default MessageBubble;
