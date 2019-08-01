# React Touch Ripple

Material Design 风格涟漪（Ripple）组件

[![Build Status](https://travis-ci.org/froyog/react-touch-ripple.svg?branch=master)](https://travis-ci.org/froyog/react-touch-ripple) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/froyog/react-touch-ripple/blob/master/LICENSE) 
![npm](https://img.shields.io/npm/v/npm.svg)

[English](./README.md)

## 安装

```bash
npm install react-touch-ripple --save
```

## 使用

### 基本

```jsx
import Ripples from 'react-touch-ripple';

const Demo = () => (
    <Ripples>
        <button>CLICK</button>
    </Ripples>
);
ReactDOM.render(<Demos />, tree);
```

### 自定义样式

说明：我们提供的 `<Ripple>` 组将包裹了内部组件（此例中包裹了`<button>`）。所以如果你要给 `<button>` 添加 `box-shadow` 或 `margin` 这种样式时，记得加在 `<Ripple>` 组件上，而不是 `<button>`。

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

### 改变颜色

涟漪的 `background-color` 的默认值是 `currentColor`。你可以传递 `color` 来改变这个值

```jsx
const ColoredDemo = () => (
    <Ripples color="#00a1e9">
        <button>CLICK</button>
    </Ripples>
);
```

重要说明：`<Ripple>` 上已经设置了 `opacity: 0.3` 所以无需自行添加透明度的样式。

```jsx
<Ripples color="rgba(0, 109, 37, 0.5)">
```
这样子是不对的。

### 居中

在 switch 或 checkbox 上调加 Ripple 时，一般希望 Ripple 能够居中，这时可以传递 center 使所有 ripple 居中。参见 [demo](https://froyog.github.io/react-touch-ripple)

```jsx
const RippleSwitch = () => (
    <Ripples center>
        <Switch />
    </Ripples>
);
```

## 设计指南

参见 [Choreography](https://material.io/guidelines/motion/choreography.html)

## License

[MIT](./LICENSE)
