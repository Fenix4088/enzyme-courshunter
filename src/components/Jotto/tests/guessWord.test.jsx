import React from 'react';
import { mount } from 'enzyme';
import { Jotto } from '../components/Jotto';
import { findByTestAttr, storeFactory } from '../../../utils/utilsForTesting';
import { Provider } from 'react-redux';
import { logDOM } from '@testing-library/react';


//! THIS IS NOT UNIT BUT FUNCTIONAL TEST BECAUSE WE MOUNT WHOLE COMPONENT
jest.mock('../../../actions');

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(<Provider store={store}><Jotto /></Provider>);

  //add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  //simulate submit button click
  const submitBtn = findByTestAttr(wrapper, 'submit-button');
  submitBtn.simulate('click', {
    preventDefault: () => {
    },
  });

  return wrapper;
};

describe('no words guessed', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = setUp({
      secretWordReducer: { secretWord: 'party' },
      successReducer: { success: false },
      guessedWordsReducer: { guessedWords: [] },
    });
  });

  it('should creates GuessedWords table with 1 row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows).toHaveLength(1);
  });

});

describe('some words guessed', () => {
  let wrapper;
  let guessedWords = [
    {
      guessedWord: 'agile',
      letterMatchCount: 1,
    },
  ];
  beforeEach(() => {
    wrapper = setUp({
      secretWordReducer: { secretWord: 'party' },
      successReducer: { success: false },
      guessedWordsReducer: { guessedWords },
    });
  });

  it('should creates GuessedWords table with two rows', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows.length).toStrictEqual(2);
  });

  it('should input box and submit btn to be visible', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const submitBtn = findByTestAttr(wrapper, 'submit-button');

    expect(inputBox).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  });

});

describe('guess secret word', () => {
  let wrapper;
  let guessedWords = [
    {
      guessedWord: 'agile',
      letterMatchCount: 1,
    },
  ];

  beforeEach(() => {
    wrapper = setUp({
      secretWordReducer: { secretWord: 'party' },
      successReducer: { success: false },
      guessedWordsReducer: { guessedWords },
    });

    // add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'party' } });

    //simulate click on submit btn
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    submitBtn.simulate('click', {
      preventDefault: () => {
      },
    });
  });

  it('should add word to guessed table', () => {
    const guessedRows = findByTestAttr(wrapper, 'guessed-word');
    expect(guessedRows).toHaveLength(3);
  });

  it('should displayed congrats components', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats');
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  it('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox).toHaveLength(0);
  });

});