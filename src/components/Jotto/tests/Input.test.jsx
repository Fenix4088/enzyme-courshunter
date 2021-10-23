import React from 'react';
import { findByTestAttr } from '../../../utils/utilsForTesting';
import Input from '../components/Input';
import { mount } from 'enzyme';
import languageContext from '../../../contexts/languageContext';
import { SuccessProvider } from '../../../contexts/successContext';
import { GuessedWordsProvider } from '../../../contexts/guessedWordContex';

// ? This mock section if you want to import your react hooks and destructure them
// ? while importing like => import React, {useState} from 'react';
// const mockSetCurrentGuess = jest.fn();
//
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

const setUp = ({ success, language, secretWord }) => {
  success = success || false;
  language = language || 'en';
  secretWord = secretWord || 'party';
  return mount(
    <languageContext.Provider value={language}>
      <GuessedWordsProvider value={[[], jest.fn()]}>
        <SuccessProvider value={[success, jest.fn()]}>
          <Input secretWord={secretWord} />
        </SuccessProvider>
      </GuessedWordsProvider>
    </languageContext.Provider>,
  );
};

describe('Input comp', () => {

  describe('languagePicker', () => {

    it('should correct renders submit btn on english', () => {
      const wrapper = setUp({ language: 'en' });
      const submitBtn = findByTestAttr(wrapper, 'submit-button');

      expect(submitBtn.text()).toBe('Submit');
    });

    it('should correct renders submit btn on emoji', () => {
      const wrapper = setUp({ language: 'emoji' });
      const submitBtn = findByTestAttr(wrapper, 'submit-button');

      expect(submitBtn.text()).toBe('🚀');
    });
  });

  describe('render', () => {
    describe('success is true', () => {

      let wrapper;
      beforeEach(() => {
        wrapper = setUp({ success: true });
      });

      it('should renders without errors', function() {
        const component = findByTestAttr(wrapper, 'component-input');

        expect(component.length).toBe(1);
      });

      it('input box should be hidden', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.exists()).toBeFalsy();
      });

      it('submit btn should be hidden', () => {
        const submitBtn = findByTestAttr(wrapper, 'submit-button');
        expect(submitBtn.exists()).toBeFalsy();
      });

    });

    describe('success is false', () => {
      let wrapper;
      beforeEach(() => {
        wrapper = setUp({ success: false });
      });

      it('input box should be hidden', () => {
        const inputBox = findByTestAttr(wrapper, 'input-box');
        expect(inputBox.exists()).toBeTruthy();
      });

      it('submit btn should be hidden', () => {
        const submitBtn = findByTestAttr(wrapper, 'submit-button');
        expect(submitBtn.exists()).toBeTruthy();
      });

    });
  });

  describe('state controlled input field', () => {
    let wrapper;
    let mockEvent;
    let mockSetCurrentGuess = jest.fn();
    let originalState;

    beforeEach(() => {
      mockSetCurrentGuess.mockClear();

      mockEvent = { target: { value: 'train' } };
      originalState = React.useState;
      React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
      wrapper = setUp({ secretWord: 'party' });
    });

    afterEach(() => {
      React.useState = originalState;
    });

    it('state updates with value of input box upon change', () => {
      //? const mockSetCurrentGuess = jest.fn(); // her you mock a jest if your imports inside components are like => React.useState
      //? React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

      const inputBox = findByTestAttr(wrapper, 'input-box');

      inputBox.simulate('change', mockEvent);

      expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
    });

    it('should clear state if submit btn was clicked', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');

      inputBox.simulate('change', mockEvent);

      const submitBtn = findByTestAttr(wrapper, 'submit-button');
      submitBtn.simulate('click', {
        preventDefault: () => {
        },
      });

      expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
  });

});