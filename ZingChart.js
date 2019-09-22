import {zingchart, ZC} from './node_modules/zingchart/es6.js';
import {DEFAULT_HEIGHT, DEFAULT_WIDTH, METHOD_NAMES, EVENT_NAMES} from './constants.js';
class ZingChart extends HTMLElement {
  constructor() {
    super();
    this.id = '';
    this.instance = {};
    this.count = 0;
    this.chartConfig = null;
    this.observer = null;
    
  }
  connectedCallback() {
    this.setup();
    this.render();
    this.attachObservers();
  }

  attachObservers() {
    const config = {
      attributes: true,
    }
    const callback = (mutationsList, observer) => {
      for(let mutation of mutationsList) {
        if(mutation.type === 'attributes') {
          switch(mutation.attributeName) {
            case 'config':
              this.rerender();
            break;
            case 'height':
            case 'width': 
              this.modifyDimensions();
            break;
          }
        }

      }
    }
    this.observer = new MutationObserver(callback);
    this.observer.observe(this, config);
  }
  destroy() {
    // Destroy zingchart
    zingchart.exec(this.id, 'destroy');

    // Deattach the mutation observer
    this.observer.disconnect();

  }
  setup() {
    // Set the id for ZingChart to bind to
    this.id = "zingchart-wc-" + this.count++;
    this.setAttribute('id', this.id);

    // Apply all of ZingChart's methods directly to this element's instance
    METHOD_NAMES.forEach(name => {
      this[name] = args => {
        return zingchart.exec(id, name, args);
      };
    });

    // Attach given event names
    Object.keys(this.attributes).forEach(index => {
      const eventName = this.attributes[index].name;
      const functionName = this.attributes[index].value;
      // Bind all event names
      if(EVENT_NAMES.includes(eventName)) {
        zingchart.bind(id, eventName, result => {
          window[functionName](result);
        });
      }
    });

  }
  modifyDimensions() {
    zingchart.exec(this.id, "resize", {
      width: this.getAttribute('width') || DEFAULT_WIDTH,
      height: this.getAttribute('height') || DEFAULT_HEIGHT,
    });
  }
  rerender() {
    let config = this.getAttribute('config');
    try {
      zingchart.exec(this.id, 'setdata', {
        data: JSON.parse(config),
      });
    } catch(error) {
      console.log(error);
      console.error('Invalid chart configuration')
    }
  }
  render() {
    // Check the user's properties
    this.chartConfig = this.getAttribute('config')
    if (!this.chartConfig) {
      throw new Error("A config is required to render a chart");
    }

    zingchart.render({
      id: this.id,
      data: this.chartConfig,
      width: this.getAttribute('width') || DEFAULT_WIDTH,
      height: this.getAttribute('height') || DEFAULT_HEIGHT,
    });
  }
}

export default ZingChart;