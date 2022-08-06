# just-react-tooltip

Simple, lightweight react tooltip component which not required any dependencies.

Tooltip renders in body to avoid overflow issues, it can be used everywhere(react-modal, etc.).

## Installation

```sh
npm install just-react-tooltip
```

or

```sh
yarn add just-react-tooltip
```

## Usage


1 . Import just-react-tooltip after installation

```js
import { Tooltip } from 'just-react-tooltip'
```

2 . Wrap your element by Tooltip component

```jsx
<Tooltip content={<h3>Tooltip content</h3>}>
  <p>Hover to show tooltip</p>
</Tooltip>
```

### Important

Tooltip doesn't add any styles to your passed content. Because usually developers wanted to customize it, so you should just pass to content property your already styled component.

## Props

Notes:

- The tooltip sets `placement: bottom`, `alignment: center`, `offsetX: 0`, `offsetY: 0`, `fromEdge: 0` as **default** attributes. You don't have to add these options if you don't want to change the defaults

| Property               | Type      | Values                               | Description                                                                                                  |
|:-----------------------|:----------|:-------------------------------------|:-------------------------------------------------------------------------------------------------------------|
| **content** (required) | ReactNode | Single JSX component                 | Your styled tooltip                                                                                          |
| placement              | String    | "top", "right", **"bottom"**, "left" | Placement to show tooltip relative to wrapped component.                                                     |
| alignment              | String    | "start", **"center"**, "end"         | Alignment in selected side of wrapped element (placement)                                                    |
| offsetY                | Number    | **0**                                | By default tooltip stickied to the target's element edge to chosen side (placement).                         |
| offsetX                | Number    | **0**                                | By default tooltip stickied to the target's element edge to chosen side (placement).                         |
| fromEdge               | Number    | **0**                                | In case when tooltip stickied to the edge of screen to avoid exiting from visible area, you can customize it |

## Troubleshooting

### Custom child element
The tooltip needs to apply DOM event listeners to its child element. If the child is a custom React element, you need to make sure that it spreads its props to the underlying DOM element.
```jsx
const MyComponent = React.forwardRef(function MyComponent(props, ref) {
  //  Spread the props to the underlying DOM element.
  return <div {...props} ref={ref}>Bin</div>
});

// ...

<Tooltip content={<h3>Delete</h3>}>
  <MyComponent />
</Tooltip>
```

## Contributing

We welcome your contribution! Fork the repo, make some changes, submit a pull-request!

## License

MIT
