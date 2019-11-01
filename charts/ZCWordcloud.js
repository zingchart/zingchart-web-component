import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-wordcloud.min.js';

class ZCWordcloud extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-wordcloud';
    this.type = 'wordcloud';
  }
  parse() {
    super.parse();
  }
}

export default ZCWordcloud;