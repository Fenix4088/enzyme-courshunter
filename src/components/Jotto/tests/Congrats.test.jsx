import { shallow } from 'enzyme';
import Congrats from '../components/Congrats';
import { findByTestAttr } from '../../../utils/utilsForTesting';


const setUp = (props) => shallow(<Congrats {...props} />);

describe('Congrats component', () => {

  let wrapperTruthy;
  let wrapperFalsy;

  beforeEach(() => {
    wrapperTruthy = setUp({ success: true });
    wrapperFalsy = setUp({ success: false });
  });

  it('renders without error', () => {
    const component = findByTestAttr(wrapperTruthy, 'component-congrats');
    expect(component.length).toBe(1);
  });
  it('renders no text when `success` prop is false', () => {
    const component = findByTestAttr(wrapperFalsy, 'component-congrats');
    expect(component.text()).toBe('');
  });
  it('renders non-empty congrats message when `success` prop is true', () => {
    const message = findByTestAttr(wrapperTruthy, 'congrats-message');
    expect(message.text().length).not.toBe(0);
  });
});
