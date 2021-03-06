import React from 'react';
import PropTypes from 'prop-types';
import { getLetterMatchCount } from '../../../helpers/helpers';


function Input({ success, secretWord }) {
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
          placeholder='enter guess'
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
          Submit
        </button>
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired
};
export default Input;