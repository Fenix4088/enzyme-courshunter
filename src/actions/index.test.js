import moxios from 'moxios';
import { getSecretWord } from './index';
import { storeFactory } from '../utils/utilsForTesting';

// describe('correctGuess', () => {
//   it('should return and object with type `CORRECT_GUESS`', () => {
//     const action = correctGuess();
//     expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS });
//   });
// })

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should return secret word from a func', () => {
    const store = storeFactory();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      });
    });

    return store.dispatch(getSecretWord()).then(() => {
      const { secretWord } = store.getState().secretWordReducer;
      expect(secretWord).toBe('party');
    });
  });

  describe('updates server error state', () => {
    it('when server returns status 4xx', () => {
      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
          // response: {message: 'User error'}
        })
      })

      return store.dispatch(getSecretWord()).then(() => {
        expect(store.getState().serverErrorReducer.isServerError).toBeTruthy();
        expect(store.getState().serverErrorReducer.message.length).toBeGreaterThan(0);
      })
    });

    it('when server returns status 5xx', () => {
      const store = storeFactory();

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500
        })
      })

      return store.dispatch(getSecretWord()).then(() => {
        expect(store.getState().serverErrorReducer.isServerError).toBeTruthy();
        expect(store.getState().serverErrorReducer.message.length).toBeGreaterThan(0);
      })

    })
  })
});