import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-treemap.min.js';

class ZCTreemap extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-treemap';
    this.type = 'treemap';
  }
  parse() {
    super.parse();
  }
}

export default ZCTreemap;