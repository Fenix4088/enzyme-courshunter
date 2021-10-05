import React from 'react';
import './App.css';
import { ClickCounter } from "./components/ClickCounter/ClickCounter";

function App() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <ClickCounter/>
    </div>
  );
}

export default App;