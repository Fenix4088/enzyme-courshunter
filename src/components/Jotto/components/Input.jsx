import React from 'react';
import PropTypes from 'prop-types';
import languageContext from '../../../contexts/languageContext';
import stringsModule from '../../../helpers/strings';
import { useSuccess } from '../../../contexts/successContext';

const { getStringByLanguage } = stringsModule;

function Input({ secretWord }) {
  const language = React.useContext(languageContext);
  const [success] = useSuccess();
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