import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-rankflow.min.js';

class ZCRankflow extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-rankflow';
    this.type = 'rankflow';
  }
  parse() {
    super.parse();
  }
}

export default ZCRankflow;