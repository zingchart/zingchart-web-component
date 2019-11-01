import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-pareto.min.js';

class ZCPareto extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-pareto';
    this.type ='pareto';
  }
  parse() {
    super.parse();
  }

}

export default ZCPareto;