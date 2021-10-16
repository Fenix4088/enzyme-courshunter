import React from 'react';
import { useDispatch } from 'react-redux';
import { setGiveUp } from '../../../actions';

export const GiveUpBtn = () => {
  const dispatch = useDispatch();
  return (
    <button data-test={'give-up-btn'} className={'btn btn-danger'} onClick={(e) => {
      e.preventDefault();
      dispatch(setGiveUp(true));
    }}>Give up</button>
  );
};