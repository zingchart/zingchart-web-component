import ZingChart from '../ZingChart.js';
class ZCRadar extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-radar';
    this.type = 'radar';
  }
  parse() {
    super.parse();
  }
}

export default ZCRadar;