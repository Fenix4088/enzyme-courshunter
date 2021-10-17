import React from 'react';
import { shallow } from 'enzyme';
import LanguagePicker from '../components/LanguagePicker';
import { findByTestAttr } from '../../../utils/utilsForTesting';

const mockSetLanguage = jest.fn();

const setup = () => {
  return shallow(<LanguagePicker setLanguage={mockSetLanguage}/>)
}

describe('Language picker comp', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should renders without errors', () => {
    const component = findByTestAttr(wrapper, 'component-language-picker');

    expect(component.exists()).toBeTruthy();
  });

  it('renders non-zero language icons', () => {
    const languageIcons = findByTestAttr(wrapper, 'language-icon');

    expect(languageIcons.length).toBeGreaterThan(0);
  });

  it('set lang prop upon click', () => {
    const languageIcons = findByTestAttr(wrapper, 'language-icon');

    const firstIcon = languageIcons.first();
    firstIcon.simulate('click');

    expect(mockSetLanguage).toHaveBeenCalledTimes(1);
  });

})