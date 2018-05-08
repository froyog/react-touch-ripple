import React from 'react';
import Ripples from 'react-touch-ripple';

const Demos = () => {
    return (
        <div className="demos">
            <section>
                <h2>Basic Usage</h2>
                <p className="desc">
                    Wrap anything with a <code>Ripples</code> component to
                    create ripples responding to mouse or touch event
                </p>
                <Ripples className="button-container" color="#fff">
                    <button className="primary">BUTTON</button>
                </Ripples>
            </section>
            <section>
                <h2>With different colors</h2>
                <p className="desc">

                </p>
                <Ripples className="button-container" color="#555">
                    <button className="secondary">SECONDARY</button>
                </Ripples>
            </section>
        </div>
    )
}

export default Demos;