import React from 'react';

export const Spinner = () => {
  return (
    <div className={'container'} data-test={'spinner'}>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <p>Loading...</p>
    </div>

  );
};