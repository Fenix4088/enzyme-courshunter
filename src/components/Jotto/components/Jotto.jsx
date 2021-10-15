import React, { useEffect } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';

export const Jotto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, [dispatch]);

  const success = useSelector(state => state.successReducer.success);
  const secretWord = useSelector(state => state.secretWordReducer.secretWord);
  const guessedWords = useSelector(state => state.guessedWordsReducer.guessedWords);


  return (
    <div data-test={'jotto-app'}>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
};