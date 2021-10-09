import { findByTestAttr, setUp } from '../../../utils/utilsForTesting';
import GuessedWords from '../components/GuessedWords';

const defaultProps = {
  guessedWords: [
    {
      guessedWord: 'train',
      letterMatchCount: 3,
    },
  ],
};

describe('GuessedWords component', () => {

  describe('if there are no words guessed', () => {

    let wrapper;

    beforeEach(() => {
      wrapper = setUp(GuessedWords, defaultProps, { guessedWords: [] });
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
      wrapper = setUp(GuessedWords, defaultProps, { guessedWords });
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

})
;