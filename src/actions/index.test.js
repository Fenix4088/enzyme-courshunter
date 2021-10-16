import moxios from 'moxios';
import { getSecretWord } from './index';

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall();
  })

  it('should return secret word from a func', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: 'party',
      })
    });

    const setSecretWordMock = jest.fn();

    await getSecretWord(setSecretWordMock);
    expect(setSecretWordMock).toHaveBeenCalledWith('party')
  });
})