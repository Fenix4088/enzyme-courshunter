import React from 'react';
import { findByTestAttr, storeFactory } from '../../../utils/utilsForTesting';
import Input from '../components/Input';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

// ? This mock section if you want to import your react hooks and destructure them
// ? while importing like => import React, {useState} from 'react';
// const mockSetCurrentGuess = jest.fn();
//
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess],
// }));

const setup = (initialState = {}, secretWord = 'party') => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input secretWord={'party'} />
    </Provider>,
  );
};

describe('Input comp', () => {

  describe('render', () => {
    describe('success is true', () => {

      let wrapper;
      beforeEach(() => {
        wrapper = setup({ successReducer: {success: true} });
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
        wrapper = setup({ successReducer: {success: false} });
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
      wrapper = setup({ successReducer: {success: false} });
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