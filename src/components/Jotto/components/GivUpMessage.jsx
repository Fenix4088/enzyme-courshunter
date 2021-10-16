import PropTypes from 'prop-types';
import React from 'react';

export const GivUpMessage = (props) => {
  if (props.giveUp) {
    return <div data-test={'give-up-message'} className={'alert alert-danger'}>
      The secret word was <b data-test={'give-up-message-content'}>"{props.secretWord}"</b><br />
      Better luck next time!
    </div>;
  } else {
    return <></>;
  }
};


GivUpMessage.propTypes = {
  giveUp: PropTypes.bool.isRequired,
  secretWord: PropTypes.string.isRequired,
};