import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-stock.min.js';

class ZCStock extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-stock';
    this.type = 'stock';
  }
  parse() {
    super.parse();
  }
}

export default ZCStock;