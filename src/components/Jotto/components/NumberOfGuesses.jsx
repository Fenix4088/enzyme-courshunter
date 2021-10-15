import PropTypes from 'prop-types';
import React from 'react';

export const NumberOfGuesses = (props) => {
  return (
    <div className={'bg-info'} data-test={'number-wrapper'}>
      {props.numberOfGuesses ? `Number of guesses: ${props.numberOfGuesses}` :
        'Please, guess the word...'}
    </div>
  );
};

NumberOfGuesses.propTypes = {
  numberOfGuesses: PropTypes.number.isRequired,
};