import ZingChart from '../ZingChart.js';
import '../node_modules/zingchart/modules-es6/zingchart-calendar.min.js';

class ZCCalendar extends ZingChart {
  constructor() {
    super();
    this.ID_PREFIX = 'zc-calendar';
    this.type ='calendar';
  }
  parse() {
    super.parse();
  }

}

export default ZCCalendar;