import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import languageContext from '../../../contexts/languageContext';

import stringsModule from '../../../helpers/strings';

const { getStringByLanguage } = stringsModule;

const GuessedWords = (props) => {
  const language = React.useContext(languageContext);

  let contents;
  if (props.guessedWords.length === 0) {
    contents = (
      <span data-test='guess-instructions'>
       {getStringByLanguage(language, 'guessPrompt')}
      </span>
    );
  } else {
    const guessedWordsRows = props.guessedWords.map((word, index) => (
      <tr data-test='guessed-word' key={index}>
        {/* Challenge #1: Number of Guesses */}
        <td data-test='guessed-word-index'>{index + 1}</td>
        {/* END: Challenge #1: Number of Guesses */}
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    ));
    contents = (
      <div data-test='guessed-words'>
        <h3>{getStringByLanguage(language, 'guessedWords')}</h3>
        <table className='table table-sm'>
          <thead className='thead-light'>
          <tr>
            {/* Challenge #1: Number of Guesses */}
            <th>#</th>
            {/* Challenge #1: Number of Guesses */}
            <th>{getStringByLanguage(language, 'guessColumnHeader')}</th>
            <th>{getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
          </tr>
          </thead>
          <tbody>
          {guessedWordsRows}
          </tbody>
        </table>
      </div>
    );
  }
  return (
    <div data-test='component-guessed-words'>
      {contents}
    </div>
  );
};

GuessedWords.propTypes = {
  guessedWords: PropTypes.arrayOf(
    PropTypes.shape({
      guessedWord: PropTypes.string.isRequired,
      letterMatchCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default GuessedWords;