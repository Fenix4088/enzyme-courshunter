import React, {useState} from "react";

export const ClickCounter = () => {
    const [count, setCount] = useState(0);
    const [error, setError] = useState(false);

    const inc = () => {
        setCount(count + 1)
        setError(false);

    }
    const dec = () => {
        count > 0 && setCount(count - 1)
        count === 0 && setError(true);
    }

    return (
        <div data-test="component-app" className="App">
            <h1 data-test="counter-display">
                The counter is currently&nbsp;
                <span data-test="count">{count}</span>
            </h1>
            <button
                data-test="increment-button"
                onClick={inc}
            >
                Increment counter
            </button>
            <button
                data-test="decrement-button"
                onClick={dec}
            >
                Decrement counter
            </button>
            {error && <div data-test={'error-message'} style={{color: 'red'}}>Error counter couldn't be less then 0</div>}
        </div>
    );
};