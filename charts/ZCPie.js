import ZingChart from '../ZingChart.js';
class ZCPie extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-pie';
    this.type = 'pie';
  }
  parse() {
    super.parse();
  }
}

export default ZCPie;