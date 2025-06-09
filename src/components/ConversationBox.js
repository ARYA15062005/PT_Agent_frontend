import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const ConversationBox = ({
  messages,
  onSendMessage,
  input,
  setInput,
  onFileUpload,
  botTyping,
  onVoiceInputComplete
}) => {
  const recognitionRef = useRef(null);

  

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Sorry, your browser does not support voice input.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('🗣️ Transcript:', transcript);
      if (onVoiceInputComplete) {
        onVoiceInputComplete(transcript);
      } else {
        setInput(transcript);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error('🎤 Speech recognition error:', event.error);
    };

    recognitionRef.current.start();
  };

  return (
    <div className="conversation-box">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            <div className="markdown-message">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
            {msg.fileUrl && (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                {msg.fileType.includes('image') ? (
                  <img src={msg.fileUrl} alt="Uploaded" className="uploaded-image" />
                ) : (
                  <span>📄 {msg.text}</span>
                )}
              </a>
            )}
          </div>
        ))}
        {botTyping && (
          <div className="loading-dots loading">
            <span>.</span><span>.</span><span>.</span>
          </div>
        )}
      </div>

      <div className="input-area">
        <textarea
        placeholder="Type a message..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
        rows={2}
        cols={150}              // fixed column width of ~50 characters
        // 
        />
        <input
          type="file"
          onChange={onFileUpload}
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload" className="upload-btn">📎</label>
        <button onClick={startVoiceInput} className="mic-btn" title="Speak">
          🎙️
        </button>
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ConversationBox;
