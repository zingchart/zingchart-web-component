import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-nested-pie.min.js';

class ZCNestedPie extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-nested-pie';
    this.type ='nested-pie';
  }
  parse() {
    super.parse();
  }

}

export default ZCNestedPie;