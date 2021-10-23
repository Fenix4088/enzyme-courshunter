import React from 'react';
import languageContext from '../../../contexts/languageContext';
import stringsModule from '../../../helpers/strings';
import { useSuccess } from '../../../contexts/successContext';

const {getStringByLanguage} = stringsModule;

const Congrats = () => {
  const language = React.useContext(languageContext);
  const [success] = useSuccess();

  if (success) {
    return (
      <div data-test="component-congrats" className="alert alert-success">
        <span data-test="congrats-message">
          {getStringByLanguage(language, 'congrats')}
        </span>
      </div>
    );
  } else {
    return (
      <div data-test="component-congrats" />
    );
  }
};


export default Congrats;