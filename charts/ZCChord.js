import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-chord.min.js';

class ZCChord extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-chord';
    this.type ='chord';
  }
  parse() {
    super.parse();
  }

}

export default ZCChord;