import { shallow } from 'enzyme';
import { NumberOfGuesses } from '../components/NumberOfGuesses';
import { findByTestAttr } from '../../../utils/utilsForTesting';

const setUp = (props = {}) => shallow(<NumberOfGuesses {...props}/>);

describe('NumberOfGuesses', () => {

  it('should display message if their no guesses yet', () => {
    const wrapper = setUp({numberOfGuesses: 0});
    const numberWrapper = findByTestAttr(wrapper, 'number-wrapper');
    expect(numberWrapper.text()).toBe('Please, guess the word...')
  });

  it('should display correct number of guess', () => {
    const wrapper = setUp({numberOfGuesses: 3});
    const numberWrapper = findByTestAttr(wrapper, 'number-wrapper');
    expect(numberWrapper.text()).toBe(`Number of guesses: 3`)
  });
})