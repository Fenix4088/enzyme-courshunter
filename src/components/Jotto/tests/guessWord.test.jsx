import React from 'react';
import { mount } from 'enzyme';
import { Jotto } from '../components/Jotto';
import { findByTestAttr } from '../../../utils/utilsForTesting';


//! THIS IS NOT UNIT BUT FUNCTIONAL TEST BECAUSE WE MOUNT WHOLE COMPONENT

const setUp = (state = {}) => {
  const wrapper = mount(<Jotto {...state} />);

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

describe.skip('no words guessed', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = setUp({ secretWord: 'party', success: false, guessedWords: [] });
  });

  it('should creates GuessedWords table with 1 row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows).toHaveLength(1);
  });

});

describe.skip('some words guessed', () => {
  let wrapper;
  let guessedWords = [
    {
      guessedWord: 'agile',
      letterMatchCount: 1,
    },
  ];
  beforeEach(() => {
    wrapper = setUp({
      secretWord: 'party',
      success: false,
      guessedWords: guessedWords,
    });
  });

  it('should creates GuessedWords table with two rows', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows.length).toStrictEqual(guessedWords.length);

  });

  it('should input box and submit btn to be visible', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const submitBtn = findByTestAttr(wrapper, 'submit-button');

    expect(inputBox).toHaveLength(1);
    expect(submitBtn).toHaveLength(1);
  });

});

describe.skip('guess secret word', () => {
  let wrapper;
  let guessedWords = [
    {
      guessedWord: 'agile',
      letterMatchCount: 1,
    },
  ];

  beforeEach(() => {
    wrapper = setUp({
      secretWord: 'party',
      success: false,
      guessedWords: guessedWords,
    });

    // add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'party' }});

    //simulate click on submit btn
    const submitBtn = findByTestAttr(wrapper, 'submit-button');
    submitBtn.simulate('click', {
      preventDefault: () => {}
    })
  });

  it('should add word to guessed table', () => {
    const guessedRows = findByTestAttr(wrapper, 'guessed-words');
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