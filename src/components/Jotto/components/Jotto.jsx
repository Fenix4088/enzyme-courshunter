import React, { useEffect, useState } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';

export const Jotto = () => {

  useEffect(() => {
    getSecretWord();
  }, []);

  const [jottoState, setJottoState] = useState({
    success: false,
    secretWord: 'party',
    guessedWords: [],
  });

  const { success, secretWord, guessedWords } = jottoState;

  return (
    <div data-test={'jotto-app'}>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};