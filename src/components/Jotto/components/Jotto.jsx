import React, { useEffect } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';
import { useSelector } from 'react-redux';

export const Jotto = () => {
  const success = useSelector(state => state.successReducer.success);
  const secretWord = useSelector(state => state.secretWordReducer.secretWord);
  const guessedWords = useSelector(state => state.guessedWordsReducer.guessedWords);

  useEffect(() => {
    getSecretWord();
  }, []);

  return (
    <div data-test={'jotto-app'}>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};