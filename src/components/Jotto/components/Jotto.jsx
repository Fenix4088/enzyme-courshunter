import React, { useEffect } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { NumberOfGuesses } from './NumberOfGuesses';
import { GivUpMessage } from './GivUpMessage';
import { NewWordBtn } from './NewWordBtn';

export const Jotto = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSecretWord());
  }, [dispatch]);

  const success = useSelector(state => state.successReducer.success);
  const secretWord = useSelector(state => state.secretWordReducer.secretWord);
  const guessedWords = useSelector(state => state.guessedWordsReducer.guessedWords);
  const giveUp = useSelector(state => state.giveUpReducer.giveUp);


  return (
    <div data-test={'jotto-app'}>
      <div>{secretWord}</div>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <GivUpMessage giveUp={giveUp} secretWord={secretWord} />
      {(success || giveUp) && <NewWordBtn />}
      <Input secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
      <NumberOfGuesses numberOfGuesses={guessedWords.length}/>
    </div>
  );
};


