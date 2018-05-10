import React from 'react';
import { shallow, mount } from 'enzyme';
import RippleWrapper from '../RippleWrapper.jsx';

describe('<RippleWrapper />', () => {
    test('rendering correctly', () => {
        const wrapper = shallow(
            <RippleWrapper>
                <button>test</button>
            </RippleWrapper>
        );
        expect(wrapper.name()).toBe('div');
        expect(wrapper.childAt(0).name()).toBe('button');
        expect(wrapper.childAt(1).name()).toBe('TransitionGroup');
    });

    test('rendering with corrent classes', () => {
        const wrapper = shallow(
            <RippleWrapper className="custom-class" />
        );
        expect(wrapper.hasClass('custom-class')).toBe(true);
    });

    test('spreading custom props', () => {
        const wrapper = shallow(
            <RippleWrapper data-custom="test" />
        );
        expect(wrapper.prop('data-custom')).toBe('test');
    });

    test('prop: component', () => {
        const wrapper = shallow(<RippleWrapper component="span" />);
        expect(wrapper.name()).toBe('span');
    });
    
    test('prop: color', () => {
        const wrapper = mount(<RippleWrapper color="#00a1e9" />);
        wrapper.simulate('mousedown');
        wrapper.update();
        expect(wrapper.state().rippleArray[0].props.color).toBe('#00a1e9');
    });
    
    test('prop: center', () => {
        const wrapper = mount(<RippleWrapper center />);
        wrapper.simulate('mousedown');
        wrapper.update();
        expect(wrapper.state().rippleArray[0].props.rippleSize).toBe(0);
        expect(wrapper.state().rippleArray[0].props.rippleX).toBe(0);
    });

    test('prop: timeout', () => {
        const wrapper = mount(
            <RippleWrapper 
                timeout={{ 
                    enter: 300,
                    exit: 200,
                }} 
            />
        );
        wrapper.simulate('mousedown');
        wrapper.update();
        expect(wrapper.state().rippleArray[0].props.timeout).toMatchObject({
            enter: 300,
            exit: 200,
        });
    });

    describe('creating ripples responding to mouse event', () => {
        test('creating unique ripples', () => {
            const wrapper = mount(<RippleWrapper />);
            expect(wrapper.state().rippleArray.length).toBe(0);
            wrapper.simulate('mousedown');
            expect(wrapper.state().rippleArray.length).toBe(1);
            wrapper.simulate('mousedown');
            expect(wrapper.state().rippleArray.length).toBe(2);

            wrapper.simulate('mouseup');
            expect(wrapper.state().rippleArray.length).toBe(1);
            wrapper.simulate('mouseup');
            expect(wrapper.state().rippleArray.length).toBe(0);
        });

        test('creating specific ripple', () => {
            const wrapper = mount(<RippleWrapper />);
            const instance = wrapper.instance();
            const clientX = 20,
                clientY = 10;
            instance.start({ clientX, clientY });
            expect(wrapper.state().rippleArray[0].props.rippleX).toBe(clientX);
            expect(wrapper.state().rippleArray[0].props.rippleY).toBe(clientY);
            // how we calculate sizes
            const size = Math.sqrt(
                Math.pow(clientX * 2 + 2, 2) + Math.pow(clientY * 2 + 2, 2)
            );
            expect(wrapper.state().rippleArray[0].props.rippleSize).toBeCloseTo(size, 5);
        });

        test('creating ripples with correct keys', () => {
            const wrapper = mount(
                <RippleWrapper>
                    <button>test</button>
                </RippleWrapper>
            );
            wrapper.simulate('mousedown');
            expect(wrapper.state().rippleArray[0].key).toBe('0');
            expect(wrapper.state().nextKey).toBe(1);
            wrapper.simulate('mousedown');
            expect(wrapper.state().rippleArray[1].key).toBe('1');
            expect(wrapper.state().nextKey).toBe(2);
            wrapper.simulate('mouseup');
            expect(wrapper.state().rippleArray[0].key).toBe('1');
            expect(wrapper.state().nextKey).toBe(2);
        });
    });

    describe('touch devices', () => {
        test('ignoring mousedown', () => {
            const wrapper = mount(<RippleWrapper />);
            const instance = wrapper.instance();
            expect(instance.ignoringMousedown).toBe(false);
            wrapper.simulate('touchstart');
            expect(instance.ignoringMousedown).toBe(true);
            expect(wrapper.state().rippleArray.length).toBe(1);
            wrapper.simulate('mousedown');
            expect(instance.ignoringMousedown).toBe(false);
            expect(wrapper.state().rippleArray.length).toBe(1);
        });
    });
});
