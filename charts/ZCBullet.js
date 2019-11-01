import ZingChart from '../ZingChart.js';
class ZCBullet extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-bullet';
    this.type ='bullet';
  }
  parse() {
    super.parse();
  }

}

export default ZCBullet;