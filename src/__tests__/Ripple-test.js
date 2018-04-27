import React from 'react';
import { shallow, mount } from 'enzyme';
import Ripple from '../Ripple.jsx';

describe('<Ripple />', () => {
    test('rendering correctly', () => {
        const wrapper = shallow(
            <Ripple 
                rippleX={10}
                rippleY={10}
                rippleSize={20}
                timeout={{
                    enter: 550,
                    exit: 550
                }}
            />
        );
        expect(wrapper.name()).toBe('Transition');
    });

    test('rendering with correct classes', () => {
        const wrapper = shallow(
            <Ripple 
                rippleX={10}
                rippleY={10}
                rippleSize={20}
                timeout={{
                    enter: 550,
                    exit: 550
                }}
            />
        );
        expect(
            wrapper
            .childAt(0)
            .hasClass('rtr-ripple-wrapper')
        ).toBe(true);
        expect(
            wrapper
            .childAt(0)
            .childAt(0)
            .hasClass('rtr-ripple')
        ).toBe(true);
    });

    test('calculating size and coordinates correctly', () => {
        const wrapper = shallow(
            <Ripple 
                rippleX={16}
                rippleY={50}
                rippleSize={20}
                timeout={{
                    enter: 550,
                    exit: 550
                }}
            />
        );
        expect(
            wrapper
            .childAt(0)
            .childAt(0)
            .get(0)
            .props
            .style
        ).toMatchObject({
            left: 6,
            top: 40,
            width: 20,
            height: 20,
        });
    })

    test('props: color', () => {
        const wrapper = shallow(
            <Ripple 
                color="#00a1e9"
                rippleX={10}
                rippleY={10}
                rippleSize={20}
                timeout={{
                    enter: 550,
                    exit: 550
                }}
            />
        );
        const style = wrapper.find('.rtr-ripple').get(0).props.style;
        expect(style.backgroundColor).toBe('#00a1e9');
    });

    describe('behavior & functionality', () => {
        let wrapper;
        beforeAll(() => {
            wrapper = mount(
                <Ripple 
                    rippleX={10}
                    rippleY={10}
                    rippleSize={20}
                    timeout={{
                        enter: 550,
                        exit: 550
                    }}
                />
            );
        })

        test('start', () => {
            expect(wrapper.state().rippleEntering).toBe(false);
            wrapper.setProps({ in: true });
            wrapper.update();
            expect(wrapper.state().rippleEntering).toBe(true);
            expect(
                wrapper
                .find('.rtr-ripple')
                .hasClass('rtr-ripple-entering')
            ).toBe(true);
        });

        test('stop', () => {
            wrapper.setProps({ in: true });
            wrapper.update();
            expect(wrapper.state().wrapperExiting).toBe(false);
            wrapper.setProps({ in: false });
            wrapper.update();
            expect(wrapper.state().wrapperExiting).toBe(true);
            expect(
                wrapper
                .find('.rtr-ripple-wrapper')
                .hasClass('rtr-ripple-wrapper-exiting')
            ).toBe(true);
        });
    });
});