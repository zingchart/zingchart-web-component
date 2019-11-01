import ZingChart from '../ZingChart.js';
class ZCBubble extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-bubble';
    this.type ='bubble';
  }
  parse() {
    super.parse();
  }

}

export default ZCBubble;