import moxios from 'moxios';
import { actionTypes, correctGuess, getSecretWord } from './index';

describe('correctGuess', () => {
  it('should return and object with type `CORRECT_GUESS`', () => {
    const action = correctGuess();
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
  });
})

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall();
  })

  it('should return secret word from a func', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      })
    });

    return getSecretWord().then(secretWord => {
      expect(secretWord).toBe('party');
    });
  });
})