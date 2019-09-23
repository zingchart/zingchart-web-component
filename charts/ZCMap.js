import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-maps.min.js';

class ZCMap extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-map';
  }
  parse() {
    super.parse();
  }
  render() {
    // Load the current module
    const name = this.getAttribute('name');
      this.chartData.shapes = this.chartData.shapes || [];
      import(`../node_modules/zingchart/modules-es6/zingchart-maps-${name}.min.js`)
      .then((module) => {
        this.chartData.shapes.push( {
          type: 'zingchart.maps',
          options: {
            name: name
          }
          });
        super.render();
      });
  }
}

export default ZCMap;