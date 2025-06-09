import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const useStyle = () => useContext(StyleContext);

export const StyleProvider = ({ children }) => {
  const [style, setStyle] = useState('formal');

  const toggleStyle = () => {
    setStyle((prev) => (prev === 'formal' ? 'scifi' : 'formal'));
  };

  return (
    <StyleContext.Provider value={{ style, toggleStyle }}>
      {children}
    </StyleContext.Provider>
  );
};
