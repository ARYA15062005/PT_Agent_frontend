import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { StyleProvider } from './contexts/StyleContext';
import ChatPage from './pages/ChatPage';

const App = () => {
  return (
    <ThemeProvider>
      <StyleProvider>
        <ChatPage />
      </StyleProvider>
    </ThemeProvider>
  );
};

export default App;
