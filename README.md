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

###Important
Tooltip doesn't add any styles to your passed content. Because usually developers wanted to customize, so just pass to content property your already styled component.

## Props

Notes:

- The tooltip sets `place: bottom` as **default** attribute. You don't have to add these options if you don't want to change the defaults

| Property | Type      | Values               | Description                                                                                                               |
|:---------|:----------|:---------------------|:--------------------------------------------------------------------------------------------------------------------------|
| content  | ReactNode | Single JSX component | Your styled tooltip.                                                                                                      |
| place    | String    | "top", **"bottom"**  | Only these variants available not, in both of them tooltip centered by horizontal                                         |
| offsetY  | Number    | 0                    | By default tooltip stickied to the target's element edge                                                                  |
| offsetX  | Number    | 0                    | By default tooltip centered by horizontal                                                                                 |
| fromEdge | Number    | 0                    | In case when tooltip stickied to the edge of screen to avoid overflowing, you can to set this offset from the screen edge |

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

## Roadmap
Will be added more options to positioning tooltip on the next release.

## Contributing

We welcome your contribution! Fork the repo, make some changes, submit a pull-request!

## License

MIT
