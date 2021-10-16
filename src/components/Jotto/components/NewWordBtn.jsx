import { useDispatch } from 'react-redux';
import { getSecretWord, resetGuessedWords, resetSuccessStatus, setGiveUp } from '../../../actions';
import React from 'react';

export const NewWordBtn = () => {
  const dispatch = useDispatch();
  const resetGame = () => {
    dispatch(getSecretWord());
    dispatch(resetGuessedWords());
    dispatch(resetSuccessStatus());
    dispatch(setGiveUp(false));
  };

  return (
    <button data-test={'reset-game'} className={'btn btn-primary'} onClick={resetGame}>New word</button>
  );
};