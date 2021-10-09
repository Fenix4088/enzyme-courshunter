import App from './App';
import { findByTestAttr, setUp } from './utils/utilsForTesting';
import { getSecretWord as mockGetSecretWord } from './actions';

//activate global mock to make sure getSecretWord dosen't make network call
jest.mock('./actions');


describe('app', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(App);
  });

  it('renders without error', () => {
    const app = findByTestAttr(wrapper, 'component-app');
    expect(app).toHaveLength(1);
  });
});
