import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-waterfall.min.js';

class ZCWaterfall extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-waterfall';
    this.type = 'waterfall';
  }
  parse() {
    super.parse();
  }
}

export default ZCWaterfall;