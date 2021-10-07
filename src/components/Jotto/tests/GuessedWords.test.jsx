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

    it('should renders without errors', () => {
      const instruction = findByTestAttr(wrapper, 'guess-instructions');

      expect(instruction.length).toBe(1);
      expect(instruction.text().length).not.toBe(0);
    });
    it('should render instruction to guess a word', () => {

    });

  });

  describe('if there are words guessed', () => {
  });

});