import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-pop-pyramid.min.js';

class ZCPopulationPyramid extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-population-pyramid';
    this.type = 'pop-pyramid';
  }
  parse() {
    super.parse();
  }
}

export default ZCPopulationPyramid;