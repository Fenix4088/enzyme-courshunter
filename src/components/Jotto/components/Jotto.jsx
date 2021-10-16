import React, { useEffect } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';
import { Spinner } from './Spinner';

/**
 *
 * @param {object} state
 * @param {string} state.secretWord
 * @param {object} action
 * @param {string} action.type
 * @param {any} action.payload
 * @returns {object}
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload };
    default:
      return state;
  }
};


export const Jotto = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
  });

  const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  const { secretWord } = state;


  return (
    <>
      {
        secretWord ? (<div data-test={'jotto-app'}>
          <h1>Jotto</h1>
          <Congrats success={false} />
          <Input secretWord={secretWord} success={false} />
          <GuessedWords guessedWords={[]} />
        </div>) : <Spinner />
      }
    </>
  );
};

