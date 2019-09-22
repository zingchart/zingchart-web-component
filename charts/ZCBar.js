import ZingChart from '../ZingChart.js';
class ZCBar extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-bar';
    this.type ='bar';
  }
  parse() {
    super.parse();
  }

}

export default ZCBar;