import React from 'react';
import './App.css';
import { ClickCounter } from "./components/ClickCounter/ClickCounter";
import { Jotto } from './components/Jotto/components/Jotto';

function App() {

  return (
    <div>
      <ClickCounter/>
      <Jotto/>
    </div>
  );
}

export default App;