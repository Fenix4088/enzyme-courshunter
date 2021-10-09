import React, { useState } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';

export const Jotto = () => {

  const [guessedWords, setGuessedWords] = useState([{ guessedWord: 'train', letterMatchCount: 3 }]);

  return (
    <div>
      <h1>Jotto</h1>
      <Congrats success={true} />
      <Input secretWord={'test'}/>
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};