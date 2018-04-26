// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cn from 'classnames';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Ripple from './Ripple';
import './style/index.css';

type Props = {
    className?: string,
    color?: string,
    center?: boolean,
    component?: string
}

type State = {
    rippleArray: Array<React.Element>,
    nextKey: number
}

class RippleWrapper extends React.Component<Props, State> {
    state = {
        rippleArray: [],
        nextKey: 0,
    };
    startTimeout: number = 0;

    handleMouseDown = (e: SyntheticMouseEvent<>) => { this.start(e); }

    handleMouseUp = (e: SyntheticMouseEvent<>) => { this.stop(e); }

    handleMouseLeave = (e: SyntheticMouseEvent<>) => { this.stop(e); }

    handleTouchStart = (e: SyntheticTouchEvent<>) => { this.start(e); }

    handleTouchEnd = (e: SyntheticTouchEvent<>) => { this.stop(e); }

    handleTouchMove = (e: SyntheticTouchEvent<>) => { this.stop(e); }

    componentWillUnmount () {
        clearTimeout(this.startTimeout);
    }

    start (e: SyntheticEvent<> = {}) {
        const center = this.props.center;

        const element = ReactDOM.findDOMNode(this);
        const rect = element
            ? element.getBoundingClientRect()
            : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            };
        
        let rippleX, rippleY, rippleSize;
        // calculate coordinates of the ripple
        if (
            center ||
            (e.clientX === 0 && e.clientY === 0) ||
            (!e.clientX && !e.touches)
        ) {
            // place the ripple in the center of the rect
            rippleX = Math.round(rect.width / 2);
            rippleY = Math.round(rect.height / 2);
        } else {
            const clientX = e.clientX ? e.clientX : e.touches[0].clientX;
            const clientY = e.clientY ? e.clientY : e.touches[0].clientY;
            rippleX = Math.round(clientX - rect.left);
            rippleY = Math.round(clientY - rect.top);
        }
        
        // calculate the size of the ripple
        if (center) {
            rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);
            if (rippleSize % 2 === 0) {
                rippleSize -= 1;
            }
        } else {
            const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
            const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
            rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
        }

        // Execute
        if (e.touches) {
            // delay the ripple effect for touch devices
            this.startWrapper = () => {
                this.createRipple({ rippleX, rippleY, rippleSize });
            };
            this.startTimeout = setTimeout(() => {
                this.startWrapper();
                this.startWrapper = null;
            }, 80);
        } else {
            this.createRipple({ rippleX, rippleY, rippleSize });
        }
    }

    createRipple (params) {
        const { rippleX, rippleY, rippleSize } = params;
        let rippleArray = this.state.rippleArray;

        rippleArray = [
            ...rippleArray,
            <Ripple 
                timeout={{
                    enter: 500,
                    exit: 500,
                }}
                color={this.props.color}
                key={this.state.nextKey}
                rippleX={rippleX}
                rippleY={rippleY}
                rippleSize={rippleSize}
            />
        ];

        this.setState({
            rippleArray: rippleArray,
            nextKey: this.state.nextKey + 1,
        });
    }

    stop (e) {
        clearTimeout(this.startTimeout);
        const { rippleArray } = this.state;

        if (e.type === 'touchend' && this.startWrapper) {
            e.persist();
            this.startWrapper();
            this.startWrapper = null;
            this.startTimeout = setTimeout(() => {
                this.stop(e);
            }, 0);
            return;
        }

        this.startWrapper = null;

        if (rippleArray && rippleArray.length) {
            this.setState({
                rippleArray: rippleArray.slice(1),
            });
        }
    }

    render () {
        const {
            className,
            // eslint-disable-next-line
            center,
            component,
            children,
            color,
            ...other
        } = this.props;

        return (
            <TransitionGroup
                className={cn(
                    'rtr-root',
                    className,
                )}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseLeave}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                onTouchMove={this.handleTouchMove}
                component={component}
                enter
                exit
                {...other}
            >
                {children}
                {this.state.rippleArray}
            </TransitionGroup>
        );
    }
};

RippleWrapper.defaultProps = {
    component: 'div',
};

export default RippleWrapper;