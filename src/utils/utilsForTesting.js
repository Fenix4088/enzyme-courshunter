import { shallow } from 'enzyme';
import { rootReducer } from '../reducers/root';
import {applyMiddleware, createStore} from 'redux';
import {middlewares} from "../reducers/configureStore";

/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper.
 * @param {string} attr - Value 0f data-test attribute for search
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, attr) => wrapper.find(`[data-test='${attr}']`);

export const setUp = (Component, defaultProps = {}, props = {}) => shallow(<Component {...defaultProps} { ...props}/>)

export const storeFactory =  (initialState) => {
  return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}
