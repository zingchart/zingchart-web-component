import ZingChart from '../ZingChart.js';
class ZCHeatmap extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-heatmap';
    this.type ='heatmap';
  }
  parse() {
    super.parse();
  }

}

export default ZCHeatmap;