import { storeFactory } from '../../../utils/utilsForTesting';
import { guessWord } from '../../../actions';

describe('guessWord action dispatcher', () => {
  const secretWord = 'party';
  const unsuccessfulGuess = 'train';


  describe('no guessed words', () => {

    let store;
    let initialState = { secretWordReducer: { secretWord } };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('should update state correctly for unsuccessful guess', () => {
      store.dispatch(guessWord({ guessWord: unsuccessfulGuess, letterMatchCount: 3 }));

      const expectedState = {
        successReducer: {
          success: false,
        },
        guessedWordsReducer: {
          guessedWords: [{ guessWord: unsuccessfulGuess, letterMatchCount: 3 }],
        },
        ...initialState,
      };

      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });

    it('should update state correctly for successful guess', () => {

    });
  });

  describe('some guessed words', () => {

    it('should update state correctly for unsuccessful guess', () => {

    });

    it('should update state correctly for successful guess', () => {

    });
  });
});
