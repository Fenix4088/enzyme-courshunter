import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Congrats from '../components/Congrats';

configure({ adapter: new Adapter() });

const setUp = (props) => shallow(<Congrats {...props} />);

describe('Congrats component', () => {

  let wrapperTruthy;
  let wrapperFalsy;

  beforeEach(() => {
    wrapperTruthy = setUp({ success: true });
    wrapperFalsy = setUp({ success: false });
  });

  it('should renders without error', () => {

  });
  it('should renders no text when "success" prop is false', () => {

  });
  it('should renders non-empty congrats message when "success"', () => {

  });
});
