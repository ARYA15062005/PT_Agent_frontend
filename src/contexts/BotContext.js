import React, { createContext, useContext, useState } from 'react';

const BotContext = createContext();

export const BotProvider = ({ children }) => {
  const [bot, setBot] = useState('gemini'); // gemini or groq

  return (
    <BotContext.Provider value={{ bot, setBot }}>
      {children}
    </BotContext.Provider>
  );
};

export const useBot = () => useContext(BotContext);
