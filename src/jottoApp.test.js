import {findByTestAttr, storeFactory} from './utils/utilsForTesting';
import { mount } from 'enzyme';
import { getSecretWord as mockGetSecretWord } from './actions';
import { Jotto } from './components/Jotto/components/Jotto';
import {Provider} from "react-redux";

//activate global mock to make sure getSecretWord dosen't make network call
jest.mock('./actions');

const setUp = (initialState = {}) => {
  const store = storeFactory(initialState);
  return mount(<Provider store={store}><Jotto/></Provider>)
};

describe('app', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it('renders without error', () => {
    const app = findByTestAttr(wrapper, 'jotto-app');
    expect(app).toHaveLength(1);
  });
});

describe('get secret word', () => {

  beforeEach(() => {
    //clear the mock calls from prev test
    mockGetSecretWord.mockClear();
  });

  it('get secret word on app mount', () => {
    const wrapper = setUp();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  it('get secret word doesnt run on app mount', () => {
    const wrapper = setUp();
    mockGetSecretWord.mockClear();

    //it will run useEffect
    wrapper.setProps();
    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);

  });
});
