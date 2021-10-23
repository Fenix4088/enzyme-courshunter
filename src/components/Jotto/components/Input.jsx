import React from 'react';
import PropTypes from 'prop-types';
import languageContext from '../../../contexts/languageContext';
import stringsModule from '../../../helpers/strings';
import { useSuccess } from '../../../contexts/successContext';
import { useGuessedWords } from '../../../contexts/guessedWordContex';
import { getLetterMatchCount } from '../../../helpers/helpers';

const { getStringByLanguage } = stringsModule;

function Input({ secretWord }) {
  const language = React.useContext(languageContext);
  const [success, setSuccess] = useSuccess();
  const [guessedWords, setGuessedWords] = useGuessedWords();
  const [currentGuess, setCurrentGuess] = React.useState('');

  if (success) {
    return <div data-test='component-input' />;
  }

  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          placeholder={getStringByLanguage(language, 'guessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test='submit-button'
          onClick={(evt) => {
            evt.preventDefault();
            // dispatch(guessWord(currentGuess));
            setGuessedWords(state => [...state, {
              guessedWord: currentGuess,
              letterMatchCount: getLetterMatchCount(secretWord, currentGuess),
            }]);
            if (currentGuess === secretWord) setSuccess(true);
            setCurrentGuess('');
          }}
          className='btn btn-primary mb-2'
        >
          {getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
};
export default Input;