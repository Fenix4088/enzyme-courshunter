import React from 'react';
import { mount } from 'enzyme';
import { getSecretWord as mockGetSecretWord } from './actions';
import { Jotto } from './components/Jotto/components/Jotto';
import { findByTestAttr } from './utils/utilsForTesting';

//activate global mock to make sure getSecretWord dosen't make network call
jest.mock('./actions');

const setUp = () => mount(<Jotto />);

describe.each([
  [null, 'en', true, false],
  ['party', 'en', false, true]
])(
  'renders with secretWord as %s', (secretWord, language, loadingShows, appShows) => {
    let wrapper;
    let originalUseReducer;

    beforeEach(() => {
      originalUseReducer = React.useReducer;
      const mockUseReducer = jest.fn()
        .mockReturnValue([
          { secretWord, language },
          jest.fn()
        ])

      React.useReducer = mockUseReducer;

      wrapper = setUp();
    });

    afterEach(() => {
      React.useReducer = originalUseReducer;
    })

    it(`renders loading spinner: ${loadingShows}`, () => {
        const spinner = findByTestAttr(wrapper, 'spinner');

        expect(spinner.exists()).toBe(loadingShows);
    });

    it(`renders app: ${appShows}`, () => {
        const app = findByTestAttr(wrapper, 'jotto-app');

        expect(app.exists()).toBe(appShows);
    });
  }
);

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
