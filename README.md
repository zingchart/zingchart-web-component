# ZingChart Web Component
A web component wrapper around the ZingChart library.

## Install

Install the zingchart-web-component package via npm

`$ npm install zingchart-web-component`


## Include in your project

This web component exposes out the main `<zing-chart>` web component, as well as chart-specific components such as `<zc-line>` for readability and convenience.

Depending on how you include this package, your inclusion will be different.

### Import Modules

Import the generic zingchart component
```js
import ZingChart from 'zingchart-web-component';
customElements.define('zing-chart', ZingChart);
```

OR

Manually import each chart and register it as a web component.

```js
import {Line} from 'zingchart-web-component/charts/ZCLine.js';
customElements.define('zc-line', Line);
```

## Usage

The ZingChart web component is a fully functional web component and exposes all methods and events.

### A simple hello world
Below is the most simple and straightforward way to get a chart rendered on your page.

```html
<zing-chart data='{"type": "line", "series": {["values": 1,2,3,4,5,6,4]}}'></zing-chart>
```
The data attribute takes the exact same JSON that the ZingChart library uses.

We can also simplifiy the example by using our line chart component:

```html
<zc-line data='"series": [{"values": [1,2,3,4,5,6,4]}]'></zc-line>
```

Note the absence of a "id" property. We autogenerate a id property so you don't have to (you can still provide one).

### The web-component way

While everything can be configured via the data property, you can also fully configure ZingChart via child components.

Each configuration property that ZingChart accepts can also be used as a child-component prefixed by 'zc-'.

For instance, if we want to set our data for our chart with a component, we would use the zc-series-# components:

```html
  <zc-line>
    <zc-series>
      <zc-series-0 values="[3,4,3,2,4,3,3]"></zc-series-0>
    </zc-series>
  </zc-line>
```

Similarly, if we wanted to add a draggable legend, we would simply add the following:

```html
  <zc-line>
    <zc-legend draggable></zc-legend>
    <zc-series>
      <zc-series-0 values="[3,4,3,2,4,3,3]"></zc-series-0>
    </zc-series>
  </zc-line>
```

The structure of the web-component mirrors the JSON configuration that ZingChart provides, and every property is available at each level.

For objects that accept arrays, simply use a parent component just as you would in the JSON syntax. Below is an example of adding custom labels:

```html
<zc-line>
  <zc-labels>
    <zc-label x="15%" y="5%" font-size="22px" border-width="1px" font-color="black" font-family="Times">First Label</zc-label>
    <zc-label x="15%" y="10%" font-size="22px" border-width="1px" font-color="red">Second Label</zc-label>
  </zc-labels>
</zc-line>
```

### Reactivity

Currently the `height`, `width`, `data`, `series`, and `values` are watched and will re-render the chart if changed. Future support for all attributes is planned.

### Methods

All methods are available via the instance of the component. The methods are simplified and do not require an id like in the JavaScript version.

```js
zingchart.exec('myChart', 'setseriesvalues', {
  values: [
    [19, 28, 13, 42, ...],
    [37, 11, 27, 25, ...]
  ]
);
```

```js
const chart = document.querySelector('zing-chart');
chart.setseriesvalues({
  values: [
    [19, 28, 13, 42, ...],
    [37, 11, 27, 25, ...]
  ]
});
```

### Events
Events can be attached to the root component, and passed a global function to send the event results to. All ZingChart events are available.

```js
window.chartRendered = function() {
  console.log('The chart is rendered!');
}
```

```html
<zing-chart complete="chartRendered"></zing-chart>
```
