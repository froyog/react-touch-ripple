// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Transition from 'react-transition-group/Transition';

type Props = {
    className?: string,
    rippleX: number,
    rippleY: number,
    rippleSize: number,
    timeout: {| enter: number, exit: number |},
    color?: string,
}

class Ripple extends React.Component<Props> {
    state = {
        rippleEntering: false,
        wrapperExiting: false,
    };

    handleEnter = () => {
        this.setState({
            rippleEntering: true,
        });
    }

    handleExit = () => {
        this.setState({
            wrapperExiting: true,
        });
    }

    render () {
        const {
            className,
            rippleX,
            rippleY,
            rippleSize,
            color,
            ...other
        } = this.props;
        const { wrapperExiting, rippleEntering } = this.state;

        return (
            <Transition
                onEnter={this.handleEnter}
                onExit={this.handleExit}
                {...other}
            >
                <span 
                    className={cn(
                        'rtr-ripple-wrapper',
                        {
                            'rtr-ripple-wrapper-exiting': wrapperExiting
                        },
                        className,
                    )}
                >
                    <span 
                        className={cn(
                            'rtr-ripple',
                            {
                                'rtr-ripple-entering': rippleEntering
                            },
                        )}
                        style={{
                            width: rippleSize,
                            height: rippleSize,
                            top: rippleY - (rippleSize / 2),
                            left: rippleX - (rippleSize / 2),
                            backgroundColor: color,
                        }} 
                    />
                </span>
            </Transition>
        );
    }
}

Ripple.defaultProps = {
    color: 'currentColor',
};

export default Ripple;