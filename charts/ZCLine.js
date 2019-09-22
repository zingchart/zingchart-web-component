import ZingChart from '../ZingChart.js';
class ZCLine extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-line';
    this.type = 'line';
  }
  parse() {
    super.parse();
  }

}

export default ZCLine;