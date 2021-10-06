import {configure, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {ClickCounter} from './ClickCounter';

configure({adapter: new Adapter()});


/*
* Factory function to create shallow wrapper for the ClickCounter comp
* @function setUp
* @returns {ShallowWrapper}
**/
const setUp = () => shallow(<ClickCounter/>);

const findByTestAttr = (wrapper, attr) => wrapper.find(`[data-test='${attr}']`);

describe('ClickCounter', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setUp(<ClickCounter/>);
    });

    it('should renders without error', () => {
        const appComponent = findByTestAttr(wrapper, "component-app");

        expect(appComponent.length).toBe(1);
    });
    it('should renders inc btn', () => {
        const button = findByTestAttr(wrapper, "increment-button");

        expect(button.length).toBe(1);
    });
    it('should renders counter display', () => {
        const counterDisplay = findByTestAttr(wrapper, "counter-display");

        expect(counterDisplay.length).toBe(1);
    });
    it('counter should display should starts from 0', () => {
        const count = findByTestAttr(wrapper, 'count');

        expect(count.text()).toBe('0');
    });
    it('should inc the counter', () => {
        const button = findByTestAttr(wrapper, "increment-button");
        button.simulate('click');
        const count = findByTestAttr(wrapper, 'count');
        expect(count.text()).toBe('1')
    });

    it('should dec counter', () => {
        /*
        * simulate and props().OnClick() are close to each other
        * in best practies it is recomended to use props().onClick()
        * */

        findByTestAttr(wrapper, 'increment-button').simulate('click');
        findByTestAttr(wrapper, 'increment-button').simulate('click');

        expect(findByTestAttr(wrapper, "count").text()).toBe('2');

        findByTestAttr(wrapper, 'decrement-button').props().onClick();
        findByTestAttr(wrapper, 'decrement-button').props().onClick();
        expect(findByTestAttr(wrapper, "count").text()).toBe('0');
    });

    it('should display error message if user try to dec counter when it is already 0', () => {

        expect(findByTestAttr(wrapper, 'count').text()).toBe('0');
        expect(findByTestAttr(wrapper, 'error-message').length).toBe(0);

        findByTestAttr(wrapper, 'decrement-button').props().onClick();
        expect(findByTestAttr(wrapper, 'error-message').length).toBe(1);
    });

    it('should hide error message if user try to inc and error message is shown', () => {

        expect(findByTestAttr(wrapper, 'count').text()).toBe('0');

        findByTestAttr(wrapper, 'decrement-button').props().onClick();
        expect(findByTestAttr(wrapper, 'error-message').length).toBe(1);

        findByTestAttr(wrapper, 'increment-button').props().onClick();
        expect(findByTestAttr(wrapper, 'error-message').length).toBe(0);
        expect(findByTestAttr(wrapper, 'count').text()).toBe('1');

    });
});
