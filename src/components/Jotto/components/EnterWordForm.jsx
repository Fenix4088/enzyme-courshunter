import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { setCustomSecretWord } from '../../../actions';

export const EnterWordForm = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const onInputChange = (e) => setValue(e.currentTarget.value);
  const onBtnClick = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    dispatch(setCustomSecretWord(value));
    setValue('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <div className='input-group mb-3' style={{ marginBottom: '10px' }}>
        <input value={value} type='text' className='form-control' aria-label='Default'
               aria-describedby='inputGroup-sizing-default' onChange={onInputChange} />
      </div>
      <button className='btn btn-primary mb-2' onClick={onBtnClick}>Set custom word</button>
    </div>
  );
};