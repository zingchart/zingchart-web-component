import ZingChart from '../ZingChart.js';
class ZCScatter extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-scatter';
    this.type = 'scatter';
  }
  parse() {
    super.parse();
  }

}

export default ZCScatter;