import App from './App';
import { findByTestAttr, setUp } from './utils/utilsForTesting';


describe('app', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp(App)
  })

  it('renders without error', () => {
    const app = findByTestAttr(wrapper, 'component-app');
    expect(app).toHaveLength(1);
  });
})
