import { findByTestAttr, storeFactory } from '../../../utils/utilsForTesting';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Jotto } from '../components/Jotto';
import { getSecretWord, resetGuessedWords, resetSuccessStatus } from '../../../actions';

const setUpJottoApp = (initialState = {}) => {
  const store = storeFactory(initialState);
  return mount(<Provider store={store}><Jotto/></Provider>)
}


describe('NewWordBtn', () => {

  describe('should render correctly', () => {
    let app;

    it('should be visible if guess was successful', () => {
      app = setUpJottoApp({successReducer: {success: true}})
      const newWordBtn = findByTestAttr(app, 'reset-game');

      expect(newWordBtn).toHaveLength(1);
    });

    it('should no be visible if guess was unsuccessful', () => {
      app = setUpJottoApp({successReducer: {success: false}})
      const newWordBtn = findByTestAttr(app, 'reset-game');

      expect(newWordBtn).toHaveLength(0);
    });
  });

  describe('should reset game correctly', () => {
    const initialState = {
      successReducer: {success: true},
      secretWordReducer: {secretWord: 'party'},
      guessedWordsReducer: {
        guessedWords: [
          {guessedWord: 'pappy', letterMatchCount: 3},
          {guessedWord: 'elephant', letterMatchCount: 3},
          {guessedWord: 'party', letterMatchCount: 5},
        ]
      }
    }
    let app;

    beforeEach(() => {
      app = setUpJottoApp(initialState)
      const newWordBtn = findByTestAttr(app, 'reset-game');
      newWordBtn.simulate('click');
    });

    it('congrats should be visible', () => {
        const congrates = findByTestAttr(app, 'component-congrats');

        expect(congrates).toHaveLength(1)
    })

    it('guessed instruction should be visible', () => {
        const guessInstructions = findByTestAttr(app, 'guess-instructions');

        expect(guessInstructions).toHaveLength(1)
    })

  })

  describe('should clear store correctly', () => {
    const initialState = {
      successReducer: {success: true},
      secretWordReducer: {secretWord: 'baby'},
      guessedWordsReducer: {
        guessedWords: [
          {guessedWord: 'pappy', letterMatchCount: 3},
          {guessedWord: 'elephant', letterMatchCount: 3},
          {guessedWord: 'baby', letterMatchCount: 5},
        ]
      },
      giveUpReducer: {
        giveUp: false,
      },
    }
    let store;
    let expectedState;
    beforeEach(() => {
      store = storeFactory(initialState);
    });

    it('should change success status', () => {
      expectedState = {
        ...initialState,
        successReducer: {
          success: false
        }
      }
      store.dispatch(resetSuccessStatus());

      expect(store.getState()).toEqual(expectedState);
    });
    it('should clear guessedWords array', () => {
      expectedState = {
        ...initialState,
        guessedWordsReducer: {
          guessedWords: []
        }
      }
      store.dispatch(resetGuessedWords());
      expect(store.getState()).toEqual(expectedState);
    });
    it('should change secret word', () => {
      expectedState = {
        ...initialState,
        secretWordReducer: {
          secretWord: 'party'
        }
      }
      store.dispatch(getSecretWord());

      const {secretWord} = store.getState().secretWordReducer;
      expect(secretWord).not.toBe(expectedState.secretWordReducer.secretWord);
    });
  })

})