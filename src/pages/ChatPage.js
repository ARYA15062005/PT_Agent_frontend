import React, { useState } from 'react';
import BotSelector from '../components/BotSelector';
import ConversationBox from '../components/ConversationBox';
import ThemeToggle from '../components/ThemeToggle';
import StyleToggle from '../components/StyleToggle';
import ExportConversation from '../components/ExportConversation';
import QuickReplies from '../components/QuickReplies';
import VoiceOutput from '../components/VoiceOutput';
import VoiceInput from '../components/VoiceInput'; // ✅ Voice input
import '../styles/App.css';

const ChatPage = () => {
  const [selectedBot, setSelectedBot] = useState('Gemini');
  const [messages, setMessages] = useState([]);
  const [botTyping, setBotTyping] = useState(false);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [sessionId] = useState(() => crypto.randomUUID());

  const handleSendMessage = async () => {
    if (!input.trim() && !file) return;

    const updatedMessages = [
      ...messages,
      {
        sender: 'user',
        text: input,
        fileUrl: file ? URL.createObjectURL(file) : null,
        fileType: file ? file.type : null,
      },
    ];

    setMessages(updatedMessages);
    setInput('');
    setBotTyping(true);

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadResponse = await fetch('http://localhost:5000/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadResult = await uploadResponse.json();
        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "File upload failed");
        }

        console.log("Uploaded and stored:", uploadResult);
        setFile(null); // clear file after upload
      }

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: input,
          bot: selectedBot,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.response) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);

        if (isSpeaking) {
          const utterance = new SpeechSynthesisUtterance(data.response);
          utterance.lang = 'en-US';
          speechSynthesis.cancel();
          speechSynthesis.speak(utterance);
        }
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: `❌ ${err.message}` }]);
    } finally {
      setBotTyping(false);
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleVoiceInputComplete = (transcript) => {
    setInput(transcript);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <div className={`app-container ${selectedBot.toLowerCase()}-mode`}>
      <aside className="sidebar">
        <h1 className="sidebar-title">ChoiceBot</h1>
        <BotSelector onSelectBot={setSelectedBot} selectedBot={selectedBot} />
        <ThemeToggle />
        <StyleToggle />
        <VoiceOutput
          isToggleButton
          isSpeaking={isSpeaking}
          onClick={() => setIsSpeaking(!isSpeaking)}
        />
      </aside>

      <main className="chat-container">
        <ConversationBox
          messages={messages}
          onSendMessage={handleSendMessage}
          botTyping={botTyping}
          input={input}
          setInput={setInput}
          onFileUpload={handleFileUpload}
          onVoiceInputComplete={handleVoiceInputComplete}
        />
        <VoiceInput onTranscriptComplete={handleVoiceInputComplete} />
        <QuickReplies
          onReplyClick={(msg) => {
            setInput(msg);
            setTimeout(() => handleSendMessage(), 100);
          }}
        />
        <ExportConversation messages={messages} />
      </main>
    </div>
  );
};

export default ChatPage;
