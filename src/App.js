import React, { useState } from 'react';
import './App.css';
import { ClickCounter } from './components/ClickCounter/ClickCounter';
import { Jotto } from './components/Jotto/components/Jotto';

function App() {

  const [jottoState, setJottoState] = useState({
    success: false,
    secretWord: 'party',
    guessedWords: [],
  });

  return (
    <div data-test={'component-app'} className={'container'}>
      <ClickCounter state={jottoState} />
      <Jotto />
    </div>
  );
}

export default App;