import ZingChart from '../ZingChart.js';
class ZCBoxplot extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-boxplot';
    this.type ='boxplot';
  }
  parse() {
    super.parse();
  }

}

export default ZCBoxplot;