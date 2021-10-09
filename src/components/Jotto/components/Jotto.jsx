import React, { useState } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';

export const Jotto = (props) => {
  const { success, secretWord, guessedWords } = props;

  return (
    <div>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} success={success} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};