import React from 'react';
import Ripples from 'react-touch-ripple';

const Demos = () => {
    return (
        <div className="demos">
            <h2>Basic Usage</h2>
            <p className="desc">
                Wrap anything with a <code>Ripples</code> component to
                create ripples responding to mouse or touch event
            </p>
            <Ripples color="#fff">
                <button>BUTTON</button>
            </Ripples>
        </div>
    )
}

export default Demos;