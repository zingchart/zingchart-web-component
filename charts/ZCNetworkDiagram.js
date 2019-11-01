import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-tree.min.js';

class ZCChord extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-network-diagram';
    this.type ='tree';
  }
  parse() {
    super.parse();
  }

}

export default ZCNetworkDiagram;