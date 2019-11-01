import ZingChart from '../ZingChart.js';
class ZCColumn extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-column';
    this.type ='column';
    this.plot = {
      vertical: true,
    }
  }
  parse() {
    super.parse();
  }

}

export default ZCColumn;