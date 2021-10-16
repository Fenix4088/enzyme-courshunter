import React, { useEffect, useState } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';

export const Jotto = () => {
  const [secretWord, setSecretWord] = useState('');

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  const [jottoState, setJottoState] = useState({
    success: false,
    guessedWords: [],
  });

  const { success, guessedWords } = jottoState;

  return (
    <div data-test={'jotto-app'}>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} success={success} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};