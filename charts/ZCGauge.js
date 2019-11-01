import ZingChart from '../ZingChart.js';
class ZCGauge extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-gauge';
    this.type ='gauge';
  }
  parse() {
    super.parse();
  }

}

export default ZCGauge;