# React Touch Ripple

Create ripple effect from Material Design with React

[![Build Status](https://travis-ci.org/froyog/react-touch-ripple.svg?branch=master)](https://travis-ci.org/froyog/react-touch-ripple) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/froyog/react-touch-ripple/blob/master/LICENSE) 
![npm](https://img.shields.io/npm/v/npm.svg)


[简体中文 Simplified Chinese](./README-zh_CN.md)

## Install

```bash
npm install react-touch-ripple --save
```

## Usage

### Basic Usage

```jsx
import Ripples from 'react-touch-ripples';

const Demo = () => (
    <Ripples>
        <button>CLICK</button>
    </Ripples>
);
ReactDOM.render(<Demos />, tree);
```

### Custom Styles

A quick note here: `<Ripples>` is a box wrapping around its child component (in this case, `<button>`) and if you are adding styles such as `box-shadow` or `margin`, make sure you apply them directly to the wrapper component instead of the child component.

```jsx
const StyledWrapperDemo = () => (
    <Ripples 
        className="deep-shadow"
        style={{ margin: '10px 0', }}
    >
        <button>CLICK</button>
    </Ripples>
);
```

### Changing Color

The background-color of the ripples are default to `currentColor`. If you are to change it, pass it as a prop to `<Ripples>`.

```jsx
const ColoredDemo = () => (
    <Ripples color="#00a1e9">
        <button>CLICK</button>
    </Ripples>
);
```

An important note: `opacity: 0.3` is already set on the ripples. So you just need to pass in the color without an alpha.

```jsx
<Ripples color="rgba(0, 109, 37, 0.5)">
```
This is **UNNESSARY** and will behave out of your expectation.

### Center Ripples

Provide `center` property on the `<Ripples>` will center every ripple it created. This is usually useful when you are applying ripples on a switch or checkbox component. See [demos](https://froyog.github.com/react-touch-ripple) for more information.

```jsx
const RippleSwitch = () => (
    <Ripples center>
        <Switch />
    </Ripples>
);
```

## Design Guidelines

See [Choreography](https://material.io/guidelines/motion/choreography.html)

## License

React Touch Ripple is licensed as [MIT](./LICENSE)