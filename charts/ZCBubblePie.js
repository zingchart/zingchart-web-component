import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-bubble-pie.min.js';

class ZCBubblePie extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-bubble-pie';
    this.type ='bubble-pie';
  }
  parse() {
    super.parse();
  }

}

export default ZCBubblePie;
