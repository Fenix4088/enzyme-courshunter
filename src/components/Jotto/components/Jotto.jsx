import React, { useEffect } from 'react';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input';
import { getSecretWord } from '../../../actions';
import { Spinner } from './Spinner';
import languageContext from '../../../contexts/languageContext';
import LanguagePicker from './LanguagePicker';
import { SuccessProvider } from '../../../contexts/successContext';


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
    case 'setLanguage':
      return { ...state, language: action.payload };
    default:
      return state;
  }
};


export const Jotto = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en',
  });

  const setSecretWord = (secretWord) => dispatch({ type: 'setSecretWord', payload: secretWord });
  const setLanguage = (language) => dispatch({ type: 'setLanguage', payload: language });

  useEffect(() => {
    getSecretWord(setSecretWord);
  }, []);

  const { secretWord, language } = state;
  return (
    <>
      {
        secretWord ? (<div data-test={'jotto-app'}>
          <h1>Jotto</h1>
          <languageContext.Provider value={language}>
            <LanguagePicker setLanguage={setLanguage}/>
            <SuccessProvider>
              <Congrats/>
            </SuccessProvider>
            <Input secretWord={secretWord} success={false} />
            <GuessedWords guessedWords={[]} />
          </languageContext.Provider>
        </div>) : <Spinner />
      }
    </>
  );
};

