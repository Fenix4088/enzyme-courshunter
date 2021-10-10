import React, { useState } from 'react';
import './App.css';
import { ClickCounter } from './components/ClickCounter/ClickCounter';
import { Jotto } from './components/Jotto/components/Jotto';

function App() {

  return (
    <div data-test={'component-app'} className={'container'}>
      <ClickCounter  />
      <Jotto/>
    </div>
  );
}

export default App;