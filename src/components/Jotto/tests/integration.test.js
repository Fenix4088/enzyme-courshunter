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
      const guess = { guessedWord: unsuccessfulGuess, letterMatchCount: 3 };
      store.dispatch(guessWord(unsuccessfulGuess));

      const expectedState = {
        successReducer: {
          success: false,
        },
        guessedWordsReducer: {
          guessedWords: [guess],
        },
        ...initialState,
      };

      const newState = store.getState();

      expect(newState).toEqual(expectedState);
    });

    it('should update state correctly for successful guess', () => {
      const guess = { guessedWord: secretWord, letterMatchCount: 5 };
      store.dispatch(guessWord(secretWord));

      const newState = store.getState();
      const expectedState = {
        successReducer: {
          success: true,
        },
        guessedWordsReducer: {
          guessedWords: [guess],
        },
        ...initialState,
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe('some guessed words', () => {
    const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
    const initialState = {
      secretWordReducer: { secretWord },
      guessedWordsReducer: {
        guessedWords,
      },
    };

    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    });


    it('should update state correctly for unsuccessful guess', () => {
      const guess = { guessedWord: unsuccessfulGuess, letterMatchCount: 3 };
      store.dispatch(guessWord(unsuccessfulGuess));

      const expectedState = {
        secretWordReducer: {
          secretWord,
        },
        successReducer: {
          success: false,
        },
        guessedWordsReducer: {
          guessedWords: [...guessedWords, guess],
        },
      };

      const newState = store.getState();
      expect(newState).toEqual(expectedState);
    });

    it('should update state correctly for successful guess', () => {
      const guess = { guessedWord: secretWord, letterMatchCount: 5 };
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();
      const expectedState = {
        secretWordReducer: {
          secretWord,
        },
        successReducer: {
          success: true,
        },
        guessedWordsReducer: {
          guessedWords: [
            ...guessedWords,
            guess,
          ],
        },
      };

      expect(newState).toEqual(expectedState);
    });
  });
});