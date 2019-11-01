import ZingChart from '../ZingChart.js';
class ZCArea extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-area';
    this.type ='area';
  }
  parse() {
    super.parse();
  }

}

export default ZCArea;