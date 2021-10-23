import React from 'react';
// import React, {useContext as mockUseContext} from 'react'; //! without destructuring
import { findByTestAttr } from '../../../utils/utilsForTesting';
import GuessedWords from '../components/GuessedWords';
import { shallow } from 'enzyme';
import { useGuessedWords} from '../../../contexts/guessedWordContex';

const defaultProps = {
  guessedWords: [
    {
      guessedWord: 'train',
      letterMatchCount: 3,
    },
  ],
};

jest.mock('../../../contexts/guessedWordContex', () => {
  return {
    ...jest.requireActual('../../../contexts/guessedWordContex'),
    useGuessedWords: jest.fn()
  }
})

const setUp = (guessedWords = []) => {
  useGuessedWords.mockReturnValue([guessedWords, jest.fn()])
  return shallow(<GuessedWords/>);
}
//! without destructuring
// jest.mock('react', () => {
//   return {
//     ...jest.requireActual('react'),
//     useContext: jest.fn().mockReturnValueOnce('en').mockReturnValueOnce('emoji')
//   }
// });

describe('GuessedWords component', () => {

  describe('if there are no words guessed', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setUp([]);
    });

    it('if there no words guessed', () => {
      const component = findByTestAttr(wrapper, 'component-guessed-words');

      expect(component.length).toBe(1);
    });

    it('should render instruction to guess a word', () => {
      const instruction = findByTestAttr(wrapper, 'guess-instructions');

      expect(instruction.length).toBe(1);
      expect(instruction.text().length).not.toBe(0);
    });


  });

  describe('if there are words guessed', () => {

    const guessedWords = [
      {
        guessedWord: 'train',
        letterMatchCount: 3,
      }, {
        guessedWord: 'agile',
        letterMatchCount: 1,
      }, {
        guessedWord: 'party',
        letterMatchCount: 5,
      },
    ];

    let wrapper;
    beforeEach(() => {
      wrapper = setUp(guessedWords);
    });

    it('renders "guessed words" section', () => {
      const guessedWordsSection = findByTestAttr(wrapper, 'guessed-words');

      expect(guessedWordsSection.length).toBe(1);
    });

    it('correct number of guessed words', () => {
      const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');

      expect(guessedWordsNodes.length).toEqual(guessedWords.length);
    });
  });

  describe('languagePicker', () => {
    // ? In this case we MOCK useContext hook in contrast to Input.test.js
    // ? in Input.test.js we used an Provider pattern (mount component wrapped into Provide)
    // ? Here we make a shallow copy of the component it is make test more isolated, but in this case
    // ? we should to mock a useContext hook with a returned value

    //! without destructuring
    // afterEach(() => {
    //   mockUseContext.mockClear();
    // })

    it('should correctly renders guess instructions in English by default', () => {
      //! mockUseContext.mockReturnValue('en'); // without destructuring
      const wrapper = setUp([]);
      const guessInstruction = findByTestAttr(wrapper, 'guess-instructions');

      expect(guessInstruction.text()).toBe('Try to guess the secret word!');
    });

    it('should correctly renders guess instructions in emoji by default', () => {
      //! mockUseContext.mockReturnValue('emoji'); // without destructuring

      const mockUseContext = jest.fn().mockReturnValue('emoji');
      React.useContext = mockUseContext;

      const wrapper = setUp([]);

      const guessInstruction = findByTestAttr(wrapper, 'guess-instructions');

      expect(guessInstruction.text()).toBe('🤔🤫🔤')
    });
  })
})
;