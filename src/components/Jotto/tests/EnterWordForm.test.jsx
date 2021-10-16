import React, {useState as useStateMock} from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { EnterWordForm } from '../components/EnterWordForm';
import { findByTestAttr, storeFactory } from '../../../utils/utilsForTesting';
import { Jotto } from '../components/Jotto';

const mockSetValue = jest.fn();

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    // useState: (initialState) => [initialState, mockSetValue],
    useState: jest.fn(),
  };
});

const setUp = (initialState = {}, componentType = 'app') => {
  const store = storeFactory(initialState);
  return mount(<Provider store={store}>{componentType === 'app' ? <Jotto /> : <EnterWordForm/>}</Provider>);
};

describe('EnterWordForm', () => {

  it('should be hidden if game already started', () => {
    const initialState = {
      guessedWordsReducer: {
        guessedWords: [
          {guessedWord: 'pappy', letterMatchCount: 3}
        ]
      }
    }
    const wrapper = setUp(initialState);
    const enterSecretWordInput = findByTestAttr(wrapper, 'enter-secret-word-field');
    const enterSecretWordBtn = findByTestAttr(wrapper, 'enter-secret-word-btn');

    expect(enterSecretWordInput.exists()).toBeFalsy();
    expect(enterSecretWordBtn.exists()).toBeFalsy();
  });

  it('should be visible if game not started', () => {
    const initialState = {
      guessedWordsReducer: {
        guessedWords: []
      }
    }
    const wrapper = setUp(initialState);
    const enterSecretWordInput = findByTestAttr(wrapper, 'enter-secret-word-field');
    const enterSecretWordBtn = findByTestAttr(wrapper, 'enter-secret-word-btn');

    expect(enterSecretWordInput.exists()).toBeTruthy();
    expect(enterSecretWordBtn.exists()).toBeTruthy();
  });

  describe('should change state correctly', () => {
    let wrapper;
    let mockEvent;
    let mockSetValue = jest.fn();
    //* let originalState;

    beforeEach(() => {
      mockSetValue.mockClear();

      mockEvent = {currentTarget: {value: 'big'}}
      //* originalState = React.useState;
      //* React.useState = jest.fn(() => ['', mockSetValue]);
      useStateMock.mockImplementation(init => [init, mockSetValue])
      wrapper = setUp({}, 'EnterWorForm');
    });

    afterEach(() => {
      //* React.useState = originalState;
    })

    it('state updates with value of input box upon change', () => {

      const input = findByTestAttr(wrapper, 'enter-secret-word-field');
      input.prop('onChange')(mockEvent);

      expect(mockSetValue).toHaveBeenCalledWith('big')
    });

    it('should clear state after click submit btn', () => {

      const button = findByTestAttr(wrapper, 'enter-secret-word-btn');
      button.prop('onClick')({preventDefault: () => {}})

      expect(mockSetValue).toHaveBeenCalledWith('');
    });
    
  });


});