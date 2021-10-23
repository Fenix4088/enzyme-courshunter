import React, { useContext } from 'react';

export const guessedWordContext = React.createContext();

export const useGuessedWords = () => {
  const context = useContext(guessedWordContext);

  if(!context) {
    throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
  }

  return context;
}

export const GuessedWordsProvider = (props) => {
  const [guessedWords, setGuessedWords] = React.useState([]);

  const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]);


  return <guessedWordContext.Provider value={value} {...props}/>
}