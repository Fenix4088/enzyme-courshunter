import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { ClickCounter } from './ClickCounter';

configure({ adapter: new Adapter() });

describe('ClickCounter', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ClickCounter />);
  });

  it('should renders without error', () => {
    const appComponent = wrapper.find('[data-test="component-app"]');

    expect(appComponent.length).toBe(1);
  });
  it('should renders inc btn', () => {});
  it('should renders counter display', () => {});
  it('counter should display should starts from 0', () => {});
  it('should inc the counter', () => {});
});
