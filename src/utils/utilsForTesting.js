import { shallow } from 'enzyme';

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} attr - Value 0f data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, attr) => wrapper.find(`[data-test='${attr}']`);

export const setUp = (Component, defaultProps = {}, props = {}) => shallow(<Component {...defaultProps} { ...props}/>)
