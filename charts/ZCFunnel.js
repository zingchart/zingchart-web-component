import ZingChart from '../ZingChart.js';
class ZCFunnel extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-funnel';
    this.type ='funnel';
  }
  parse() {
    super.parse();
  }

}

export default ZCFunnel;