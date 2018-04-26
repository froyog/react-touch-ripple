import React from 'react';
import { shallow } from 'enzyme';
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
    })
})