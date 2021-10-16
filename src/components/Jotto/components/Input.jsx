import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { guessWord } from '../../../actions';
import { GiveUpBtn } from './GiveUpBtn';


function Input({ secretWord }) {
  const dispatch = useDispatch();
  const [currentGuess, setCurrentGuess] = React.useState('');
  const success = useSelector(state => state.successReducer.success);
  const giveUp = useSelector(state => state.giveUpReducer.giveUp);
  const guessedWords = useSelector(state => state.guessedWordsReducer.guessedWords);

  const clickHandler = (e) => {
    e.preventDefault();

    setCurrentGuess('');
    if (!currentGuess.trim()) return;
    dispatch(guessWord(currentGuess));
  };


  if (success) {
    return <div data-test='component-input' />;
  }

  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        {!giveUp && <>
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
            onClick={clickHandler}
            className='btn btn-primary mb-2'
          >
            Submit
          </button>

          {!success && guessedWords.length > 0 && <GiveUpBtn />}
        </>}
      </form>
    </div>
  );
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
  // success: PropTypes.bool.isRequired
};
export default Input;

