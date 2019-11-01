import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-venn.min.js';

class ZCVenn extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-venn';
    this.type = 'venn';
  }
  parse() {
    super.parse();
  }
}

export default ZCVenn;