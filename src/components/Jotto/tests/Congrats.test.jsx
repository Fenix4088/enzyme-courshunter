import { mount, shallow } from 'enzyme';
import Congrats from '../components/Congrats';
import { findByTestAttr } from '../../../utils/utilsForTesting';
import languageContext from '../../../contexts/languageContext';

/**
 *
 * @param {object} testValues
 * @param {boolean} testValues.success
 * @param {'en'|'emoji'|undefined} testValues.language
 */
const setUp = ({ success, language }) => {
  language = language || 'en';
  success = success || false;

  return mount(<languageContext.Provider value={language}><Congrats success={success} /></languageContext.Provider>);
};

describe('languagePicker', () => {
  it('should correctly renders congrats string in en', () => {
    const wrapper = setUp({success: true});
    const congratsMessage = findByTestAttr(wrapper, 'congrats-message')

    expect(congratsMessage.text()).toBe('Congratulations! You guessed the word!');
  });

  it('should correctly renders congrats string in emoji', () => {
    const wrapper = setUp({success: true, language: 'emoji'});
    const congratsMessage = findByTestAttr(wrapper, 'congrats-message')

    expect(congratsMessage.text()).toBe('🎯🎉');
  });
})

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
