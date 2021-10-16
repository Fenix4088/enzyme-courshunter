import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Jotto } from '../components/Jotto';
import { findByTestAttr, storeFactory } from '../../../utils/utilsForTesting';

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);

  return mount(<Provider store={store}><Jotto /></Provider>);
};


describe('GiveUp', () => {

  describe('GiveUp is hidden', () => {
    let wrapper;
    const initialState = {
      successReducer: { success: false },
      giveUpReducer: { giveUp: false },
      secretWordReducer: { secretWord: 'party' },
      guessedWordsReducer: {
        guessedWords: [],
      },
    };

    beforeEach(() => {
      wrapper = setUp(initialState);
    });

    it('GiveUp btn should be hidden if no guesses in a table', () => {
      const giveUpBtn = findByTestAttr(wrapper, 'give-up-btn');

      expect(giveUpBtn).toHaveLength(0);

    });

    it('GiveUp message should be hidden if no guesses in a table', () => {
      const giveUpMessage = findByTestAttr(wrapper, 'give-up-message');

      expect(giveUpMessage).toHaveLength(0);
    });

  });

  describe('GiveUp is visible if some guessed words', () => {
    const initialState = {
      successReducer: { success: false },
      giveUpReducer: { giveUp: false },
      secretWordReducer: { secretWord: 'party' },
      guessedWordsReducer: {
        guessedWords: [
          { guessedWord: 'pappy', letterMatchCount: 3 },
        ],
      },
    };

    it('GiveUp btn should be visible if some guesses in a table', () => {
      const wrapper = setUp(initialState);
      const giveUpBtn = findByTestAttr(wrapper, 'give-up-btn');

      expect(giveUpBtn).toHaveLength(1);

    });

  });

  describe('GiveUp message visible if btn was clicked', () => {
    let wrapper;
    const initialState = {
      successReducer: { success: false },
      giveUpReducer: { giveUp: true },
      secretWordReducer: { secretWord: 'party' },
      guessedWordsReducer: {
        guessedWords: [
          { guessedWord: 'pappy', letterMatchCount: 3 },
        ],
      },
    };

    beforeEach(() => {
      wrapper = setUp(initialState);
    });

    it('GiveUp message should be visible if giveUp status is true', () => {
      const giveUpMessage = findByTestAttr(wrapper, 'give-up-message');

      expect(giveUpMessage).toHaveLength(1);
      expect(giveUpMessage.text().length).toBeGreaterThan(0);
    });

    it('GiveUp btn should be hidden', () => {
      const giveUpBtn = findByTestAttr(wrapper, 'give-up-btn');

      expect(giveUpBtn).toHaveLength(0);
    });

    it('GiveUp message displayed word should be equal to secretWord', () => {
      const giveUpMessageContent = findByTestAttr(wrapper, 'give-up-message-content');

      expect(giveUpMessageContent.text()).toStrictEqual(`"${initialState.secretWordReducer.secretWord}"`);
    });


  });

  describe('GiveUp message should be visible after giveUp btn click', () => {
    const initialState = {
      successReducer: { success: false },
      giveUpReducer: { giveUp: false },
      secretWordReducer: { secretWord: 'party' },
      guessedWordsReducer: {
        guessedWords: [
          { guessedWord: 'pappy', letterMatchCount: 3 },
        ],
      },
    };
    const wrapper = setUp(initialState);

    const giveUpBtn = findByTestAttr(wrapper, 'give-up-btn');
    giveUpBtn.simulate('click', {
      preventDefault: () => {
      },
    });

    const giveUpMessage = findByTestAttr(wrapper, 'give-up-message');

    expect(giveUpMessage).toHaveLength(1);


  });
});
